// Background Animation
class BackgroundAnimation {
    constructor() {
        this.canvas = document.getElementById('backgroundCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.time = 0;
        
        this.init();
        this.bindEvents();
        this.animate();
    }
    
    init() {
        this.resize();
        this.createParticles();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = Math.min(window.innerWidth / 20, 50);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.1,
                type: Math.random() > 0.7 ? 'circle' : 'square',
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02
            });
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = this.canvas.width / 2;
            this.mouse.y = this.canvas.height / 2;
        });
    }
    
    drawParticle(particle) {
        this.ctx.save();
        this.ctx.globalAlpha = particle.opacity;
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate(particle.rotation);
        
        if (particle.type === 'circle') {
            this.ctx.beginPath();
            this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = '#fff';
            this.ctx.fill();
        } else {
            this.ctx.fillStyle = '#fff';
            this.ctx.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
        }
        
        this.ctx.restore();
    }
    
    drawConnections() {
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.rotation += particle.rotationSpeed;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.x -= dx * force * 0.01;
                particle.y -= dy * force * 0.01;
            }
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY *= -1;
            }
            
            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        });
    }
    
    animate() {
        this.time += 0.01;
        
        // Clear canvas with fade effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        this.drawConnections();
        
        // Update and draw particles
        this.updateParticles();
        this.particles.forEach(particle => this.drawParticle(particle));
        
        // Add subtle wave effect
        this.ctx.save();
        this.ctx.globalAlpha = 0.1;
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 2;
        
        for (let i = 0; i < 3; i++) {
            this.ctx.beginPath();
            for (let x = 0; x < this.canvas.width; x += 10) {
                const y = this.canvas.height / 2 + 
                         Math.sin(x * 0.01 + this.time + i) * 50 +
                         Math.sin(x * 0.005 + this.time * 0.5) * 30;
                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.stroke();
        }
        this.ctx.restore();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Interactive elements
class InteractiveElements {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupButtonAnimation();
        this.setupScrollEffects();
        this.setupTypingEffect();
    }
    
    setupButtonAnimation() {
        const button = document.querySelector('.cta-button');
        if (!button) return;
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Show notification
            this.showNotification('Thanks! We\'ll notify you when we launch.');
        });
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

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
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
    new BackgroundAnimation();
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