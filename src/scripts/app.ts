import "./animations/animations.ts";
import i18next from "./i18n.ts";

document.addEventListener("DOMContentLoaded", () => {
  const elementsId = ["welcome", "description"];
  const languageButtons = document.querySelectorAll("button");

  function updateContent(label: string, element: HTMLElement | null) {
    if (element) element.textContent = i18next.t(label);
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const lang = (e.target as HTMLButtonElement).dataset.lang;
      i18next.changeLanguage(lang);
    });
  });

  i18next.on("initialized", () => {
    elementsId.forEach((label) =>
      updateContent(label, document.getElementById(label))
    );
  });
});
