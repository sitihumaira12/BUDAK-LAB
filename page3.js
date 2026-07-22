// ============================================================
// BUDAK LAB — Page 3: Meet The Team
// Leader figure loads alone; clicking the leader (or "Meet The
// Others") brings the rest of the lab in BELOW the leader.
// Clicking any member opens their full profile: bio, join/leave
// status, skills, a contribution radar, and their shipped projects
// (each with a "View Project" button that opens a detail modal).
// ============================================================

function formatJoined(m) {
  return m.left ? `${m.joined} – ${m.left}` : `Joined ${m.joined}`;
}
function statusLabel(m) {
  return m.status === "current" ? "Current Member" : "Former Member";
}

// Renders a real photo if the member has one (member.photo = path to an
// image file), otherwise falls back to the illustrated figure from
// figures.js. This means adding a photo never requires touching figures.js —
// just add a `photo` field to that member's entry in members.js.
function buildVisual(member) {
  if (member.photo) {
    return `<div class="figure__photo-frame"><img class="figure__photo-img" src="${member.photo}" alt="${member.name}" loading="lazy" /></div>`;
  }
  return buildFigureSVG(member, member.id);
}

function createFigureEl(member, { withLabel = true } = {}) {
  const el = document.createElement("div");
  el.className = "figure";
  el.dataset.member = member.id;
  el.setAttribute("data-theme", member.theme);
  el.setAttribute("data-status", member.status);

  const label = member.isLeader
    ? `
      <span class="figure__label-name">${member.name}</span>
      ${member.tagline ? `<p class="figure__tagline">${member.tagline}</p>` : ""}
    `
    : `
      <span class="figure__label-name">${member.name}</span>
      <span class="figure__label-meta">${formatJoined(member)}</span>
      <span class="figure__label-status">${statusLabel(member)}</span>
    `;

  el.innerHTML = `
    <div class="figure__visual-wrap">
      ${buildVisual(member)}
    </div>
    ${withLabel ? `<div class="figure__label">${label}</div>` : ""}
  `;
  return el;
}

let teamRevealed = false;
const params = new URLSearchParams(window.location.search);

if (params.get("view") === "members") {

    // automatically trigger member view

    const leaderButton = document.querySelector(".leader-card");

    if (leaderButton) {
        leaderButton.click();
    }

}
function buildTeamLeader() {
  const slot = document.getElementById("leaderSlot");
  const leader = MEMBERS.find((m) => m.isLeader);
  const el = createFigureEl(leader);
  el.classList.add("figure--visible", "figure--leader");
  slot.appendChild(el);

  document.getElementById("teamBg").parentElement.setAttribute("data-theme", leader.theme);
  wireFigureClick(el, leader, { alsoReveal: true });
  initLeaderTilt(slot);

  gsap.from(el, {
    opacity: 0, y: 14, scale: 0.94, duration: 0.5, ease: "power2.out",
    onComplete: () => burstParticles(slot, { count: 10, colors: [themeColor(leader.theme)] }),
  });
}

// Subtle mouse-driven 3D tilt on the leader card — the interactive
// "premium" touch that replaces a static org-chart line.
function initLeaderTilt(slot) {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const wrap = slot.querySelector(".figure__visual-wrap");
  if (!wrap || typeof gsap.quickTo !== "function") return;
  const maxTilt = 9;
  const qx = gsap.quickTo(wrap, "rotationY", { duration: 0.5, ease: "power3.out" });
  const qy = gsap.quickTo(wrap, "rotationX", { duration: 0.5, ease: "power3.out" });
  slot.addEventListener("mousemove", (e) => {
    const r = slot.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    qx(px * maxTilt * 2);
    qy(-py * maxTilt * 2);
  });
  slot.addEventListener("mouseleave", () => { qx(0); qy(0); });
}

// Reveals the rest of the lab in a clean grid below the leader — laid
// out by CSS grid (3 per row, 2 on mobile), so nothing can overlap
// regardless of how many members there are.
function revealRestOfTeam() {
  if (teamRevealed) return;
  teamRevealed = true;

  const grid = document.getElementById("membersGrid");
  const leaderSlot = document.getElementById("leaderSlot");
  const others = MEMBERS.filter((m) => !m.isLeader).sort((a, b) => a.order - b.order);

  burstParticles(leaderSlot, { count: 26, colors: others.map((m) => themeColor(m.theme)) });

  others.forEach((m, i) => {
    const el = createFigureEl(m);
    grid.appendChild(el);
    wireFigureClick(el, m);
    gsap.set(el, { opacity: 0, y: 26, scale: 0.4, transformOrigin: "bottom center" });

    gsap.to(el, {
      opacity: 1, y: 0, scale: 1, duration: 0.85, delay: 0.15 + i * 0.09, ease: "back.out(1.6)",
      onComplete: () => el.classList.add("figure--visible"),
    });
  });

  document.getElementById("teamHint").textContent = "Click on a member's figure to open their profile.";
  const btn = document.getElementById("meetOthersBtn");
  btn.querySelector("span").textContent = "Everyone's here";
  btn.disabled = true;
  btn.style.opacity = 0.5;
  btn.style.pointerEvents = "none";

  initTeamFilters(others);
  scrollToMembersGrid();
  const cue = document.getElementById("scrollCue");
  if (cue) cue.classList.remove("is-visible");
}

function debounce(fn, wait) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
}

// ---- filter bar: All / Current / Alumni, with live counts ----
function initTeamFilters(others) {

  const bar = document.getElementById("teamFilters");
  if (!bar) return;

  const currentCount = others.filter(
    (m) => m.status === "current"
  ).length;

  const formerCount = others.filter(
    (m) => m.status === "former"
  ).length;


  bar.innerHTML = `
    <button class="filter-chip is-active" data-filter="all">
        All <span>${others.length}</span>
    </button>

    <button class="filter-chip" data-filter="current">
        Current <span>${currentCount}</span>
    </button>

    <button class="filter-chip" data-filter="former">
        Former <span>${formerCount}</span>
    </button>
  `;


  bar.hidden = false;


  bar.addEventListener("click", (e) => {

    const chip = e.target.closest(".filter-chip");

    if (!chip) return;


    bar.querySelectorAll(".filter-chip")
      .forEach((c) => 
        c.classList.toggle(
          "is-active",
          c === chip
        )
      );


    applyTeamFilter(chip.dataset.filter);

  });
}

function applyTeamFilter(filter) {

    const cards = document.querySelectorAll(".team-member-card");


    cards.forEach(card => {

        const status = card.dataset.status;


        if (filter === "all") {

            card.style.display = "";

        } 
        else if (status === filter) {

            card.style.display = "";

        } 
        else {

            card.style.display = "none";

        }

    });
}

// ---- particle "assemble" burst: a quick, playful pop of themed dots,
// used in place of the connector lines to mark the leader → team moment ----
function themeColor(themeKey) {
  const palette = {
    blue: "#3B6FF6", purple: "#8B5CF6", emerald: "#10B981", orange: "#F97316",
    rose: "#F43F5E", cyan: "#06B6D4", amber: "#F59E0B", teal: "#14B8A6", indigo: "#6366F1",
  };
  return palette[themeKey] || "#3B6FF6";
}

function getParticleLayer() {
  let layer = document.getElementById("particleLayer");
  if (!layer) {
    layer = document.createElement("div");
    layer.id = "particleLayer";
    layer.className = "particle-layer";
    document.body.appendChild(layer);
  }
  return layer;
}

function burstParticles(originEl, { count = 20, colors = ["#3B6FF6"] } = {}) {
  if (!originEl) return;
  const rect = originEl.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height * 0.4;
  const layer = getParticleLayer();

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("span");
    dot.className = "particle";
    dot.style.background = colors[i % colors.length];
    dot.style.left = originX + "px";
    dot.style.top = originY + "px";
    layer.appendChild(dot);

    const angle = Math.random() * Math.PI * 2;
    const dist = 70 + Math.random() * 170;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 30;
    const size = 5 + Math.random() * 6;

    gsap.set(dot, { width: size, height: size, opacity: 1, scale: 0 });
    gsap.to(dot, {
      x: dx, y: dy, scale: 1, opacity: 0,
      duration: 0.85 + Math.random() * 0.5, ease: "power2.out",
      onComplete: () => dot.remove(),
    });
  }
}

// Hover preview card — shows "Known for: <project>" without a click,
// so a time-strapped viewer can scan the whole team fast.
function initHoverPreview(el, member) {
  const preview = document.getElementById("teamPreview");
  if (!preview) return;
  const topProjectId = member.projects && member.projects[0];
  const topProject = topProjectId ? PROJECTS[topProjectId] : null;
  const text = topProject ? `Known for: ${topProject.title}` : member.role;

  const position = () => {
    const r = el.getBoundingClientRect();
    preview.style.left = (r.left + r.width / 2) + "px";
    preview.style.top = (r.top - 12) + "px";
  };

  el.addEventListener("mouseenter", () => {
    preview.textContent = text;
    preview.setAttribute("data-theme", member.theme);
    position();
    preview.classList.add("is-visible");
  });
  el.addEventListener("mousemove", position);
  el.addEventListener("mouseleave", () => preview.classList.remove("is-visible"));
}

// Achievement ticker — a quiet proof-of-work strip scrolling shipped
// project titles, so credibility is visible before anyone clicks.
function buildAchievementTicker() {
  const track = document.getElementById("tickerTrack");
  if (!track) return;
  const items = Object.values(PROJECTS);
  const chunk = items.map((p) => `<span class="ticker__item">${p.title} <span class="ticker__cat">— ${p.category}</span></span>`).join("");
  track.innerHTML = chunk + chunk; // duplicated for a seamless loop
}

// Smoothly scrolls the page so the newly-revealed grid comes into view,
// offset for the fixed nav so the top row isn't hidden behind it.
function scrollToMembersGrid() {
  const grid = document.getElementById("membersGrid");
  const nav = document.getElementById("nav");
  if (!grid) return;
  const navHeight = nav ? nav.getBoundingClientRect().height : 0;
  const targetY = grid.getBoundingClientRect().top + window.scrollY - navHeight - 24;
  window.scrollTo({ top: Math.max(targetY, 0), behavior: "smooth" });
}

function wireFigureClick(el, member, { alsoReveal = false } = {}) {
  el.addEventListener("click", () => {
    document.getElementById("teamBg").parentElement.setAttribute("data-theme", member.theme);
    if (alsoReveal) {
      revealRestOfTeam();
      return;
    }
    window.location.href = "profile.html?id=" + encodeURIComponent(member.id);
  });
  el.addEventListener("mouseenter", () => {
    document.getElementById("teamBg").parentElement.setAttribute("data-theme", member.theme);
  });
}

// ============================================================
// MEMBER PROFILE
// ============================================================

function buildRadarSVG(contribution) {
  const axes = [
    ["Leadership", contribution.leadership],
    ["Project", contribution.project],
    ["Technical", contribution.technical],
    ["Innovation", contribution.innovation],
    ["Collaboration", contribution.collaboration],
  ];
  const cx = 110, cy = 110, R = 78;
  const n = axes.length;
  const angleFor = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const pointFor = (i, valuePct) => {
    const r = (valuePct / 100) * R;
    const a = angleFor(i);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };

  const ringLevels = [25, 50, 75, 100];
  const rings = ringLevels
    .map((lvl) => {
      const pts = axes.map((_, i) => pointFor(i, lvl).join(",")).join(" ");
      return `<polygon points="${pts}" fill="none" stroke="rgba(13,15,20,0.08)" stroke-width="1"/>`;
    })
    .join("");

  const spokes = axes
    .map((_, i) => {
      const [x, y] = pointFor(i, 100);
      return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="rgba(13,15,20,0.08)" stroke-width="1"/>`;
    })
    .join("");

  const dataPts = axes.map((a, i) => pointFor(i, a[1]).join(",")).join(" ");

  const labels = axes
    .map((a, i) => {
      const angle = angleFor(i);
      const lx = cx + (R + 28) * Math.cos(angle);
      const ly = cy + (R + 28) * Math.sin(angle);
      const cos = Math.cos(angle);
      const anchor = Math.abs(cos) < 0.2 ? "middle" : cos > 0 ? "start" : "end";
      return `<text x="${lx}" y="${ly}" text-anchor="${anchor}" dominant-baseline="middle" class="radar__label">${a[0]}</text>`;
    })
    .join("");

  return `
    <svg viewBox="0 0 220 220" class="radar__svg">
      ${rings}${spokes}
      <polygon points="${dataPts}" fill="var(--accent-glow)" stroke="var(--accent)" stroke-width="2" class="radar__poly" id="radarPoly"/>
      ${labels}
    </svg>`;
}

function projectCardHTML(projectId) {
  const p = PROJECTS[projectId];
  if (!p) return "";
  return `
    <article class="project-card" data-project="${p.id}" data-theme="${p.theme}">
      <div class="project-card__top"><span class="project-card__cat">${p.category}</span></div>
      <div class="project-card__body">
        <h4 class="project-card__title">${p.title}</h4>
        <p class="project-card__summary">${p.summary}</p>
        <div class="project-card__stack">${p.stack.slice(0, 3).map((s) => `<span class="stack-chip">${s}</span>`).join("")}</div>
        <button class="project-card__btn" data-open-project="${p.id}">
          View Project
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    </article>`;
}

function openProfile(member) {
  document.getElementById("teamBg").parentElement.setAttribute("data-theme", member.theme);
  const bg = document.getElementById("profileBg");
  bg.parentElement.setAttribute("data-theme", member.theme);

  const photo = buildFigureSVG(member, "profile-" + member.id);

  const projectsHTML = member.projects && member.projects.length
    ? `<div class="profile-projects-grid">${member.projects.map(projectCardHTML).join("")}</div>`
    : `<p class="profile__no-projects">No projects logged yet.</p>`;

  const inner = document.getElementById("profileInner");
  inner.innerHTML = `
    <div class="profile__header" data-reveal>
      <div class="profile__photo-frame">${photo}</div>
      <div>
        <div class="profile__badges">
          <span class="profile__badge">${formatJoined(member)}</span>
          <span class="profile__badge profile__badge--status">${statusLabel(member)}</span>
        </div>
        <h2 class="profile__name">${member.name}</h2>
        <p class="profile__role">${member.role}</p>
        <p class="profile__bio">${member.bio}</p>
      </div>
    </div>

    <div class="profile__body">
      <div>
        <p class="profile__block-label">Skills</p>
        <div id="profileSkills">
          ${member.skills.map((s) => `
            <div class="skill-row">
              <div class="skill-top"><span>${s.name}</span><span>${s.level}%</span></div>
              <div class="skill-bar-track"><div class="skill-bar-fill" data-target="${s.level}"></div></div>
            </div>`).join("")}
        </div>
      </div>
      <div>
        <p class="profile__block-label">Contribution</p>
        <div class="radar__wrap">${buildRadarSVG(member.contribution)}</div>
      </div>
    </div>

    <div class="profile__projects">
      <p class="profile__block-label">Projects Shipped</p>
      ${projectsHTML}
    </div>
  `;

  document.getElementById("profile").scrollIntoView({ behavior: "smooth" });

  revealElements("#profileInner [data-reveal]");
  requestAnimationFrame(() => {
    inner.querySelectorAll(".skill-bar-fill").forEach((bar) => {
      setTimeout(() => { bar.style.width = bar.dataset.target + "%"; }, 250);
    });
    const poly = document.getElementById("radarPoly");
    if (poly) setTimeout(() => poly.classList.add("is-visible"), 300);
  });

  inner.querySelectorAll("[data-open-project]").forEach((btn) => {
    btn.addEventListener("click", () => openProjectModal(btn.dataset.openProject));
  });
}

// ============================================================
// PROJECT DETAIL MODAL
// ============================================================
function openProjectModal(projectId) {
  const p = PROJECTS[projectId];
  if (!p) return;
  const panel = document.getElementById("modalPanel");
  panel.innerHTML = `
    <div class="modal__top" data-theme="${p.theme}">
      <button class="modal__close" id="modalClose" aria-label="Close">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="#0D0F14" stroke-width="1.6" stroke-linecap="round"/></svg>
      </button>
      <span class="modal__cat">${p.category}</span>
      <h3 class="modal__title">${p.title}</h3>
    </div>
    <div class="modal__body">
      <div class="modal__section"><h4>Overview</h4><p>${p.overview}</p></div>
      <div class="modal__section"><h4>Problem</h4><p>${p.problem}</p></div>
      <div class="modal__section"><h4>Solution</h4><p>${p.solution}</p></div>
      <div class="modal__section">
        <h4>Stack</h4>
        <div class="modal__stack">${p.stack.map((s) => `<span class="stack-chip">${s}</span>`).join("")}</div>
      </div>
    </div>
  `;
  const overlay = document.getElementById("projectModal");
  overlay.hidden = false;
  requestAnimationFrame(() => overlay.classList.add("is-open"));
  document.body.style.overflow = "hidden";
  document.getElementById("modalClose").addEventListener("click", closeProjectModal);
}
function closeProjectModal() {
  const overlay = document.getElementById("projectModal");
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
  setTimeout(() => { overlay.hidden = true; }, 400);
}

// ---- fills in the dynamic "N builders" title + stat chips so the
// numbers never drift out of sync with the roster ----
function animateTeamStats() {
  const builderCount = MEMBERS.length;
  const shippedCount = Object.keys(PROJECTS).length;

  const countEl = document.getElementById("teamCount");
  if (countEl) countEl.textContent = builderCount;

  [
    ["statBuilders", builderCount],
    ["statShipped", shippedCount],
  ].forEach(([id, target]) => {
    const el = document.getElementById(id);
    if (!el) return;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target, duration: 1.1, ease: "power2.out", delay: 0.5,
      onUpdate: () => { el.textContent = Math.round(obj.v); },
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildTeamLeader();
  buildAchievementTicker();
  initMagnetic();
  animateTeamStats();

  runLoader(() => {
    revealNav();
    revealElements("[data-reveal]");
    const cue = document.getElementById("scrollCue");
    if (cue) setTimeout(() => cue.classList.add("is-visible"), 900);
  });

  document.getElementById("meetOthersBtn").addEventListener("click", revealRestOfTeam);

  const modalBackdrop = document.getElementById("modalBackdrop");
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeProjectModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProjectModal();
  });
});
// Auto reveal members when returning from profile page
window.addEventListener("load", () => {

    if (window.location.hash === "#gridSection") {

        setTimeout(() => {

            const leader = document.querySelector(".figure--leader");

            if (leader) {
                leader.click();
            }

            setTimeout(() => {
                document
                    .getElementById("gridSection")
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
            }, 500);

        }, 800);

    }

});