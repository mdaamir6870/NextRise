// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Simple form submit behavior
document.getElementById('inquiry-form').addEventListener('submit', e => {
  e.preventDefault();
  alert('Thanks for sending a request! We’ll contact you shortly.');
});
