document.addEventListener('DOMContentLoaded', () => {
  
  // 🎯 Анімація лічильників статистики
  const counters = document.querySelectorAll('.stat-number');
  
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000; // 2 секунди
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Easing function (easeOutQuart)
      const ease = 1 - Math.pow(1 - progress, 4);
      
      const current = Math.floor(target * ease);
      el.textContent = current.toLocaleString('uk-UA');
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString('uk-UA') + (target > 100 ? '+' : '');
      }
    };
    
    requestAnimationFrame(step);
  };

  // Запуск анімації при появі в viewport
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(animateCounter);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const heroSection = document.querySelector('.about-hero');
  if (heroSection) observer.observe(heroSection);

  //  Анімація появи елементів при скролі
  const fadeElements = document.querySelectorAll('.trust-card, .step, .milestone, .g-item');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeObserver.observe(el);
  });

});