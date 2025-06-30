// Anime-themed portfolio JavaScript with interactive effects

// Projects data
const projectsData = [
    {
        id: 1,
        title: "creater29.github.io",
        description: "Personal portfolio website with anime-themed design elements. Crafted with the same attention to detail as the magic circles in Black Clover.",
        tech_stack: ["HTML", "CSS", "JavaScript"],
        category: "web",
        github_url: "https://github.com/creater29/creater29.github.io",
        demo_url: "https://creater29.github.io",
        featured: true
    },
    {
        id: 2,
        title: "Adaptive AI Boss",
        description: "AI-powered game boss system with adaptive combat strategies using machine learning for dynamic difficulty adjustment.",
        tech_stack: ["C#", "Unity", "Machine Learning", "Pattern Recognition"],
        category: "ai",
        github_url: "https://github.com/creater29/Adaptive-AI-Boss",
        featured: true
    },
    {
        id: 3,
        title: "DialogFlow Chatbot",
        description: "Conversational food ordering chatbot with Python backend API and FastAPI for complete order lifecycle management.",
        tech_stack: ["Python", "FastAPI", "MySQL", "Dialogflow"],
        category: "ai",
        github_url: "https://github.com/creater29/DialogFlow-Chatbot",
        featured: true
    },
    {
        id: 4,
        title: "Placed - Job Aggregation Platform",
        description: "Job aggregation platform with ML pipeline using Random Forest to classify job experience levels and extract technical skills.",
        tech_stack: ["Python", "FastAPI", "MongoDB", "Scikit-learn"],
        category: "ai",
        github_url: "https://github.com/creater29/Placed",
        featured: true
    },
    {
        id: 5,
        title: "AWS Inventory System",
        description: "Developed a serverless solution using AWS Lambda to automate data retrieval from 20 AWS services, processing over 1500 records daily and reducing manual audit time by 80%.",
        tech_stack: ["AWS Lambda", "DynamoDB", "AWS EventBridge"],
        category: "web",
        featured: false
    },
    {
        id: 6,
        title: "Landmark Detection System",
        description: "Computer vision system for landmark recognition and classification using deep learning techniques.",
        tech_stack: ["Python", "TensorFlow", "OpenCV", "Deep Learning"],
        category: "ai",
        github_url: "https://github.com/creater29/Landmark-Detection",
        featured: false
    },
    {
        id: 7,
        title: "Customer Churn Prediction",
        description: "Machine learning model to predict customer churn with advanced feature engineering and model optimization.",
        tech_stack: ["Python", "Pandas", "Scikit-learn", "Data Visualization"],
        category: "data",
        github_url: "https://github.com/creater29/Customer-Churn-Prediction",
        featured: false
    },
    {
        id: 8,
        title: "High-Performance TSP Solver",
        description: "Advanced graph algorithms implementation for solving Traveling Salesman Problem with optimization techniques.",
        tech_stack: ["C++", "Graph Algorithms", "Optimization", "Data Structures"],
        category: "algorithm",
        github_url: "https://github.com/creater29/High-Performance-TSP-Solver-Using-Advanced-Graph-Algorithms",
        featured: false
    },
    {
        id: 9,
        title: "Pathfinding Visualizer",
        description: "Interactive visualization tool for pathfinding algorithms including A*, Dijkstra, and BFS with real-time animation.",
        tech_stack: ["Python", "Pygame", "Algorithms", "Visualization"],
        category: "algorithm",
        github_url: "https://github.com/creater29/pathfinding-visualizer",
        featured: false
    }
];

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initTypingAnimation();
    initParticles();
    initProjectFilters();
    initScrollAnimations();
    initContactForm();
    renderProjects('all');
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    });
}

// Typing animation for hero section
function initTypingAnimation() {
    const typingText = document.getElementById('typingText');
    const text = 'Arman Bishnoi';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
        }
    }

    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
}

// Particle system for background effects
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position and animation
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Project filtering functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            renderProjects(filter);
        });
    });
}

// Render projects based on filter
function renderProjects(filter) {
    const projectsGrid = document.getElementById('projectsGrid');
    let filteredProjects = projectsData;

    if (filter !== 'all') {
        filteredProjects = projectsData.filter(project => project.category === filter);
    }

    projectsGrid.innerHTML = '';

    filteredProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });

    // Add stagger animation
    const cards = projectsGrid.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'fadeInUp 0.6s ease forwards';
    });
}

// Create project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);

    const techStackHTML = project.tech_stack.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    const linksHTML = `
        <div class="project-links">
            ${project.github_url ? `<a href="${project.github_url}" target="_blank" class="project-link">GitHub</a>` : ''}
            ${project.demo_url ? `<a href="${project.demo_url}" target="_blank" class="project-link">Live Demo</a>` : ''}
        </div>
    `;

    card.innerHTML = `
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="tech-stack">${techStackHTML}</div>
        ${linksHTML}
    `;

    return card;
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.about, .skills, .experience, .projects, .contact');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(item);
    });

    // Animate skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'scale(0.9)';
        category.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(category);
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.lightning-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Add CSS animation classes
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
    
    .project-card {
        opacity: 0;
        transform: translateY(30px);
    }
    
    /* Additional hover effects for interactive elements */
    .skill-tag:hover {
        animation: pulse 0.6s ease-in-out;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .timeline-card:hover {
        animation: glow 2s ease-in-out infinite;
    }
    
    .character-img:hover {
        animation: bounce 1s ease-in-out;
    }
    
    @keyframes bounce {
        0%, 20%, 60%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        80% { transform: translateY(-5px); }
    }
    
    /* Lightning effect for buttons */
    .lightning-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
    }
    
    .lightning-btn:hover::before {
        left: 100%;
    }
    
    /* Magic circle additional animations */
    .magic-circle:hover {
        animation: magicCircle 2s linear infinite, glow 1s ease-in-out infinite;
    }
    
    /* Floating animation for Rimuru */
    .rimuru-float:hover {
        animation: float 2s ease-in-out infinite, glow 1s ease-in-out infinite;
    }
    
    /* Zoro image special effects */
    .zoro-img:hover {
        filter: drop-shadow(0 0 20px #00ff00);
        animation: pulse 1s ease-in-out infinite;
    }
    
    /* Kirito image special effects */
    .kirito-img:hover {
        filter: drop-shadow(0 0 30px #00bfff);
        transform: scale(1.05);
    }
    
    /* Enhanced nav link effects */
    .nav-link:hover {
        animation: glow 0.5s ease-in-out;
    }
    
    /* Project card enhanced hover */
    .project-card:hover .project-title {
        animation: glow 1s ease-in-out infinite;
    }
    
    /* Stat card hover animation */
    .stat-card:hover .stat-number {
        animation: bounce 1s ease-in-out;
    }
    
    /* Contact form focus effects */
    .form-control:focus {
        animation: glow 0.5s ease-in-out;
    }
    
    /* Footer lightning enhanced */
    .zenitsu-footer:hover {
        opacity: 0.6 !important;
        animation: lightning 1s ease-in-out infinite;
    }
`;

document.head.appendChild(style);

// Add scroll-to-top functionality
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show/hide scroll-to-top button (if you want to add one)
    if (scrollTop > 300) {
        // Add scroll-to-top button logic here if needed
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Debounce scroll events
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
});

// Initialize particles with random colors
function enhanceParticles() {
    const particles = document.querySelectorAll('.particle');
    const colors = ['#FFD700', '#FFA500', '#FF6B35', '#F7931E'];
    
    particles.forEach(particle => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = randomColor;
        particle.style.boxShadow = `0 0 10px ${randomColor}`;
    });
}

// Call enhance particles after DOM is loaded
setTimeout(enhanceParticles, 1000);