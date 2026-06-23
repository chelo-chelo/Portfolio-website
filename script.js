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
// Skills Proficiency Animation
// =============================
const progressLines = document.querySelectorAll(".progress-line span");
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const line = entry.target;
            const percent = line.parentElement.getAttribute("data-percent");
            line.style.width = percent;
        }
    });
}, { threshold: 0.5 }); // Triggers when the skill bar is 50% visible in the viewport

progressLines.forEach(line => {
    skillsObserver.observe(line);
});