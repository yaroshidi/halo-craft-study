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
  const top = Math.round(window.innerHeight * 0.5);
  return `inset(${top}px 12px 12px 12px round 8px)`;
}

function setHeroEndState(media, scrim, ink, light, kickerInk, kickerLight) {
  if (media) media.style.clipPath = "inset(0px 0px 0px 0px round 0px)";
  if (scrim) scrim.style.opacity = "0.42";
  if (ink) ink.style.opacity = "0";
  if (light) light.style.opacity = "1";
  if (kickerInk) kickerInk.style.opacity = "0";
  if (kickerLight) kickerLight.style.opacity = "1";
}

function initHeroExpand() {
  const hero = document.querySelector("[data-hero]");
  const media = document.querySelector("[data-hero-media]");
  const scrim = document.querySelector("[data-hero-scrim]");
  const ink = document.querySelector(".hero__title-ink");
  const light = document.querySelector(".hero__title-light");
  const kickerInk = document.querySelector(".hero__kicker-ink");
  const kickerLight = document.querySelector(".hero__kicker-light");
  const pin = hero?.querySelector(".hero__pin");
  if (!hero || !media || !pin) return;

  if (prefersReduce() || typeof ScrollTrigger === "undefined") {
    setHeroEndState(media, scrim, ink, light, kickerInk, kickerLight);
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "+=160%",
      scrub: 0.55,
      pin,
      pinSpacing: true,
      invalidateOnRefresh: true,
    },
  });

  tl.fromTo(
    media,
    { clipPath: () => startClip() },
    { clipPath: "inset(0px 0px 0px 0px round 0px)", ease: "power2.inOut", duration: 1 },
    0
  );

  if (scrim) {
    tl.fromTo(scrim, { opacity: 0 }, { opacity: 0.42, ease: "power1.out", duration: 0.5 }, 0.06);
  }

  // Crossfade dual layers instead of interpolating ink→white (avoids grey mush).
  if (ink) tl.fromTo(ink, { opacity: 1 }, { opacity: 0, ease: "none", duration: 0.18 }, 0.28);
  if (light) tl.fromTo(light, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.18 }, 0.3);
  if (kickerInk) tl.fromTo(kickerInk, { opacity: 1 }, { opacity: 0, ease: "none", duration: 0.18 }, 0.28);
  if (kickerLight) tl.fromTo(kickerLight, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.18 }, 0.3);
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

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: "+=90%",
      pin: true,
      scrub: 0.4,
    },
  });

  words.forEach((word, i) => {
    tl.fromTo(
      word,
      { y: 64 + i * 12, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, ease: "power2.out", duration: 1 },
      i * 0.12
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

function setActiveTab(tabs, name) {
  tabs.forEach((tab) => {
    const on = tab.dataset.tab === name;
    tab.classList.toggle("is-active", on);
    tab.setAttribute("aria-selected", on ? "true" : "false");
  });
}

function initCarousel() {
  const root = document.querySelector("[data-carousel]");
  if (!root) return;
  const track = root.querySelector(".showcase__track, .carousel__track");
  const view = root.querySelector(".showcase__viewport, .carousel__viewport") || root;
  const tabs = [...root.querySelectorAll("[data-tab]")];
  if (!track) return;

  const slides = [...track.children];
  tabs.forEach((tab) => {
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", tab.classList.contains("is-active") ? "true" : "false");
  });

  const groupAt = (offset) => {
    let group = slides[0]?.dataset.group || "features";
    slides.forEach((slide) => {
      if (slide.offsetLeft <= offset + 48) group = slide.dataset.group || group;
    });
    return group;
  };

  if (prefersReduce() || typeof ScrollTrigger === "undefined") {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const first = slides.find((s) => s.dataset.group === tab.dataset.tab);
        if (!first) return;
        view.scrollTo({ left: first.offsetLeft, behavior: "auto" });
        setActiveTab(tabs, tab.dataset.tab);
      });
    });
    view.addEventListener("scroll", () => setActiveTab(tabs, groupAt(view.scrollLeft)), { passive: true });
    return;
  }

  const shift = () => Math.max(track.scrollWidth - view.clientWidth, 0);

  const tween = gsap.to(track, {
    x: () => -shift(),
    ease: "none",
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: () => `+=${shift() + Math.round(window.innerHeight * 0.7)}`,
      pin: true,
      scrub: 0.35,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      onUpdate: (self) => setActiveTab(tabs, groupAt(shift() * self.progress)),
    },
  });

  const st = tween.scrollTrigger;
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const first = slides.find((s) => s.dataset.group === tab.dataset.tab);
      if (!first || !st) return;
      const total = shift();
      const progress = total ? first.offsetLeft / total : 0;
      const y = st.start + (st.end - st.start) * Math.min(Math.max(progress, 0), 1);
      const lenis = window.__haloLenis;
      if (lenis) lenis.scrollTo(y, { duration: 1.05 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    });
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
    initCarousel();
    return;
  }
  initHeroExpand();
  initFilmPins();
  initLegacyPins();
  initKinetic();
  initBlur();
  initCarousel();
}
