function footerParallax() {
  const footer = document.getElementById("footer");
  const websiteContent = document.getElementById("websiteContent");

  websiteContent?.style.setProperty(
    "margin-bottom",
    `${(footer?.clientHeight || 0) }px`
  );
}

document.addEventListener("DOMContentLoaded", () => {
  footerParallax();
});
