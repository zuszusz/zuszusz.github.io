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
