// Mobile nav
const burger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
if (burger) {
  burger.addEventListener("click", () => {
    const shown = nav.style.display === "block";
    nav.style.display = shown ? "none" : "block";
  });
}

// Year
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

// Smooth scroll for hash links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click", e=>{
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth"});
    }
  });
});
