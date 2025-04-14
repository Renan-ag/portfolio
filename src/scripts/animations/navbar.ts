import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BREAKPOINT_LG = 768;
const ANIMATION_TYPES = {
  BOUNCING: "BOUNCING",
  CLOSE_BTN: "CLOSE_BTN",
} as const;

const setupMobileMenu = (
  menuMobile: Element | null,
  btnMenuMobile: HTMLElement | null,
  circles: NodeListOf<Element>
) => {
  if (!btnMenuMobile || !menuMobile) return;

  const tl = gsap.timeline({ paused: true });
  let currentAnimation: keyof typeof ANIMATION_TYPES = ANIMATION_TYPES.BOUNCING;

  createBouncingAnimation(circles, tl);
  tl.play();

  btnMenuMobile.addEventListener("click", () => {
    menuMobile.classList.toggle("active");

    if (currentAnimation === ANIMATION_TYPES.BOUNCING) {
      resetTimeline(tl);
      createCloseButtonAnimation(circles, tl);
      currentAnimation = ANIMATION_TYPES.CLOSE_BTN;
    } else {
      tl.reverse();
      tl.eventCallback("onReverseComplete", () => {
        resetTimeline(tl);
        createBouncingAnimation(circles, tl);
        tl.play();
        currentAnimation = ANIMATION_TYPES.BOUNCING;
      });
    }
  });
};

const setupDesktopAnimations = (
  desktopLinks: Element | null,
  desktopCirclesContainer: Element | null,
  navElement: Element | null,
  circles: NodeListOf<Element>
) => {
  if (!desktopLinks || !desktopCirclesContainer || !navElement) return;
  const tlCircles = gsap.timeline({ paused: true });
  const tlDesktop = gsap.timeline({ paused: true });

  createBouncingAnimation(circles, tlCircles);
  tlCircles.play();

  tlDesktop.to(desktopLinks, {
    maxWidth: 0,
    duration: 0.25,
    ease: "power1",
  });

  tlDesktop.to(navElement, { width: "300px", ease: "power1" }, "<");
  tlDesktop.to(desktopCirclesContainer, {
    opacity: 1,
    duration: 0.25,
    ease: "power1",
  });

  ScrollTrigger.create({
    trigger: "main",
    start: "top top",
    end: "+=150",
    onEnter: () => tlDesktop.play(),
    onLeaveBack: () => tlDesktop.reverse(),
  });

  const handleMouseEnter = () => {
    if (window.scrollY > 100) {
      const mouseEnterTL = gsap.timeline();
      mouseEnterTL.to(desktopCirclesContainer, { opacity: 0, ease: "power1" });
      mouseEnterTL.to(desktopLinks, {
        maxWidth: "900px",
        duration: 0.25,
        ease: "power1",
      });
      mouseEnterTL.to(navElement, { width: "620px" }, "<");
    }
  };

  const handleMouseLeave = () => {
    if (window.scrollY > 100) {
      gsap.to(desktopLinks, { maxWidth: 0, duration: 0.25, ease: "power1" });
      gsap.to(navElement, { width: "300px" });
      gsap.to(desktopCirclesContainer, { opacity: 1, ease: "power1" });
    }
  };

  navElement.addEventListener("mouseenter", handleMouseEnter);
  navElement.addEventListener("mouseleave", handleMouseLeave);
};

function createCloseButtonAnimation(
  circles: NodeListOf<Element>,
  tl: gsap.core.Timeline
) {
  tl.to(circles[1], {
    display: "none",
    opacity: 0,
    duration: 0.185,
    ease: "power1",
  });

  tl.to(circles[0], {
    opacity: 1,
    width: "3px",
    height: "20px",
    translateX: 3,
    duration: 0.25,
    rotateZ: 45,
    ease: "power1",
  });

  tl.to(
    circles[2],
    {
      opacity: 1,
      width: "3px",
      height: "20px",
      translateX: -3,
      duration: 0.25,
      rotateZ: -45,
      ease: "power1",
    },
    "<"
  );
}

function createBouncingAnimation(
  circles: NodeListOf<Element>,
  tl: gsap.core.Timeline
) {
  tl.delay(1);

  circles.forEach((circle) => {
    tl.to(circle, {
      y: -4,
      opacity: 1,
      duration: 0.2,
      ease: "power1",
    });

    tl.to(circle, {
      y: 0,
      opacity: 0.4,
      duration: 0.3,
      delay: 0.3,
      ease: "power1",
    });
  });

  tl.repeat(-1);
}

function resetTimeline(tl: gsap.core.Timeline) {
  tl.restart();
  tl.clear();
  tl.repeat(0);
  tl.delay(0);
}

function init() {
  const width = window.innerWidth;
  const isMobile = width < BREAKPOINT_LG;

  if (!isMobile) {
    setupDesktopAnimations(
      document.querySelector("[data-target='desktop-navLinksContainer']"),
      document.querySelector('[data-target="desktop-circlesContainer"]'),
      document.querySelector("nav"),
      document.querySelectorAll(".bounceCircle-desktop")
    );
  } else {
    setupMobileMenu(
      document.querySelector("[data-target='menuMobile']"),
      document.querySelector("button[data-target='bx']"),
      document.querySelectorAll(".bounceCircle")
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  init();
});
