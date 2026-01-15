// Loader - Show only on first visit
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    
    // Check if this is the first visit
    if (!sessionStorage.getItem('hasVisited')) {
        // Show loader
        loader.classList.remove('hidden');
        
        // Hide loader after 2.5 seconds
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            sessionStorage.setItem('hasVisited', 'true');
        }, 2500);
    } else {
        // Hide loader immediately if not first visit
        loader.classList.add('hidden');
    }
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme preference (default to dark)
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Hero Carousel - Scroll-based
let currentSlide = 0;
const hero = document.querySelector('.hero');
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function updateCarousel() {
    if (!hero || slides.length === 0) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const heroHeight = hero.offsetHeight;
    const heroTop = hero.offsetTop;
    
    // Only update carousel when scrolling within hero section
    if (scrollTop >= heroTop && scrollTop < heroTop + heroHeight) {
        const scrollProgress = (scrollTop - heroTop) / heroHeight;
        const slideIndex = Math.floor(scrollProgress * totalSlides);
        const newSlide = Math.min(Math.max(slideIndex, 0), totalSlides - 1);
        
        if (newSlide !== currentSlide && slides[newSlide]) {
            slides[currentSlide].classList.remove('active');
            currentSlide = newSlide;
            slides[currentSlide].classList.add('active');
        }
    }
}

// Throttle scroll events
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateCarousel();
            ticking = false;
        });
        ticking = true;
    }
});

// Initialize carousel on load
window.addEventListener('load', () => {
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        const footer = document.querySelector('.footer');
        if (footer) {
            const footerTop = footer.offsetTop;
            const scrollPosition = window.pageYOffset + window.innerHeight;
            
            if (scrollPosition >= footerTop - 100) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Menu Navigation (for menu.html)
const menuNavLinks = document.querySelectorAll('.menu-nav-link');
const menuSections = document.querySelectorAll('.menu-section');

if (menuNavLinks.length > 0) {
    // Update active nav link on scroll
    function updateActiveNavLink() {
        let current = '';
        menuSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        menuNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Smooth scroll to section on nav link click
    menuNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Reserve Table - WhatsApp Integration
const reserveButtons = document.querySelectorAll('[href*="reserve"], .reserve-btn, #reserveButton');

reserveButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const phoneNumber = '919638808069';
        const message = encodeURIComponent('Hi, I\'d like to reserve a table at Fresh Roast.');
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    });
});

// Handle reserve anchor links
window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#reserve') {
        const phoneNumber = '919638808069';
        const message = encodeURIComponent('Hi, I\'d like to reserve a table at Fresh Roast.');
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && !href.includes('reserve')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});
