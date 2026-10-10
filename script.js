
let prevScroll = window.scrollY;
let buttons = document.querySelectorAll('.tab');
let content = document.querySelector(".content");
let contentArray = [`
  <h2>Lead Engineer <span style="color: #00f5d4;">@ Company Name</span></h2>
  <p>May 20XX – Present</p>
  <ul>
    <li>Deliver high-quality, robust production code for various projects across multiple industries.</li>
    <li>Work alongside creative directors to research, develop, and implement technical solutions.</li>
    <li>Collaborate with designers, project managers, and engineers to transform concepts into production-ready solutions.</li>
    <li>Provide leadership through collaboration, knowledge sharing, and mentorship.</li>
  </ul>
`, "<p>New content 2 <strong>HTML</strong> tags</p>", "<p>New content 3<strong>HTML</strong> tags</p>"];

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
            content.innerHTML = contentArray[0];
        }
        if(this.textContent === "Emzini WeCode"){
            content.innerHTML = contentArray[1];
            console.log('Button clicked: ' + this.textContent);
        }
        if(this.textContent === "Ashesi University"){
            content.innerHTML = contentArray[2];            
        }
        if(this.textContent === "EduTechx"){
            content.innerHTML = contentArray[0];            
        }
        console.log('Button clicked: ' + this.textContent);
    });
});






