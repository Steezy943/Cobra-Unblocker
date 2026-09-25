// 🚀 COBRA SOLID WHITE FLUID ENGINE RUNTIME
window.openTabs = []; 
window.fluidAnimations = {}; 

const glyphMap = {
    "proxy-zone": "🔒",
    "games-zone": "🎮",
    "music-zone": "🎵",
    "movies-zone": "🎬",
    "chat-zone": "💬",
    "apps-zone": "📱",
    "player-zone": "🎯"
};

window.switchZone = function(zoneId) {
    const viewZones = document.querySelectorAll(".view-zone");
    viewZones.forEach(zone => zone.classList.remove("active"));
    
    const targetZone = document.getElementById(zoneId);
    if (targetZone) {
        targetZone.classList.add("active");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (zoneId === "dashboard-zone" || zoneId === "settings-zone") {
        document.querySelectorAll(".cobra-tab-item").forEach(t => t.classList.remove("active-tab"));
        return;
    }

    const exists = window.openTabs.some(tab => tab.id === zoneId);
    if (!exists) {
        const icon = glyphMap[zoneId] || "📁";
        window.openTabs.push({ id: zoneId, symbol: icon });
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
        
        tabEl.innerHTML = `
            <canvas class="tab-fluid-canvas" id="canvas-${tab.id}"></canvas>
            <span class="tab-close-corner" title="Close Window">×</span>
            <span class="tab-glyph-symbol">${tab.symbol}</span>
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

// 🌀 SOLID WHITE SMOKE / INK EMULATOR FLUID ENGINE
window.initFluidCanvas = function(tabId) {
    const canvas = document.getElementById(`canvas-${tabId}`);
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    canvas.width = 44;
    canvas.height = 44;

    let particles = [];
    for (let i = 0; i < 15; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            radius: Math.random() * 4 + 2,
            alpha: Math.random() * 0.3 + 0.1,
            growth: (Math.random() - 0.5) * 0.02
        });
    }

    if (window.fluidAnimations[tabId]) { cancelAnimationFrame(window.fluidAnimations[tabId]); }
    function runAnimationLoop() {
        const toggleSwitch = document.getElementById("toggle-fluid-sim");
        const animationAllowed = toggleSwitch ? toggleSwitch.checked : true;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (animationAllowed) {
            ctx.fillStyle = "rgba(10, 10, 10, 0.15)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.radius += p.growth;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                if (p.radius < 1 || p.radius > 6) p.growth *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                ctx.fill();
            });
        }
        window.fluidAnimations[tabId] = requestAnimationFrame(runAnimationLoop);
    }
    runAnimationLoop();
};
window.closeTabItem = function(zoneId) {
    if (window.fluidAnimations[zoneId]) {
        cancelAnimationFrame(window.fluidAnimations[zoneId]);
        delete window.fluidAnimations[zoneId];
    }

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
                    <div class="kinetic-trail-container">
                        <div class="swirl-title-layer layer-trail-2">${game.title}</div>
                        <div class="swirl-title-layer layer-trail-1">${game.title}</div>
                        <div class="swirl-title-layer layer-primary">${game.title}</div>
                    </div>
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

    window.renderGames();

    setTimeout(() => {
        const preloader = document.getElementById("cobra-preloader");
        if (preloader) {
            preloader.style.opacity = "0";
            preloader.style.display = "none";
            preloader.style.pointerEvents = "none";
            preloader.remove(); 
        }
    }, 3200);
});
