// ============================================================
// BUDAK LAB — Illustrated Figure Generator
// Consistent flat-vector cast: one silhouette system, 8 accent themes.
// Male leader = short geometric hair + collared silhouette.
// Female members = draped hijab silhouette, varied drape angle per member
// so the group doesn't feel copy-pasted, while staying one cohesive style.
// ============================================================

function buildFigureSVG(member, uid) {
  const gid = `grad-${uid}`;
  const sid = `shine-${uid}`;

  // slight per-member variation so 7 hijab figures don't look identical
  const drapeSeeds = [6, -4, 3, -6, 5, -3, 4];
  const seed = drapeSeeds[member.order % drapeSeeds.length] || 0;

  const body = member.gender === "m" ? maleBody(gid) : femaleBody(gid, seed);

  return `
  <svg class="figure__svg" viewBox="0 0 200 420" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--accent-light)" />
        <stop offset="100%" stop-color="var(--accent)" />
      </linearGradient>
      <linearGradient id="${sid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
      </linearGradient>
    </defs>
    <ellipse cx="100" cy="404" rx="46" ry="10" fill="var(--accent)" opacity="0.14" />
    ${body}
  </svg>`;
}

function maleBody(gid) {
  return `
    <!-- legs -->
    <rect x="72" y="300" width="24" height="95" rx="12" fill="var(--ink-soft)" opacity="0.9"/>
    <rect x="104" y="300" width="24" height="95" rx="12" fill="var(--ink-soft)" opacity="0.9"/>
    <!-- torso: collared silhouette -->
    <path d="M62 190 C62 160 78 140 100 140 C122 140 138 160 138 190 L142 300 C142 312 130 320 100 320 C70 320 58 312 58 300 Z"
      fill="url(#${gid})"/>
    <path d="M86 150 L100 172 L114 150 L108 142 L100 154 L92 142 Z" fill="#ffffff" opacity="0.85"/>
    <!-- neck -->
    <rect x="90" y="118" width="20" height="26" rx="8" fill="#F0C8A2"/>
    <!-- head -->
    <circle cx="100" cy="92" r="34" fill="#F5D3AE"/>
    <!-- short geometric hair -->
    <path d="M66 88 C64 58 80 40 100 40 C120 40 136 58 134 88 C130 72 116 62 100 62 C84 62 70 72 66 88 Z" fill="var(--ink)"/>
    <path d="M100 174 L128 300 L72 300 Z" fill="url(#shine-${gid.split('-')[1]})" opacity="0.5"/>
  `;
}

function femaleBody(gid, seed) {
  return `
    <!-- legs / hemline shadow -->
    <path d="M64 300 L60 395 C60 402 70 406 100 406 C130 406 140 402 140 395 L136 300 Z" fill="var(--ink-soft)" opacity="0.9"/>
    <!-- dress / abaya silhouette -->
    <path d="M60 200 C58 168 76 146 100 146 C124 146 142 168 140 200 L150 320 C150 334 128 342 100 342 C72 342 50 334 50 320 Z"
      fill="url(#${gid})"/>
    <!-- neck -->
    <rect x="90" y="120" width="20" height="24" rx="8" fill="#F0C8A2"/>
    <!-- head -->
    <circle cx="100" cy="94" r="33" fill="#F5D3AE"/>
    <!-- hijab: cap + draped shoulders, angled by seed for variation -->
    <path d="M64 96 C62 60 78 38 100 38 C122 38 138 60 136 96 C136 108 130 116 100 116 C70 116 64 108 64 96 Z" fill="url(#${gid})"/>
    <path d="M${64 + seed} 92 C40 130 34 180 44 210 L66 200 C58 170 62 130 ${72 + seed} 100 Z" fill="url(#${gid})"/>
    <path d="M${136 + seed} 92 C160 130 166 180 156 210 L134 200 C142 170 138 130 ${128 + seed} 100 Z" fill="url(#${gid})"/>
    <path d="M100 118 C86 118 76 112 70 100 C76 108 88 112 100 112 C112 112 124 108 130 100 C124 112 114 118 100 118 Z" fill="#ffffff" opacity="0.35"/>
  `;
}

// ============================================================
// Domain icon badges — small line icons shown on each figure so
// the team grid can be scanned at a glance (who does what).
// ============================================================
const DOMAIN_ICONS = {
  engineering: '<path d="M8 3L3 8L8 13M16 3L21 8L16 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  ai: '<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  gis: '<path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="12" cy="9" r="2.2" stroke="currentColor" stroke-width="1.6" fill="none"/>',
  frontend: '<rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M8 21h8M12 17v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  data: '<path d="M4 19V10M10 19V5M16 19v-7M22 19H2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  research: '<circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M20 20l-4.8-4.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  backend: '<ellipse cx="12" cy="5.5" rx="8" ry="2.8" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M4 5.5v13c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8v-13M4 12c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8" stroke="currentColor" stroke-width="1.6" fill="none"/>',
};

function buildDomainBadge(domain) {
  const icon = DOMAIN_ICONS[domain] || DOMAIN_ICONS.engineering;
  return `<span class="figure__badge" data-domain="${domain}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none">${icon}</svg></span>`;
}