import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const navbar = document.querySelector(".navbar");
  const aboutSection = document.querySelector("#About");
  const projectSections = document.querySelector("#Projects");
  const skillsSection = document.querySelector("#Skills");
  const experiencesSection = document.querySelector("#Jobs");
  

  const tl = gsap.timeline({ paused: true, delay: 3.2 });

  tl.fromTo(navbar, { opacity: 0 }, { opacity: 1, ease: "expo.inOut" });
  tl.fromTo(
    aboutSection,    
    { y: -100, opacity: 0 },
    { y: 0, opacity: 1, ease: "expo.inOut", duration: 1.2 }
  );  

  tl.play();

  gsap.fromTo(projectSections, {opacity:0, y: 100}, {
    scrollTrigger: {
      trigger: projectSections,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 1,
    y: 0,
    duration: 1.25,
    ease: "expo.inOut"
  });

  gsap.fromTo(skillsSection, {opacity:0}, {
    scrollTrigger: {
      trigger: skillsSection,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 1,
    y: 0,
    duration: 1.25,
    ease: "expo.inOut"
  });

  gsap.fromTo(experiencesSection, {opacity:0, y: 100}, {
    scrollTrigger: {
      trigger: experiencesSection,
      start: "top 70%",
      toggleActions: "play none none none"
    },
    opacity: 1,
    y: 0,
    duration: 1.25,
    ease: "expo.inOut"
  });
});
