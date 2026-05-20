document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.price-item input[type="checkbox"]');
  const calcList = document.getElementById('calcList');
  const calcTotal = document.getElementById('calcTotal');
  const sendBtn = document.getElementById('sendCalcBtn');

  // Функція оновлення калькулятора
  function updateCalculator() {
    let total = 0;
    calcList.innerHTML = '';
    let hasItems = false;

    checkboxes.forEach(box => {
      if (box.checked) {
        hasItems = true;
        // Знаходимо батьківський елемент для даних
        const item = box.closest('.price-item');
        const name = item.querySelector('.name').textContent;
        const costText = item.querySelector('.price-item__cost').textContent;
        const price = parseInt(item.dataset.price, 10);

        total += price;

        // Додаємо рядок в калькулятор
        const row = document.createElement('div');
        row.className = 'calc-item';
        row.innerHTML = `<span>${name}</span><span>${price} ₴</span>`;
        calcList.appendChild(row);
      }
    });

    if (!hasItems) {
      calcList.innerHTML = '<p class="calc-empty">Оберіть послуги зліва...</p>';
      calcTotal.textContent = '0 ₴';
      sendBtn.style.opacity = '0.5';
      sendBtn.style.pointerEvents = 'none';
    } else {
      calcTotal.textContent = total + ' ₴';
      sendBtn.style.opacity = '1';
      sendBtn.style.pointerEvents = 'auto';
    }
  }

  // Слухачі подій
  checkboxes.forEach(box => {
    box.addEventListener('change', updateCalculator);
  });

  // Ініціалізація
  updateCalculator();
});