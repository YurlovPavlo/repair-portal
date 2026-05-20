document.addEventListener('DOMContentLoaded', () => {
  
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('searchInput');
  const cards = document.querySelectorAll('.blog-card');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  
  // Filter by Category
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter cards
      cards.forEach(card => {
        const cardCategories = card.dataset.category.split(' ');
        
        if (category === 'all' || cardCategories.includes(category)) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Search Functionality
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      
      cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const excerpt = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
      
      // Reset category buttons if searching
      if (searchTerm.length > 0) {
        filterBtns.forEach(b => b.classList.remove('active'));
      }
    });
  }
  
  // Load More (simulation)
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      // Here you would load more articles from server
      loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Завантаження...';
      
      setTimeout(() => {
        loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> Всі статті завантажено';
        loadMoreBtn.disabled = true;
      }, 1000);
    });
  }
  
  // Animate cards on load
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
  
});