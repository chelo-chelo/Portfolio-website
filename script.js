// Select all elements that have the 'fade-in' class
const faders = document.querySelectorAll('.fade-in');

// Configure the observer to trigger slightly before the element hits the middle of the screen
const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px"
};

// Create the Intersection Observer
const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            // Add the 'appear' class to trigger the CSS animation
            entry.target.classList.add('appear');
            // Stop observing once it has appeared
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

// Tell the observer to watch each of our faded elements
faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// =============================
// Dark Mode Toggle
// =============================

const themeBtn = document.getElementById("theme-btn");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");

        if (document.body.classList.contains("light-theme")) {
            themeBtn.textContent = "☀️";
        } else {
            themeBtn.textContent = "🌙";
        }
    });
}


// =============================
// Typing Animation
// =============================

const text = [
    "Undergraduate",
    "Graphic Designer",
    "Web Developer"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {

    if (count === text.length) {
        count = 0;
    }

    currentText = text[count];
    letter = currentText.slice(0, ++index);

    const typingElement = document.querySelector(".typing");

    if (typingElement) {
        typingElement.textContent = letter;
    }

    if (letter.length === currentText.length) {

        count++;
        index = 0;

        setTimeout(type, 1000);

    } else {

        setTimeout(type, 100);
    }

})();


// =============================
// Scroll Progress Bar
// =============================

window.addEventListener("scroll", () => {

    const winScroll =
        document.body.scrollTop ||
        document.documentElement.scrollTop;

    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const scrolled = (winScroll / height) * 100;

    const progressBar =
        document.getElementById("progress-bar");

    if (progressBar) {
        progressBar.style.width = scrolled + "%";
    }

});


// =============================
// Contact Form
// =============================

const form = document.querySelector(".contact-form");

if (form) {

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        alert("Message sent successfully!");

        form.reset();

    });

}