
let prevScroll = window.scrollY;


function scrollReg(){
    let currScroll = window.scrollY;
    let navBar = document.getElementById("navbar");
    if(currScroll - prevScroll < 0 ){
        navBar.style.top = 0;
        navBar.style.backgroundColor = "rgb(10, 25, 47, 0.998)";

    }
    else{
        navBar.style.top = "-60px";
    }
    prevScroll = currScroll;
}

window.onscroll = scrollReg;