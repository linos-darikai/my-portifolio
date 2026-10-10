
let prevScroll = window.scrollY;
let buttons = document.querySelectorAll('.tab');
let content = document.querySelector(".content");
let contentArray = [`
<h1>Teaching Assistant (Internship) <span style="color: #00f5d4;">@ EmziniWeCode</span></h1>
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
<h1>Content Curator (Volunteer) <span style="color: #00f5d4;">@ EduTecX</span></h1>
<p>January 2024 – Present</p>
<div>
  <ul>
    <li class="r-points">Authored 50+ interactive learning modules, simplifying complex IT topics for over 300 students.</li>
    <li class="r-points">Developed and optimized AI training data, improving response accuracy by 20%.</li>
    <li class="r-points">Curated diverse learning resources, ensuring students received well-structured, relevant information.</li>
    <li class="r-points">Analyzed user feedback to enhance AI-generated responses and improve content effectiveness.</li>
  </ul>
</div>
`,`
<h1>Founder & Lead Developer <span style="color: #00f5d4;">@ Argus.io</span></h1>
<p>January 2024 – Present</p>
<div>
  <ul>
    <li class="r-points">Built an AI-powered financial platform enabling SMEs to extract insights from scanned receipts.</li>
    <li class="r-points">Integrated Mono API for seamless bank data retrieval, streamlining financial tracking for users.</li>
    <li class="r-points">Engineered a receipt-processing pipeline leveraging ChatGPT API to convert scanned receipts into structured JSON data.</li>
    <li class="r-points">Led customer discovery interviews at Ashesi University’s Entrepreneurship Centre to validate business assumptions and improve product fit.</li>
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
            content.innerHTML = contentArray[2];            
        }
        if(this.textContent === "EduTechx"){
            content.innerHTML = contentArray[1];            
        }
        console.log('Button clicked: ' + this.textContent);
    });
});






