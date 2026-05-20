document.addEventListener('DOMContentLoaded', () => {
  
  // 🍔 Mobile Menu
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  
  if (burger) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Закриття меню при кліку на посилання
    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  // ✉️ CTA Form
  const ctaForm = document.getElementById('ctaForm');
  if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = ctaForm.phone.value.trim();
      const name = ctaForm.name.value.trim();
      
      if (!name) {
        showNotification('Будь ласка, введіть ваше ім\'я', 'error');
        return;
      }
      
      if (!/^\+380\s?\d{9}$/.test(phone.replace(/\s/g, ''))) {
        showNotification('Будь ласка, введіть коректний номер: +380 XX XXX XX XX', 'error');
        return;
      }
      
      // Імітація відправки
      const btn = ctaForm.querySelector('button');
      const originalContent = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> НАДСИЛАЄМО...';
      btn.disabled = true;
      
      setTimeout(() => {
        showNotification(`Дякуємо, ${name}! Ми зв'яжемося з вами протягом 15 хвилин.`, 'success');
        ctaForm.reset();
        btn.innerHTML = originalContent;
        btn.disabled = false;
      }, 1500);
    });
  }
  
  // 🔔 Notification System
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#2196F3';
    
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${bgColor};
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 9999;
      font-family: 'Nunito', sans-serif;
      font-weight: 600;
      animation: slideIn 0.3s ease;
      max-width: 400px;
    `;
    
    const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    notification.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }
  
  // Анімації для notification
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(400px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  
// ⬆️ SCROLL TO TOP BUTTON (З'являється після ~50% прокрутки)
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Розраховуємо відсоток прокрутки сторінки
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent > 50) {
          scrollTopBtn.classList.add('show');
        } else {
          scrollTopBtn.classList.remove('show');
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


  
  // 🌟 Scroll Animations
  const observerOptions = { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Спостереження за елементами
  document.querySelectorAll('.service-card, .review-card, .price-item, .extra-service, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // ⚡ Header shadow on scroll
  const header = document.querySelector('.header__main');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
  
  // 🎯 Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
// 🔧 Generate Tech Particles
const techParticlesContainer = document.getElementById('techParticles');
if (techParticlesContainer) {
  const particleCount = 15;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'tech-particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particle.style.animationDuration = `${15 + Math.random() * 10}s`;
    techParticlesContainer.appendChild(particle);
  }
}

});