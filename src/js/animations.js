


//a n i m a t i o n

//  headline text

export function prepareLogoPaths() {
  const letters = document.querySelectorAll(".logoPath");

  letters.forEach((letter) => {
    const length = letter.getTotalLength();
    letter.style.strokeDasharray = `${length}px`;
    letter.style.strokeDashoffset = `${length}px`;
  });
}

export function setAnimationDelay(delay) {
  const letters = document.querySelectorAll(".logoPath");

  letters.forEach((letter, index) => {
    letter.style.animationDelay = `${index * delay}s`;
  });
}


//GSAP

export function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  const baseCardAnimation = {
    duration: 1.5,
    opacity: 0,
    scale: 0.92,
    //y:30,
    ease: "power1.out"
  };

  gsap.from(".geoMapsCard", {
    scrollTrigger: ".geoMaps",
    ...baseCardAnimation
  });

  gsap.from("#countryCard", {
    scrollTrigger: ".cards",
    ...baseCardAnimation
  });

  gsap.from("#timeCard", {
    scrollTrigger: ".cards",
    delay: 0.3,
    ...baseCardAnimation
  });

  gsap.from("#locationCard", {
    scrollTrigger: ".cards",
    delay: 0.6,
    ...baseCardAnimation
  });

  gsap.set(".upBtn", { autoAlpha: 0, display: "none" });

  ScrollTrigger.create({
  trigger: ".geoMaps",
  start: "top center",
 
    onEnter: () => {
      gsap.to(".upBtn", {
        autoAlpha: 1,
        display: "block",
        duration: 0.3
      });
    },
      onLeaveBack: () => {
      gsap.to(".upBtn", {
        autoAlpha: 0,
        display: "none",
        duration: 0.3
      });
    }
});
}






