import "./animations/animations.ts";
import i18next from "./i18n.ts";

const ELEMENTS_ID = [
  "nav-link-mobile-contact",
  "nav-link-mobile-jobs",
  "nav-link-mobile-projects",
  "nav-link-mobile-skills",
  "nav-link-mobile-contact",
  "nav-link-contact",  
  "nav-link-jobs",
  "nav-link-projects",
  "nav-link-skills",
  "about-title",
  "about-subtitle",
  "about-occupation",
  "about-description",
  "project-title",
  "project-spiderman",
  "project-personal-budget",
  "project-blog",
  "skill-title",
  "experience-title",
  "experience-1-functions-title",
  "experience-2-functions-title",
  "experience-1-occupation",
  "experience-1-case-1",
  "experience-1-case-2",
  "experience-1-case-3",
  "experience-1-case-4",
  "experience-2-occupation",
  "experience-2-case-1",
  "experience-2-case-2",
  "experience-2-case-3",
  "experience-2-case-4",
  "experience-2-case-5",
  "experience-2-case-6",
  "experience-2-case-7",
  "experience-2-case-8",
  "experience-2-case-9",
  "experience-2-case-10",
  "footer-title",
  "footer-email",
  "footer-linkedin",
  "footer-github",
];

document.addEventListener("DOMContentLoaded", () => {
  const languageButtons = document.querySelectorAll("button[data-lang]");
  const elementMap = new Map<string, HTMLElement>();

  ELEMENTS_ID.forEach((id) => {
    const el = document.getElementById(id);
    if (el) elementMap.set(id, el);
  });

  function updateAllContent() {
    elementMap.forEach((el, label) => {
      el.textContent = i18next.t(label);
    });
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const lang = (e.target as HTMLButtonElement).dataset.lang as string;
      i18next.changeLanguage(lang);
    });
  });

  i18next.on("initialized", updateAllContent);
  i18next.on("languageChanged", updateAllContent);
});
