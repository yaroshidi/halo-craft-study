const MARK = `
  <div class="curtain__mark" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="52" height="52">
      <circle cx="12" cy="12" r="7.25" fill="none" stroke="currentColor" stroke-width="1.75"/>
      <circle cx="12" cy="12" r="2.15" fill="currentColor"/>
    </svg>
  </div>
`;

export function initCurtain() {
  const el = document.getElementById("curtain");
  if (!el) return;

  el.innerHTML = MARK;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || typeof gsap === "undefined") {
    el.style.display = "none";
    return;
  }

  const entering = sessionStorage.getItem("halo-curtain") === "1";
  if (entering) sessionStorage.removeItem("halo-curtain");

  const mark = el.querySelector(".curtain__mark");
  gsap.set(el, { autoAlpha: 1 });
  if (mark) {
    gsap.fromTo(
      mark,
      { scale: 0.82, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 0.45, ease: "power2.out" }
    );
  }

  gsap.to(el, {
    autoAlpha: 0,
    duration: 0.7,
    ease: "power2.inOut",
    delay: entering ? 0.12 : 0.62,
  });

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
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        location.href = url.href;
      },
    });
  });
}
