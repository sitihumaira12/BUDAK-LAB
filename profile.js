// ============================================================
// BUDAK LAB — profile.html
// Reads ?id= from the URL and renders that member's full profile:
// bio, join/leave status, skills, a contribution radar, and their
// shipped projects (each with a "View Project" button that opens
// a detail modal).
// ============================================================

function formatJoined(m) {
  return m.left ? `Joined ${m.joined} · Left ${m.left}` : `Joined ${m.joined}`;
}
function statusLabel(m) {
  return m.status === "current" ? "Current Member" : "Alumni";
}

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

function renderProfile(member) {
  document.title = `${member.name} — BUDAK LAB`;
  document.getElementById("profileBg").parentElement.setAttribute("data-theme", member.theme);

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

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const member = MEMBERS.find((m) => m.id === id) || MEMBERS[0];

  initMagnetic();

  runLoader(() => {
    revealNav();
    renderProfile(member);
  });

  document.getElementById("modalBackdrop").addEventListener("click", closeProjectModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProjectModal();
  });
});