// ----------------------
// MOBILE NAV MENU
// ----------------------
const menuButton = document.querySelector("#menuButton");
const navMenu = document.querySelector("#navMenu");

if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        menuButton.classList.toggle("open");
    });
}


// ----------------------
// FOOTER DATE
// ----------------------
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;


// ----------------------
// WEATHER (FIXED FORECAST LOGIC)
// ----------------------

const API_KEY = "5fef6d36f4f20440383facc4928c1d36";
const LAT = -13.9626;
const LON = 33.7741;

// Free API URLs
const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

async function getWeather() {
    try {
        // --- CURRENT WEATHER ---
        const currentRes = await fetch(currentURL);
        if (!currentRes.ok) throw new Error("Current weather error");
        const currentData = await currentRes.json();

        document.querySelector("#currentTemp").textContent =
            `${currentData.main.temp.toFixed(0)} °C`; // Added .toFixed(0) for cleaner display
        document.querySelector("#weatherDesc").textContent =
            currentData.weather[0].description;


        // --- FORECAST (Robust 3-Day Extraction) ---
        const forecastRes = await fetch(forecastURL);
        if (!forecastRes.ok) throw new Error("Forecast error");
        const forecastData = await forecastRes.json();

        const forecastDiv = document.querySelector("#forecast");
        forecastDiv.innerHTML = "";
        
        const today = new Date().toDateString(); // Get current date string (e.g., "Sat Nov 22 2025")
        const uniqueDays = [];
        let daysCount = 0;

        // Loop through the 40 entries in the forecast list
        for (const item of forecastData.list) {
            const date = new Date(item.dt * 1000);
            const dayString = date.toDateString(); 

            // Skip entries for the current day
            if (dayString === today) {
                continue;
            }

            // Only proceed if we haven't already processed this calendar day
            if (!uniqueDays.includes(dayString)) {
                uniqueDays.push(dayString);
                daysCount++;

                const weekday = date.toLocaleDateString("en-US", {
                    weekday: "long"
                });

                const card = document.createElement("div");
                card.classList.add("forecast-day");

                card.innerHTML = `
                    <h4>${weekday}</h4>
                    <p>Temp: ${item.main.temp.toFixed(0)} °C</p>
                    <p>${item.weather[0].description}</p>
                `;

                forecastDiv.appendChild(card);
            }
            
            // Stop after we have successfully found and displayed 3 days
            if (daysCount >= 3) {
                break;
            }
        }

    } catch (err) {
        console.error(err);
        document.querySelector("#forecast").textContent =
            "Unable to load weather data.";
    }
}

getWeather();

// ----------------------
// MEMBER SPOTLIGHTS - FIXED
// ----------------------
async function loadSpotlights() {
    const spotlightContainer = document.querySelector("#spotlightContainer");

    try {
        const response = await fetch("data/members.json");
        const data = await response.json();

        // 🛑 FIX 1: Change 'data.members' to 'data.companies'
        // This is where the script failed before.
        const goldSilver = data.companies.filter( 
            // 🛑 FIX 2: Filter by 'membershipLevel' (2 or 3) instead of "Gold" or "Silver"
            // Assuming Level 3 is Gold and Level 2 is Silver.
            m => m.membershipLevel === 3 || m.membershipLevel === 2
        );

        // Randomize
        const shuffled = goldSilver.sort(() => 0.5 - Math.random());

        // Choose up to 3 members
        const selected = shuffled.slice(0, 3);

        spotlightContainer.innerHTML = "";

        selected.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("spotlight-card");

            // Helper to translate level number to text for display
            let levelText = member.membershipLevel === 3 ? "Gold" : "Silver";

            card.innerHTML = `
                <img src="${member.imagefile}" alt="${member.name} logo">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p class="level">${levelText}</p>
            `;

            spotlightContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Spotlight load error:", error);
        // If the path is wrong, you'll see a 404 in Network. 
        // If the JSON is bad, you'll see a SyntaxError in Console.
        spotlightContainer.innerHTML = "<p>Error loading spotlights. Please check console.</p>";
    }
}

loadSpotlights();