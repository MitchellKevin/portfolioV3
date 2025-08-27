// function showNotification(message, isError = false) {
//   const notification = document.getElementById('notification');
//   if (!notification) return;
//   notification.textContent = message;
//   notification.className = isError ? 'error' : '';
//   notification.style.display = 'block';
//   notification.style.opacity = '1';
//   notification.style.top = '0';
//   setTimeout(() => {
//     notification.style.opacity = '0';
//     setTimeout(() => {
//       notification.style.display = 'none';
//     }, 400);
//   }, 3500);
// }

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Check reCAPTCHA
    const captcha = grecaptcha.getResponse();
    if (!captcha) {
      showNotification('Please complete the CAPTCHA.', true);
      return;
    }

    // Send to you
    emailjs.sendForm('service_hvkdu46', 'template_h2dzhbh', this)
      .then(function() {
        // Send confirmation to user
        const formData = new FormData(form);
        emailjs.send('service_hvkdu46', 'template_8e3o54b', {
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message')
        }).then(function() {
          showNotification("Message sent! You’ll receive a confirmation email shortly.");
          form.reset();
          grecaptcha.reset();
        }, function(error) {
          showNotification("Message sent, but confirmation email could not be delivered.", true);
        });
      }, function(error) {
        showNotification("Failed to send message. Please try again later.", true);
      });
  });
});