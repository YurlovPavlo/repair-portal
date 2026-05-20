document.addEventListener('DOMContentLoaded', () => {
  
  // Form Handling
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // Phone mask
    const phoneInput = document.getElementById('phone');
    
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.startsWith('380')) {
        value = value.slice(3);
      } else if (value.startsWith('0')) {
        value = value.slice(1);
      }
      
      let formattedValue = '+380';
      if (value.length > 0) {
        formattedValue += ' ' + value.slice(0, 2);
      }
      if (value.length > 2) {
        formattedValue += ' ' + value.slice(2, 5);
      }
      if (value.length > 5) {
        formattedValue += ' ' + value.slice(5, 7);
      }
      if (value.length > 7) {
        formattedValue += ' ' + value.slice(7, 9);
      }
      
      e.target.value = formattedValue;
    });
    
    // Form Submit
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Validation
      if (!data.name || !data.phone) {
        showNotification('Будь ласка, заповніть обов\'язкові поля', 'error');
        return;
      }
      
      // Simulate sending
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ВІДПРАВКА...';
      submitBtn.disabled = true;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      showNotification('Дякуємо! Ваша заявка прийнята. Ми зв\'яжемося з вами найближчим часом.', 'success');
      contactForm.reset();
      
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    });
  }
  
  // Notification System
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6';
    const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    
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
    
    notification.innerHTML = `
      <i class="fas ${icon}"></i>
      <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }
  
  // Add animation styles
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
  
});