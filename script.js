document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".nav-item");
    const viewZones = document.querySelectorAll(".view-zone");
    const proxyCard = document.querySelector(".proxy-button-card");
    const settingsToggle = document.getElementById("settings-toggle");
    const gamesGrid = document.getElementById("games-grid-container");
    const portalSearch = document.querySelector(".portal-search-input");
    const hubButtons = document.querySelectorAll(".portal-hub-btn");

    // ==========================================
    // 🎮 CENTRALIZED GAMES LIST CONFIGURATION
    // ==========================================
    const gamesList = [
        { fileName: "slope.html", title: "Slope", category: "Action" },
        { fileName: "retro-bowl.html", title: "Retro Bowl", category: "Sports" },
        { fileName: "1v1-lol.html", title: "1v1.LOL", category: "Shooter" },
        { fileName: "subway-surfers.html", title: "Subway Surfers", category: "Arcade" }
    ];

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

    // Nav bar mapping clicks
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            switchZone(item.getAttribute("data-zone"));
        });
    });

    // Central dashboard grid button routing
    hubButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            switchZone(btn.getAttribute("data-zone"));
        });
    });

    if (proxyCard) {
        proxyCard.addEventListener("click", () => switchZone("proxy-zone"));
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
                <div style="position:relative; width:100%; height:130px; background-color:#1a1a1e;">
                    <img src="${thumbPath}" alt="${game.title}" class="card-thumb" 
                         style="width:100%; height:100%; object-fit:cover;"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="fallback-thumb-box" style="display:none; width:100%; height:100%; background-color:#25252b; align-items:center; justify-content:center; color:#8e8e93; font-weight:bold; font-size:1.2rem;">
                        🎮
                    </div>
                </div>
                <div class="card-info">
                    <h3 style="color:#ffffff; margin-bottom:0.25rem;">${game.title}</h3>
                    <span style="color:#8e8e93; font-size:0.8rem;">${game.category}</span>
                </div>
            `;

            card.addEventListener("click", () => {
                launchGameFrame(game.fileName, game.title);
            });

            gamesGrid.appendChild(card);
        });
    }

    // Main Portal Search jumps directly to games view and displays filtered options
    if (portalSearch) {
        portalSearch.addEventListener("input", (e) => {
            switchZone("games-zone");
            renderGames(e.target.value);
            // Autofills search text downward
            portalSearch.value = "";
        });
    }

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
            if (!popup) return alert("Please allow popups!");
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

    renderGames();
});
