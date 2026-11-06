const MAX_MS = 1200;

function hide(el) {
  el.classList.add("is-done");
  el.classList.remove("is-leaving");
}

export function initCurtain() {
  const el = document.getElementById("curtain");
  if (!el) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    hide(el);
    return;
  }

  // CSS owns the first-load animation. Never wait on fonts, video, or CDNs.
  const done = () => hide(el);
  window.setTimeout(done, MAX_MS);
  el.addEventListener("animationend", (e) => {
    if (e.animationName === "curtain-dismiss") done();
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
    el.classList.remove("is-done");
    el.classList.add("is-leaving");

    let hopped = false;
    const go = () => {
      if (hopped) return;
      hopped = true;
      location.href = url.href;
    };
    window.setTimeout(go, 380);
    window.setTimeout(go, 800);
  });
}
