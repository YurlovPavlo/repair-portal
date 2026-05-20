document.addEventListener('DOMContentLoaded', () => {
  
  const cards = document.querySelectorAll('.component-card');
  const summaryList = document.getElementById('summaryList');
  const partsTotalEl = document.getElementById('partsTotal');
  const grandTotalEl = document.getElementById('grandTotal');
  const assemblyCheckbox = document.getElementById('assemblyService');
  const resetBtn = document.getElementById('resetBtn');
  const orderBtn = document.getElementById('orderBtn');
  const useCaseFilter = document.getElementById('useCaseFilter');
  const ASSEMBLY_FEE = 800;

  let selection = {};

  // Format currency
  const formatPrice = (num) => num.toLocaleString('uk-UA') + ' ₴';

  // Update Summary
  function updateSummary() {
    summaryList.innerHTML = '';
    let totalParts = 0;
    const selectedCount = Object.keys(selection).length;

    if (selectedCount === 0) {
      summaryList.innerHTML = `
        <div class="summary-empty">
          <i class="fas fa-cubes"></i>
          <p>Оберіть комплектуючі зліва</p>
        </div>`;
    } else {
      for (const [type, item] of Object.entries(selection)) {
        totalParts += item.price;
        const div = document.createElement('div');
        div.className = 'summary-item';
        div.innerHTML = `<span class="name">${item.name}</span><span class="price">${formatPrice(item.price)}</span>`;
        summaryList.appendChild(div);
      }
    }

    partsTotalEl.textContent = formatPrice(totalParts);
    const finalTotal = totalParts + (assemblyCheckbox.checked ? ASSEMBLY_FEE : 0);
    grandTotalEl.textContent = formatPrice(finalTotal);
    
    orderBtn.style.opacity = selectedCount > 0 ? '1' : '0.5';
    orderBtn.style.pointerEvents = selectedCount > 0 ? 'auto' : 'none';
  }

  // Update Category Badge
  function updateBadge(type, name) {
    const section = document.querySelector(`.component-grid[data-category="${type}"]`).closest('.builder-section');
    const badge = section.querySelector('.section-badge');
    if (name) {
      badge.classList.add('has-value');
      badge.textContent = name;
    } else {
      badge.classList.remove('has-value');
      badge.textContent = 'Не обрано';
    }
  }

  // Card Click Handler
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const type = card.dataset.type;
      const price = parseInt(card.dataset.price);
      const name = card.dataset.name;

      // Deselect same type
      document.querySelectorAll(`.component-card[data-type="${type}"]`).forEach(c => c.classList.remove('is-selected'));

      if (card.classList.contains('is-selected')) {
        // Unselect
        card.classList.remove('is-selected');
        delete selection[type];
        updateBadge(type, null);
      } else {
        // Select
        card.classList.add('is-selected');
        selection[type] = { name, price };
        updateBadge(type, name);
      }
      updateSummary();
    });
  });

  // Assembly Checkbox
  assemblyCheckbox.addEventListener('change', updateSummary);

  // Reset
  resetBtn.addEventListener('click', () => {
    selection = {};
    document.querySelectorAll('.component-card').forEach(c => c.classList.remove('is-selected'));
    document.querySelectorAll('.section-badge').forEach(b => {
      b.classList.remove('has-value');
      b.textContent = 'Не обрано';
    });
    updateSummary();
  });

  // Use Case Filter
  if (useCaseFilter) {
    useCaseFilter.addEventListener('click', (e) => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;

      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const selectedCase = chip.dataset.case;

      cards.forEach(card => {
        const cardCases = card.dataset.case.split(' ');
        const isVisible = selectedCase === 'all' || cardCases.includes(selectedCase);
        
        // Smooth toggle
        if (isVisible) {
          card.style.display = '';
          setTimeout(() => card.style.opacity = '1', 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 250);
        }
      });
    });
  }

  // Init
  updateSummary();
});