// =============================
// Ambient Background Glow
// =============================
const ambientGlow = document.querySelector(".ambient-glow");

if (ambientGlow) {
    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

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
// Nav & View Switching Logic + Scroll Spy
// =============================
const navLinks = document.querySelectorAll('.nav-link');
const viewSections = document.querySelectorAll('.view-section');

// Function to update active nav link on scroll
function updateActiveNavLink() {
    const scrollPos = window.scrollY;
    
    // Find which view is currently displayed block
    const activeView = Array.from(viewSections).find(v => v.style.display === 'block');
    
    if (activeView && activeView.id !== 'main-view') {
        // We are on a specific tab view (like certs, blogs, etc.)
        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            if (link.getAttribute('data-target') === activeView.id) {
                link.classList.add('active-nav');
            }
        });
    } else if (activeView && activeView.id === 'main-view') {
        // We are on the main scrollable page - Included "skills"
        const sections = ['home', 'about', 'skills', 'projects'];
        let currentSectionId = 'home'; // default
        
        for (let id of sections) {
            const section = document.getElementById(id);
            if (section) {
                // If scroll position passes the top of the section (minus a small offset)
                if (scrollPos >= section.offsetTop - 150) {
                    currentSectionId = id;
                }
            }
        }

        // Apply glow to the matching nav tag
        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            if (link.getAttribute('href') === '#' + currentSectionId) {
                link.classList.add('active-nav');
            }
        });
    }
}

// Listen for scroll to handle the live highlighting
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Handle Clicks
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetViewId = link.getAttribute('data-target');
        
        // Hide all views
        viewSections.forEach(view => {
            if (view.id === targetViewId) {
                view.style.display = 'block';
                
                // Re-trigger fade-in animations for the new view
                setTimeout(() => {
                    view.querySelectorAll('.fade-in').forEach(el => el.classList.add('appear'));
                }, 50);

            } else {
                view.style.display = 'none';
            }
        });

        // Handle scrolling properly based on link type
        if (link.classList.contains('view-btn')) {
            e.preventDefault(); 
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (link.getAttribute('href') === '#home') {
            e.preventDefault(); 
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Update the visual nav glow immediately
        setTimeout(updateActiveNavLink, 50);
    });
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
if(themeBtn) {
    themeBtn.addEventListener("click",()=>{
        document.body.classList.toggle("light-theme");
    });
}

// =============================
// Project Slideshow Modal
// =============================
const projectsData = {
    project1: {
        title: "Project 1",
        desc: "Sample project description for Project 1.",
        github: "#",
        live: "#"
    },
    project2: {
        title: "Project 2",
        desc: "Sample project description for Project 2.",
        github: "#",
        live: "#"
    },
    project3: {
        title: "Project 3",
        desc: "Sample project description for Project 3.",
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
function plusSlides(n) { showSlides(slideIndex += n); }
function currentSlide(n) { showSlides(slideIndex = n); }
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
        .then(data => { visitorCountEl.innerText = data.count; })
        .catch(err => { visitorCountEl.innerText = "1,000+"; });
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
                    setTimeout(() => { formStatus.innerText = ""; }, 5000);
                });
        });
    }
}