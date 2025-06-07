document.addEventListener("DOMContentLoaded", function () {
    // ScrollSpy z dynamicznym offsetem
    let offset = window.innerWidth < 600 ? 20 : 50;
    const scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#navbar',
        offset: offset
    });

    // Funkcja do łączenia pól w formularzu kontaktowym
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const name = contactForm.querySelector('input[placeholder="Imię"]').value.trim();
            const email = contactForm.querySelector('input[placeholder="Email"]').value.trim();
            const message = contactForm.querySelector('#contact-message').value.trim();
            const hiddenMessage = contactForm.querySelector('#hidden-message');
            hiddenMessage.value = `Imię: ${name}\nEmail: ${email}\n\n${message}`;
        });
    }

    // Czyść pole po wysłaniu formularza przewidywań
    const predictionForm = document.getElementById('prediction-form');
    if (predictionForm) {
        predictionForm.addEventListener('submit', function () {
            setTimeout(() => {
                predictionForm.reset();
            }, 100);
        });
    }

    // Cookie banner logic
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");
    const rejectBtn = document.getElementById("reject-cookies");

    function hideCookieBanner(e) {
        e.preventDefault();
        if (cookieBanner) {
            // Możesz dodać efekt fade-out jeśli chcesz, teraz po prostu ukrywa
            cookieBanner.style.display = "none";
        }
    }

    if (acceptBtn) {
        acceptBtn.addEventListener("click", hideCookieBanner);
    }
    if (rejectBtn) {
        rejectBtn.addEventListener("click", hideCookieBanner);
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });
});

// Google Translate init (musi być globalnie)
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'pl',
        includedLanguages: 'pl,en',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}
