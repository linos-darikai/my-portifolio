
let prevScroll = window.scrollY;
let buttons = document.querySelectorAll('.tab');
let content = document.querySelector(".content");
let projects = document.querySelector(".projects");
let showMoreButton = document.querySelector(".show-more-button");
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
<p>October 2025 – Present</p>
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

let projectArray = [`<div class="Project">                
    <div class="project-inner">
        <header>
            <div class="project-top">
                <div class="folder">
                    <i class="ph-light ph-folder-simple color-green" style="font-size: 50px;"></i>
                </div>
                <div class="project-links">
                    <i class="ph-light ph-github-logo color-grey" style="font-size: 30px;"></i>
                    <i class="ph-thin ph-arrow-square-out color-grey" style="font-size: 30px;"></i>                               
                </div>                 
            </div>

            <h3 class="project-title">Hog Game Simulator</h3>
            <div class="project-description">
                <span>Simulates the Hog dice game with AI strategies, a GUI interface, and game logic based on the CS61A project.</span>
            </div>
        </header>
        <footer>
            <ul class="project-tech-stack">
                <li>Python</li>
                <li>GUI</li>
                <li>CS61A</li>
            </ul>
        </footer>
    </div>
</div>
`, `<div class="Project">                
    <div class="project-inner">
        <header>
            <div class="project-top">
                <div class="folder">
                    <i class="ph-light ph-folder-simple color-green" style="font-size: 50px;"></i>
                </div>
                <div class="project-links">
                    <i class="ph-light ph-github-logo color-grey" style="font-size: 30px;"></i>
                    <i class="ph-thin ph-arrow-square-out color-grey" style="font-size: 30px;"></i>                               
                </div>                 
            </div>

            <h3 class="project-title">Ants Vs. SomeBees</h3>
            <div class="project-description">
                <span>A strategy game where ants defend against invading bees using unique powers, inspired by Plants Vs. Zombies.</span>
            </div>
        </header>
        <footer>
            <ul class="project-tech-stack">
                <li>Python</li>
                <li>OOP</li>
                <li>GUI</li>
            </ul>
        </footer>
    </div>
</div>
`];

content.innerHTML = contentArray[0];

function scrollReg(){
    let currScroll = window.scrollY;
    let navBar = document.getElementById("navbar");
    if(currScroll - prevScroll < 0 ){
        navBar.style.top = 0;
        navBar.style.backgroundColor = "rgb(9, 25, 47, 0.97)";

    }
    else{
        navBar.style.top = "-60px";
    }
    prevScroll = currScroll;
}
window.onscroll = scrollReg;

function loadMoreProj(){
  for(let i = 0; i < projectArray.length; i++){
    projects.innerHTML += projectArray[i];
  }
  showMoreButton.remove();
}

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








