// =============================
// Loader
// =============================
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.classList.add("loader-hidden");
        loader.addEventListener("transitionend", () => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        });
    }
});

// =============================
// Fade In Animation
// =============================
const faders = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("appear");
        }
    });
});

faders.forEach(fader=>{
    observer.observe(fader);
});

// =============================
// Theme Toggle
// =============================
const themeBtn = document.getElementById("theme-btn");
themeBtn.addEventListener("click",()=>{
    document.body.classList.toggle("light-theme");
});

// =============================
// Typing Effect
// =============================
const text = [
    "Undergraduate",
    "Graphic Designer",
    "Full Stack Developer"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type(){
    if(count === text.length){
        count = 0;
    }
    currentText = text[count];
    letter = currentText.slice(0, ++index);
    
    const typingElement = document.querySelector(".typing");
    if (typingElement) {
        typingElement.textContent = letter;
    }

    if(letter.length === currentText.length){
        count++;
        index = 0;
        setTimeout(type, 1500);
    } else {
        setTimeout(type, 100);
    }
})();