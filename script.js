// Mobile menu toggle
document.querySelector('.menu-toggle')?.addEventListener('click', () => {
    document.querySelector('.nav-links')?.classList.toggle('active');
});

// Scroll reveal using Intersection Observer
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // optional: keep observing if you want repeat
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

reveals.forEach(el => observer.observe(el));

// Helper: prefill registration form from URL parameter (if coming from courses)
const urlParams = new URLSearchParams(window.location.search);
const courseParam = urlParams.get('course');
if (courseParam && document.getElementById('course')) {
    const select = document.getElementById('course');
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === courseParam) {
            select.selectedIndex = i;
            break;
        }
    }
}

// Registration form validation & feedback
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const course = document.getElementById('course').value;
        const feedbackDiv = document.getElementById('formFeedback');

        if (!name || !email || !course) {
            feedbackDiv.innerHTML = '<div class="feedback error">All fields marked * are required.</div>';
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            feedbackDiv.innerHTML = '<div class="feedback error">Please enter a valid email address.</div>';
            return;
        }

        // Simulate successful registration
        feedbackDiv.innerHTML = '<div class="feedback success">🎉 Registration successful! We’ll contact you shortly.</div>';
        registerForm.reset();
        setTimeout(() => {
            feedbackDiv.innerHTML = '';
        }, 5000);
    });
}

// Contact form validation & feedback
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        const feedbackDiv = document.getElementById('contactFeedback');

        if (!name || !email || !message) {
            feedbackDiv.innerHTML = '<div class="feedback error">Please fill in all fields.</div>';
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            feedbackDiv.innerHTML = '<div class="feedback error">Enter a valid email address.</div>';
            return;
        }

        feedbackDiv.innerHTML = '<div class="feedback success">📨 Message sent! We’ll get back to you soon.</div>';
        contactForm.reset();
        setTimeout(() => {
            feedbackDiv.innerHTML = '';
        }, 5000);
    });
}