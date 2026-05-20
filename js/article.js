document.addEventListener('DOMContentLoaded', () => {
  
  //  Active TOC link on scroll
  const tocLinks = document.querySelectorAll('.toc-link');
  const sections = document.querySelectorAll('.article-body section[id]');
  
  const observerOptions = {
    rootMargin: '-100px 0px -60% 0px',
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        tocLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => observer.observe(section));
  
  // Copy link button
  const copyBtn = document.getElementById('copyLinkBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const icon = copyBtn.querySelector('i');
        icon.className = 'fas fa-check';
        setTimeout(() => {
          icon.className = 'fas fa-link';
        }, 2000);
      });
    });
  }
  
  // Smooth scroll for TOC links
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
});