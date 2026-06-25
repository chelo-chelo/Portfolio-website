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
        title: "Island Flavours Restaurant Management System (OOP Based POS System)",
        desc: "The Island Flavors Restaurant Management System is a desktop-based application developed using Java Swing and MySQL. The system is designed to manage restaurant operations such as menu management, customer handling, and order processing. It provides a user-friendly interface for the administrator and includes features such as invoice generation and exporting invoices.",
        github: "https://github.com/chelo-chelo/Island-Flavours-Resturant-Management-System.git",
        Report: "Projects/1/Report.pdf",
        magazine: "#",
        web: "#",
        images: [
            "Projects/1/1.png",
            "Projects/1/2.png",
            "Projects/1/3.png"
        ]
    },

    project2: {
        title: "Roamly - Travel Planning Platform",
        desc: "Roamly is a community-driven travel discovery and local listing platform designed to bridge the gap between travellers seeking destination information and local businesses offering services within those destinations. Built initially for Sri Lanka, one of Asia's most diverse and rapidly growing tourism markets, Roamly is architected for global scalability.",
        github: "#",
        Report: "Projects/2/Report.pdf",
        magazine: "#",
        web: "#",
        images: [
            "Projects/2/1.png",
            "Projects/2/2.png",
            "Projects/2/3.png"
        ]
    },

    project3: {
        title: "Eunoia - Health & Wellness Platform",
        desc: "Proud to contribute as part of the Flyer Designing Crew in the Organizing Committee of this initiative, organized by the Leo Club of USJ. This project brought together 8 Leo Clubs from different countries, showcasing the power of collaboration and creativity. I’m especially excited to have contributed to the launch of the EunoiaHub website and the digital magazine.",
        github: "#",
        Report: "#",
        magazine: "https://online.anyflip.com/bhfnn/hiur/mobile/index.html?fbclid=IwY2xjawSp7q9leHRuA2FlbQIxMABicmlkETFob3lsYzFYMUpHblZsUEpKc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHtRdoYQUbNhdODPFsB1tkNEScRXceIDjdQG3bIWlqNEKk350mnVYbS_qVUS8_aem_qlN1rL8M41tLIJSvbsSBYA",
        web: "https://eunoiahub.online/",
        images: [
            "Projects/3/1.jpg",
            "Projects/3/2.jpg",
            "Projects/3/3.jpg"
        ]
    }
};

const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalGithub = document.getElementById("modal-github");
const modalLive = document.getElementById("modal-live");
const modalMagazine = document.getElementById("modal-magazine");
const modalWeb = document.getElementById("modal-web");

const slidesContainer = document.querySelector(".slideshow-container");
const dotsContainer = document.querySelector(".modal-content > div[style*='text-align:center']");

let slideIndex = 1;

function openModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    
    if(data.github !== "#") {
        modalGithub.style.display = "inline-flex";
        modalGithub.href = data.github;
    } else {
        modalGithub.style.display = "none";
    }

    if(data.Report !== "#") {
        modalLive.style.display = "inline-flex";
        modalLive.href = data.Report;
    } else {
        modalLive.style.display = "none";
    }

    if(data.magazine !== "#") {
        modalMagazine.style.display = "inline-flex";
        modalMagazine.href = data.magazine;
    } else {
        modalMagazine.style.display = "none";
    }

    if(data.web !== "#") {
        modalWeb.style.display = "inline-flex";
        modalWeb.href = data.web;
    } else {
        modalWeb.style.display = "none";
    }

    // Populate images
    slidesContainer.innerHTML = "";
    dotsContainer.innerHTML = "";
    
    data.images.forEach((imgSrc, index) => {
        // Slide
        const slide = document.createElement("div");
        slide.className = "slide fade";
        slide.innerHTML = `<img src="${imgSrc}" alt="Screenshot ${index + 1}" style="width: 100%; height: 350px; object-fit: cover; border-radius: 10px;">`;
        slidesContainer.appendChild(slide);

        // Dot
        const dot = document.createElement("span");
        dot.className = "dot";
        dot.onclick = () => currentSlide(index + 1);
        dotsContainer.appendChild(dot);
    });

    // Add prev/next buttons back
    slidesContainer.innerHTML += `
        <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
        <a class="next" onclick="plusSlides(1)">&#10095;</a>
    `;

    modal.style.display = "block";
    slideIndex = 1;
    showSlides(slideIndex);
}

function closeModal() {
    modal.style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Slideshow Controls
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
    
    if (slides.length === 0) return;
    
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";  
    if(dots.length > 0) {
        dots[slideIndex-1].className += " active";
    }
}

// =============================
// EmailJS Contact Form
// =============================
const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const formStatus = document.getElementById("form-status");

if(contactForm) {
    // IMPORTANT: Make sure to initialize EmailJS with your Public Key in a <script> tag in HTML
    // emailjs.init("YOUR_PUBLIC_KEY");
    
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        submitBtn.innerHTML = "Sending...";
        submitBtn.disabled = true;
        
        // Replace with your actual Service ID and Template ID
        const serviceID = "YOUR_SERVICE_ID"; 
        const templateID = "YOUR_TEMPLATE_ID";

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                formStatus.style.color = "#4ade80"; // Green color
                formStatus.innerText = "Message sent successfully!";
                contactForm.reset();
                submitBtn.innerHTML = "Send Message";
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    formStatus.innerText = "";
                }, 5000);
            }, (err) => {
                formStatus.style.color = "#f87171"; // Red color
                formStatus.innerText = "Failed to send message. Please try again.";
                console.error("EmailJS Error:", err);
                submitBtn.innerHTML = "Send Message";
                submitBtn.disabled = false;
            });
    });
}
// =============================
// Visitor Counter & Animation
// =============================
async function updateVisitorCount() {
    const visitorCountElement = document.getElementById("visitor-count");
    if (!visitorCountElement) return;

    try {
        // Free Global Counter API
        // It uniquely tracks 'chelakabotheju' -> 'portfolio_visits'
        const response = await fetch("https://api.counterapi.dev/v1/chelakabotheju/portfolio_visits/up");
        
        if (!response.ok) throw new Error("API not responding");

        const data = await response.json();
        
        if (data && data.count) {
            // Animate the counter for a premium feel
            animateValue(visitorCountElement, 0, data.count, 1500);
        }
    } catch (error) {
        console.warn("Using local fallback counter due to API issue.");
        
        // Fallback to Local Storage if offline (tracks local browser visits)
        let localVisits = localStorage.getItem("portfolio_visits");
        if (!localVisits) {
            localVisits = 1; 
        } else {
            localVisits = parseInt(localVisits) + 1;
        }
        localStorage.setItem("portfolio_visits", localVisits);
        visitorCountElement.innerText = localVisits;
    }
}

// Premium Number Animation Function
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        
        // Calculate progress
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Ease-out effect (starts fast, slows down at the end)
        const easeOut = progress * (2 - progress);
        obj.innerHTML = Math.floor(easeOut * (end - start) + start);
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = end; // Ensure exact final number is set
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", updateVisitorCount);