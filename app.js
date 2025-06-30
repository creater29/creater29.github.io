// Particle System
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.resize();
    this.init();
    
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  init() {
    // Create particles
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: this.getRandomColor()
      });
    }
    
    this.animate();
  }
  
  getRandomColor() {
    const colors = ['#4A90E2', '#87CEEB', '#FFD700', '#00BFFF', '#FF8C00'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around screen
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fill();
      
      // Add glow effect
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = particle.color;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });
    
    // Draw connections
    this.drawConnections();
    
    requestAnimationFrame(() => this.animate());
  }
  
  drawConnections() {
    this.particles.forEach((particle, i) => {
      this.particles.slice(i + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.strokeStyle = `rgba(74, 144, 226, ${0.2 * (1 - distance / 100)})`;
          this.ctx.stroke();
        }
      });
    });
  }
}

// Navigation functionality
class Navigation {
  constructor() {
    this.nav = document.getElementById('navbar');
    this.navToggle = document.getElementById('nav-toggle');
    this.navMenu = document.getElementById('nav-menu');
    this.navLinks = document.querySelectorAll('.nav__link');
    
    this.init();
  }
  
  init() {
    // Mobile menu toggle
    this.navToggle.addEventListener('click', () => {
      this.navMenu.classList.toggle('active');
      this.navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
      });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        this.nav.classList.add('nav--scrolled');
      } else {
        this.nav.classList.remove('nav--scrolled');
      }
      
      this.updateActiveLink();
    });
    
    // Initial active link update
    this.updateActiveLink();
  }
  
  updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        this.navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

// Smooth scrolling
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offsetTop = section.offsetTop - 70; // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// Animation on Scroll (AOS-like functionality)
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('[data-aos]');
    this.init();
  }
  
  init() {
    this.observeElements();
    window.addEventListener('scroll', () => this.checkElements());
    
    // Initial check
    this.checkElements();
  }
  
  observeElements() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      this.elements.forEach(element => {
        observer.observe(element);
      });
    }
  }
  
  checkElements() {
    this.elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        this.animateElement(element);
      }
    });
  }
  
  animateElement(element) {
    const delay = element.getAttribute('data-aos-delay') || 0;
    
    setTimeout(() => {
      element.classList.add('aos-animate');
    }, parseInt(delay));
  }
}

// Form handling
class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.init();
  }
  
  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    
    // Validate form data
    if (!data.name || !data.email || !data.message) {
      this.showFormMessage('Please fill in all fields.', 'error');
      return;
    }
    
    // Show loading state
    const submitButton = this.form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate sending (in real app, you'd send to a server)
    setTimeout(() => {
      this.showFormMessage('✨ Message sent successfully! I\'ll get back to you soon like a true nakama! ✨', 'success');
      this.form.reset();
      
      // Reset button
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 1500);
  }
  
  showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = this.form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create new message
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message--${type}`;
    messageEl.textContent = message;
    
    this.form.appendChild(messageEl);
    
    // Auto remove success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        if (messageEl.parentNode) {
          messageEl.style.opacity = '0';
          setTimeout(() => {
            if (messageEl.parentNode) {
              messageEl.remove();
            }
          }, 300);
        }
      }, 5000);
    }
  }
}

// Project buttons handling
class ProjectButtons {
  constructor() {
    this.init();
  }
  
  init() {
    // Handle live demo buttons
    const liveDemoButtons = document.querySelectorAll('.project-card__actions .btn--primary');
    liveDemoButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectTitle = button.closest('.project-card').querySelector('.project-card__title').textContent;
        this.showProjectDemo(projectTitle);
      });
    });
    
    // Handle source code buttons
    const sourceButtons = document.querySelectorAll('.project-card__actions .btn--outline');
    sourceButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectTitle = button.closest('.project-card').querySelector('.project-card__title').textContent;
        this.showSourceCode(projectTitle);
      });
    });
  }
  
  showProjectDemo(projectTitle) {
    this.showProjectMessage(`🚀 ${projectTitle} demo would open here! This is a portfolio showcase.`, 'demo');
  }
  
  showSourceCode(projectTitle) {
    this.showProjectMessage(`💻 ${projectTitle} source code would open here! Check out my GitHub for real projects.`, 'source');
  }
  
  showProjectMessage(message, type) {
    const messageEl = document.createElement('div');
    messageEl.className = 'project-message';
    messageEl.innerHTML = `
      <div class="project-message__content">
        <p>${message}</p>
        <button class="btn btn--sm btn--primary" onclick="this.parentElement.parentElement.remove()">
          Got it!
        </button>
      </div>
    `;
    messageEl.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(30, 30, 30, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      backdrop-filter: blur(10px);
    `;
    
    const contentStyle = `
      background: linear-gradient(145deg, rgba(74, 144, 226, 0.1) 0%, rgba(135, 206, 235, 0.1) 100%);
      padding: 32px;
      border-radius: 12px;
      border: 1px solid #00BFFF;
      text-align: center;
      max-width: 500px;
      margin: 0 16px;
      backdrop-filter: blur(10px);
    `;
    
    messageEl.querySelector('.project-message__content').style.cssText = contentStyle;
    
    document.body.appendChild(messageEl);
    
    // Add click outside to close
    messageEl.addEventListener('click', (e) => {
      if (e.target === messageEl) {
        messageEl.remove();
      }
    });
  }
}

// Typing effect for hero section
class TypingEffect {
  constructor(element, text, speed = 100) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.index = 0;
    
    if (this.element) {
      this.element.textContent = '';
      this.type();
    }
  }
  
  type() {
    if (this.index < this.text.length) {
      this.element.textContent += this.text.charAt(this.index);
      this.index++;
      setTimeout(() => this.type(), this.speed);
    }
  }
}

// Magic circle animations
class MagicCircles {
  constructor() {
    this.circles = document.querySelectorAll('.magic-circle');
    this.init();
  }
  
  init() {
    // Add random animation delays to magic circles
    this.circles.forEach((circle, index) => {
      const delay = Math.random() * 5;
      circle.style.animationDelay = `${delay}s`;
      
      // Add hover effects
      circle.addEventListener('mouseenter', () => {
        circle.style.borderColor = '#FFD700';
        circle.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.6)';
      });
      
      circle.addEventListener('mouseleave', () => {
        circle.style.borderColor = '#00BFFF';
        circle.style.boxShadow = 'none';
      });
    });
  }
}

// Skill tags animation
class SkillTags {
  constructor() {
    this.tags = document.querySelectorAll('.skill-tag');
    this.init();
  }
  
  init() {
    this.tags.forEach((tag, index) => {
      // Stagger animation
      tag.style.animationDelay = `${index * 0.1}s`;
      
      // Add random hover effects
      tag.addEventListener('mouseenter', () => {
        const colors = ['#FFD700', '#00BFFF', '#FF8C00', '#00893F'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        tag.style.boxShadow = `0 0 20px ${randomColor}`;
      });
      
      tag.addEventListener('mouseleave', () => {
        tag.style.boxShadow = '';
      });
    });
  }
}

// Loading screen
class LoadingScreen {
  constructor() {
    this.createLoadingScreen();
  }
  
  createLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'loading-screen';
    loader.innerHTML = `
      <div class="loader">
        <div class="magic-circle magic-circle--loader"></div>
        <div class="loader-text">Loading Adventure...</div>
      </div>
    `;
    loader.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #9E1B34 0%, #0071C0 50%, #4A90E2 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      transition: opacity 0.5s ease;
    `;
    
    const loaderStyle = `
      .loader {
        text-align: center;
        color: white;
      }
      .magic-circle--loader {
        width: 100px;
        height: 100px;
        border: 3px solid #00BFFF;
        margin: 0 auto 20px;
        animation: rotate 2s linear infinite;
      }
      .loader-text {
        font-size: 18px;
        font-weight: 500;
        animation: fadeInOut 2s ease-in-out infinite;
      }
      @keyframes fadeInOut {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = loaderStyle;
    document.head.appendChild(style);
    
    document.body.appendChild(loader);
    
    // Remove loading screen after page loads
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(loader)) {
            document.body.removeChild(loader);
          }
          if (document.head.contains(style)) {
            document.head.removeChild(style);
          }
        }, 500);
      }, 1000);
    });
  }
}

// Easter egg - Konami code
class EasterEgg {
  constructor() {
    this.konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];
    this.userInput = [];
    this.init();
  }
  
  init() {
    document.addEventListener('keydown', (e) => {
      this.userInput.push(e.code);
      
      if (this.userInput.length > this.konamiCode.length) {
        this.userInput.shift();
      }
      
      if (this.userInput.join(',') === this.konamiCode.join(',')) {
        this.activateEasterEgg();
        this.userInput = [];
      }
    });
  }
  
  activateEasterEgg() {
    // Add special anime effects
    document.body.style.filter = 'hue-rotate(180deg)';
    
    const message = document.createElement('div');
    message.textContent = '🎌 Ultra Instinct Mode Activated! 🎌';
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(45deg, #FFD700, #FF8C00);
      color: #1E1E1E;
      padding: 20px 40px;
      border-radius: 10px;
      font-size: 24px;
      font-weight: bold;
      z-index: 10001;
      animation: pulse 1s ease-in-out infinite;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
      document.body.style.filter = '';
      if (document.body.contains(message)) {
        document.body.removeChild(message);
      }
    }, 3000);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize loading screen first
  new LoadingScreen();
  
  // Initialize particle system
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    new ParticleSystem(canvas);
  }
  
  // Initialize navigation
  new Navigation();
  
  // Initialize scroll animations
  new ScrollAnimations();
  
  // Initialize contact form
  new ContactForm();
  
  // Initialize project buttons
  new ProjectButtons();
  
  // Initialize magic circles
  new MagicCircles();
  
  // Initialize skill tags
  new SkillTags();
  
  // Initialize easter egg
  new EasterEgg();
  
  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add typing effect to hero subtitle (after loading screen)
  setTimeout(() => {
    const heroSubtitle = document.querySelector('.hero__subtitle');
    if (heroSubtitle) {
      const originalText = heroSubtitle.textContent;
      new TypingEffect(heroSubtitle, originalText, 150);
    }
  }, 2000);
  
  // Add parallax effect to hero background
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    const heroBackground = document.querySelector('.hero__background');
    
    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
  });
  
  // Add random sparkle effects
  setInterval(() => {
    createSparkle();
  }, 2000);
});

// Utility functions
function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.cssText = `
    position: fixed;
    width: 4px;
    height: 4px;
    background: #FFD700;
    border-radius: 50%;
    pointer-events: none;
    z-index: 1000;
    left: ${Math.random() * window.innerWidth}px;
    top: ${Math.random() * window.innerHeight}px;
    animation: sparkleAnimation 2s ease-out forwards;
  `;
  
  const sparkleStyle = `
    @keyframes sparkleAnimation {
      0% {
        opacity: 0;
        transform: scale(0);
      }
      50% {
        opacity: 1;
        transform: scale(1);
        box-shadow: 0 0 10px #FFD700;
      }
      100% {
        opacity: 0;
        transform: scale(0);
      }
    }
  `;
  
  if (!document.querySelector('#sparkle-styles')) {
    const style = document.createElement('style');
    style.id = 'sparkle-styles';
    style.textContent = sparkleStyle;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(sparkle);
  
  setTimeout(() => {
    if (document.body.contains(sparkle)) {
      document.body.removeChild(sparkle);
    }
  }, 2000);
}

// Export scroll function for button clicks
window.scrollToSection = scrollToSection;