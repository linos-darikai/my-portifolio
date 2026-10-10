// Navbar behaviour shared by every page: hide on scroll down, mobile drawer menu

let prevScroll = window.scrollY;
let menuToggle = document.querySelector(".menu-toggle");
let navBackdrop = document.querySelector(".nav-backdrop");

function setMenu(open){
    document.body.classList.toggle("menu-open", open);
    menuToggle.setAttribute("aria-expanded", open);
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuToggle.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
navBackdrop.addEventListener("click", () => setMenu(false));
document.querySelectorAll(".links a").forEach(link => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if(e.key === "Escape") setMenu(false); });
// Close the drawer if the screen is resized past the mobile breakpoint
window.matchMedia("(min-width: 769px)").addEventListener("change", e => { if(e.matches) setMenu(false); });

function scrollReg(){
    // Keep the navbar in place while the drawer is open
    if(document.body.classList.contains("menu-open")) return;
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
