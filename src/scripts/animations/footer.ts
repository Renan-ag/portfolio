import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const footer = document.querySelector("#scroll");
  const tl = gsap.timeline({ paused: true });
  tl.from(footer, { translateY: -450 }).to(footer, { translateY: 0 });

  ScrollTrigger.create({
    trigger: "#trigger-footer",
    start: "bottom bottom",
    end: "+=900",
    scrub: true,
    onUpdate: (self) => {
      tl.progress(self.progress);
    },
  });
});
