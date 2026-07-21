// ============================================================
// BUDAK LAB — Page 2: The Reel
// A cinematic auto-playing crossfade montage built from stills —
// not a click-and-drag slider. Falls back to a themed icon tile
// per item if its image file isn't present yet in assets/projects/.
// ============================================================

const SLIDE_MS = 4200;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let currentIndex = 0;
let isPlaying = !reduceMotion;
let timer = null;

function buildReel() {
  const frame = document.getElementById("reelFrame");
  const ticksWrap = document.getElementById("reelTicks");
  const thumbsWrap = document.getElementById("reelThumbs");

  REEL_ITEMS.forEach((item, i) => {
    // slide
    const slide = document.createElement("div");
    slide.className = "reel__slide";
    slide.dataset.index = i;
    slide.innerHTML = `
      <div class="reel__slide-fallback">
        <div class="reel__slide-fallback-icon">${item.icon}</div>
      </div>
      <div class="reel__slide-media" style="display:none;"></div>
      <div class="reel__slide-scrim"></div>
      <div class="reel__caption">
        <span class="reel__caption-index">0${i + 1} / 0${REEL_ITEMS.length}</span>
        <h3 class="reel__caption-title">${item.title}</h3>
        <p class="reel__caption-desc">${item.desc}</p>
      </div>
    `;
    slide.setAttribute("data-theme", item.theme);
    frame.appendChild(slide);
    preloadSlideImage(slide, item);

    // tick
    const tick = document.createElement("div");
    tick.className = "reel__tick";
    tick.dataset.index = i;
    tick.innerHTML = `<span class="reel__tick-fill"></span>`;
    tick.addEventListener("click", () => goToSlide(i, { user: true }));
    ticksWrap.appendChild(tick);

    // thumb
    const thumb = document.createElement("div");
    thumb.className = "reel__thumb";
    thumb.dataset.index = i;
    thumb.setAttribute("data-theme", item.theme);
    thumb.innerHTML = `
      <div class="reel__thumb-fallback">${item.icon}</div>
      <div class="reel__thumb-media" style="display:none;"></div>
      <span class="reel__thumb-label">${item.title}</span>
    `;
    thumb.addEventListener("click", () => goToSlide(i, { user: true }));
    thumbsWrap.appendChild(thumb);
    preloadThumbImage(thumb, item);
  });
}

// Attempts to load each item's photo. On success, swaps the themed
// fallback tile for the real image. On failure (file not added yet),
// the fallback simply stays — the reel still looks intentional.
function preloadSlideImage(slide, item) {
  const img = new Image();
  img.onload = () => {
    const media = slide.querySelector(".reel__slide-media");
    media.style.backgroundImage = `url("${item.image}")`;
    media.style.display = "block";
    slide.querySelector(".reel__slide-fallback").style.display = "none";
  };
  img.src = item.image;
}
function preloadThumbImage(thumb, item) {
  const img = new Image();
  img.onload = () => {
    const media = thumb.querySelector(".reel__thumb-media");
    media.style.backgroundImage = `url("${item.image}")`;
    media.style.display = "block";
    thumb.querySelector(".reel__thumb-fallback").style.display = "none";
  };
  img.src = item.image;
}

function goToSlide(index, { user = false } = {}) {
  hideEndcard();

  const slides = document.querySelectorAll(".reel__slide");
  const ticks = document.querySelectorAll(".reel__tick");
  const thumbs = document.querySelectorAll(".reel__thumb");

  slides.forEach((s, i) => s.classList.toggle("is-active", i === index));
  thumbs.forEach((t, i) => t.classList.toggle("is-active", i === index));

  ticks.forEach((t, i) => {
    t.classList.remove("is-active", "is-paused");
    if (i < index) t.classList.add("is-done");
    else t.classList.remove("is-done");
  });
  // force reflow so the fill animation restarts cleanly on the new tick
  void ticksWrapEl().offsetWidth;
  const activeTick = ticks[index];
  activeTick.classList.add("is-active");
  if (!isPlaying) activeTick.classList.add("is-paused");

  currentIndex = index;

  if (user) restartTimer();
}

function ticksWrapEl() {
  return document.getElementById("reelTicks");
}

// Plays through the reel once. On reaching the last slide, instead of
// looping back to the start it reveals the "Meet The Team" end card —
// like a short showreel that finishes on a call to action.
function nextSlide() {
  if (currentIndex >= REEL_ITEMS.length - 1) {
    const ticks = document.querySelectorAll(".reel__tick");
    const lastTick = ticks[ticks.length - 1];
    if (lastTick) { lastTick.classList.remove("is-active"); lastTick.classList.add("is-done"); }
    showEndcard();
    return;
  }
  goToSlide(currentIndex + 1);
}

function showEndcard() {
  clearInterval(timer);
  isPlaying = false;
  document.getElementById("reel").classList.add("is-ended");
  document.getElementById("reelEndcard").classList.add("is-visible");
}
function hideEndcard() {
  const reel = document.getElementById("reel");
  const wasEnded = reel.classList.contains("is-ended");
  reel.classList.remove("is-ended");
  document.getElementById("reelEndcard").classList.remove("is-visible");
  if (wasEnded) {
    isPlaying = !reduceMotion;
    const icon = document.getElementById("reelPlayIcon");
    icon.innerHTML = `<rect x="2" y="1.5" width="3.4" height="11" rx="1" fill="currentColor"/><rect x="8.6" y="1.5" width="3.4" height="11" rx="1" fill="currentColor"/>`;
  }
}

function startTimer() {
  clearInterval(timer);
  if (!isPlaying) return;
  timer = setInterval(nextSlide, SLIDE_MS);
}
function restartTimer() {
  startTimer();
}

function togglePlay() {
  isPlaying = !isPlaying;
  const icon = document.getElementById("reelPlayIcon");
  const activeTick = document.querySelector(".reel__tick.is-active");
  if (isPlaying) {
    icon.innerHTML = `<rect x="2" y="1.5" width="3.4" height="11" rx="1" fill="currentColor"/><rect x="8.6" y="1.5" width="3.4" height="11" rx="1" fill="currentColor"/>`;
    if (activeTick) activeTick.classList.remove("is-paused");
    startTimer();
  } else {
    icon.innerHTML = `<path d="M3 1.5L12 7L3 12.5V1.5Z" fill="currentColor"/>`;
    if (activeTick) activeTick.classList.add("is-paused");
    clearInterval(timer);
  }
}

function wireControls() {
  document.getElementById("reelPrev").addEventListener("click", () => {
    goToSlide((currentIndex - 1 + REEL_ITEMS.length) % REEL_ITEMS.length, { user: true });
  });
  document.getElementById("reelNext").addEventListener("click", () => {
    goToSlide((currentIndex + 1) % REEL_ITEMS.length, { user: true });
  });
  document.getElementById("reelPlay").addEventListener("click", togglePlay);
}

document.addEventListener("DOMContentLoaded", () => {
  buildReel();
  wireControls();
  initMagnetic();

  runLoader(() => {
    revealNav();
    revealElements("[data-reveal]");
    goToSlide(0);
    if (isPlaying) {
      startTimer();
    } else {
      // reduced-motion: land paused on the first slide, icon shows "play"
      document.getElementById("reelPlayIcon").innerHTML = `<path d="M3 1.5L12 7L3 12.5V1.5Z" fill="currentColor"/>`;
      document.querySelector(".reel__tick.is-active")?.classList.add("is-paused");
    }
  });
});
