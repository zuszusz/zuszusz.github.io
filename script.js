document.addEventListener("DOMContentLoaded", function () {
    // ScrollSpy z dynamicznym offsetem
    const offset = window.innerWidth < 600 ? 20 : 50;
    if (typeof bootstrap !== "undefined" && bootstrap.ScrollSpy) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#navbar',
            offset: offset
        });
    }

    // Obsługa formularza kontaktowego – łączenie pól
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
        });
    }

    // Czyść formularz przewidywań po wysłaniu
    const predictionForm = document.getElementById('prediction-form');
    if (predictionForm) {
        predictionForm.addEventListener('submit', function () {
            setTimeout(() => {
                predictionForm.reset();
            }, 100);
        });
    }

    // Obsługa banera cookies
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");
    const rejectBtn = document.getElementById("reject-cookies");

        console.log("acceptBtn:", acceptBtn);
    console.log("rejectBtn:", rejectBtn);

    // Sprawdzenie, czy decyzja jest już zapisana
if (localStorage.getItem('accept-cookies') === 'true' || localStorage.getItem('reject-cookies') === 'true') {
  cookieBanner.style.display = 'none';
  return;
}

acceptBtn.addEventListener('click', function() {
  localStorage.setItem('accept-cookies', 'true');
  cookieBanner.style.display = 'none';
});

rejectBtn.addEventListener('click', function() {
  localStorage.setItem('reject-cookies', 'true');
  cookieBanner.style.display = 'none';
});

});

    // Smooth scroll dla odnośników wewnętrznych
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

// Inicjalizacja Google Translate (globalnie)
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'pl',
        includedLanguages: 'pl,en',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}
