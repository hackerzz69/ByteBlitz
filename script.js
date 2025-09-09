// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
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

// Calendar Modal Functionality
const scheduleBtn = document.getElementById('scheduleBtn');
const scheduleConsultationBtn = document.getElementById('scheduleConsultationBtn');
const calendarModal = document.getElementById('calendarModal');
const closeModal = document.querySelector('.close');
const googleCalendarBtn = document.getElementById('googleCalendarBtn');

// Open modal when schedule buttons are clicked
[scheduleBtn, scheduleConsultationBtn].forEach(btn => {
    if (btn) {
        btn.addEventListener('click', () => {
            calendarModal.style.display = 'block';
        });
    }
});

// Close modal when X is clicked
if (closeModal) {
    closeModal.addEventListener('click', () => {
        calendarModal.style.display = 'none';
    });
}

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === calendarModal) {
        calendarModal.style.display = 'none';
    }
});

// Google Calendar Integration
if (googleCalendarBtn) {
    googleCalendarBtn.addEventListener('click', () => {
        // Create a Google Calendar event URL
        const eventDetails = {
            action: 'TEMPLATE',
            text: 'ByteBlitz Tech Repair Consultation',
            details: 'Free consultation to discuss device repair needs and get an estimate.',
            location: '123 Tech Street, Digital City, DC 12345',
            dates: getDefaultEventTime()
        };
        
        const googleCalendarUrl = `https://calendar.google.com/calendar/render?${new URLSearchParams(eventDetails).toString()}`;
        window.open(googleCalendarUrl, '_blank');
        
        // Close the modal
        calendarModal.style.display = 'none';
    });
}

// Generate default event time (tomorrow at 10 AM)
function getDefaultEventTime() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    
    const endTime = new Date(tomorrow);
    endTime.setHours(11, 0, 0, 0);
    
    // Format for Google Calendar (YYYYMMDDTHHMMSSZ)
    const formatDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    return `${formatDate(tomorrow)}/${formatDate(endTime)}`;
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Phone number click tracking (optional analytics)
document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
    phoneLink.addEventListener('click', () => {
        // Optional: Add analytics tracking here
        console.log('Phone number clicked:', phoneLink.href);
    });
});

// Form validation and enhancement (if forms are added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s+/g, ''));
}

// Device detection for optimized experience
function detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|iphone|ipad|tablet|blackberry|opera mini|iemobile/i.test(userAgent);
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
    }
    
    return {
        isMobile: isMobile,
        isTablet: /tablet|ipad/i.test(userAgent),
        isDesktop: !isMobile
    };
}

// Initialize device detection
const deviceInfo = detectDevice();

// Optimize touch interactions for mobile
if (deviceInfo.isMobile) {
    // Add touch-friendly hover effects
    document.querySelectorAll('.service-card, .testimonial-card').forEach(card => {
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', () => {
            setTimeout(() => {
                card.style.transform = '';
            }, 100);
        });
    });
}

// Performance optimization: Lazy loading for images (if any are added)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}