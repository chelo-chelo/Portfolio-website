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