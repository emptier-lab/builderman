document.addEventListener('DOMContentLoaded', function() {
    // Change the h1 text to "incorp"
    const h1Element = document.querySelector('h1.logo');
    if (h1Element) {
        h1Element.textContent = "incorp";
    }
    
    // Make the window draggable with improved dragging
    makeDraggableImproved(document.querySelector('.window-titlebar'), document.querySelector('.mac-window'));
    
    // Make the window resizable
    makeResizable(document.querySelector('.window-resize-handle'), document.querySelector('.mac-window'));
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Make elements editable when clicked
    document.body.addEventListener('click', function(event) {
        // Check if the element is a heading, paragraph, or list item
        if (['H1', 'H2', 'H3', 'P', 'LI'].includes(event.target.tagName)) {
            makeEditable(event.target);
        }
    });

    // Function to make an element editable
    function makeEditable(element) {
        // If already editable, don't do anything
        if (element.isContentEditable) return;
        
        // Make the element editable
        element.contentEditable = true;
        element.focus();
        
        // Add a class to show it's being edited
        element.classList.add('editing');
        
        // Save content when user clicks away
        element.addEventListener('blur', function() {
            element.contentEditable = false;
            element.classList.remove('editing');
            console.log('Edited: ' + element.textContent);
        });
        
        // Save content when user presses Enter
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                element.blur();
            }
        });
    }

    // Function to make the window draggable with improved functionality
    function makeDraggableImproved(handle, element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        let isDragging = false;
        let initialX, initialY;
        let windowInitialLeft, windowInitialTop;
        
        if (!handle || !element) return;
        
        // Set initial position if not already set
        if (!element.style.position || element.style.position === 'static') {
            element.style.position = 'relative';
        }
        
        // Add visual feedback for draggable area
        handle.style.cursor = 'grab';
        
        handle.addEventListener('mousedown', startDrag);
        handle.addEventListener('touchstart', startDrag, { passive: false });
        
        function startDrag(e) {
            e.preventDefault();
            isDragging = true;
            
            // Change cursor style during drag
            handle.style.cursor = 'grabbing';
            
            // Get initial positions
            if (e.type === 'touchstart') {
                initialX = e.touches[0].clientX;
                initialY = e.touches[0].clientY;
            } else {
                initialX = e.clientX;
                initialY = e.clientY;
            }
            
            // Get window's initial position
            windowInitialLeft = element.offsetLeft;
            windowInitialTop = element.offsetTop;
            
            // Add event listeners for drag and end
            document.addEventListener('mousemove', drag);
            document.addEventListener('touchmove', drag, { passive: false });
            document.addEventListener('mouseup', endDrag);
            document.addEventListener('touchend', endDrag);
            
            // Add a class to indicate dragging state
            element.classList.add('dragging');
        }
        
        function drag(e) {
            if (!isDragging) return;
            e.preventDefault();
            
            let currentX, currentY;
            
            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX;
                currentY = e.touches[0].clientY;
            } else {
                currentX = e.clientX;
                currentY = e.clientY;
            }
            
            // Calculate the distance moved
            const deltaX = currentX - initialX;
            const deltaY = currentY - initialY;
            
            // Apply smooth movement with requestAnimationFrame for better performance
            requestAnimationFrame(() => {
                // Set new position with boundaries to keep window visible
                const newLeft = windowInitialLeft + deltaX;
                const newTop = windowInitialTop + deltaY;
                
                // Keep window within viewport bounds
                const maxLeft = window.innerWidth - element.offsetWidth;
                const maxTop = window.innerHeight - element.offsetHeight;
                
                element.style.left = `${Math.max(0, Math.min(newLeft, maxLeft))}px`;
                element.style.top = `${Math.max(0, Math.min(newTop, maxTop))}px`;
            });
        }
        
        function endDrag() {
            if (!isDragging) return;
            
            isDragging = false;
            handle.style.cursor = 'grab';
            element.classList.remove('dragging');
            
            // Remove event listeners
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('mouseup', endDrag);
            document.removeEventListener('touchend', endDrag);
        }
    }
    
    // Function to make the window resizable
    function makeResizable(handle, element) {
        let startX, startY, startWidth, startHeight;
        
        handle.addEventListener('mousedown', function(e) {
            e.preventDefault();
            startX = e.clientX;
            startY = e.clientY;
            startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10);
            startHeight = parseInt(document.defaultView.getComputedStyle(element).height, 10);
            document.addEventListener('mousemove', resize);
            document.addEventListener('mouseup', stopResize);
        });
        
        function resize(e) {
            element.style.width = (startWidth + e.clientX - startX) + 'px';
            element.style.height = (startHeight + e.clientY - startY) + 'px';
        }
        
        function stopResize() {
            document.removeEventListener('mousemove', resize);
            document.removeEventListener('mouseup', stopResize);
        }
    }
    
    // Function to initialize the testimonial slider
    function initTestimonialSlider() {
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentIndex = 0;
        
        // Function to show the current testimonial
        function showTestimonial(index) {
            // Hide all testimonials
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            
            // Show the current testimonial
            testimonials[index].classList.add('active');
            
            // Update active dot
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            // Update current index
            currentIndex = index;
        }
        
        // Add click event to previous button
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                const newIndex = (currentIndex > 0) ? currentIndex - 1 : testimonials.length - 1;
                showTestimonial(newIndex);
            });
        }
        
        // Add click event to next button
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                const newIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
                showTestimonial(newIndex);
            });
        }
        
        // Add click events to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showTestimonial(index);
            });
        });
        
        // Auto-advance the slider every 5 seconds
        setInterval(function() {
            const newIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
            showTestimonial(newIndex);
        }, 5000);
    }
    
    // Add click handlers for window buttons
    const closeButton = document.querySelector('.window-button.close');
    const minimizeButton = document.querySelector('.window-button.minimize');
    const maximizeButton = document.querySelector('.window-button.maximize');
    
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            alert('This would close the window in a real application.');
        });
    }
    
    if (minimizeButton) {
        minimizeButton.addEventListener('click', function() {
            const macWindow = document.querySelector('.mac-window');
            macWindow.style.transform = 'scale(0.9)';
            macWindow.style.opacity = '0.8';
            setTimeout(() => {
                macWindow.style.transform = 'scale(1)';
                macWindow.style.opacity = '1';
            }, 300);
        });
    }
    
    if (maximizeButton) {
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
    
    // Add sidebar navigation functionality
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            sidebarItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            // Scroll to appropriate section
            const sections = ['header', '#features', '#add', '#testimonials'];
            if (index < sections.length) {
                const section = document.querySelector(sections[index]);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Add styling for editable elements
    const style = document.createElement('style');
    style.textContent = `
        .editing {
            border: 2px dashed #5865F2;
            padding: 5px;
            background-color: rgba(88, 101, 242, 0.1);
        }
    `;
    document.head.appendChild(style);
});
