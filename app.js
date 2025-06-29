// Gaming Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(26, 11, 46, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 245, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(26, 11, 46, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Typewriter effect for hero subtitle
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Initialize typewriter animation
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const text = typewriterElement.getAttribute('data-text');
        setTimeout(() => {
            typeWriter(typewriterElement, text, 150);
        }, 1000);
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special handling for skill bars
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillBars(entry.target);
                }
                
                // Special handling for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 200);
                }
                
                // Special handling for project cards
                if (entry.target.classList.contains('project-card')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 300);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.timeline-item, .project-card, .skill-category, .achievement-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Animate skill bars
    function animateSkillBars(categoryElement) {
        const skillBars = categoryElement.querySelectorAll('.skill-bar');
        
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.classList.add('animate');
                const skillFill = bar.querySelector('.skill-fill');
                const level = bar.getAttribute('data-level');
                
                setTimeout(() => {
                    skillFill.style.width = level + '%';
                }, 200);
            }, index * 100);
        });
    }
    
    // Enhanced particle system
    function createParticleSystem() {
        const particlesContainer = document.querySelector('.particles-bg');
        if (!particlesContainer) return;
        
        // Create floating particles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createFloatingParticle(particlesContainer);
            }, i * 200);
        }
        
        // Continuously add new particles
        setInterval(() => {
            createFloatingParticle(particlesContainer);
        }, 3000);
    }
    
    function createFloatingParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Random properties
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 10;
        const duration = Math.random() * 10 + 15;
        const colors = ['#00f5ff', '#ff0080', '#8b5cf6'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${startX}px;
            top: ${startY}px;
            pointer-events: none;
            opacity: 0.6;
            box-shadow: 0 0 10px ${color};
            z-index: 1;
        `;
        
        container.appendChild(particle);
        
        // Animate particle
        particle.animate([
            {
                transform: `translate(0, 0) scale(0)`,
                opacity: 0
            },
            {
                transform: `translate(${Math.random() * 200 - 100}px, -${window.innerHeight + 100}px) scale(1)`,
                opacity: 0.6,
                offset: 0.1
            },
            {
                transform: `translate(${Math.random() * 400 - 200}px, -${window.innerHeight + 200}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'linear'
        }).onfinish = () => {
            particle.remove();
        };
    }
    
    // Initialize particle system
    createParticleSystem();
    
    // Gaming-style button effects
    const gamingButtons = document.querySelectorAll('.gaming-btn');
    
    gamingButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
    });
    
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.exp-card, .project-card, .achievement-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Create mailto link (since this is a static site)
            const mailtoLink = `mailto:armanbishnoi.official@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Show success animation
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<span>SENDING...</span>';
            submitButton.style.background = 'linear-gradient(45deg, #8b5cf6, #00f5ff)';
            
            setTimeout(() => {
                // Open email client
                window.location.href = mailtoLink;
                
                // Reset button
                submitButton.innerHTML = '<span>MESSAGE SENT!</span>';
                submitButton.style.background = 'linear-gradient(45deg, #00ff87, #60efff)';
                
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.style.background = 'linear-gradient(45deg, var(--gaming-accent-cyan), var(--gaming-accent-pink))';
                    this.reset();
                }, 3000);
            }, 1000);
        });
        
        // Form field focus effects
        const formControls = contactForm.querySelectorAll('.form-control');
        
        formControls.forEach(control => {
            control.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.style.borderColor = 'var(--gaming-accent-cyan)';
                this.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.5)';
            });
            
            control.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
                this.style.borderColor = 'var(--gaming-border)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // Dynamic text effects
    function createGlitchEffect(element, duration = 2000) {
        const text = element.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let iteration = 0;
        
        const interval = setInterval(() => {
            element.textContent = text
                .split('')
                .map((char, index) => {
                    if (index < iteration) {
                        return text[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            
            if (iteration >= text.length) {
                clearInterval(interval);
                element.textContent = text;
            }
            
            iteration += 1 / 3;
        }, 50);
    }
    
    // Apply glitch effect to gaming elements
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach((element, index) => {
        setTimeout(() => {
            createGlitchEffect(element);
        }, index * 500 + 2000);
    });
    
    // Cursor trail effect (gaming style)
    let mouseTrail = [];
    const maxTrailLength = 10;
    
    document.addEventListener('mousemove', function(e) {
        mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (mouseTrail.length > maxTrailLength) {
            mouseTrail.shift();
        }
        
        // Remove old trail elements
        document.querySelectorAll('.mouse-trail').forEach(trail => {
            if (Date.now() - parseInt(trail.dataset.time) > 1000) {
                trail.remove();
            }
        });
        
        // Create new trail element occasionally
        if (Math.random() < 0.3) {
            createTrailParticle(e.clientX, e.clientY);
        }
    });
    
    function createTrailParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'mouse-trail';
        particle.dataset.time = Date.now();
        
        const colors = ['#00f5ff', '#ff0080', '#8b5cf6'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: ${color};
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 9999;
            box-shadow: 0 0 10px ${color};
        `;
        
        document.body.appendChild(particle);
        
        particle.animate([
            { opacity: 0.8, transform: 'scale(1)' },
            { opacity: 0, transform: 'scale(0)' }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => {
            particle.remove();
        };
    }
    
    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateEasterEgg();
            konamiCode = [];
        }
    });
    
    function activateEasterEgg() {
        // Create matrix-style effect
        const matrixContainer = document.createElement('div');
        matrixContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            pointer-events: none;
        `;
        
        document.body.appendChild(matrixContainer);
        
        // Matrix rain effect
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createMatrixColumn(matrixContainer);
            }, i * 100);
        }
        
        // Show easter egg message
        setTimeout(() => {
            const message = document.createElement('div');
            message.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-family: var(--font-gaming);
                font-size: 2rem;
                color: var(--gaming-accent-cyan);
                text-align: center;
                z-index: 10001;
                text-shadow: 0 0 20px var(--gaming-accent-cyan);
            `;
            message.innerHTML = 'CHEAT CODE ACTIVATED!<br><span style="font-size: 1rem;">Level Up! 🎮</span>';
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                matrixContainer.remove();
                message.remove();
            }, 3000);
        }, 2000);
        
        setTimeout(() => {
            matrixContainer.remove();
        }, 5000);
    }
    
    function createMatrixColumn(container) {
        const column = document.createElement('div');
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        
        column.style.cssText = `
            position: absolute;
            top: -100px;
            left: ${Math.random() * 100}%;
            font-family: monospace;
            font-size: 14px;
            color: #00ff00;
            white-space: pre;
            pointer-events: none;
            text-shadow: 0 0 5px #00ff00;
        `;
        
        // Generate random characters for the column
        let columnText = '';
        for (let i = 0; i < 20; i++) {
            columnText += chars[Math.floor(Math.random() * chars.length)] + '\n';
        }
        column.textContent = columnText;
        
        container.appendChild(column);
        
        column.animate([
            { transform: 'translateY(-100px)', opacity: 0 },
            { transform: 'translateY(0px)', opacity: 1, offset: 0.1 },
            { transform: `translateY(${window.innerHeight + 100}px)`, opacity: 0 }
        ], {
            duration: 3000,
            easing: 'linear'
        }).onfinish = () => {
            column.remove();
        };
    }
    
    // Performance optimization: Throttle scroll events
    function throttle(func, wait) {
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
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    const parallaxElements = document.querySelectorAll('.particles-bg');
    
    const handleParallax = throttle((scrollTop) => {
        if (heroSection && scrollTop < window.innerHeight) {
            const speed = scrollTop * 0.5;
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${speed}px)`;
            });
        }
    }, 16);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        handleParallax(scrollTop);
    });
    
    // Initialize stats counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const suffix = counter.textContent.replace(/\d/g, '');
            let current = 0;
            const increment = target / 50;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                }
            };
            
            updateCounter();
        });
    }
    
    // Trigger counter animation when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateCounters, 2000);
                heroObserver.unobserve(entry.target);
            }
        });
    });
    
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    // Add loading screen fade out
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Start hero animations
        setTimeout(() => {
            const heroTitle = document.querySelector('.hero-title');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            const heroDescription = document.querySelector('.hero-description');
            const heroButtons = document.querySelector('.hero-buttons');
            
            if (heroTitle) heroTitle.style.animation = 'fadeInUp 1s ease forwards';
            if (heroSubtitle) setTimeout(() => heroSubtitle.style.animation = 'fadeInUp 1s ease forwards', 200);
            if (heroDescription) setTimeout(() => heroDescription.style.animation = 'fadeInUp 1s ease forwards', 400);
            if (heroButtons) setTimeout(() => heroButtons.style.animation = 'fadeInUp 1s ease forwards', 600);
        }, 500);
    });
    
    console.log('🎮 Gaming Portfolio Loaded Successfully!');
    console.log('💡 Try the Konami Code for a surprise!');
    console.log('⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA');
});

// Additional utility functions
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

// Error handling for missing elements
window.addEventListener('error', function(e) {
    console.warn('Non-critical error:', e.message);
});

// Prevent context menu on gaming elements (optional enhancement)
document.querySelectorAll('.gaming-btn, .project-card, .exp-card').forEach(element => {
    element.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        
        // Show custom context menu style notification
        const notification = document.createElement('div');
        notification.textContent = 'Gaming Mode Activated! 🎮';
        notification.style.cssText = `
            position: fixed;
            top: ${e.clientY}px;
            left: ${e.clientX}px;
            background: linear-gradient(45deg, var(--gaming-accent-cyan), var(--gaming-accent-pink));
            color: var(--gaming-primary);
            padding: 0.5rem 1rem;
            border-radius: 5px;
            font-family: var(--font-gaming);
            font-size: 0.8rem;
            font-weight: 700;
            z-index: 10000;
            pointer-events: none;
            box-shadow: 0 0 15px rgba(0, 245, 255, 0.5);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 1500);
    });
});