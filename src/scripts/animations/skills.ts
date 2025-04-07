import gsap from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline({ paused: true });
  const skillsIcon = document.querySelectorAll(
    "[data-taget='skillsIconsContainer'] img"
  );

  tl.to(skillsIcon, {    
    rotateZ: 10,
    duration: .5,
    stagger: .325,
    ease: "power1",
  });
  
  tl.to(skillsIcon, {
    rotateZ: 0,
    duration: .65,
    ease: "power1",
  });

  tl.repeat(-1);
  tl.repeatDelay(4);
  tl.play();  
});