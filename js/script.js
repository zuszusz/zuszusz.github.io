// Ładowanie tekstu z pliku (np. cytatów lub opisu z pliku tekstowego)
document.addEventListener("DOMContentLoaded", () => {
    const textContainer = document.getElementById("text-container");

    if (textContainer) {
        fetch("ipsum.txt")
            .then(response => {
                if (!response.ok) throw new Error("Błąd podczas ładowania pliku");
                return response.text();
            })
            .then(data => {
                textContainer.textContent = data;
            })
            .catch(error => {
                console.error("Wystąpił błąd:", error);
                textContainer.textContent = "Nie udało się załadować tekstu.";
            });
    }
});
function adjustForGoogleTranslateBanner() {
  const gtBanner = document.querySelector('.goog-te-banner-frame.skiptranslate');
  if (gtBanner) {
    // Daj czas na załadowanie iframe
    setTimeout(() => {
      document.body.style.paddingTop = '40px'; // albo inna wysokość paska
    }, 500);
  }
}

// Wywołaj po załadowaniu tłumacza
window.addEventListener('load', () => {
  adjustForGoogleTranslateBanner();
});

// Google Translate – dodanie tłumacza
window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement({
        pageLanguage: 'pl',
        includedLanguages: 'pl,en',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
};

document.addEventListener("DOMContentLoaded", () => {
    const gtScript = document.createElement('script');
    gtScript.type = 'text/javascript';
    gtScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(gtScript);
});

// Utrzymanie hash po zmianie języka
document.addEventListener("change", function (e) {
    if (e.target.className === "goog-te-combo") {
        const currentHash = window.location.hash;
        setTimeout(() => {
            window.location.hash = currentHash;
            location.reload();
        }, 500);
    }
});

// Smooth scroll do sekcji (jeśli nie używasz Bootstrap ScrollSpy)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

function removeGoogleTranslateBanner() {
  const gtFrame = document.querySelector('.goog-te-banner-frame.skiptranslate');
  if (gtFrame) {
    gtFrame.style.display = 'none';
    gtFrame.style.height = '0';
    gtFrame.style.visibility = 'hidden';
  }
  document.body.style.marginTop = '0';
  document.body.style.paddingTop = '0';
  document.documentElement.style.marginTop = '0';
  document.documentElement.style.paddingTop = '0';
}

// Wywołaj zaraz po załadowaniu strony
window.addEventListener('load', () => {
  removeGoogleTranslateBanner();
});

// Google czasem dynamicznie dodaje banner po zmianie języka
// więc powtarzaj co sekundę przez 5 sekund
let tries = 0;
const maxTries = 5;
const interval = setInterval(() => {
  removeGoogleTranslateBanner();
  tries++;
  if (tries >= maxTries) clearInterval(interval);
}, 1000);
// Sprawdzenie czy użytkownik już zaakceptował lub odrzucił cookies
const cookieBanner = document.getElementById('cookie-banner');
const accepted = localStorage.getItem('cookiesAccepted');
const rejected = localStorage.getItem('cookiesRejected');

if (!accepted && !rejected) {
  cookieBanner.style.display = 'block';
}

document.getElementById('accept-cookies').addEventListener('click', () => {
  localStorage.setItem('cookiesAccepted', 'true');
  cookieBanner.style.display = 'none';
  // Tu możesz też wywołać kod uruchamiający np. analitykę itp.
});

document.getElementById('reject-cookies').addEventListener('click', () => {
  localStorage.setItem('cookiesRejected', 'true');
  cookieBanner.style.display = 'none';
  // Tu możesz ewentualnie wyłączyć cookies, jeśli masz coś takiego
});

