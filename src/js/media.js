export function initMedia() {
  document.querySelectorAll("[data-media]").forEach((wrap) => {
    const video = wrap.querySelector("video");
    const btn = wrap.querySelector(".pause-dot, button");
    if (!video || !btn) return;

    const sync = () => {
      const paused = video.paused;
      btn.setAttribute("aria-label", paused ? "Play" : "Pause");
      btn.classList.toggle("is-paused", paused);
    };

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (video.paused) video.play().catch(() => {});
      else video.pause();
      sync();
    });

    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    sync();
  });
}
