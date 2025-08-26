// Background Image Interactive Effect
class BackgroundEffect {
    constructor() {
        this.bgImage = document.querySelector('.bg-image');
        this.motionOverlay = document.querySelector('.motion-blur-overlay');
        this.time = 0;
        
        this.init();
        this.animate();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        window.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });
        
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    handleMouseMove(e) {
        if (!this.bgImage) return;
        
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        this.bgImage.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
    }
    
    handleResize() {
        // Reset any transforms on resize
        if (this.bgImage) {
            this.bgImage.style.transform = '';
        }
    }
    
    animate() {
        this.time += 0.01;
        
        // Add subtle parallax effect
        if (this.motionOverlay) {
            const parallaxX = Math.sin(this.time * 0.5) * 5;
            this.motionOverlay.style.transform = `translateX(${parallaxX}px) skewX(-15deg)`;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Interactive elements
class InteractiveElements {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupScrollEffects();
        this.setupTypingEffect();
    }
    
    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                }
            });
        }, observerOptions);
        
        // Observe elements for scroll animations
        document.querySelectorAll('.hero-content, .footer').forEach(el => {
            observer.observe(el);
        });
    }
    
    setupTypingEffect() {
        const title = document.querySelector('.hero-title');
        if (!title) return;
        
        // Add cursor effect to the last line
        const lastLine = title.querySelector('.title-line:last-child');
        if (lastLine) {
            lastLine.innerHTML += '<span class="cursor">|</span>';
            
            // Animate cursor
            setInterval(() => {
                const cursor = lastLine.querySelector('.cursor');
                if (cursor) {
                    cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                }
            }, 500);
        }
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #fff;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-family: 'Figtree', sans-serif;
            font-size: 0.9rem;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Add CSS for cursor animation
const style = document.createElement('style');
style.textContent = `
    .cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BackgroundEffect();
    new InteractiveElements();
    
    // Add loading class to body
    document.body.classList.add('loaded');
});

// Performance optimization
let ticking = false;
function updateOnScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Handle scroll-based animations here if needed
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateOnScroll); 