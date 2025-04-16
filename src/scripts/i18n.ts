import i18next from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    cleanCode: true,
    supportedLngs: ["pt", "en"],
    debug: false,
    interpolation: { escapeValue: false },
    backend: { loadPath: "./locales/{{lng}}.json" },
  });

export default i18next;
