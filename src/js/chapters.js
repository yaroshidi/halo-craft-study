export function initChapters() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const hero = document.querySelector("[data-hero]");
  if (hero && !reduce) {
    const kids = [...hero.children];
    gsap.from(kids, {
      autoAlpha: 0,
      y: 28,
      duration: 0.85,
      ease: "power2.out",
      stagger: 0.08,
      delay: 0.12,
    });
  }

  if (reduce || typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll("[data-pin]").forEach((stage) => {
    const media = stage.querySelector("[data-pin-media]");
    ScrollTrigger.create({
      trigger: stage,
      start: "top top+=64",
      end: "+=120%",
      pin: true,
      pinSpacing: true,
    });
    if (media) {
      gsap.fromTo(
        media,
        { scale: 0.94, autoAlpha: 0.85 },
        {
          scale: 1,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top top+=64",
            end: "+=120%",
            scrub: true,
          },
        }
      );
    }
  });

  const scrub = document.querySelector("[data-scrub='homes']");
  if (scrub) {
    const layerB = scrub.querySelector("[data-scrub-b]");
    if (layerB) {
      gsap.set(layerB, { autoAlpha: 0 });
      gsap.to(layerB, {
        autoAlpha: 1,
        ease: "none",
        scrollTrigger: {
          trigger: scrub,
          start: "top 70%",
          end: "bottom 35%",
          scrub: true,
        },
      });
    }
  }
}
