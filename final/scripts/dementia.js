const learnGrid = document.getElementById('learn-grid');
const modal = document.getElementById('info-modal');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalCategory = document.getElementById('modal-category');
const modalSeverity = document.getElementById('modal-severity');

// Function to show modal
function showModal(item) {
  modalTitle.textContent = item.title;
  if (item.image) {
    modalImage.src = item.image;
    modalImage.alt = item.title;
    modalImage.style.display = '';  // show image
  } else {
    modalImage.style.display = 'none';  // hide image if none
  }
  modalDescription.textContent = item.description;
  modalCategory.textContent = `Category: ${item.category}`;
  modalSeverity.textContent = `Severity: ${item.severity || 'N/A'}`;

  modal.showModal();
  localStorage.setItem('lastViewedCard', JSON.stringify(item));
}

// Close modal
modalClose.addEventListener('click', () => {
  modal.close();
});

// Fetch data and generate cards
async function loadCards() {
  try {
    const res = await fetch('data/dementia.json');
    if (!res.ok) throw new Error('Failed to load dementia.json');
    const data = await res.json();

    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'learn-card';

      card.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description || 'No description available.'}</p>
        <button class="btn" data-id="${item.id}">More Info</button>
      `;

      learnGrid.appendChild(card);
    });

    // Add click event for modal
    learnGrid.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const id = e.target.dataset.id;
        const itemData = data.find(i => i.id == id);
        if (itemData) showModal(itemData);
      }
    });

    // Check localStorage for last viewed card
    const lastCard = localStorage.getItem('lastViewedCard');
    if (lastCard) {
      const itemData = JSON.parse(lastCard);
      showModal(itemData);
    }

  } catch (err) {
    console.error('Error loading cards:', err);
    learnGrid.innerHTML = '<p>Sorry, failed to load dementia resources.</p>';
  }
}

// Run on page load
loadCards();
