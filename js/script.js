// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initAnimations();
    initContactForm();
    initProjectFilters();
    initCVSectionAnimations();
    initAdvancedTimelineAnimations();
    initTextRevealAnimation();
    initSmartLoading();
    initPerformanceMonitoring();
    initDarkThemeEnhancements();
    initParticleBackground();
});

// Navigation functionality
function initNavigation() {
    const header = document.getElementById('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            
            // Update active link
            navLinkItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }
    });

    // Back to top functionality
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for navigation links
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

// Scroll effects and animations
function initScrollEffects() {
    // Update active navigation link based on scroll position
    window.addEventListener('scroll', debounce(function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 10));

    // Enhanced scroll performance
    window.addEventListener('scroll', debounce(function() {
        updateScrollProgress();
        updateParallaxEffect();
    }, 10));
}

// Animation initialization
function initAnimations() {
    // Animate progress bars when they come into view
    const progressBars = document.querySelectorAll('.progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));

    // Animate elements on scroll
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe elements that need animation
    document.querySelectorAll('.hero h1, .hero p, .hero-btns').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200);
    });

    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        animateOnScroll.observe(card);
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Simple validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }

            // Simulate form submission
            showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
            contactForm.reset();
            
            // In a real application, you would send the data to a server here
            // Example:
            // fetch('/send-message', {
            //     method: 'POST',
            //     body: formData
            // }).then(response => {
            //     if (response.ok) {
            //         showFormMessage('Message sent successfully!', 'success');
            //         contactForm.reset();
            //     } else {
            //         showFormMessage('Failed to send message. Please try again.', 'error');
            //     }
            // });
        });
    }

    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';

        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Project filtering
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
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
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced scroll performance
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    let progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(135deg, var(--secondary), var(--accent));
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrolled + '%';
}

// Parallax effect for hero section
function updateParallaxEffect() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// CV Download section animation
function initCVSectionAnimations() {
    const cvSection = document.querySelector('#cv-download');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });
    
    if (cvSection) {
        observer.observe(cvSection);
    }
}

// Advanced Timeline Animations
function initAdvancedTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    
                    const content = entry.target.querySelector('.timeline-content');
                    if (content) {
                        content.style.animation = 'slideInFromSide 0.8s ease forwards';
                    }
                }, index * 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        observer.observe(item);
    });
}

// Text reveal animation
function initTextRevealAnimation() {
    const textElements = document.querySelectorAll('.timeline-content p');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target;
                const words = text.innerHTML.split(' ');
                text.innerHTML = words.map((word, index) => 
                    `<span style="animation-delay: ${index * 0.1}s" class="word-reveal">${word}</span>`
                ).join(' ');
                
                observer.unobserve(text);
            }
        });
    }, { threshold: 0.5 });
    
    textElements.forEach(element => {
        observer.observe(element);
    });
}

// Add dynamic CSS animations
function addAdvancedKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInFromSide {
            from {
                transform: translateX(-50px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes wordReveal {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .word-reveal {
            display: inline-block;
            animation: wordReveal 0.6s ease forwards;
            opacity: 0;
        }
        
        @keyframes glowPulse {
            0%, 100% {
                box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
            }
            50% {
                box-shadow: 0 0 40px rgba(6, 182, 212, 0.6);
            }
        }
        
        .timeline-content:hover {
            animation: glowPulse 2s ease-in-out infinite;
        }
        
        @keyframes backgroundShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .timeline-role {
            background: linear-gradient(270deg, var(--secondary), var(--accent), var(--secondary));
            background-size: 200% 200%;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: backgroundShift 3s ease infinite;
        }
    `;
    document.head.appendChild(style);
}

// Initialize advanced styling
addAdvancedKeyframes();

// Smart loading with skeleton screens
function initSmartLoading() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('loaded');
                element.classList.remove('skeleton');
                observer.unobserve(element);
            }
        });
    });
    
    const timelineContents = document.querySelectorAll('.timeline-content');
    timelineContents.forEach(content => {
        content.classList.add('skeleton');
        observer.observe(content);
    });
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor largest contentful paint
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            console.log('LCP candidate:', entry.startTime, entry);
        }
    });
    
    observer.observe({entryTypes: ['largest-contentful-paint']});
    
    // Monitor first input delay
    let firstInputTime = -1;
    let firstInputDelay = -1;
    
    const firstInputObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (firstInputTime < 0) {
                firstInputTime = entry.processingStart;
                firstInputDelay = firstInputTime - entry.startTime;
                console.log('First input delay:', firstInputDelay);
            }
        }
    });
    
    firstInputObserver.observe({type: 'first-input', buffered: true});
}

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', {
        message: e.message,
        source: e.filename,
        line: e.lineno,
        column: e.colno,
        error: e.error
    });
});

// Dark theme enhancements
function initDarkThemeEnhancements() {
    // Add hover glow effects to cards
    const cards = document.querySelectorAll('.skill-category, .project-card, .timeline-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 40px rgba(0, 217, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Add typing effect to hero text
    const heroText = document.querySelector('.hero h1');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    
    // Enhanced scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #00d9ff, #ff6b35);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Particle background effect
function initParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
        opacity: 0.1;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            color: Math.random() > 0.5 ? '#00d9ff' : '#ff6b35'
        };
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Connect nearby particles
            for (let i = index + 1; i < particles.length; i++) {
                const dx = particles[i].x - particle.x;
                const dy = particles[i].y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particles[i].x, particles[i].y);
                    ctx.strokeStyle = particle.color;
                    ctx.globalAlpha = 0.1;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    // Initialize particles
    for (let i = 0; i < 50; i++) {
        particles.push(createParticle());
    }
    
    resizeCanvas();
    animate();
    
    window.addEventListener('resize', resizeCanvas);
}

// Service Worker for offline functionality (if supported)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
