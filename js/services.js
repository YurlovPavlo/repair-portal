(function() {
  'use strict';

  const filters = document.getElementById('svcFilters');
  const grid = document.getElementById('svcGrid');
  const loadMoreWrap = document.getElementById('svcLoadMoreWrap');
  const loadMoreBtn = document.getElementById('svcLoadMore');
  
  let currentFilter = 'all';
  let visibleLimit = 9;

  // 🔍 Фільтрація
  function filterCards(category) {
    currentFilter = category;
    const cards = grid.querySelectorAll('.svc-card');
    let visibleCount = 0;

    cards.forEach((card, index) => {
      const cat = card.dataset.category;
      const show = category === 'all' || cat === category;

      if (show) {
        card.style.display = '';
        card.classList.add('is-visible');
        card.classList.remove('is-hidden');
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.classList.remove('is-visible');
        card.classList.add('is-hidden');
      }
    });

    // Оновити активну кнопку
    filters.querySelectorAll('.svc-tab').forEach(btn => {
      btn.classList.toggle('svc-tab--active', btn.dataset.filter === category);
    });

    // Показати/сховати "Показати ще"
    if (loadMoreWrap) {
      loadMoreWrap.style.display = visibleCount > visibleLimit ? 'block' : 'none';
    }
  }

  // Кліки по фільтрах
  if (filters) {
    filters.addEventListener('click', (e) => {
      const tab = e.target.closest('.svc-tab');
      if (tab) filterCards(tab.dataset.filter);
    });
  }

  // Load More
  if (loadMoreBtn && loadMoreWrap) {
    loadMoreBtn.addEventListener('click', () => {
      const hiddenCards = Array.from(grid.querySelectorAll('.svc-card.is-hidden'));
      let shown = 0;
      hiddenCards.forEach(card => {
        if (shown < 4) {
          card.style.display = '';
          card.classList.remove('is-hidden');
          card.classList.add('is-visible');
          shown++;
        }
      });
      if (hiddenCards.length <= 4) {
        loadMoreWrap.style.display = 'none';
      }
    });
  }

  // 🔢 Анімація цін
  function animatePrices() {
    document.querySelectorAll('.svc-card__price-value').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      if (!target) return;
      const duration = 800;
      const start = performance.now();

      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(target * ease);
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  //  Ініціалізація
  window.addEventListener('DOMContentLoaded', () => {
    filterCards('all');
    setTimeout(animatePrices, 300);
  });

})();