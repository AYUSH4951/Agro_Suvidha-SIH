js 
async function loadTranslations(lang) {
  try {
    const response = await fetch("translations.json");
    const translations = await response.json();

    if (!translations[lang]) lang = "en"; // fallback

    document.querySelectorAll("[data-i18n]").forEach(el => {
      let key = el.getAttribute("data-i18n");
      if (translations[lang][key]) {
        el.innerText = translations[lang][key];
      }
    });
  } catch (err) {
    console.error("Error loading translations:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let lang = localStorage.getItem("lang") || "en";
  loadTranslations(lang);
});
