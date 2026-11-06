import { initCurtain } from "./curtain.js";
import { initContents } from "./contents.js";
import { initChapters } from "./chapters.js";
import { initFaq } from "./faq.js";
import { initMedia } from "./media.js";

function bootLenis() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || typeof Lenis === "undefined" || typeof gsap === "undefined") {
    return null;
  }

  const lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
  });

  if (typeof ScrollTrigger !== "undefined") {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  } else {
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  return lenis;
}

function initHeader() {
  const header = document.querySelector("[data-header]");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initNewsletter() {
  const form = document.querySelector("[data-newsletter]");
  if (!form) return;
  const status = form.querySelector("[data-newsletter-status]");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (status) {
      status.hidden = false;
      status.textContent = "Thanks — you’re on the study waitlist stub.";
    }
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  bootLenis();
  initHeader();
  initCurtain();
  initContents();
  initChapters();
  initFaq();
  initMedia();
  initNewsletter();
});
