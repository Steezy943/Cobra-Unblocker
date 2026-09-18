document.addEventListener("DOMContentLoaded", () => {
    // Interface elements selectors
    const viewZones = document.querySelectorAll(".view-zone");
    const settingsToggle = document.getElementById("settings-toggle");
    const homeBtn = document.getElementById("btn-home");
    const gamesGrid = document.getElementById("games-grid-container");
    const portalSearch = document.querySelector(".portal-search-input");
    const hubButtons = document.querySelectorAll(".portal-hub-btn");

    // ==========================================================================
    // 🎮 COBRA NETWORK DYNAMIC LINK CONFIGURATION CATALOGUE
    // To scale up your site, just paste your GitHub Pages URLs or raw links here!
    // ==========================================================================
    const gamesList = [
        { 
            title: "Untitled Goose Game", 
            category: "Casual", 
            gameUrl: "https://steezy943.github.io/untitled-goose-game/" 
            // 💡 Pro-Tip: ://githack.com bypasses GitHub raw source execution protection rules!
        }
    ];

    // Core Router Handler (Switches view frames cleanly)
    function switchZone(zoneId) {
        viewZones.forEach(zone => zone.classList.remove("active"));
        const targetZone = document.getElementById(zoneId);
        if (targetZone) {
            targetZone.classList.add("active");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Map click triggers to primary hub navigation portal buttons
    hubButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetZoneId = btn.getAttribute("data-zone");
            switchZone(targetZoneId);
        });
    });

    // Universal navigation layout listeners
    if (homeBtn) {
        homeBtn.addEventListener("click", () => switchZone("dashboard-zone"));
    }
    if (settingsToggle) {
        settingsToggle.addEventListener("click", () => switchZone("settings-zone"));
    }

    // ==========================================================================
    // DYNAMIC ARCADE GENERATION ENGINE
    // ==========================================================================
    function renderGames(filterText = "") {
        if (!gamesGrid) return;
        gamesGrid.innerHTML = "";

        const filtered = gamesList.filter(game => 
            game.title.toLowerCase().includes(filterText.toLowerCase())
        );

        if (filtered.length === 0) {
            gamesGrid.innerHTML = `<p class="coming-soon-text">No unblocked elements matched your lookup.</p>`;
            return;
        }

        filtered.forEach(game => {
            // Normalizes spaces to query thumbnail assets cleanly
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

            // Frame redirection payload execution trigger
            card.addEventListener("click", () => {
                launchGameUrl(game.gameUrl, game.title);
            });

            gamesGrid.appendChild(card);
        });
    }

    // Central dashboard search input portal intercept router
    if (portalSearch) {
        portalSearch.addEventListener("input", (e) => {
            const value = e.target.value;
            if (value.trim() !== "") {
                switchZone("games-zone");
                renderGames(value);
            }
        });
    }

    // ==========================================================================
    // ARCADE VIEWPORT SANDBOX LOADER & STEALTH UTILITY SYSTEM
    // ==========================================================================
    function launchGameUrl(targetUrl, title) {
        document.getElementById("game-frame-title").textContent = title;
        const iframe = document.getElementById("cobra-game-iframe");
        
        // Feed destination string right into the active page panel iframe chassis
        iframe.src = targetUrl;
        switchZone("player-zone");

        // Action Trigger 1: Native fullscreen viewport overlay toggle
        document.getElementById("btn-fullscreen").onclick = () => {
            if (iframe.requestFullscreen) iframe.requestFullscreen();
            else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
            else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
        };

        // Action Trigger 2: Advanced cloaked completely anonymous window generation
        document.getElementById("btn-about-blank").onclick = () => {
            const popup = window.open("about:blank", "_blank");
            if (!popup) {
                alert("Please clear browser blocking pop-up alerts to run about:blank cloaking session!");
                return;
            }
            
            // Generate clean target layout within the detached empty tab layout
            popup.document.body.style.margin = "0";
            popup.document.body.style.height = "100vh";
            popup.document.body.style.backgroundColor = "#000000";
            popup.document.body.style.overflow = "hidden";
            
            const newIframe = popup.document.createElement("iframe");
            newIframe.src = targetUrl;
            newIframe.style.width = "100%";
            newIframe.style.height = "100%";
            newIframe.style.border = "none";
            newIframe.style.display = "block";
            
            popup.document.body.appendChild(newIframe);
        };
    }

    // Bootstrap and populate catalog immediately on application lifecycle ready event
    renderGames();
});
