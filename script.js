// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Mobile menu toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active");
    navLinks.classList.toggle("active");

    // Update aria-expanded attribute for accessibility
    const isExpanded = mobileMenuBtn.classList.contains("active");
    mobileMenuBtn.setAttribute("aria-expanded", isExpanded);
  });
}

// Close mobile menu when clicking on a nav link
const navItems = document.querySelectorAll(".nav-links a");
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (mobileMenuBtn.classList.contains("active")) {
      mobileMenuBtn.classList.remove("active");
      navLinks.classList.remove("active");
      mobileMenuBtn.setAttribute("aria-expanded", false);
    }
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Sticky header with scroll class
const header = document.querySelector("header");
const scrollThreshold = 50;

window.addEventListener("scroll", () => {
  if (window.scrollY > scrollThreshold) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Add focus trap for accessibility in mobile menu
function handleFirstAndLastFocus(e) {
  if (!navLinks.classList.contains("active")) return;

  const focusableElements = navLinks.querySelectorAll("a, button");
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.key === "Tab") {
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
}

document.addEventListener("keydown", handleFirstAndLastFocus);
