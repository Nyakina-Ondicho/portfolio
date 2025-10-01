// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initSkillBars();
    initProjectFilter();
    initContactForm();
    initAnimations();
    initBackToTop();
    initHeroAnimations();
});

// Navigation functionality
function initNavigation() {
    const header = document.getElementById('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;

        // Header background on scroll
        if (scrollPosition > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active nav link
        const sections = document.querySelectorAll('section');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    });
}

// Hero section animations
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero h1');
    const heroText = document.querySelector('.hero p');
    const heroButtons = document.querySelector('.hero-btns');

    // Animate hero elements with delay
    setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
        heroTitle.style.transition = 'all 0.8s ease';
    }, 300);

    setTimeout(() => {
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateY(0)';
        heroText.style.transition = 'all 0.8s ease';
    }, 600);

    setTimeout(() => {
        heroButtons.style.opacity = '1';
        heroButtons.style.transform = 'translateY(0)';
        heroButtons.style.transition = 'all 0.8s ease';
    }, 900);
}

// Scroll effects and animations
function initScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Skill bars animation
function initSkillBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                setTimeout(() => {
                    progressBar.style.width = `${width}%`;
                }, 300);
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Project filtering
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 100);
                } else {
                    card.classList.remove('visible');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Initialize all projects as visible
    setTimeout(() => {
        projectCards.forEach(card => {
            card.classList.add('visible');
        });
    }, 500);
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        showFormMessage('Sending your message...', 'success');
        
        // In a real application, you would send the data to a server here
        setTimeout(() => {
            showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
            contactForm.reset();
        }, 2000);
    });

    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Scroll animations
function initAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const projectCards = document.querySelectorAll('.project-card');
    const skillCategories = document.querySelectorAll('.skill-category');
    const aboutContent = document.querySelector('.about-content');
    const contactContainer = document.querySelector('.contact-container');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe timeline items
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Observe project cards
    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Observe skill categories
    skillCategories.forEach(category => {
        observer.observe(category);
    });

    // Observe about content
    if (aboutContent) {
        observer.observe(aboutContent);
    }

    // Observe contact container
    if (contactContainer) {
        observer.observe(contactContainer);
    }
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Typing effect for hero section
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    let charIndex = 0;
    
    heroTitle.textContent = '';
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            heroTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect when hero section is in view
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                heroObserver.unobserve(entry.target);
            }
        });
    });
    
    heroObserver.observe(document.querySelector('.hero'));
}

// Add CSS animation keyframes dynamically
function addKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            60% {
                transform: translateY(-5px);
            }
        }
        
        .bounce {
            animation: bounce 2s infinite;
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
    `;
    document.head.appendChild(style);
}

// Initialize additional features
addKeyframes();

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add subtle animations to elements after load
    setTimeout(() => {
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach((category, index) => {
            setTimeout(() => {
                category.classList.add('pulse');
            }, index * 200);
        });
    }, 1000);
});

// Utility function for debouncing
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Enhanced scroll performance
window.addEventListener('scroll', debounce(function() {
    // Any scroll-based calculations that don't need to run on every scroll
}, 10));

// Project card hover effects
function initProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize project hover effects
initProjectHoverEffects();

// Counter animation for statistics (optional)
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Console greeting (optional)
console.log(`
    Welcome to Ondicho Nyakina's Portfolio!
    
    👨‍💻 IT Professional | Network Administration | Cybersecurity
    📧 Contact: ondicho.nyakina@example.com
    📍 Location: Nairobi, Kenya
    
    Thank you for visiting! Feel free to explore the code.
    
    Features included:
    ✅ Responsive Design
    ✅ Smooth Animations
    ✅ Project Filtering
    ✅ Contact Form Validation
    ✅ Interactive Navigation
    ✅ Skill Progress Bars
    ✅ Back to Top Button
`);

// Theme switcher (optional enhancement)
function initThemeSwitcher() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        background: var(--secondary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
            // You would add dark theme CSS variables here
        } else {
            icon.className = 'fas fa-moon';
        }
    });
}

// Uncomment the line below to enable theme switcher
// initThemeSwitcher();

// Form input enhancements
function initFormEnhancements() {
    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Add real-time validation
        input.addEventListener('input', function() {
            if (this.type === 'email' && this.value) {
                if (isValidEmail(this.value)) {
                    this.style.borderColor = 'var(--success)';
                } else {
                    this.style.borderColor = 'var(--accent)';
                }
            }
        });
    });
}

// Initialize form enhancements
initFormEnhancements();

// Mobile touch improvements
function initTouchImprovements() {
    // Improve touch experience for mobile devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add touch-specific improvements
        const links = document.querySelectorAll('a, button');
        links.forEach(link => {
            link.style.cursor = 'pointer';
        });
    }
}

// Initialize touch improvements
initTouchImprovements();

// Performance monitoring (optional)
function initPerformanceMonitoring() {
    // Log page load performance
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}

// Initialize performance monitoring
initPerformanceMonitoring();