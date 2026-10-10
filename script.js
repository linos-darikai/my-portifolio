
let prevScroll = window.scrollY;
let buttons = document.querySelectorAll('.tab');
let content = document.querySelector(".content");
let contentArray = [`
<h1>Teaching Assistant (Internship) <a  target="_blank" rel="noopener noreferrer" href="https://emziniwecode.com/" style="color: #00f5d4;">@ EmziniWeCode</a></h1>
<p>January 2024 – Present</p>
<div>
  <ul>
    <li class="r-points">Designed and delivered structured programming lessons, enhancing student comprehension and increasing assignment success rates by 30%.</li>
    <li class="r-points">Led hands-on coding sessions to reinforce theoretical knowledge, enabling students to improve debugging skills.</li>
    <li class="r-points">Provided one-on-one mentorship, guiding students through complex programming concepts and problem-solving techniques.</li>
    <li class="r-points">Organized coding challenges that increased engagement and helped students develop critical thinking skills.</li>
  </ul>
</div>
`,`
<h1>Content Curator (Volunteer) <a target="_blank" rel="noopener noreferrer" href="https://edutecx.com/" style="color: #00f5d4;">@ EduTecX</span></h1>
<p>January – December 2024</p>
<div>
  <ul>
    <li class="r-points">Authored 50+ interactive learning modules, simplifying complex IT topics for over 300 students.</li>
    <li class="r-points">Developed and optimized AI training data, improving response accuracy by 20%.</li>
    <li class="r-points">Curated diverse learning resources, ensuring students received well-structured, relevant information.</li>
    <li class="r-points">Analyzed user feedback to enhance AI-generated responses and improve content effectiveness.</li>
  </ul>
</div>
`,`
<h1>Founder & Lead Developer <a href="#fourth-page" style="color: #00f5d4;">@ Argus.io</a></h1>
<p>January 2024 – Present</p>
<div>
  <ul>
    <li class="r-points">Built an AI-powered financial platform enabling SMEs to extract insights from scanned receipts.</li>
    <li class="r-points">Integrated Mono API for seamless bank data retrieval, streamlining financial tracking for users.</li>
    <li class="r-points">Engineered a receipt-processing pipeline leveraging ChatGPT API to convert scanned receipts into structured JSON data.</li>
    <li class="r-points">Led customer discovery interviews at Ashesi University’s Entrepreneurship Centre to validate business assumptions and improve product fit.</li>
  </ul>
</div>
`,
`<h1>Peer Tutor (Computer Programming) <a target="_blank" rel="noopener noreferrer" href = "https://ashesi.edu.gh/" style="color: #00f5d4;">@ Ashesi University</a></h1>
<p>January 2024 – December 2024</p>
<div>
  <ul>
    <li class="r-points">Provided one-on-one and group tutoring sessions, helping students grasp fundamental programming concepts and improve coding proficiency.</li>
    <li class="r-points">Designed custom exercises and debugging challenges, reinforcing problem-solving skills among students.</li>
    <li class="r-points">Conducted coding workshops covering Python, Java, and algorithmic thinking to enhance student learning outcomes.</li>
    <li class="r-points">Supported students with coursework and projects, increasing class-wide assignment completion rates by fostering a collaborative learning environment.</li>
  </ul>
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



buttons.forEach(button => {
    button.addEventListener('click', function() {
        buttons.forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');

        if(this.textContent === "Argus.oi"){
            content.innerHTML = contentArray[2];
        }
        if(this.textContent === "Emzini WeCode"){
            content.innerHTML = contentArray[0];
            console.log('Button clicked: ' + this.textContent);
        }
        if(this.textContent === "Ashesi University"){
            content.innerHTML = contentArray[3];            
        }
        if(this.textContent === "EduTecX"){
            content.innerHTML = contentArray[1];            
        }
        console.log('Button clicked: ' + this.textContent);
    });
});






