
//inicjalizacja ScrollSpy z Bootstrap
document.addEventListener("DOMContentLoaded", function () { 
  const offset = window.innerWidth < 600 ? 20 : 50; //urządzenia mobilne mają ustawiony mniejszy offset
  if (typeof bootstrap !== "undefined" && bootstrap.ScrollSpy) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#navbar', 
      offset: offset
    });
  }
  //przy wysyłaniu formularzy kontaktu łączy wartości ze wszystkich pól w całość, żeby wysłać je w jednym polu do Formspree i czyści po naciśnięciu "Wyślij"
  const contactForm = document.getElementById('contact-form'); 
  if (contactForm) {
    
    contactForm.addEventListener('submit', function () {
      const name = contactForm.querySelector('input[placeholder="Imię"]')?.value.trim() || "";
      const email = contactForm.querySelector('input[placeholder="Email"]')?.value.trim() || "";
      const message = contactForm.querySelector('#contact-message')?.value.trim() || "";
      const hiddenMessage = contactForm.querySelector('#hidden-message');
      if (hiddenMessage) {
        hiddenMessage.value = `Imię: ${name}\nEmail: ${email}\n\n${message}`;
      }
      contactForm.reset();
    });
  }
  //czyści pole formularza po wysłaniu wiadomości
  const predictionForm = document.getElementById('prediction-form');
  if (predictionForm) {
    predictionForm.addEventListener('submit', function () {
      setTimeout(() => {
        predictionForm.reset();
      }, 10);
    });
  }
  //płynne przewijanie do linków prowadzących do różnych sekcji na tej stronie
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});                
//Google Translate
window.googleTranslateElementInit = function() {
  new google.translate.TranslateElement({
    pageLanguage: 'pl',
    includedLanguages: 'en,pl'
  }, 'google_translate_element');
};
document.addEventListener("DOMContentLoaded", function() {
  var gtScript = document.createElement('script');
  gtScript.type = 'text/javascript';
  gtScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  document.body.appendChild(gtScript);
});           
