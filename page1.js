// ============================================================
// BUDAK LAB — Page 1: Hero
// ============================================================

function animateHeroIn() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.call(() => revealNav(), null, 0);
  tl.to(".hero__eyebrow", { opacity: 1, y: 0, duration: 0.6 }, 0.1);
  tl.fromTo(".hero__title .word",
    { yPercent: 110, opacity: 0 },
    { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "power4.out" },
    0.2
  );
  tl.to(".hero__subtitle, .hero__desc", { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.55);
  tl.to(".hero__cycler", { opacity: 1, y: 0, duration: 0.6 }, 0.78);
  tl.to(".hero__cta", { opacity: 1, y: 0, duration: 0.6 }, 0.88);
  tl.to(".hero__visual", { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }, 0.35);
}

function initPhotoParallax() {
  const wrap = document.querySelector(".hero__photo-wrap");
  const visual = document.querySelector(".hero__visual");
  if (!wrap || !visual) return;
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    visual.addEventListener("mousemove", (e) => {
      const r = visual.getBoundingClientRect();
      const relX = (e.clientX - r.left - r.width / 2) / r.width;
      const relY = (e.clientY - r.top - r.height / 2) / r.height;
      gsap.to(wrap, { rotateY: relX * 4, rotateX: relY * -4, duration: 0.6, ease: "power2.out", transformPerspective: 900 });
    });
    visual.addEventListener("mouseleave", () => {
      gsap.to(wrap, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "power3.out" });
    });
  }
}

/* ---------- zoom-into-the-photo transition before leaving the page ---------- */
function initHeroExitTransition() {
  const cta = document.querySelector(".hero__cta");
  if (!cta) return;
  cta.addEventListener("click", (e) => {
    e.preventDefault();
    const dest = cta.getAttribute("href");
    const tl = gsap.timeline({
      defaults: { ease: "power2.in" },
      onComplete: () => { window.location.href = dest; },
    });
    tl.to(".hero__copy", { opacity: 0, y: -18, duration: 0.35 }, 0)
      .to(".hero__chip", { opacity: 0, duration: 0.25 }, 0)
      .to(".hero__photo-wrap", { scale: 1.5, duration: 0.75, ease: "power2.inOut" }, 0.05)
      .to(".hero__bg-gradient", { opacity: 0, duration: 0.4 }, 0.1)
      .to(".nav", { opacity: 0, duration: 0.3 }, 0.15)
      .to("body", { opacity: 0, duration: 0.3 }, "-=0.2");
  });
}

/* ---------- text scramble on the title words ---------- */
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+-/\\";

function scrambleWord(el, { duration = 700, revealDelay = 30 } = {}) {
  const final = el.dataset.final || el.textContent;
  const len = final.length;
  let frame = 0;
  const totalFrames = Math.round(duration / 30);
  const revealAt = Array.from({ length: len }, (_, i) => Math.round((i / len) * (totalFrames * 0.6)));

  const interval = setInterval(() => {
    let out = "";
    for (let i = 0; i < len; i++) {
      if (frame >= revealAt[i]) {
        out += final[i];
      } else {
        out += final[i] === " " ? " " : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
    }
    el.textContent = out;
    frame++;
    if (frame > totalFrames) {
      el.textContent = final;
      clearInterval(interval);
    }
  }, 30);
}

function initTitleScramble() {
  document.querySelectorAll(".hero__title .word").forEach((el, i) => {
    setTimeout(() => scrambleWord(el), 350 + i * 120);
  });
}

/* ---------- rotating "building across" word cycler ---------- */
const CYCLER_WORDS = ["Dashboards", "GIS", "Artificial Intelligence", "Web Platforms", "Applied Research"];
function initCycler() {
  const el = document.getElementById("cyclerWord");
  if (!el) return;
  let i = 0;
  setInterval(() => {
    i = (i + 1) % CYCLER_WORDS.length;
    gsap.to(el, {
      opacity: 0, y: -6, duration: 0.25, ease: "power2.in",
      onComplete: () => {
        el.textContent = CYCLER_WORDS[i];
        gsap.fromTo(el, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
      },
    });
  }, 2200);
}

/* ---------- cursor-aware spotlight ---------- */
function initSpotlight() {
  const hero = document.getElementById("landing");
  if (!hero || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  hero.addEventListener("mouseenter", () => hero.classList.add("has-spotlight"));
  hero.addEventListener("mouseleave", () => hero.classList.remove("has-spotlight"));
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty("--sx", `${e.clientX - r.left}px`);
    hero.style.setProperty("--sy", `${e.clientY - r.top}px`);
  });
}

/* ---------- one-time scan-line sweep across the photo ---------- */
function initScanline() {
  const line = document.getElementById("heroScanline");
  if (!line) return;
  gsap.set(line, { opacity: 1, top: "-20%" });
  gsap.to(line, { top: "110%", duration: 1.4, ease: "power2.inOut", delay: 1.4,
    onComplete: () => gsap.to(line, { opacity: 0, duration: 0.3 }) });
}

/* ---------- click ripple feedback on the CTA, before the zoom transition ---------- */
function initCtaRipple() {
  const cta = document.querySelector(".hero__cta");
  if (!cta) return;
  cta.addEventListener("click", (e) => {
    const r = cta.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "cta-ripple";
    ripple.style.left = (e.clientX - r.left) + "px";
    ripple.style.top = (e.clientY - r.top) + "px";
    cta.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
}

/* ---------- live local-time status chip in the nav ---------- */
function initNavClock() {
  const el = document.getElementById("navClock");
  if (!el) return;
  const update = () => {
    el.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  update();
  setInterval(update, 15000);
}

document.addEventListener("DOMContentLoaded", () => {
  gsap.set(".hero__visual", { opacity: 0, scale: 0.96 });
  initMagnetic();
  initPhotoParallax();
  initHeroExitTransition();
  initCycler();
  initSpotlight();
  initCtaRipple();
  initNavClock();

  runLoader(() => {
    animateHeroIn();
    initTitleScramble();
    initScanline();
  });
});