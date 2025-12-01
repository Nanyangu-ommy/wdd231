// discover.js (module)
import { points } from "../data/points.mjs";

const grid = document.getElementById("discoverGrid");
const visitMessage = document.getElementById("visitMessage");
const modal = document.getElementById("learnModal");
const modalTitle = document.getElementById("modalTitle");
const modalFigureImg = document.querySelector("#modalFigure img");
const modalAddress = document.getElementById("modalAddress");
const modalDesc = document.getElementById("modalDesc");
const modalClose = modal.querySelector(".close");

// Render cards into the grid
function renderCards(items) {
  grid.innerHTML = ""; // clear

  items.forEach((it, i) => {
    const card = document.createElement("article");
    card.className = "discover-card";
    card.setAttribute("data-id", it.id);

    card.innerHTML = `
      <h2>${it.title}</h2>
      <figure class="card-figure">
        <img src="${it.img}" alt="${it.alt}" loading="lazy">
      </figure>
      <address>${it.address}</address>
      <p class="card-desc">${it.description}</p>
      <button class="learn-btn" data-id="${it.id}">Learn more</button>
    `;

    grid.appendChild(card);
  });
}

// Open modal with item details
function openModalFor(id) {
  const item = points.find(p => p.id === id);
  if (!item) return;
  modalTitle.textContent = item.title;
  modalFigureImg.src = item.img;
  modalFigureImg.alt = item.alt;
  modalAddress.textContent = item.address;
  modalDesc.textContent = item.description;
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  modal.querySelector(".close").focus();
}

// Close modal
function closeModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}

// Handle Learn more buttons (event delegation)
grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".learn-btn");
  if (!btn) return;
  const id = btn.dataset.id;
  openModalFor(id);
});

// modal close handlers
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  // close when clicking overlay (outside content)
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// VISITOR MESSAGE (localStorage)
function showVisitMessage() {
  const LAST_KEY = "discover_last_visit";
  const last = parseInt(localStorage.getItem(LAST_KEY), 10) || null;
  const now = Date.now();

  if (!last) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const diffMs = now - last;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffMs < 24 * 60 * 60 * 1000) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
      visitMessage.textContent = `You last visited 1 day ago.`;
    } else {
      visitMessage.textContent = `You last visited ${diffDays} days ago.`;
    }
  }

  // store current visit timestamp
  localStorage.setItem(LAST_KEY, String(now));
}

// small accessibility: set year/last modification
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// render and init
renderCards(points);
showVisitMessage();
