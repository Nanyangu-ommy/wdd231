const membersURL = "data/members.json";
const membersContainer = document.querySelector('#members');
const gridButton = document.querySelector('#gridView');
const listButton = document.querySelector('#listView');
let allCompaniesData = []; // To store data once fetched

/* --- Fetch and Display Functions --- */

/**
 * Fetches member data from JSON file using async/await.
 */
async function getMemberData() {
    try {
        const response = await fetch(membersURL);
        if (response.ok) {
            const data = await response.json();
            // *** FIX 1: Accessing the correct key in your JSON file (now 'companies') ***
            allCompaniesData = data.companies; 
            displayMembers(allCompaniesData, 'grid'); // Default view
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Error fetching member data:', error);
        membersContainer.innerHTML = '<p>Could not load the business directory. Please check the data source (data/members.json) and console for errors.</p>';
    }
}

/**
 * Renders the member data to the DOM in either 'grid' or 'list' view.
 * @param {Array} companies - Array of company objects.
 * @param {string} viewType - 'grid' or 'list'.
 */
function displayMembers(companies, viewType) {
    membersContainer.innerHTML = ''; // Clear existing content
    membersContainer.className = viewType; // Set the class for CSS styling

    companies.forEach(company => {
        // Use either 'slogan' or 'description' field
        const tagline = company.slogan || company.description || 'No description available.';

        // Create the element (Card for grid, Row for list)
        const item = document.createElement(viewType === 'grid' ? 'section' : 'div');
        item.classList.add('member-item');
        item.classList.add(`level-${company.membershipLevel}`);

        if (viewType === 'grid') {
            item.innerHTML = `
                <!-- The browser looks for "images/farm.jpg" etc. -->
                <img src="${company.imagefile}" alt="${company.name} logo" loading="lazy" onerror="this.onerror=null; this.src='https://placehold.co/150x100/CCCCCC/333333?text=Logo'">
                <h3>${company.name}</h3>
                <p class="slogan">${tagline}</p>
                <hr>
                <p>Address: ${company.address}</p>
                <p>Phone: ${company.phone}</p>
                <a href="${company.website}" target="_blank">Visit Website</a>
            `;
        } else { // list view
            item.classList.add('list-row');
            item.innerHTML = `
                <h3 class="list-name">${company.name}</h3>
                <p class="list-address">${company.address}</p>
                <p class="list-phone">${company.phone}</p>
                <a class="list-website" href="${company.website}" target="_blank">Website</a>
                <p class="list-level">Level ${company.membershipLevel}</p>
            `;
        }
        
        membersContainer.appendChild(item);
    });
}

/* --- Event Listeners and Initial Calls --- */

// Toggle button functionality
gridButton.addEventListener('click', () => {
    displayMembers(allCompaniesData, 'grid');
    gridButton.classList.add('active');
    listButton.classList.remove('active');
});

listButton.addEventListener('click', () => {
    displayMembers(allCompaniesData, 'list');
    listButton.classList.add('active');
    gridButton.classList.remove('active');
});

// Navigation Menu Toggle (for responsiveness)
const menuButton = document.querySelector('#menuButton');
const navMenu = document.querySelector('#navMenu');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuButton.textContent = navMenu.classList.contains('open') ? 'X' : '☰';
});


/* --- Footer Date Display (from the previous context) --- */

// Display the current year
document.querySelector('#year').textContent = new Date().getFullYear();

// Display the last modification date
document.querySelector('#lastModified').textContent = document.lastModified;


// Start the process
getMemberData();
