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
    // You can now specify both the EXACT game link and EXACT thumbnail path!
    // ==========================================================================
    const gamesList = [
        { 
            title: "Untitled Goose Game", 
            category: "Casual", 
            gameUrl: "https://steezy943.github.io/untitled-goose-game/",
            thumbUrl: "Assets/Thumbnails/Untitled Goose Game.jpg" // Set this directly to your explicit asset image path!
        },
        { 
            title: "Hollow Knight", 
            category: "Action", 
            gameUrl: "https://steezy943.github.io/hollowknightport/",
            thumbUrl: "Assets/Thumbnails/Hollow Knight.webp" // Set this directly to your explicit asset image path!
        },
        { 
            title: "Half Life", 
            category: "Action", 
            gameUrl: "https://steezy943.github.io/Half-Life/",
            thumbUrl: "Assets/Thumbnails/Half Life 1.jpg" // Set this directly to your explicit asset image path!
        },
        { 
            title: "Karlson", 
            category: "Action", 
            gameUrl: "https://steezy943.github.io/KarlsonWebPort/",
            thumbUrl: "Assets/Thumbnails/Karlson.png" // Set this directly to your explicit asset image path!
        },
        { 
            title: "PEAK", 
            category: "Adventure", 
            gameUrl: "https://steezy943.github.io/Peak-Port/",
            thumbUrl: "Assets/Thumbnails/Peak.jpg" // Set this directly to your explicit asset image path!
        };

    // Core Router Handler
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

    if (homeBtn) {
        homeBtn.addEventListener("click", () => switchZone("dashboard-zone"));
    }
    if (settingsToggle) {
        settingsToggle.addEventListener("click", () => switchZone("settings-zone"));
    }

    // ==========================================================================
    // DYNAMIC ARCADE GENERATION ENGINE (Circular + Swirl Layouts)
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
            const card = document.createElement("div");
            card.className = "card-circle-wrapper";
            card.innerHTML = `
                <div class="card-circle-inner">
                    <img src="${game.thumbUrl}" alt="${game.title}" class="card-circle-thumb" 
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="fallback-circle-box">🎮</div>
                    
                    <!-- SWIRL TEXT CONTAINER LAYER -->
                    <div class="swirl-text-overlay">
                        <div class="swirl-title">${game.title}</div>
                        <div class="swirl-category">${game.category}</div>
                    </div>
                </div>
            `;

            // Frame redirection payload execution trigger
            card.addEventListener("click", () => {
                launchGameUrl(game.gameUrl, game.title);
            });

            gamesGrid.appendChild(card);
        });
    }

    if (portalSearch) {
        portalSearch.addEventListener("input", (e) => {
            const value = e.target.value;
            if (value.trim() !== "") {
                switchZone("games-zone");
                renderGames(value);
            }
        });
    }

    function launchGameUrl(targetUrl, title) {
        document.getElementById("game-frame-title").textContent = title;
        const iframe = document.getElementById("cobra-game-iframe");
        
        iframe.src = targetUrl;
        switchZone("player-zone");

        document.getElementById("btn-fullscreen").onclick = () => {
            if (iframe.requestFullscreen) iframe.requestFullscreen();
            else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
        };

        document.getElementById("btn-about-blank").onclick = () => {
            const popup = window.open("about:blank", "_blank");
            if (!popup) {
                alert("Please clear browser blocking pop-up alerts!");
                return;
            }
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

    renderGames();
});
