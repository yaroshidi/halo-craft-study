export function initContents() {
  const rail = document.querySelector("[data-contents]");
  const chapters = [...document.querySelectorAll("[data-chapter]")];
  if (!rail || !chapters.length) return;

  const links = [...rail.querySelectorAll("a[data-target]")];

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.target === id);
    });
  };

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.dataset.chapter);
    },
    { rootMargin: "-25% 0px -45% 0px", threshold: [0.1, 0.35, 0.6] }
  );

  chapters.forEach((el) => io.observe(el));
  setActive(chapters[0].dataset.chapter);
}
