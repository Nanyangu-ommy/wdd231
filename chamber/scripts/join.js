// ===============================
// MOBILE MENU TOGGLE
// ===============================
const menuButton = document.querySelector("#menuButton");
const navMenu = document.querySelector("#navMenu");

if (menuButton) {
    menuButton.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        menuButton.classList.toggle("open");
    });
}

// ===============================
// FOOTER YEAR + LAST MODIFIED
// ===============================
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// ===============================
// AUTO-FILL TIMESTAMP FIELD
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.querySelector("#timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
});

// ===============================
// MEMBERSHIP MODALS
// ===============================
const openButtons = document.querySelectorAll(".open-modal");
const modals = document.querySelectorAll(".modal");

// Open modal
openButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute("data-target");
        const modal = document.getElementById(targetId);
        if (modal) modal.style.display = "block";
    });
});

// Close modal when clicking the "X"
const closeButtons = document.querySelectorAll(".modal .close");

closeButtons.forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
        closeBtn.parentElement.parentElement.style.display = "none";
    });
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
