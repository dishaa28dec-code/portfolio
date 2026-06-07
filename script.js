// Initialize EmailJS when the page loads
window.addEventListener('load', function() {
  // Initialize EmailJS with your PUBLIC KEY
  // Get your PUBLIC KEY from: https://dashboard.emailjs.com/admin/account
  emailjs.init('YOUR_PUBLIC_KEY_HERE'); // REPLACE WITH YOUR PUBLIC KEY
});

// Contact Form Handler
function handleSubmit(event) {
  event.preventDefault();
  
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const submitBtn = form.querySelector('.form-submit');
  
  // Get form data
  const name = form.querySelector('input[name="name"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();
  const subject = form.querySelector('input[name="subject"]').value.trim();
  const message = form.querySelector('textarea[name="message"]').value.trim();
  
  // Basic validation
  if (!name || !email || !subject || !message) {
    showMessage('Please fill in all fields.', 'error', formMessage);
    return;
  }
  
  // Email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showMessage('Please enter a valid email address.', 'error', formMessage);
    return;
  }
  
  // Disable button and show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  
  // Send email via EmailJS
  const templateParams = {
    from_name: name,
    from_email: email,
    subject: subject,
    message: message,
    to_email: 'dishaa28dec@gmail.com'
  };
  
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
    .then((response) => {
      console.log('Email sent successfully!', response);
      showMessage('✓ Message sent successfully! I\'ll get back to you soon.', 'success', formMessage);
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      showMessage('Failed to send message. Please try emailing me directly at dishaa28dec@gmail.com', 'error', formMessage);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    });
}

// Helper function to display messages
function showMessage(message, type, element) {
  element.textContent = message;
  element.className = `form-message ${type}`;
  
  // Auto-hide success messages after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      element.className = 'form-message';
      element.textContent = '';
    }, 5000);
  }
}

// Navigation scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

function closeMenu() {
  mobileMenu.classList.remove('open');
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe skill cards, achievement cards, education cards, and experience items
document.querySelectorAll('.skill-card, .ach-card, .edu-card, .exp-item').forEach(el => {
  observer.observe(el);
});

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '#hero') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        closeMenu();
      }
    }
  });
});
