// Initialize EmailJS
(function() {
    emailjs.init("l494XHIruANfsj4Sd"); // Replace with your EmailJS user ID
})();

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navigationLinks = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.clientHeight;
            if (sectionTop <= 150 && sectionTop + sectionHeight > 150) {
                current = section.getAttribute('id');
            }
        });

        navigationLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Navbar background change on scroll
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-white/95');
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const buttonText = document.getElementById('button-text');
    const loadingIcon = document.getElementById('loading-icon');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        buttonText.textContent = 'Sending...';
        loadingIcon.classList.remove('hidden');
        contactForm.querySelector('button[type="submit"]').disabled = true;

        // Get form data
        const formData = new FormData(contactForm);
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_email: 'rohitmauryaeh@gmail.com' // Replace with your email
        };

        // Send email using EmailJS
        emailjs.send('service_v2914nh', 'template_e4sagvu', templateParams)
            .then(function(response) {
                // Success
                showMessage('success', 'Message sent successfully! I\'ll get back to you soon.');
                contactForm.reset();
            })
            .catch(function(error) {
                // Error
                console.error('EmailJS error:', error);
                showMessage('error', 'Oops! Something went wrong. Please try again or contact me directly.');
            })
            .finally(function() {
                // Reset button state
                buttonText.textContent = 'Send Message';
                loadingIcon.classList.add('hidden');
                contactForm.querySelector('button[type="submit"]').disabled = false;
            });
    });

    function showMessage(type, message) {
        formMessage.className = `mt-4 p-4 rounded-lg slide-in ${type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`;
        formMessage.textContent = message;
        formMessage.classList.remove('hidden');
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    }

    // Form validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', function() {
            if (this.classList.contains('form-error')) {
                validateField.call(this);
            }
        });
    });

    function validateField() {
        const value = this.value.trim();
        let isValid = true;

        // Remove previous validation classes
        this.classList.remove('form-error', 'form-success');

        // Validate based on field type
        switch (this.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                break;
            case 'text':
            case 'textarea':
                isValid = value.length >= 2;
                break;
            default:
                isValid = value.length > 0;
        }

        // Add validation class
        if (isValid && value.length > 0) {
            this.classList.add('form-success');
        } else if (!isValid && value.length > 0) {
            this.classList.add('form-error');
        }

        return isValid;
    }

    // Typing animation for hero section
    const heroText = document.querySelector('#home h2');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('#home');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Tech icons animation on hover
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Project cards tilt effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Scroll to top functionality
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTop.className = 'fixed bottom-8 right-8 bg-primary text-white w-12 h-12 rounded-full shadow-lg hover:bg-secondary transition-all duration-300 z-40 opacity-0 pointer-events-none';
    scrollToTop.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTop);

    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTop.classList.remove('opacity-0', 'pointer-events-none');
            scrollToTop.classList.add('opacity-100');
        } else {
            scrollToTop.classList.add('opacity-0', 'pointer-events-none');
            scrollToTop.classList.remove('opacity-100');
        }
    });

    // Preloader (optional)
    const preloader = document.createElement('div');
    preloader.className = 'fixed inset-0 bg-white z-50 flex items-center justify-center';
    preloader.innerHTML = `
        <div class="text-center">
            <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p class="text-gray-600">Loading...</p>
        </div>
    `;
    
    // Remove preloader after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (document.body.contains(preloader)) {
                preloader.remove();
            }
        }, 500);
    });

    // Add preloader to body
    document.body.prepend(preloader);

    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('opacity-0');
                img.classList.add('opacity-100');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        imageObserver.observe(img);
    });

    // Add floating animation to hero image
    const heroImage = document.querySelector('#home img');
    if (heroImage) {
        heroImage.classList.add('floating');
    }

    // Console message for developers
    console.log('%c👋 Hello Developer!', 'color: #3B82F6; font-size: 24px; font-weight: bold;');
    console.log('%cThis website was built by Rohit Maurya using HTML5, Tailwind CSS, and Vanilla JavaScript.', 'color: #666; font-size: 14px;');
    console.log('%cInterested in working together? Contact me at rohit.maurya@example.com', 'color: #666; font-size: 14px;');
});

// EmailJS Configuration Instructions
/*
To set up EmailJS for the contact form:

1. Go to https://www.emailjs.com/ and create a free account
2. Create a new email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - {{from_name}}
   - {{from_email}}
   - {{subject}}
   - {{message}}
   - {{to_email}}
4. Replace the following in this file:
   - YOUR_EMAILJS_USER_ID with your EmailJS user ID
   - YOUR_SERVICE_ID with your service ID
   - YOUR_TEMPLATE_ID with your template ID
5. Update the to_email in templateParams to your actual email address

Example template:
Subject: New message from {{from_name}} - {{subject}}

Hello Rohit,

You have received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

Best regards,
Portfolio Contact Form
*/