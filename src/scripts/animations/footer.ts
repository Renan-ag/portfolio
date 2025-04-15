function footerParallax() {
  const footer = document.getElementById("footer");
  const websiteContent = document.getElementById("websiteContent");

  if (footer) {
    console.log(getComputedStyle(footer).getPropertyValue("height"))
    websiteContent?.style.setProperty(
      "margin-bottom",
      `${getComputedStyle(footer).getPropertyValue("height") || 0}`
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  footerParallax();
});
