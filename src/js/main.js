import { initCurtain } from "./curtain.js";
import { initContents } from "./contents.js";
import { initChapters } from "./chapters.js";
import { initFaq } from "./faq.js";
import { initMedia } from "./media.js";
import { initForms } from "./forms.js";

function bootLenis() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || typeof Lenis === "undefined" || typeof gsap === "undefined") {
    document.documentElement.classList.add("reduce-motion");
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

function initMenu() {
  const btn = document.querySelector("[data-menu-toggle]");
  const panel = document.querySelector("[data-menu]");
  if (!btn || !panel) return;

  const close = () => {
    btn.setAttribute("aria-expanded", "false");
    panel.hidden = true;
  };

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = btn.getAttribute("aria-expanded") === "true";
    if (open) close();
    else {
      btn.setAttribute("aria-expanded", "true");
      panel.hidden = false;
    }
  });

  panel.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest("[data-header]")) close();
  });
}

function initNavCurrent() {
  const parts = location.pathname.split("/").filter(Boolean);
  const known = new Set(["technology", "design", "company", "journal", "beta", "legal", "privacy", "terms", "hello-halo"]);
  const page = [...parts].reverse().find((p) => known.has(p)) || "home";

  document.querySelectorAll(".menu-panel a[href], .nav a[href], .nav-cta[href]").forEach((a) => {
    const href = a.getAttribute("href") || "";
    let match = false;
    if (page === "home") {
      match = /\/$/.test(href) && !/(technology|design|company|journal|beta|legal)/.test(href);
    } else if (page === "hello-halo" || page === "journal") {
      match = href.includes("/journal");
    } else if (page === "privacy" || page === "terms" || page === "legal") {
      match = false;
    } else {
      match = href.includes(`/${page}`);
    }
    if (match) a.setAttribute("aria-current", "page");
  });
}

function initNewsletter() {
  document.querySelectorAll("[data-newsletter]").forEach((form) => {
    const status = form.parentElement?.querySelector("[data-newsletter-status]") || form.querySelector("[data-newsletter-status]");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.querySelector('[type="email"]');
      if (!email?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        if (status) {
          status.hidden = false;
          status.textContent = "Enter a valid email.";
        }
        return;
      }
      if (status) {
        status.hidden = false;
        status.textContent = "Thanks — you’re on the founding-household list.";
      }
      form.reset();
    });
  });
}

function initPoll() {
  const poll = document.querySelector("[data-poll]");
  if (!poll) return;
  const note = document.querySelector("[data-poll-note]");
  const buttons = [...poll.querySelectorAll("button")];
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => {
        b.classList.toggle("is-picked", b === btn);
      });
      if (note) note.hidden = false;
    });
  });
}

function initLocalePill() {
  const el = document.querySelector("[data-locale-pill]");
  if (!el) return;
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dubai",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
  const tick = () => {
    el.textContent = `Dubai · ${fmt.format(new Date())}`;
  };
  tick();
  setInterval(tick, 30000);
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("reduce-motion");
  }
  bootLenis();
  initHeader();
  initMenu();
  initNavCurrent();
  initCurtain();
  initContents();
  initChapters();
  initFaq();
  initMedia();
  initNewsletter();
  initForms();
  initPoll();
  initLocalePill();
});
