// ============================================================
// BUDAK LAB — Common (shared across all pages)
// Loader, nav reveal, magnetic buttons. No custom cursor —
// the system pointer is left alone everywhere on the site.
// ============================================================

/* ---------- loader ---------- */
function runLoader(onDone) {
  const fill = document.getElementById("loaderFill");
  const pct = document.getElementById("loaderPct");
  const loader = document.getElementById("loader");
  const obj = { v: 0 };
  gsap.to(obj, {
    v: 100,
    duration: 1.3,
    ease: "power2.inOut",
    onUpdate: () => {
      fill.style.width = obj.v + "%";
      pct.textContent = String(Math.round(obj.v)).padStart(2, "0");
    },
    onComplete: () => {
      gsap.to(loader, {
        yPercent: -100,
        duration: 0.85,
        ease: "power4.inOut",
        delay: 0.12,
        onComplete: () => {
          loader.style.display = "none";
          onDone();
        },
      });
    },
  });
}

/* ---------- nav ---------- */
function revealNav() {
  gsap.to(".nav", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
}

/* ---------- generic fade-up reveal for [data-reveal] elements ---------- */
function revealElements(selector, { delay = 0, stagger = 0.09 } = {}) {
  const els = gsap.utils.toArray(selector);
  gsap.to(els, { opacity: 1, y: 0, duration: 0.7, stagger, delay, ease: "power3.out" });
  return els;
}

/* ---------- stat counters ---------- */
function animateStats(selector = ".stat__num") {
  gsap.utils.toArray(selector).forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target, duration: 1.3, ease: "power2.out",
      onUpdate: () => (el.textContent = Math.round(obj.v)),
    });
  });
}

/* ---------- magnetic buttons (hover pull effect, not a cursor) ---------- */
function initMagnetic() {
  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const relX = e.clientX - r.left - r.width / 2;
      const relY = e.clientY - r.top - r.height / 2;
      gsap.to(btn, { x: relX * 0.25, y: relY * 0.4, duration: 0.4, ease: "power2.out" });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
    });
  });
}
