
let buttons = document.querySelectorAll('.tab');
let content = document.querySelector(".content");
let projects = document.querySelector(".projects");
let showMoreButton = document.querySelector("#show-more-projects");
const INITIAL_PROJECT_COUNT = 6;
let contentArray = [`
<h1>Software Developer  <a target="_blank" rel="noopener noreferrer" href="https://ashesi.edu.gh/" style="color: #00f5d4;">@ Ashesi Cobot Research Team</a></h1>
<p>January 2025 – Present</p>
<div>
  <ul>
    <li class="r-points">Collaborated in a 4-member team using GitHub Flow to design, implement, and review features for Cobot, an AI-driven system for grading student logic tasks.</li>
    <li class="r-points">Developed backend services in JavaScript (Node.js) for audio transcription management.</li>
    <li class="r-points">Improved error reporting by logging transcription issues and making them traceable during testing, cutting down debugging time by approximately 80%.</li>
  </ul>
</div>
`,`
<h1>Software Engineer <a target="_blank" rel="noopener noreferrer" href="https://www.developforgood.org/" style="color: #00f5d4;">@ Develop for Good</a></h1>
<p>October 2025 – February 2026</p>
<div>
  <ul>
    <li class="r-points">Collaborating with a team of 6 engineers, designers, and PMs to develop a web platform for Pain USA.</li>
    <li class="r-points">Contributing to technical architecture planning, system design discussions, and technology stack evaluation during the design phase.</li>
    <li class="r-points">Creating and reviewing technical documentation to establish project requirements and communicate design decisions.</li>
    <li class="r-points">Utilizing Git/GitHub for version control and participating in empathetic user-centered design.</li>
  </ul>
</div>
`,`
<h1>Software Engineering Intern <a target="_blank" rel="noopener noreferrer" href="https://www.innbucks.co.zw/" style="color: #00f5d4;">@ InnBucks Microbank</a></h1>
<p>May 2025 – August 2025</p>
<div>
  <ul>
    <li class="r-points">Reduced HR onboarding time from 3 weeks to under 4 hours by designing with Figma and building a streamlined web application using Angular and Firebase.</li>
    <li class="r-points">Enabled HR to self-configure onboarding steps via modular components and admin controls, cutting change requests and updates.</li>
    <li class="r-points">Shipped via GitHub Flow (feature branches, PRs, conflict resolution) and verified core flows with unit and integration tests before release.</li>
  </ul>
</div>
`,`
<h1>Teaching Assistant <a  target="_blank" rel="noopener noreferrer" href="https://emziniwecode.com/" style="color: #00f5d4;">@ EmziniWeCode</a></h1>
<p>January 2024 – Present</p>
<div>
  <ul>
    <li class="r-points">Designed and delivered structured programming lessons, enhancing student comprehension and increasing assignment success rates by 30%.</li>
    <li class="r-points">Led hands-on coding sessions to reinforce theoretical knowledge, enabling students to improve debugging skills.</li>
    <li class="r-points">Provided one-on-one mentorship, guiding students through complex programming concepts and problem-solving techniques.</li>
    <li class="r-points">Organized coding challenges that increased engagement and helped students develop critical thinking skills.</li>
  </ul>
</div>
`];

content.innerHTML = contentArray[0];

function escapeHTML(text){
    return String(text ?? "").replace(/[&<>"']/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[c]));
}

// Project cards come from data/projects.js, generated from GitHub by scripts/build-projects.mjs
function projectCard(project, hidden){
    let links = "";
    if(project.repoUrl){
        links += `<a href="${escapeHTML(project.repoUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(project.title)} on GitHub"><i class="ph-light ph-github-logo color-grey" style="font-size: 30px;"></i></a>`;
    }
    if(project.liveUrl){
        links += `<a href="${escapeHTML(project.liveUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(project.title)} live site"><i class="ph-thin ph-arrow-square-out color-grey" style="font-size: 30px;"></i></a>`;
    }
    return `
    <div class="Project${hidden ? " is-hidden" : ""}">
        <div class="project-inner">
            <header>
                <div class="project-top">
                    <div class="folder">
                        <i class="ph-light ph-folder-simple color-green" style="font-size: 50px;"></i>
                    </div>
                    <div class="project-links">${links}</div>
                </div>
                <h3 class="project-title"><a class="project-card-link" href="${escapeHTML(project.url)}">${escapeHTML(project.title)}</a></h3>
                <div class="project-description">
                    <span>${escapeHTML(project.description)}</span>
                </div>
            </header>
            <footer>
                <ul class="project-tech-stack">${project.tech.map(t => `<li>${escapeHTML(t)}</li>`).join("")}</ul>
                <span class="project-read-more">Read more <i class="ph ph-arrow-right"></i></span>
            </footer>
        </div>
    </div>`;
}

function renderProjects(){
    let list = window.PROJECTS || [];
    if(list.length === 0){
        projects.innerHTML = `<p>See my projects on <a class="text-color-green" href="https://github.com/linos-darikai" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>`;
    }
    else{
        projects.innerHTML = list.map((project, i) => projectCard(project, i >= INITIAL_PROJECT_COUNT)).join("");
    }
    if(list.length <= INITIAL_PROJECT_COUNT){
        showMoreButton.remove();
    }
}

function loadMoreProj(){
  projects.querySelectorAll(".Project.is-hidden").forEach(card => card.classList.remove("is-hidden"));
  showMoreButton.remove();
}

renderProjects();
showMoreButton.addEventListener("click", loadMoreProj);

buttons.forEach(button => {
    button.addEventListener('click', function() {
        buttons.forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');

        if(this.textContent === "Innbucks"){
            content.innerHTML = contentArray[2];
        }
        if(this.textContent === "Emzini WeCode"){
            content.innerHTML = contentArray[3];
            console.log('Button clicked: ' + this.textContent);
        }
        if(this.textContent === "Cobot Research Team"){
            content.innerHTML = contentArray[0];            
        }
        if(this.textContent === "Develop for Good"){
            content.innerHTML = contentArray[1];            
        }
        console.log('Button clicked: ' + this.textContent);
    });
});








