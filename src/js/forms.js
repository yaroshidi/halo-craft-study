export function initForms() {
  document.querySelectorAll("[data-beta-form]").forEach((form) => {
    const status = form.querySelector("[data-form-status]");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.querySelectorAll(".field-error").forEach((el) => el.remove());

      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const city = form.querySelector('[name="city"]');
      let ok = true;

      const fail = (input, msg) => {
        ok = false;
        const err = document.createElement("p");
        err.className = "field-error";
        err.textContent = msg;
        input?.closest(".field")?.appendChild(err);
      };

      if (!name?.value.trim() || name.value.trim().length < 2) {
        fail(name, "Enter your name.");
      }
      if (!email?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        fail(email, "Enter a valid email.");
      }
      if (!city?.value.trim()) {
        fail(city, "Enter your city.");
      }

      if (!ok) return;

      if (status) {
        status.hidden = false;
        status.textContent = "Thanks — we saved this as a study stub (no server).";
      }
      form.reset();
    });
  });
}
