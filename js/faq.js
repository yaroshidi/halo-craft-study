export function initFaq() {
  const root = document.querySelector("[data-faq]");
  if (!root) return;

  const items = [...root.querySelectorAll(".faq__item")];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  items.forEach((item) => {
    const btn = item.querySelector(".faq__q");
    const panel = item.querySelector(".faq__a");
    const inner = item.querySelector(".faq__a-inner");
    if (!btn || !panel || !inner) return;

    btn.addEventListener("click", () => {
      const open = item.classList.contains("is-open");

      items.forEach((other) => {
        if (other === item) return;
        other.classList.remove("is-open");
        other.querySelector(".faq__q")?.setAttribute("aria-expanded", "false");
        const p = other.querySelector(".faq__a");
        if (!p) return;
        if (reduce) {
          p.style.height = "0px";
        } else {
          gsap.to(p, { height: 0, duration: 0.35, ease: "power2.inOut" });
        }
      });

      if (open) {
        item.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
        if (reduce) panel.style.height = "0px";
        else gsap.to(panel, { height: 0, duration: 0.35, ease: "power2.inOut" });
        return;
      }

      item.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      if (reduce) {
        panel.style.height = "auto";
      } else {
        gsap.set(panel, { height: "auto" });
        const h = panel.offsetHeight;
        gsap.fromTo(
          panel,
          { height: 0 },
          { height: h, duration: 0.4, ease: "power2.out" }
        );
      }
    });
  });
}
