document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".nav-item");
    const viewZones = document.querySelectorAll(".view-zone");
    const proxyCard = document.querySelector(".proxy-button-card");
    const settingsToggle = document.getElementById("settings-toggle");
    const gamesGrid = document.getElementById("games-grid-container");
    const searchInput = document.querySelector(".search-input");

    // ==========================================
    // 🎮 CENTRALIZED GAMES LIST CONFIGURATION
    // Make sure your filenames inside your games/ folder match these exactly!
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

        // Fullscreen Setup
        document.getElementById("btn-fullscreen").onclick = () => {
            if (iframe.requestFullscreen) iframe.requestFullscreen();
            else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
            else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
        };

        // About Blank Setup
        document.getElementById("btn-about-blank").onclick = () => {
            const popup = window.open("about:blank", "_blank");
            if (!popup) {
                alert("Please allow popups to utilize stealth about:blank cloaking!");
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

    // Force load the initial collection rendering directly on launch
    renderGames();
});
