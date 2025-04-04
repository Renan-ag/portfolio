import gsap from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline({ paused: true });

  const circles = document.querySelectorAll("[data-target='bx'] > div");
  const menuMobile = document.querySelector("[data-target='menuMobile']");

  const btnMenuMobile: HTMLElement | null = document.querySelector(
    "button[data-target='bx']"
  );

  let currentAnimation: "bouncing" | "closeBtn" = "bouncing";

  circlesBouncing(circles, tl);
  tl.play();

  btnMenuMobile?.addEventListener("click", () => {
    menuMobile?.classList.toggle('active');

    if (currentAnimation == "bouncing") {
      resetTl(tl);      
      transformCirclesInX(circles, tl);
      currentAnimation = "closeBtn";
    } else if (currentAnimation == "closeBtn") {
      tl.reverse();      
      tl.eventCallback("onReverseComplete", () => {
        resetTl(tl);        
        circlesBouncing(circles, tl);
        tl.play();
        currentAnimation = "bouncing";
      });
    }
  });
});

function transformCirclesInX(
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

function circlesBouncing(circles: NodeListOf<Element>, tl: gsap.core.Timeline) {
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

function resetTl(tl: gsap.core.Timeline) {
  tl.restart();
  tl.clear();
  tl.repeat(0);
  tl.delay(0);
}
