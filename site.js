"use strict";

const select = (selector) => document.querySelector(selector);
const stage = select(".dive");
const hero = select(".hero");
const video = select(".hero-video");
const ocean = select(".hero-photo img");
const signature = select(".hero-copy");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let maximumZoom = 1.8;
let scheduled = false;
const portal = document.createElement("div");
portal.className = "portal";
portal.setAttribute("aria-label", "Explorer les projets");
portal.innerHTML = '<div class="portal-caption"></div><div class="portal-grid"></div>';
hero.append(portal);

function setText(selector, value) {
  const element = select(selector);
  if (element && typeof value === "string") element.textContent = value;
}

function safeURL(value, fallback = "") {
  if (typeof value !== "string" || !value.trim()) return fallback;
  try {
    const url = new URL(value, document.baseURI);
    if (["https:", "http:"].includes(url.protocol)) return value;
  } catch {
    return fallback;
  }
  return fallback;
}

function imageFor(project) {
  const image = document.createElement("img");
  image.src = safeURL(project.image);
  image.alt = project.alt || project.title || "";
  image.loading = "lazy";
  return image;
}

function renderProjects(projects) {
  const cards = document.createDocumentFragment();
  const portals = document.createDocumentFragment();
  projects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project";
    card.append(imageFor(project));
    const caption = document.createElement("p");
    caption.append(document.createTextNode(project.title || ""));
    const category = document.createElement("span");
    category.textContent = project.category || "";
    caption.append(category);
    card.append(caption);
    cards.append(card);
    if (index > 1) return;
    const figure = document.createElement("figure");
    figure.append(imageFor(project));
    const text = document.createElement("div");
    text.className = "portal-title";
    for (const [tag, value] of [
      ["small", project.portalLabel],
      ["h2", project.portalTitle],
      ["p", project.portalText],
    ]) {
      const element = document.createElement(tag);
      element.textContent = value || "";
      text.append(element);
    }
    const link = document.createElement("a");
    link.href = safeURL(project.href, "#projets");
    link.textContent = project.portalLink || "Découvrir";
    text.append(link);
    figure.append(text);
    portals.append(figure);
  });
  select("#project-list").replaceChildren(cards);
  portal.querySelector(".portal-grid").replaceChildren(portals);
}

function applyContent(content) {
  const look = content.appearance || {};
  const root = document.documentElement;
  for (const [key, value] of Object.entries({
    '--page-color': look.background, '--ink-color': look.textColor,
    '--heading-font': look.headingFont, '--body-font': look.bodyFont,
    '--hero-size': look.heroSize && `${look.heroSize}px`,
    '--content-width': look.contentWidth && `${look.contentWidth}px`,
    '--section-gap': look.sectionGap && `${look.sectionGap}px`
  })) if (value && !/[;{}]/.test(String(value))) root.style.setProperty(key, value);
  const order = Array.isArray(content.sectionOrder) ? content.sectionOrder : [];
  const main = document.querySelector('main');
  for (const id of order) { const section = document.getElementById(id); if (main && section && section.parentElement === main) main.append(section); }
  for (const id of ['projets','approche','contact']) { const section = document.getElementById(id); if (section) section.hidden = Array.isArray(content.hiddenSections) && content.hiddenSections.includes(id); }
  let custom = document.getElementById('pogona-custom-blocks');
  if (!custom) { custom = document.createElement('section'); custom.id = 'pogona-custom-blocks'; main?.append(custom); }
  custom.replaceChildren();
  for (const block of content.blocks || []) {
    const node = document.createElement('article'); node.className = 'custom-block';
    if (block.type === 'image' && block.image) { const img = document.createElement('img'); img.src = safeURL(block.image); img.alt = block.alt || ''; node.append(img); }
    else if (block.type === 'video' && block.video) { const clip = document.createElement('video'); clip.src = safeURL(block.video); clip.controls = true; clip.playsInline = true; node.append(clip); }
    else { const h = document.createElement('h2'); h.textContent = block.title || ''; const p = document.createElement('p'); p.textContent = block.text || ''; node.append(h,p); }
    custom.append(node);
  }
  document.title = content.title;
  select('meta[name="description"]').content = content.description;
  select('meta[property="og:title"]').content = content.title;
  select('meta[property="og:description"]').content = content.description;
  select(".logo-art img").src = safeURL(content.logo, "pogona.svg");
  setText(".logo-original small", content.production);
  const heading = select("#signature");
  const line2 = document.createElement("em");
  line2.textContent = content.hero.line2;
  heading.replaceChildren(
    document.createTextNode(content.hero.line1),
    document.createElement("br"), line2
  );
  setText(".hero-copy p", content.hero.subtitle);
  setText(".discover", content.hero.discover + " ↓");
  ocean.src = safeURL(content.hero.image, ocean.src);
  ocean.alt = content.hero.alt;
  select(".hero-photo source").srcset = safeURL(content.hero.mobileImage);
  ocean.style.content = "normal";
  video.poster = safeURL(content.hero.mobileImage);
  const nextVideo = safeURL(content.hero.video);
  const currentVideo = select(".hero-video source");
  if (nextVideo && new URL(nextVideo, document.baseURI).href !== currentVideo.src) {
    currentVideo.src = nextVideo;
    video.load();
  }
  setText('nav a[href="#projets"]', content.navigation.projects);
  setText('nav a[href="#approche"]', content.navigation.approach);
  setText('nav a[href="#contact"]', content.navigation.contact);
  const introduction = select(".intro-strip").children;
  const name = document.createElement("strong");
  name.textContent = content.introduction.name;
  introduction[0].replaceChildren(
    name, document.createElement("br"),
    document.createTextNode(content.introduction.roles)
  );
  introduction[1].textContent = content.introduction.sectors;
  introduction[2].textContent = content.introduction.location;
  setText("#projets .heading h2", content.projectsTitle);
  setText("#projets .heading p", content.projectsIntroduction);
  select("#projets .heading p").style.whiteSpace = "pre-line";
  renderProjects(content.projects);
  setText(".portal-caption", content.portalCaption);
  const portrait = select("#approche img");
  portrait.src = safeURL(content.approach.image);
  portrait.alt = content.approach.alt;
  setText("#approche .eyebrow", content.approach.name);
  setText("#approche h2", content.approach.title);
  select("#approche h2").style.whiteSpace = "pre-line";
  const paragraphs = select("#approche div").querySelectorAll("p");
  paragraphs[0].textContent = content.approach.paragraph1;
  paragraphs[1].textContent = content.approach.paragraph2;
  setText("#contact h2", content.contact.title);
  select("#contact h2").style.whiteSpace = "pre-line";
  const email = select("#contact a");
  email.textContent = content.contact.email;
  email.href = "mailto:" + encodeURIComponent(content.contact.email);
  if (/^#[0-9a-f]{6}$/i.test(content.appearance.background)) {
    document.documentElement.style.setProperty("--page-color", content.appearance.background);
  }
  maximumZoom = Math.max(1, Math.min(2.2, Number(look.zoom) || 1.8));
}
window.addEventListener('message', event => { if (event.origin === location.origin && event.data?.type === 'pogona-preview') { applyContent(event.data.content); updateScroll(); } });

function updateScroll() {
  scheduled = false;
  if (reducedMotion.matches) {
    signature.style.opacity = "1";
    video.style.transform = "none";
    ocean.style.transform = "none";
    portal.hidden = true;
    video.pause();
    return;
  }
  portal.hidden = false;
  const distance = Math.max(1, stage.offsetHeight - hero.offsetHeight);
  const progress = Math.max(0, Math.min(1, -stage.getBoundingClientRect().top / distance));
  const reveal = Math.max(0, Math.min(1, (progress - 0.48) / 0.38));
  const scale = 1 + Math.min(1, progress / 0.85) * (maximumZoom - 1);
  video.style.transform = "scale(" + scale + ")";
  ocean.style.transform = "scale(" + scale + ")";
  signature.style.opacity = String(Math.max(0, 1 - progress * 3));
  portal.style.opacity = String(reveal);
  portal.style.transform = "none";
  portal.style.pointerEvents = reveal > 0.9 ? "auto" : "none";
  portal.inert = reveal <= 0.9;
  portal.setAttribute("aria-hidden", String(reveal <= 0.9));
}

function scheduleScrollUpdate() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(updateScroll);
}
window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
window.addEventListener("resize", scheduleScrollUpdate);
reducedMotion.addEventListener("change", () => {
  updateScroll();
  if (!reducedMotion.matches) video.play().catch(() => {});
});

async function initialize() {
  try {
    const response = await fetch("site.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("Contenus indisponibles");
    applyContent(await response.json());
  } catch (error) {
    console.error("Chargement des contenus Pogona :", error);
    portal.hidden = true;
  }
  updateScroll();
  if (!reducedMotion.matches) video.play().catch(() => {});
}
initialize();

// Resume when returning to the opening after the browser has paused off-screen media.
function resumeOpeningVideo() {
  if (reducedMotion.matches || document.visibilityState !== "visible") return;
  const bounds = hero.getBoundingClientRect();
  if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
    video.muted = true;
    video.play().catch(() => {});
  }
}
const videoVisibility = new IntersectionObserver(resumeOpeningVideo, { threshold: 0.1 });
videoVisibility.observe(hero);
video.addEventListener("canplay", resumeOpeningVideo);
window.addEventListener("pageshow", resumeOpeningVideo);
document.addEventListener("visibilitychange", resumeOpeningVideo);
document.addEventListener("pointerdown", resumeOpeningVideo, { passive: true });
