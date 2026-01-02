// Mobile menu toggle functionality
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Change icon based on menu state
        mobileToggle.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Video Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Chatbot button functionality
    const chatbotBtn = document.querySelector('.chatbot-btn');
    
    if (chatbotBtn) {
        // initial animation
        setTimeout(() => {
            chatbotBtn.style.animation = 'pulse 2s 3';
        }, 2000);
        
        // Create pulse animation if it doesn't exist
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        // pause animation on hover
        chatbotBtn.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
        });
        
        chatbotBtn.addEventListener('mouseleave', function() {
            this.style.animation = 'pulse 2s infinite';
        });
        
        // mobile tap animation
        chatbotBtn.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)'; 
            }, 300);
        });
    }
    
    // Video Modal Functionality
    const videoModal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const closeVideoModal = document.querySelector('.close-video-modal');
    const videoItems = document.querySelectorAll('.video-item');
    
    if (videoModal && videoFrame) {
        // Open modal when video is clicked
        videoItems.forEach(item => {
            item.addEventListener('click', function() {
                const videoUrl = this.getAttribute('data-video');
                videoFrame.src = videoUrl;
                videoModal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });
        
        // Close modal
        closeVideoModal.addEventListener('click', function() {
            videoModal.style.display = 'none';
            videoFrame.src = '';
            document.body.style.overflow = 'auto';
        });
        
        // Close when clicking outside modal content
        window.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.style.display = 'none';
                videoFrame.src = '';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Video filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const allVideoItems = document.querySelectorAll('.video-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.textContent.trim();
                
                // Filter videos
                allVideoItems.forEach(item => {
                    if (filterValue === 'All Videos') {
                        item.style.display = 'block';
                    } else {
                        const category = item.getAttribute('data-category');
                        if (filterValue.toLowerCase() === category) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Search functionality
    const searchBar = document.querySelector('.search-bar');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBar && searchBtn) {
        function filterVideos() {
            const searchTerm = searchBar.value.toLowerCase();
            
            allVideoItems.forEach(item => {
                const title = item.querySelector('.video-title').textContent.toLowerCase();
                const description = item.querySelector('.video-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
        
        searchBar.addEventListener('input', filterVideos);
        searchBtn.addEventListener('click', filterVideos);
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Skip for # links that don't reference elements
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Calculate scroll position considering fixed header
            const headerHeight = document.getElementById('header')?.offsetHeight || 70;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const scrollPosition = targetPosition - headerHeight;
            
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
            
            // Update URL without adding history entry
            history.replaceState(null, null, targetId);
        }
    });
});

// Header scroll effect
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// FAQ toggle functionality
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        answer.classList.toggle('active');
        
        const icon = this.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const nameInput = contactForm.querySelector('#name');
        const emailInput = contactForm.querySelector('#email');
        const messageInput = contactForm.querySelector('#message');
        let isValid = true;
        
        // Reset previous errors
        contactForm.querySelectorAll('.error').forEach(el => el.remove());
        
        // Name validation
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Name is required');
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        }
        
        // Message validation
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Message is required');
            isValid = false;
        }
        
        if (isValid) {
            // Create a fake submit animation
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for your message! We will get back to you soon.</p>
                `;
                contactForm.parentNode.insertBefore(successMsg, contactForm.nextSibling);
                
                // Reset form
                contactForm.reset();
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMsg.remove();
                }, 5000);
            }, 1500);
        }
    });
}

// Helper function to show error messages
function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error';
    error.textContent = message;
    error.style.color = '#e74c3c';
    error.style.fontSize = '0.9rem';
    error.style.marginTop = '5px';
    
    input.parentNode.appendChild(error);
    
    // Highlight input with error
    input.style.borderColor = '#e74c3c';
    
    // Remove error on input
    input.addEventListener('input', function() {
        error.remove();
        input.style.borderColor = '';
    }, { once: true });
}

// Initialize image carousel
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Function to go to a specific slide
    function goToSlide(index) {
        if (index < 0) index = slideCount - 1;
        else if (index >= slideCount) index = 0;
        
        currentIndex = index;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    // Navigation event listeners
    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(() => goToSlide(currentIndex + 1), 3000);
    
    // Pause on hover
    carousel.parentElement.addEventListener('mouseenter', () => clearInterval(slideInterval));
    carousel.parentElement.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => goToSlide(currentIndex + 1), 5000);
    });
}

// Initialize gallery navigation
function initGallery() {
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');
    
    if (!galleryPrev || !galleryNext) return;
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentPage = 0;
    const itemsPerPage = window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
    const pageCount = Math.ceil(galleryItems.length / itemsPerPage);
    
    function showPage(page) {
        galleryItems.forEach((item, index) => {
            const startIndex = page * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            
            if (index >= startIndex && index < endIndex) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    galleryPrev.addEventListener('click', () => {
        currentPage = (currentPage - 1 + pageCount) % pageCount;
        showPage(currentPage);
    });
    
    galleryNext.addEventListener('click', () => {
        currentPage = (currentPage + 1) % pageCount;
        showPage(currentPage);
    });
    
    // Initialize gallery display
    showPage(currentPage);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newItemsPerPage = window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
        if (newItemsPerPage !== itemsPerPage) {
            currentPage = 0;
            showPage(currentPage);
        }
    });
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    initGallery();
    
    // Add animations for video items
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`;
    });
    
    // Add fadeInUp animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});
<script>
(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="HgHeRpbi7zrJARR2mCN8I";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
</script>