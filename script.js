document.addEventListener("DOMContentLoaded", () => {
    const viewZones = document.querySelectorAll(".view-zone");
    const settingsToggle = document.getElementById("settings-toggle");
    const homeBtn = document.getElementById("btn-home");
    const gamesGrid = document.getElementById("games-grid-container");
    const portalSearch = document.querySelector(".portal-search-input");
    const hubButtons = document.querySelectorAll(".portal-hub-btn");

    // ==========================================
    // 🎮 CENTRALIZED GAMES LIST CATALOG
    // ==========================================
    const gamesList = [
        { fileName: "slope.html", title: "Slope", category: "Action" },
        { fileName: "retro-bowl.html", title: "Retro Bowl", category: "Sports" },
        { fileName: "1v1-lol.html", title: "1v1.LOL", category: "Shooter" },
        { fileName: "subway-surfers.html", title: "Subway Surfers", category: "Arcade" }
    ];

    // Global router handler
    function switchZone(zoneId) {
        viewZones.forEach(zone => zone.classList.remove("active"));
        const targetZone = document.getElementById(zoneId);
        if (targetZone) {
            targetZone.classList.add("active");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Assign clicks to central hub portal landing grid buttons
    hubButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetZoneId = btn.getAttribute("data-zone");
            switchZone(targetZoneId);
        });
    });

    // Home & Settings Action triggers
    if (homeBtn) {
        homeBtn.addEventListener("click", () => switchZone("dashboard-zone"));
    }
    if (settingsToggle) {
        settingsToggle.addEventListener("click", () => switchZone("settings-zone"));
    }

    // ==========================================
    // DYNAMIC GAMES RENDERING LOGIC
    // ==========================================
    function renderGames(filterText = "") {
        if (!gamesGrid) return;
        gamesGrid.innerHTML = "";

        const filtered = gamesList.filter(game => 
            game.title.toLowerCase().includes(filterText.toLowerCase()) ||
            game.category.toLowerCase().includes(filterText.toLowerCase())
        );

        if (filtered.length === 0) {
            gamesGrid.innerHTML = `<p class="coming-soon-text">No games found matching your search.</p>`;
            return;
        }

        filtered.forEach(game => {
            const baseName = game.fileName.replace(".html", "");
            const thumbPath = `Assets/Thumbnails/${baseName}.jpg`;

            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <div class="card-thumb-container">
                    <img src="${thumbPath}" alt="${game.title}" class="card-thumb" 
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="fallback-thumb-box">
                        🎮
                    </div>
                </div>
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

    // Portal Search shifts views seamlessly and focuses filter inputs
    if (portalSearch) {
        portalSearch.addEventListener("input", (e) => {
            const value = e.target.value;
            if (value.trim() !== "") {
                switchZone("games-zone");
                renderGames(value);
            }
        });
    }

    // Game execution inside sandboxed iframe element blocks
    function launchGameFrame(fileName, title) {
        const gamePath = `games/${fileName}`;
        document.getElementById("game-frame-title").textContent = title;
        const iframe = document.getElementById("cobra-game-iframe");
        iframe.src = gamePath;

        switchZone("player-zone");

        document.getElementById("btn-fullscreen").onclick = () => {
            if (iframe.requestFullscreen) iframe.requestFullscreen();
            else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
        };

        document.getElementById("btn-about-blank").onclick = () => {
            const popup = window.open("about:blank", "_blank");
            if (!popup) return alert("Please allow popups to open games in about:blank cloaking!");
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

    // Execute catalog rendering loop immediately
    renderGames();
});
