// 🚀 COBRA CORE GLOBAL NAVIGATION & TAB MONITOR
window.openTabs = []; 

window.switchZone = function(zoneId) {
    // 1. Structural View Component Swap
    const viewZones = document.querySelectorAll(".view-zone");
    viewZones.forEach(zone => zone.classList.remove("active"));
    
    const targetZone = document.getElementById(zoneId);
    if (targetZone) {
        targetZone.classList.add("active");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log("Cobra Router: Switched view to " + zoneId);
    } else {
        console.error("Cobra Router Error: Target zone #" + zoneId + " not found!");
    }

    // 2. Dashboard and Settings views shouldn't create permanent standalone ribbon items
    if (zoneId === "dashboard-zone" || zoneId === "settings-zone") {
        document.querySelectorAll(".cobra-tab-item").forEach(t => t.classList.remove("active-tab"));
        return;
    }

    // 3. Automated Tab Generator
    const exists = window.openTabs.some(tab => tab.id === zoneId);
    if (!exists) {
        let friendlyLabel = zoneId.replace("-zone", "").toUpperCase();
        if (zoneId === "player-zone") friendlyLabel = "🎮 ACTIVE GAME";
        
        window.openTabs.push({ id: zoneId, label: friendlyLabel });
    }

    window.refreshTabsUI(zoneId);
};

// Redraws the upper workspace ribbon dock options dynamically
window.refreshTabsUI = function(activeZoneId) {
    const tabsDock = document.getElementById("cobra-tabs-dock");
    if (!tabsDock) return;
    tabsDock.innerHTML = "";

    window.openTabs.forEach(tab => {
        const tabEl = document.createElement("div");
        tabEl.className = `cobra-tab-item ${tab.id === activeZoneId ? 'active-tab' : ''}`;
        
        tabEl.innerHTML = `
            <span class="tab-title-text">${tab.label}</span>
            <span class="tab-close-btn" data-close="${tab.id}">×</span>
        `;

        // Switch to the target view zone on click
        tabEl.addEventListener("click", (e) => {
            if (e.target.classList.contains("tab-close-btn")) return; 
            window.switchZone(tab.id);
        });

        // Close button click listener
        const closeX = tabEl.querySelector(".tab-close-btn");
        closeX.addEventListener("click", (e) => {
            e.stopPropagation();
            window.closeTabItem(tab.id);
        });

        tabsDock.appendChild(tabEl);
    });
};

// Closes a workspace tab and returns the view to a safe baseline
window.closeTabItem = function(zoneId) {
    window.openTabs = window.openTabs.filter(tab => tab.id !== zoneId);
    
    // Clear the game frame if closing the active player viewport
    if (zoneId === "player-zone") {
        const iframe = document.getElementById("cobra-game-iframe");
        if (iframe) iframe.src = "";
    }

    // Fallback routing logic
    if (window.openTabs.length > 0) {
        const nextTarget = window.openTabs[window.openTabs.length - 1].id;
        window.switchZone(nextTarget);
    } else {
        window.switchZone("dashboard-zone");
    }
};

window.launchGameUrl = function(targetUrl, title) {
    const titleEl = document.getElementById("game-frame-title");
    const iframe = document.getElementById("cobra-game-iframe");
    
    if (titleEl) titleEl.textContent = title;
    if (iframe) {
        iframe.src = targetUrl;
        window.switchZone("player-zone");

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
};

// 🎮 INTERACTIVE GRID GENERATION ENGINE
window.renderGames = function(filterText = "") {
    const gamesGrid = document.getElementById("games-grid-container");
    if (!gamesGrid) return;
    gamesGrid.innerHTML = "";

    const catalog = window.gamesList || [];

    const filtered = catalog.filter(game => 
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
                <div class="swirl-text-overlay">
                    <div class="swirl-title">${game.title}</div>
                    <div class="swirl-category">${game.category}</div>
                </div>
            </div>
        `;

        card.addEventListener("click", () => {
            window.launchGameUrl(game.gameUrl, game.title);
        });

        gamesGrid.appendChild(card);
    });
};

// Initialize listeners on DOM complete loading
document.addEventListener("DOMContentLoaded", () => {
    const portalSearch = document.querySelector(".portal-search-input");
    const gamesSearchInput = document.getElementById("games-search-input");
    const homeBtn = document.getElementById("btn-home");

    if (homeBtn) {
        homeBtn.addEventListener("click", () => {
            if (portalSearch) portalSearch.value = "";
            if (gamesSearchInput) gamesSearchInput.value = "";
            window.renderGames();
        });
    }

    if (portalSearch) {
        portalSearch.addEventListener("input", (e) => {
            const value = e.target.value;
            if (value.trim() !== "") {
                if (gamesSearchInput) gamesSearchInput.value = value;
                window.switchZone("games-zone");
                window.renderGames(value);
            }
        });
    }

    if (gamesSearchInput) {
        gamesSearchInput.addEventListener("input", (e) => {
            window.renderGames(e.target.value);
        });
    }

    // Run dynamic catalog matrix immediately
    window.renderGames();

    // 🧹 FORCE REMOVE SPLASH PRELOADER OVERLAY
    setTimeout(() => {
        const preloader = document.getElementById("cobra-preloader");
        if (preloader) {
            preloader.style.opacity = "0";
            preloader.style.display = "none";
            preloader.style.pointerEvents = "none";
            preloader.remove(); 
            console.log("Cobra Core: Interface execution parameters initialized.");
        }
    }, 3200);
});
