const slideshow = document.getElementById('slideshow');
const images = ['images/home1.png', 'images/home2.png', 'images/home3.png'];
let slideIndex = 0;

setInterval(() => {
    slideIndex = (slideIndex + 1) % images.length;
    slideshow.src = images[slideIndex];
    slideshow.style.width = '100%';

}, 3000); // Change every 3 seconds

const animation = document.getElementById('animation');
const words = ['Quicker', 'Easier', 'Smoother'];
let currentIndex = 0;

setInterval(() => {
    currentIndex = (currentIndex + 1) % words.length;
    animation.textContent = words[currentIndex];
}, 3000);