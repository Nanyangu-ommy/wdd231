// modal.js

export function openModal(item) {
  const modal = document.querySelector("#info-modal");

  // Fill modal fields
  document.querySelector("#modal-title").textContent = item.title;
  document.querySelector("#modal-image").src = item.image;
  document.querySelector("#modal-image").alt = item.title;
  document.querySelector("#modal-description").textContent = item.description;
  document.querySelector("#modal-category").textContent = "Category: " + item.category;
  document.querySelector("#modal-severity").textContent = "Severity: " + item.severity;

  modal.showModal();
}

export function closeModal() {
  const modal = document.querySelector("#info-modal");
  modal.close();
}

export function registerModalEvents() {
  const modal = document.querySelector("#info-modal");
  const closeBtn = document.querySelector("#modal-close");

  closeBtn.addEventListener("click", closeModal);

  // Also close modal when clicking outside
  modal.addEventListener("click", (event) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      event.clientX < dialogDimensions.left ||
      event.clientX > dialogDimensions.right ||
      event.clientY < dialogDimensions.top ||
      event.clientY > dialogDimensions.bottom
    ) {
      closeModal();
    }
  });
}


