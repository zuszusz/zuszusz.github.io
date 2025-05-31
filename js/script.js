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

  // Cookie banner handling
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAccepted = localStorage.getItem('cookiesAccepted');

  if (cookieBanner) {
    console.log('Baner cookies znaleziony, cookiesAccepted:', cookieAccepted);
    if (!cookieAccepted) {
      cookieBanner.style.display = 'block';
    }

    document.getElementById('accept-cookies').addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieBanner.style.display = 'none';
      console.log('Cookies zaakceptowane');
    });

    document.getElementById('reject-cookies').addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'false');
      cookieBanner.style.display = 'none';
      console.log('Cookies odrzucone');
    });

    document.getElementById('learn-more-cookies').addEventListener('click', () => {
      window.open('/polityka-prywatnosci.html', '_blank', 'noopener,noreferrer');
      console.log('Kliknięto "Dowiedz się więcej"');
    });
  } else {
    console.error('Baner cookies (#cookie-banner) nie znaleziony w DOM');
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth"
        });
        // Zachowaj hash w URL bez przeładowania
        history.pushState(null, null, this.getAttribute("href"));
      }
    });
  });
});

// Google Translate Initialization
window.googleTranslateElementInit = function () {
  new google.translate.TranslateElement({
    pageLanguage: 'pl',
    includedLanguages: 'pl,en',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
};

// Dynamiczne ładowanie skryptu Google Translate
document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById('google-translate-script')) {
    const gtScript = document.createElement('script');
    gtScript.id = 'google-translate-script';
    gtScript.type = 'text/javascript';
    gtScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(gtScript);
  }
});

// Usuwanie banneru Google Translate
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

window.addEventListener('load', () => {
  removeGoogleTranslateBanner();
  // Dodajemy jednorazowe sprawdzenie po krótkim opóźnieniu
  setTimeout(removeGoogleTranslateBanner, 1000);
});