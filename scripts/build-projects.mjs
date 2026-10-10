#!/usr/bin/env node
// Builds the Projects section from GitHub.
//
// Pulls every public repo, grabs its README (rendered to HTML by GitHub) and merges in
// projects.config.json plus the write-ups in content/projects/<repo>.md. Then writes:
//   data/projects.js              cards for the home page
//   projects/<slug>/index.html    one page per project
//   sitemap.xml
//
// A repo shows up automatically once it has a real README. Repos with an empty or stub README
// are skipped unless content/projects/<repo>.md gives them a write-up.
//
// Runs in the deploy workflow. Locally: `node scripts/build-projects.mjs`
// (set GITHUB_TOKEN to avoid GitHub's 60 requests/hour limit for anonymous calls).

import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const config = JSON.parse(await readFile(path.join(ROOT, "projects.config.json"), "utf8"));
const template = await readFile(path.join(ROOT, "templates/project.html"), "utf8");
const SITE = config.siteUrl.replace(/\/$/, "");
const USER = config.githubUser;

// READMEs with less text than this count as empty (e.g. just "# repo-name")
const MIN_README_CHARS = 150;

const headers = { "User-Agent": `${USER}-portfolio-build`, "X-GitHub-Api-Version": "2022-11-28" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

// GitHub API call. Returns null on 404, parsed JSON when asked for, text otherwise.
async function gh(apiPath, { accept = "application/vnd.github+json", json = true, body } = {}) {
    const res = await fetch("https://api.github.com" + apiPath, {
        method: body ? "POST" : "GET",
        headers: { ...headers, Accept: accept, ...(body && { "Content-Type": "application/json" }) },
        body: body && JSON.stringify(body),
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`GitHub ${apiPath} -> ${res.status}: ${await res.text()}`);
    return json ? res.json() : res.text();
}

const readReadme = repo =>
    gh(`/repos/${repo.full_name}/readme`, { accept: "application/vnd.github.html+json", json: false });

const renderMarkdown = (text, repoFullName) =>
    gh("/markdown", { json: false, body: { text, mode: "gfm", ...(repoFullName && { context: repoFullName }) } });

async function readWriteup(slug) {
    const file = path.join(ROOT, "content/projects", `${slug}.md`);
    return existsSync(file) ? readFile(file, "utf8") : null;
}

const stripTags = html => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const escapeHTML = text => String(text ?? "").replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// First paragraph of a README, used when a repo has no description
function firstParagraph(html) {
    const match = html.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i);
    const text = match ? stripTags(match[1]) : "";
    return text.length > 200 ? text.slice(0, 197).replace(/\s+\S*$/, "") + "…" : text;
}

// README links and images are relative to the repo; point them at GitHub instead of this site
function absolutizeUrls(html, repo) {
    const raw = `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/`;
    const blob = `https://github.com/${repo.full_name}/blob/${repo.default_branch}/`;
    const isAbsolute = url => /^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(url);
    const clean = url => url.replace(/^\.?\//, "");
    return html
        .replace(/(<(?:img|source)\b[^>]*?\bsrc=")([^"]*)"/gi, (m, pre, url) => isAbsolute(url) ? m : `${pre}${raw}${clean(url)}"`)
        .replace(/(<a\b[^>]*?\bhref=")([^"]*)"/gi, (m, pre, url) => isAbsolute(url) ? m : `${pre}${blob}${clean(url)}"`);
}

// Decide what a project's page shows: the README, the site write-up, or nothing (skip the repo)
async function buildProject(repo, info) {
    const slug = repo ? repo.name : info.slug;
    const writeup = await readWriteup(slug);
    const readme = repo ? await readReadme(repo) : null;
    const readmeIsThin = !readme || stripTags(readme).length < MIN_README_CHARS;

    let content;
    if (writeup && (readmeIsThin || info.replaceReadme)) content = await renderMarkdown(writeup, repo?.full_name);
    else if (!readmeIsThin) content = absolutizeUrls(readme, repo);
    else return null;

    const tech = info.tech || [repo?.language, ...(repo?.topics || [])].filter(Boolean);
    return {
        slug,
        title: info.title || slug.replace(/[-_]+/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        description: info.description || repo?.description || firstParagraph(content),
        tech: tech.slice(0, 4),
        repoUrl: repo?.html_url || null,
        liveUrl: repo?.homepage || null,
        updated: (repo?.pushed_at || new Date().toISOString()).slice(0, 10),
        url: `projects/${slug}/`,
        content,
    };
}

function renderPage(project) {
    const url = `${SITE}/${project.url}`;
    const links = [
        project.repoUrl && `<a class="resume-button text-color-green" href="${escapeHTML(project.repoUrl)}" target="_blank" rel="noopener noreferrer"><i class="ph ph-github-logo"></i> View on GitHub</a>`,
        project.liveUrl && `<a class="resume-button text-color-green" href="${escapeHTML(project.liveUrl)}" target="_blank" rel="noopener noreferrer"><i class="ph ph-arrow-square-out"></i> Live site</a>`,
    ].filter(Boolean).join("\n");
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: project.title,
        description: project.description,
        url,
        ...(project.repoUrl && { codeRepository: project.repoUrl }),
        ...(project.tech.length && { keywords: project.tech.join(", ") }),
        dateModified: project.updated,
        author: { "@type": "Person", name: "Linos Tapiwa Darikai", url: `${SITE}/` },
    };
    const values = {
        TITLE: escapeHTML(project.title),
        DESCRIPTION: escapeHTML(project.description),
        URL: escapeHTML(url),
        SITE: escapeHTML(SITE),
        TECH: project.tech.map(t => `<li>${escapeHTML(t)}</li>`).join(""),
        LINKS: links,
        CONTENT: project.content,
        JSONLD: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
    };
    return template.replace(/\{\{(\w+)\}\}/g, (m, key) => key in values ? values[key] : m);
}

function sortProjects(projects) {
    const rank = slug => {
        const i = config.order.indexOf(slug);
        return i === -1 ? config.order.length : i;
    };
    return projects.sort((a, b) => rank(a.slug) - rank(b.slug) || b.updated.localeCompare(a.updated));
}

// ---- Build ----

const repos = await gh(`/users/${USER}/repos?per_page=100&sort=pushed`);
const candidates = repos.filter(r => !r.fork && !r.archived && !config.hidden.includes(r.name));

const built = await Promise.all([
    ...candidates.map(repo => buildProject(repo, config.projects[repo.name] || {})),
    ...config.extras.map(extra => buildProject(null, extra)),
]);
const projects = sortProjects(built.filter(Boolean));
const skipped = candidates.filter(r => !projects.some(p => p.slug === r.name)).map(r => r.name);

await rm(path.join(ROOT, "projects"), { recursive: true, force: true });
for (const project of projects) {
    const dir = path.join(ROOT, "projects", project.slug);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "index.html"), renderPage(project));
}

const cards = projects.map(({ content, ...card }) => card);
await mkdir(path.join(ROOT, "data"), { recursive: true });
await writeFile(path.join(ROOT, "data/projects.js"),
    `// Generated by scripts/build-projects.mjs. Do not edit.\nwindow.PROJECTS = ${JSON.stringify(cards, null, 2)};\n`);

const today = new Date().toISOString().slice(0, 10);
const sitemapEntries = [
    { loc: `${SITE}/`, lastmod: today, priority: "1.0" },
    ...projects.map(p => ({ loc: `${SITE}/${p.url}`, lastmod: p.updated, priority: "0.7" })),
];
await writeFile(path.join(ROOT, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    sitemapEntries.map(e => `  <url><loc>${e.loc}</loc><lastmod>${e.lastmod}</lastmod><priority>${e.priority}</priority></url>`).join("\n") +
    `\n</urlset>\n`);

console.log(`Built ${projects.length} projects: ${projects.map(p => p.slug).join(", ")}`);
if (skipped.length) console.log(`Skipped (no README or write-up): ${skipped.join(", ")}`);
