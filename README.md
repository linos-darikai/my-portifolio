This is a portifilio for myself.

## Projects section

The Projects section is built from my GitHub repos by `scripts/build-projects.mjs`. It runs in the deploy workflow on every push and once a day, so new repos show up on their own.

- A repo appears once it has a real README. Its README becomes its project page at `/projects/<repo>/`.
- Repos with no README (or just a title) are skipped, unless there is a write-up for them in `content/projects/<repo>.md`.
- `projects.config.json` sets the display order, card titles/descriptions/tech, repos to hide, and projects that aren't on GitHub (`extras`). Set `"replaceReadme": true` to show the write-up instead of the README.

To preview locally:

```bash
node scripts/build-projects.mjs   # optional: GITHUB_TOKEN=... to avoid the 60 requests/hour limit
python3 -m http.server
```

The generated files (`data/`, `projects/`, `sitemap.xml`) are not committed.
