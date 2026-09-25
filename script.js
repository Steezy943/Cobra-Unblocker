// 🚀 COBRA ADVANCED GLOBAL NAV ARCHITECTURE & KINETIC TAB SYSTEM
window.openTabs = []; // Array nodes payload: { id: string, label: string, isPinned: boolean }

window.switchZone = function(zoneId) {
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

    // Dashboard and settings views act as external control spaces outside the navigation ribbon
    if (zoneId === "dashboard-zone" || zoneId === "settings-zone") {
        document.querySelectorAll(".cobra-tab-item").forEach(t => t.classList.remove("active-tab"));
        const slider = document.getElementById("cobra-liquid-slider");
        if (slider) { slider.style.width = "0px"; } // Turn slider off off-view
        return;
    }

    // Verify if entry array node instance is current
    const foundIndex = window.openTabs.findIndex(tab => tab.id === zoneId);
    if (foundIndex === -1) {
        let friendlyLabel = zoneId.replace("-zone", "").toUpperCase();
        if (zoneId === "player-zone") friendlyLabel = "🎮 PLAYER LAYER";
        
        window.openTabs.push({ id: zoneId, label: friendlyLabel, isPinned: false });
    }

    window.refreshTabsUI(zoneId);
};

// Orchestrates DOM generation framework overlays
window.refreshTabsUI = function(activeZoneId) {
    const tabsDock = document.getElementById("cobra-tabs-dock");
    if (!tabsDock) return;
    tabsDock.innerHTML = "";

    // Sort order logic: keep pinned items locked cleanly to the left margin
    window.openTabs.sort((a, b) => (b.isPinned - a.isPinned));

    window.openTabs.forEach(tab => {
        const tabEl = document.createElement("div");
        tabEl.id = `tab-anchor-${tab.id}`;
        tabEl.className = `cobra-tab-item ${tab.id === activeZoneId ? 'active-tab' : ''} ${tab.isPinned ? 'pinned-tab' : ''}`;
        
        tabEl.innerHTML = `
            <div class="tab-status-pulse"></div>
            <span class="tab-title-text">${tab.label}</span>
            <div class="tab-actions-group">
                <span class="tab-pin-toggle" title="Pin Task Window">📌</span>
                <span class="tab-close-btn" title="Close Panel">×</span>
            </div>
        `;

        // Switch to the target view zone on click
        tabEl.addEventListener("click", (e) => {
            if (e.target.classList.contains('tab-close-btn') || e.target.classList.contains('tab-pin-toggle')) return;
            window.switchZone(tab.id);
        });

        // Pin button trigger handler
        const pinBtn = tabEl.querySelector(".tab-pin-toggle");
        pinBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            tab.isPinned = !tab.isPinned;
            window.refreshTabsUI(activeZoneId);
        });

        // Close button click listener
        const closeBtn = tabEl.querySelector(".tab-close-btn");
        closeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            window.closeTabItem(tab.id);
        });

        tabsDock.appendChild(tabEl);
    });

    // Fire the hardware-accelerated liquid animation update loop frame
    setTimeout(() => { window.animateLiquidSlider(activeZoneId); }, 40);
};

// Liquid Slide Physics Calculations Engine
window.animateLiquidSlider = function(activeZoneId) {
    const slider = document.getElementById("cobra-liquid-slider");
    const activeTabEl = document.getElementById(`tab-anchor-${activeZoneId}`);
    const tabsDock = document.getElementById("cobra-tabs-dock");
    
    if (!slider || !tabsDock) return;
    
    if (!activeTabEl) {
        slider.style.width = "0px";
        return;
    }

    // Measure the exact position of the active tab element relative to the dock container row
    const dockRect = tabsDock.getBoundingClientRect();
    const tabRect = activeTabEl.getBoundingClientRect();
    
    const offsetLeft = tabRect.left - dockRect.left;
    const currentWidth = tabRect.width;

    // Apply high-performance CSS transform animations instead of changing slow positioning variables
    slider.style.width = `${currentWidth}px`;
    slider.style.transform = `translateX(${offsetLeft}px)`;
};

window.closeTabItem = function(zoneId) {
    window.openTabs = window.openTabs.filter(tab => tab.id !== zoneId);
    
    if (zoneId === "player-zone") {
        const iframe = document.getElementById("cobra-game-iframe");
        if (iframe) iframe.src = "";
    }

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
