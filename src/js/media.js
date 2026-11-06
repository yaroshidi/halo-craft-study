export function initMedia() {
  document.querySelectorAll("[data-media]").forEach((wrap) => {
    const video = wrap.querySelector("video");
    const btn = wrap.querySelector("button");
    if (!video || !btn) return;

    const sync = () => {
      btn.setAttribute("aria-label", video.paused ? "Play" : "Pause");
      btn.textContent = video.paused ? "▶" : "❚❚";
    };

    btn.addEventListener("click", () => {
      if (video.paused) video.play();
      else video.pause();
      sync();
    });

    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    sync();
  });
}
