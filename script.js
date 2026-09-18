document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".nav-item");
    const viewZones = document.querySelectorAll(".view-zone");
    const proxyCard = document.querySelector(".proxy-button-card");
    const settingsToggle = document.getElementById("settings-toggle");
    const gamesGrid = document.getElementById("games-grid-container");
    const searchInput = document.querySelector(".search-input");

    // ==========================================
    // 🎮 CENTRALIZED GAMES LIST CONFIGURATION
    // Just add the filename here when adding new games!
    // ==========================================
    const gamesList = [
        { fileName: "slope.html", title: "Slope", category: "Action" },
        { fileName: "retro-bowl.html", title: "Retro Bowl", category: "Sports" },
        { fileName: "1v1-lol.html", title: "1v1.LOL", category: "Shooter" },
        { fileName: "subway-surfers.html", title: "Subway Surfers", category: "Arcade" }
    ];

    // Reusable function to clear panels and activate targeted zone
    function switchZone(zoneId) {
        navItems.forEach(nav => {
            nav.classList.remove("active");
            if(nav.getAttribute("data-zone") === zoneId) {
                nav.classList.add("active");
            }
        });
        
        viewZones.forEach(zone => zone.classList.remove("active"));
        const targetZone = document.getElementById(zoneId);
        if (targetZone) {
            targetZone.classList.add("active");
        }
    }

    // Sidebar navigation clicks
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const targetZoneId = item.getAttribute("data-zone");
            switchZone(targetZoneId);
        });
    });

    if (proxyCard) {
        proxyCard.addEventListener("click", () => switchZone("proxy-zone"));
    }

    if (settingsToggle) {
        settingsToggle.addEventListener("click", () => switchZone("settings-zone"));
    }

    // ==========================================
    // RENDERING & INTERACTION LOGIC
    // ==========================================
    function renderGames(filterText = "") {
        if (!gamesGrid) return;
        gamesGrid.innerHTML = "";

        const filtered = gamesList.filter(game => 
            game.title.toLowerCase().includes(filterText.toLowerCase()) ||
            game.category.toLowerCase().includes(filterText.toLowerCase())
        );

        filtered.forEach(game => {
            // Auto-strips .html and targets Assets/Thumbnails/filename.jpg
            const baseName = game.fileName.replace(".html", "");
            const thumbPath = `Assets/Thumbnails/${baseName}.jpg`;

            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <img src="${thumbPath}" alt="${game.title}" class="card-thumb" onerror="this.src='Assets/Thumbnails/SiteLogo.png'">
                <div class="card-info">
                    <h3>${game.title}</h3>
                    <span>${game.category}</span>
                </div>
            `;

            card.addEventListener("click", () => {
                launchGameFrame(game.fileName, game.title);
            });

            gamesGrid.appendChild(card);
        });
    }

    // Live search functionality
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            renderGames(e.target.value);
        });
    }

    // Launch Game Frame View
    function launchGameFrame(fileName, title) {
        const gamePath = `games/${fileName}`;
        document.getElementById("game-frame-title").textContent = title;
        
        const iframe = document.getElementById("cobra-game-iframe");
        iframe.src = gamePath;

        switchZone("player-zone");

        // Action Buttons Setup
        document.getElementById("btn-fullscreen").onclick = () => {
            if (iframe.requestFullscreen) iframe.requestFullscreen();
            else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
            else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
        };

        document.getElementById("btn-about-blank").onclick = () => {
            const popup = window.open("about:blank", "_blank");
            if (!popup) {
                alert("Please allow popups for Cobra to open games in about:blank cloaking!");
                return;
            }
            popup.document.body.style.margin = "0";
            popup.document.body.style.height = "100vh";
            
            const newIframe = popup.document.createElement("iframe");
            newIframe.src = window.location.origin + "/" + gamePath;
            newIframe.style.width = "100%";
            newIframe.style.height = "100%";
            newIframe.style.border = "none";
            
            popup.document.body.appendChild(newIframe);
        };
    }

    // Initialize list load
    renderGames();
});
