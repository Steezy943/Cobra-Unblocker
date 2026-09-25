// 🚀 COBRA SOLID WHITE FLUID ENGINE RUNTIME
window.openTabs = []; 
window.fluidAnimations = {}; 

const iconMap = {
    "dashboard-zone": "Assets/Img/SiteLogo.png", 
    "proxy-zone": "Assets/Img/proxyicon.png",
    "games-zone": "Assets/Img/gamesicon.png",
    "music-zone": "Assets/Img/musicicon.png",
    "movies-zone": "Assets/Img/movieicon.png",
    "chat-zone": "Assets/Img/chaticon.png",
    "apps-zone": "Assets/Img/appicon.png",
    "player-zone": "Assets/Img/gamesicon.png"
};

window.switchZone = function(zoneId) {
    const viewZones = document.querySelectorAll(".view-zone");
    viewZones.forEach(zone => zone.classList.remove("active"));
    
    const targetZone = document.getElementById(zoneId);
    if (targetZone) {
        targetZone.classList.add("active");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const exists = window.openTabs.some(tab => tab.id === zoneId);
    if (!exists) {
        const iconPath = iconMap[zoneId] || "Assets/Img/SiteLogo.png";
        window.openTabs.push({ id: zoneId, path: iconPath, isHome: zoneId === "dashboard-zone" });
    }

    window.refreshTabsUI(zoneId);
};

window.refreshTabsUI = function(activeZoneId) {
    const tabsDock = document.getElementById("cobra-tabs-dock");
    if (!tabsDock) return;
    tabsDock.innerHTML = "";

    window.openTabs.forEach(tab => {
        const tabEl = document.createElement("div");
        tabEl.className = `cobra-tab-item ${tab.id === activeZoneId ? 'active-tab' : ''}`;
        tabEl.id = `side-tab-${tab.id}`;
        
        const dynamicLabel = tab.isHome ? "🏠" : `<img src="${tab.path}" class="tab-glyph-symbol" alt="" style="width:18px;height:18px;object-fit:contain;filter:brightness(0) invert(1);">`;

        tabEl.innerHTML = `
            <canvas class="tab-fluid-canvas" id="canvas-${tab.id}"></canvas>
            <span class="tab-close-corner" title="Close Window">×</span>
            <span style="position:relative; z-index:2; display:flex; align-items:center; justify-content:center;">${dynamicLabel}</span>
        `;

        tabEl.addEventListener("click", (e) => {
            if (e.target.classList.contains("tab-close-corner")) return;
            window.switchZone(tab.id);
        });

        const closeX = tabEl.querySelector(".tab-close-corner");
        closeX.addEventListener("click", (e) => {
            e.stopPropagation();
            window.closeTabItem(tab.id);
        });

        tabsDock.appendChild(tabEl);
        window.initFluidCanvas(tab.id);
    });
};

window.initFluidCanvas = function(tabId) {
    const canvas = document.getElementById(`canvas-${tabId}`);
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    canvas.width = 44;
    canvas.height = 44;

    let particles = [];
    for (let i = 0; i < 10; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            radius: Math.random() * 3 + 1,
            alpha: Math.random() * 0.2 + 0.1,
            growth: (Math.random() - 0.5) * 0.01
        });
    }
    if (window.fluidAnimations[tabId]) { cancelAnimationFrame(window.fluidAnimations[tabId]); }
    function runAnimationLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy; p.radius += p.growth;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            ctx.fill();
        });
        window.fluidAnimations[tabId] = requestAnimationFrame(runAnimationLoop);
    }
    runAnimationLoop();
};

window.closeTabItem = function(zoneId) {
    if (window.fluidAnimations[zoneId]) {
        cancelAnimationFrame(window.fluidAnimations[zoneId]);
        delete window.fluidAnimations[zoneId];
    }

    const targetedTab = window.openTabs.find(tab => tab.id === zoneId);
    window.openTabs = window.openTabs.filter(tab => tab.id !== zoneId);
    
    if (zoneId === "player-zone") {
        const iframe = document.getElementById("cobra-game-iframe");
        if (iframe) iframe.src = "";
    }

    if (targetedTab && targetedTab.isHome) {
        document.body.innerHTML = `
            <div class="void-screen-override">
                <span>You shouldn't be here, refresh the site...</span>
            </div>
        `;
        return;
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
    }
};

window.renderGames = function(filterText = "") {
    const gamesGrid = document.getElementById("games-grid-container");
    if (!gamesGrid) return;
    gamesGrid.innerHTML = "";

    const catalog = window.gamesList || [];
    const filtered = catalog.filter(game => game.title.toLowerCase().includes(filterText.toLowerCase()));

    if (filtered.length === 0) {
        gamesGrid.innerHTML = `<p class="coming-soon-text">No unblocked elements matched your lookup.</p>`;
        return;
    }
    filtered.forEach(game => {
        const card = document.createElement("div");
        card.className = "card-circle-wrapper";
        card.innerHTML = `
            <div class="card-circle-inner" style="display: flex; align-items: center; justify-content: center; position: relative;">
                <img src="${game.thumbUrl}" alt="${game.title}" class="card-circle-thumb" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" 
                     style="width:100%; height:100%; object-fit:cover; position:absolute; top:0; left:0; z-index:1;">
                <div class="fallback-circle-box" style="display: none; width: 100%; height: 100%; background: #111; align-items: center; justify-content: center; font-size: 2rem; color: #444; position: absolute; top: 0; left: 0; z-index: 0;">🎮</div>
                <div class="swirl-text-overlay" style="z-index: 2;">
                    <div class="kinetic-trail-container">
                        <div class="swirl-title-layer layer-trail-2">${game.title}</div>
                        <div class="swirl-title-layer layer-trail-1">${game.title}</div>
                        <div class="swirl-title-layer layer-primary">${game.title}</div>
                    </div>
                    <div class="swirl-category">${game.category}</div>
                </div>
            </div>
        `;
        card.addEventListener("click", () => window.launchGameUrl(game.gameUrl, game.title));
        gamesGrid.appendChild(card);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    window.switchZone("dashboard-zone");

    const portalSearch = document.querySelector(".portal-search-input");
    const gamesSearchInput = document.getElementById("games-search-input");

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
        gamesSearchInput.addEventListener("input", (e) => window.renderGames(e.target.value));
    }

    setTimeout(() => {
        const preloader = document.getElementById("cobra-preloader");
        if (preloader) {
            preloader.style.opacity = "0";
            setTimeout(() => preloader.remove(), 500);
        }
    }, 2800);
});
