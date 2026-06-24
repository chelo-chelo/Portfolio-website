// =============================
// Ambient Background Glow
// =============================
const ambientGlow = document.querySelector(".ambient-glow");

if (ambientGlow) {
    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Smooth follow effect behind everything
        ambientGlow.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 800, fill: "forwards" });
    });
}

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

// =============================
// Project Slideshow Modal
// =============================
const projectsData = {
    project1: {
        title: "Project 1",
        desc: "Sample project description for Project 1. Replace this text with actual details about the technologies used, challenges faced, and solutions implemented.",
        github: "#",
        live: "#"
    },
    project2: {
        title: "Project 2",
        desc: "Sample project description for Project 2. Replace this text with actual details about the technologies used, challenges faced, and solutions implemented.",
        github: "#",
        live: "#"
    },
    project3: {
        title: "Project 3",
        desc: "Sample project description for Project 3. Replace this text with actual details about the technologies used, challenges faced, and solutions implemented.",
        github: "#",
        live: "#"
    }
};

const modal = document.getElementById("project-modal");

function openModal(projectId) {
    if (!modal) return;
    const data = projectsData[projectId];
    document.getElementById("modal-title").innerText = data.title;
    document.getElementById("modal-desc").innerText = data.desc;
    document.getElementById("modal-github").href = data.github;
    document.getElementById("modal-live").href = data.live;
    
    modal.style.display = "block";
    slideIndex = 1;
    showSlides(slideIndex);
}

function closeModal() {
    if (modal) modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

let slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if(slides[slideIndex-1]) slides[slideIndex-1].style.display = "block";  
    if(dots[slideIndex-1]) dots[slideIndex-1].className += " active";
}

// =============================
// Visitor Counter API
// =============================
const visitorCountEl = document.getElementById("visitor-count");
if (visitorCountEl) {
    fetch("https://api.counterapi.dev/v1/chelaka_portfolio/visits/up")
        .then(res => res.json())
        .then(data => {
            visitorCountEl.innerText = data.count;
        })
        .catch(err => {
            visitorCountEl.innerText = "1,000+"; 
        });
}

// =============================
// EmailJS Contact Form Setup
// =============================
if (typeof emailjs !== "undefined") {
    emailjs.init("-_8t8FDbj3nwn4V57L");

    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault(); 

            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            emailjs.sendForm('service_ord3caa', 'template_sh8kuva', this)
                .then(() => {
                    formStatus.style.color = "#4ade80"; 
                    formStatus.innerText = "Message sent successfully!";
                    contactForm.reset();
                }, (error) => {
                    formStatus.style.color = "#f87171"; 
                    formStatus.innerText = "Failed to send message. Please try again.";
                    console.error("EmailJS Error:", error);
                })
                .finally(() => {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                    
                    setTimeout(() => {
                        formStatus.innerText = "";
                    }, 5000);
                });
        });
    }
}