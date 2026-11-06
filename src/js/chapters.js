function prefersReduce() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function initInnerHero() {
  const hero = document.querySelector("[data-hero]");
  if (!hero || hero.querySelector("[data-hero-media]") || prefersReduce()) return;
  const kids = [...hero.children];
  if (!kids.length || typeof gsap === "undefined") return;
  gsap.from(kids, {
    autoAlpha: 0,
    y: 28,
    duration: 0.85,
    ease: "power2.out",
    stagger: 0.08,
    delay: 0.12,
  });
}

function startClip() {
  const top = Math.round(window.innerHeight * (window.innerWidth < 720 ? 0.46 : 0.4));
  return `inset(${top}px 12px 12px 12px round 8px)`;
}

function initHeroExpand() {
  const hero = document.querySelector("[data-hero]");
  const media = document.querySelector("[data-hero-media]");
  const copy = document.querySelector("[data-hero-copy]");
  const pin = hero?.querySelector(".hero__pin");
  if (!hero || !media || !pin) return;

  if (prefersReduce() || typeof ScrollTrigger === "undefined") {
    media.style.clipPath = "inset(0px 0px 0px 0px round 0px)";
    if (copy) copy.style.color = "#fff";
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "+=155%",
      scrub: true,
      pin,
      pinSpacing: true,
      invalidateOnRefresh: true,
    },
  });

  tl.fromTo(
    media,
    { clipPath: () => startClip() },
    { clipPath: "inset(0px 0px 0px 0px round 0px)", ease: "none", duration: 1 },
    0
  );

  if (copy) {
    tl.fromTo(copy, { color: "#1a1a1a" }, { color: "#ffffff", ease: "none", duration: 0.55 }, 0);
  }
}

function initFilmPins() {
  if (prefersReduce() || typeof ScrollTrigger === "undefined") return;
  document.querySelectorAll("[data-pin-film]").forEach((film) => {
    ScrollTrigger.create({
      trigger: film,
      start: "top top+=12",
      end: "+=110%",
      pin: true,
      pinSpacing: true,
    });
  });
}

function initLegacyPins() {
  if (prefersReduce() || typeof ScrollTrigger === "undefined") return;
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

function initKinetic() {
  const root = document.querySelector("[data-kinetic]");
  if (!root) return;
  const words = [...root.querySelectorAll(".kinetic__word")];
  if (!words.length || prefersReduce() || typeof ScrollTrigger === "undefined") return;

  const offsets = [
    { x: -90, y: -56, r: -9 },
    { x: 24, y: 78, r: 11 },
    { x: 96, y: -36, r: 7 },
  ];

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: "+=95%",
      pin: true,
      scrub: true,
    },
  });

  words.forEach((word, i) => {
    const o = offsets[i] || { x: 0, y: 40, r: 0 };
    tl.fromTo(
      word,
      { x: o.x, y: o.y, rotate: o.r, autoAlpha: 0.18 },
      { x: 0, y: 0, rotate: 0, autoAlpha: 1, ease: "none", duration: 1 },
      0
    );
  });
}

function initBlur() {
  const block = document.querySelector("[data-blur]");
  if (!block) return;
  const img = block.querySelector("img");
  if (!img) return;
  if (prefersReduce() || typeof ScrollTrigger === "undefined") {
    img.style.filter = "none";
    img.style.transform = "none";
    return;
  }
  gsap.fromTo(
    img,
    { filter: "blur(22px)", scale: 1.06 },
    {
      filter: "blur(0px)",
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: block,
        start: "top 80%",
        end: "top 28%",
        scrub: true,
      },
    }
  );
}

function initCarousel() {
  const root = document.querySelector("[data-carousel]");
  if (!root) return;
  const track = root.querySelector(".carousel__track");
  const view = root.querySelector(".carousel__viewport") || root;
  if (!track || prefersReduce() || typeof ScrollTrigger === "undefined") return;

  const shift = () => Math.max(track.scrollWidth - view.clientWidth, 0);

  gsap.to(track, {
    x: () => -shift(),
    ease: "none",
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: () => `+=${shift() + Math.round(window.innerHeight * 0.55)}`,
      pin: true,
      scrub: 0.35,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });
}

export function initChapters() {
  initInnerHero();
  if (typeof gsap === "undefined") return;
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
  if (prefersReduce()) {
    initHeroExpand();
    initBlur();
    return;
  }
  initHeroExpand();
  initFilmPins();
  initLegacyPins();
  initKinetic();
  initBlur();
  initCarousel();
}
