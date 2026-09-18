document.addEventListener("DOMContentLoaded", () => {
    const viewZones = document.querySelectorAll(".view-zone");
    const settingsToggle = document.getElementById("settings-toggle");
    const homeBtn = document.getElementById("btn-home");
    const gamesGrid = document.getElementById("games-grid-container");
    const portalSearch = document.querySelector(".portal-search-input");
    const hubButtons = document.querySelectorAll(".portal-hub-btn");

    // ==========================================================================
    // 🎮 COBRA RAW URL GAME LIST CONFIGURATION
    // To add more games, just add a new item block inside this array.
    // Use any raw code link, repository path, or hosted game site URL!
    // ==========================================================================
    const gamesList = [
        { 
            title: "How To Fish", 
            category: "Casual", 
            gameUrl: "https://steezy943.github.io/HowToFishPort/" // You can replace this path with a direct raw website link too!
        }
    ];

    // Global site view controller
    function switchZone(zoneId) {
        viewZones.forEach(zone => zone.classList.remove("active"));
        const targetZone = document.getElementById(zoneId);
        if (targetZone) {
            targetZone.classList.add("active");
        }
    }

    // Assign dashboard button grid navigation mapping
    hubButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetZoneId = btn.getAttribute("data-zone");
            switchZone(targetZoneId);
        });
    });

    if (homeBtn) {
        homeBtn.addEventListener("click", () => switchZone("dashboard-zone"));
    }
    if (settingsToggle) {
        settingsToggle.addEventListener("click", () => switchZone("settings-zone"));
    }

    // ==========================================================================
    // DYNAMIC GAMES ENGINE (Renders clean cards based on game title text)
    // ==========================================================================
    function renderGames(filterText = "") {
        if (!gamesGrid) return;
        gamesGrid.innerHTML = "";

        const filtered = gamesList.filter(game => 
            game.title.toLowerCase().includes(filterText.toLowerCase())
        );

        if (filtered.length === 0) {
            gamesGrid.innerHTML = `<p class="coming-soon-text">No games cataloged yet.</p>`;
            return;
        }

        filtered.forEach(game => {
            // Strip spaces to try and find a thumbnail, using fallback icon safely if not found
            const cleanName = game.title.replace(/\s+/g, '');
            const thumbPath = `Assets/Thumbnails/${cleanName}.jpg`;

            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <div class="card-thumb-container">
                    <img src="${thumbPath}" alt="${game.title}" class="card-thumb" 
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="fallback-thumb-box">🎮</div>
                </div>
                <div class="card-info">
                    <h3>${game.title}</h3>
                    <span>${game.category}</span>
                </div>
            `;

            // Click maps straight to the raw link loader function
            card.addEventListener("click", () => {
                launchGameUrl(game.gameUrl, game.title);
            });

            gamesGrid.appendChild(card);
        });
    }

    // Sync portal entry search tracking
    if (portalSearch) {
        portalSearch.addEventListener("input", (e) => {
            const value = e.target.value;
            if (value.trim() !== "") {
                switchZone("games-zone");
                renderGames(value);
            }
        });
    }

    // Raw link launcher wrapper utilizing sandboxed frame controls
    function launchGameUrl(targetUrl, title) {
        document.getElementById("game-frame-title").textContent = title;
        const iframe = document.getElementById("cobra-game-iframe");
        
        // Directly injects the raw URL string right into the iframe
        iframe.src = targetUrl;

        switchZone("player-zone");

        // Native hardware full screen panel utility
        document.getElementById("btn-fullscreen").onclick = () => {
            if (iframe.requestFullscreen) iframe.requestFullscreen();
            else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
        };

        // Advanced anonymous about:blank tab injection utility
        document.getElementById("btn-about-blank").onclick = () => {
            const popup = window.open("about:blank", "_blank");
            if (!popup) return alert("Please allow popups to launch stealth window session!");
            
            popup.document.body.style.margin = "0";
            popup.document.body.style.height = "100vh";
            popup.document.body.style.backgroundColor = "#000000";
            
            const newIframe = popup.document.createElement("iframe");
            newIframe.src = targetUrl;
            newIframe.style.width = "100%";
            newIframe.style.height = "100%";
            newIframe.style.border = "none";
            
            popup.document.body.appendChild(newIframe);
        };
    }

    // Force call calculation loop execution instantly
    renderGames();
});
