import gsap from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline({ paused: true });
  const loadingContainer = document.querySelector("[data-loading]");
  const gradient = document.querySelector("[data-loading-gradient]");
  const icon = document.querySelector("[data-loading-icon]");

  tl.fromTo(
    icon,
    {
      opacity: 0,
      bottom: -160,
      duration: 2,
      ease: "power1.out",
    },
    {
      opacity: 1,
      bottom: "42%",
      pixi: { anchor: 0.5 },
    }
  );

  tl.to(icon, {
    rotate: 360,
    duration: 2.8,
    ease: "power1",
  });

  tl.fromTo(
    gradient,
    {
      opacity: 0,
      clipPath: "circle(0% at 50% 50%)",
    },
    {
      opacity: 1,
      clipPath: "circle(200% at 50% 50%)",
      duration: 3,
      ease: "power1",
    },
    "<"
  );

  tl.eventCallback("onComplete", () => {
    gsap.to(loadingContainer, {
      delay: .2,
      opacity: 0,
      onComplete: () => {
        gsap.set(loadingContainer, { pointerEvents: "none" });
      },
    });
  });

  tl.play();
});
