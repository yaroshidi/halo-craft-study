export function initCurtain() {
  const el = document.getElementById("curtain");
  if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const entering = sessionStorage.getItem("halo-curtain") === "1";
  if (entering) {
    sessionStorage.removeItem("halo-curtain");
    gsap.set(el, { autoAlpha: 1 });
    gsap.to(el, { autoAlpha: 0, duration: 0.55, ease: "power2.out", delay: 0.05 });
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (url.pathname === location.pathname && url.hash) return;
    if (a.hasAttribute("download")) return;

    e.preventDefault();
    sessionStorage.setItem("halo-curtain", "1");
    gsap.to(el, {
      autoAlpha: 1,
      duration: 0.45,
      ease: "power2.inOut",
      onComplete: () => {
        location.href = url.href;
      },
    });
  });
}
