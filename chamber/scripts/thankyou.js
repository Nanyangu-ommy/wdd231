const menuButton = document.getElementById("menuButton");
        const nav = document.querySelector("nav ul");
        menuButton.addEventListener("click", () => {
            nav.classList.toggle("open");
        });

        // Display current year
        document.getElementById("year").textContent = new Date().getFullYear();

        // Extract URL parameters
        const params = new URLSearchParams(window.location.search);

        document.getElementById("firstName").textContent = params.get("firstname") || "";
        document.getElementById("lastName").textContent = params.get("lastname") || "";
        document.getElementById("email").textContent = params.get("email") || "";
        document.getElementById("phone").textContent = params.get("phone") || "";
        document.getElementById("business").textContent = params.get("organization") || "";
        document.getElementById("timestamp").textContent = params.get("timestamp") || "";
    
