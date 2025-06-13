document.addEventListener('DOMContentLoaded', function() {

    initWindowControls();
    initSidebar();
    initTestimonialSlider();
    addSmoothScrolling();
    addAnimations();
    

    const discordButton = document.querySelector('.primary-button');
    if (discordButton) {
        discordButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://discord.com/users/1333972569014931466', '_blank');
        });
    }
});


function initWindowControls() {


    
    makeResizable(document.querySelector('.mac-window'));
    

    const closeButton = document.querySelector('.window-button.close');
    const minimizeButton = document.querySelector('.window-button.minimize');
    const maximizeButton = document.querySelector('.window-button.maximize');
    
    closeButton.addEventListener('click', function() {
        const macWindow = document.querySelector('.mac-window');
        macWindow.style.transform = 'scale(0.95)';
        macWindow.style.opacity = '0';
        setTimeout(() => {
            macWindow.style.display = 'none';

            const message = document.createElement('div');
            message.className = 'demo-message';
            message.innerHTML = `
                <div class="demo-content">
                    <h2>Mac OS Demo</h2>
                    <p>This is a demonstration of the incorp interface. In a real application, this would close the window.</p>
                    <button id="reopen-window">Reopen Window</button>
                </div>
            `;
            document.body.appendChild(message);
            
            document.getElementById('reopen-window').addEventListener('click', function() {
                document.body.removeChild(message);
                macWindow.style.display = 'flex';
                setTimeout(() => {
                    macWindow.style.transform = 'scale(1)';
                    macWindow.style.opacity = '1';
                }, 10);
            });
        }, 300);
    });
    
    minimizeButton.addEventListener('click', function() {
        const macWindow = document.querySelector('.mac-window');
        macWindow.style.transform = 'scale(0.95) translateY(20px)';
        macWindow.style.opacity = '0';
        setTimeout(() => {
            macWindow.style.display = 'none';

            const message = document.createElement('div');
            message.className = 'demo-message';
            message.innerHTML = `
                <div class="demo-content">
                    <h2>Mac OS Demo</h2>
                    <p>This is a demonstration of the incorp interface. In a real application, this would minimize the window.</p>
                    <button id="restore-window">Restore Window</button>
                </div>
            `;
            document.body.appendChild(message);
            
            document.getElementById('restore-window').addEventListener('click', function() {
                document.body.removeChild(message);
                macWindow.style.display = 'flex';
                setTimeout(() => {
                    macWindow.style.transform = 'scale(1)';
                    macWindow.style.opacity = '1';
                }, 10);
            });
        }, 300);
    });
    
    maximizeButton.addEventListener('click', function() {
        const macWindow = document.querySelector('.mac-window');
        if (macWindow.classList.contains('maximized')) {
            macWindow.classList.remove('maximized');
            macWindow.style.width = '90%';
            macWindow.style.height = '85vh';
        } else {
            macWindow.classList.add('maximized');
            macWindow.style.width = '100%';
            macWindow.style.height = '100vh';
            macWindow.style.borderRadius = '0';
        }
    });
}


function makeDraggableImproved(element) {

    return;
}


function makeResizable(element) {
    const resizeHandle = element.querySelector('.window-resize-handle');
    let isResizing = false;
    let initialWidth, initialHeight, initialX, initialY;

    resizeHandle.addEventListener('mousedown', startResize);
    resizeHandle.addEventListener('touchstart', startResize, { passive: false });

    function startResize(e) {
        e.preventDefault();
        isResizing = true;
        element.classList.add('resizing');
        
        if (e.type === 'touchstart') {
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
        } else {
            initialX = e.clientX;
            initialY = e.clientY;
        }
        
        initialWidth = element.offsetWidth;
        initialHeight = element.offsetHeight;
        
        document.addEventListener('mousemove', resize);
        document.addEventListener('touchmove', resize, { passive: false });
        document.addEventListener('mouseup', stopResize);
        document.addEventListener('touchend', stopResize);
    }

    function resize(e) {
        if (!isResizing) return;
        e.preventDefault();
        
        let clientX, clientY;
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        const deltaX = clientX - initialX;
        const deltaY = clientY - initialY;
        
        const newWidth = Math.max(600, initialWidth + deltaX);
        const newHeight = Math.max(400, initialHeight + deltaY);
        
        element.style.width = newWidth + 'px';
        element.style.height = newHeight + 'px';
    }

    function stopResize() {
        isResizing = false;
        element.classList.remove('resizing');
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('touchmove', resize);
        document.removeEventListener('mouseup', stopResize);
        document.removeEventListener('touchend', stopResize);
    }
}


function initSidebar() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {

            sidebarItems.forEach(i => i.classList.remove('active'));
            

            this.classList.add('active');
            

            const itemText = this.textContent.trim().toLowerCase();
            let targetSection;
            
            switch(itemText) {
                case 'home':
                    targetSection = document.querySelector('header');
                    break;
                case 'features':
                    targetSection = document.querySelector('.card-section');
                    break;
                case 'add':
                    targetSection = document.querySelector('.glass-section');
                    break;
                case 'about':
                    targetSection = document.querySelector('.testimonial-section');
                    break;
                default:
                    targetSection = document.querySelector('header');
            }
            
            if (targetSection) {
                const mainContent = document.querySelector('.main-content');
                mainContent.scrollTo({
                    top: targetSection.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
        

        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}


function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let autoplayInterval;
    

    function showTestimonial(index) {

        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
            testimonial.style.display = 'none';
        });
        

        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        

        testimonials[index].classList.add('active');
        testimonials[index].style.display = 'block';
        

        dots[index].classList.add('active');
        

        currentIndex = index;
    }
    

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
            resetAutoplay();
        });
        

        dot.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showTestimonial(index);
                resetAutoplay();
            }
        });
    });
    

    prevBtn.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = testimonials.length - 1;
        showTestimonial(newIndex);
        resetAutoplay();
    });
    
    nextBtn.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
        resetAutoplay();
    });
    

    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonials.length) newIndex = 0;
            showTestimonial(newIndex);
        }, 5000);
    }
    

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    

    showTestimonial(0);
    startAutoplay();
    

    const sliderContainer = document.querySelector('.testimonial-slider');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        startAutoplay();
    });
}


function addSmoothScrolling() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const mainContent = document.querySelector('.main-content');
                mainContent.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}


function addAnimations() {

    const featureCards = document.querySelectorAll('.feature-card');
    const mainContent = document.querySelector('.main-content');
    
    mainContent.addEventListener('scroll', function() {
        featureCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardPosition < windowHeight * 0.85) {
                card.classList.add('animate');
            }
        });
    });
    

    const style = document.createElement('style');
    style.textContent = `
        .feature-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card:nth-child(1) {
            transition-delay: 0.1s;
        }
        
        .feature-card:nth-child(2) {
            transition-delay: 0.3s;
        }
        
        .feature-card:nth-child(3) {
            transition-delay: 0.5s;
        }
        
        .demo-message {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .demo-content {
            background-color: var(--card-bg);
            border-radius: 16px;
            padding: 2rem;
            text-align: center;
            max-width: 400px;
            border: 1px solid var(--glass-border);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }
        
        .demo-content h2 {
            color: var(--primary-color);
            margin-bottom: 1rem;
            text-align: center;
        }
        
        .demo-content p {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        
        .demo-content button {
            background: linear-gradient(45deg, var(--gradient-start), var(--gradient-end));
            color: var(--text-color);
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 8px;
            margin-top: 1rem;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
            display: inline-block;
        }
        
        .demo-content button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(114, 137, 218, 0.4);
        }
    `;
    document.head.appendChild(style);
    

    setTimeout(() => {
        mainContent.dispatchEvent(new Event('scroll'));
    }, 300);
}

