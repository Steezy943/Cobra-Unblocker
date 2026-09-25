// 🚀 COBRA SOLID WHITE FLUID ENGINE RUNTIME
window.openTabs = []; 
window.fluidAnimations = {}; 
window.fluidInstances = {};

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

    if (zoneId === "dashboard-zone" || zoneId === "settings-zone") {
        document.querySelectorAll(".cobra-tab-item").forEach(t => t.classList.remove("active-tab"));
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

    window.openTabs.forEach((tab, index) => {
        const tabEl = document.createElement("div");
        tabEl.className = `cobra-tab-item ${tab.id === activeZoneId ? 'active-tab' : ''}`;
        tabEl.id = `side-tab-${tab.id}`;
        tabEl.setAttribute("draggable", "true");
        tabEl.setAttribute("data-index", index);
        
        const dynamicLabel = tab.isHome ? "🏠" : `<img src="${tab.path}" class="tab-glyph-symbol" alt="" style="width:18px;height:18px;object-fit:contain;filter:brightness(0) invert(1);">`;

        tabEl.innerHTML = `
            <canvas class="tab-fluid-canvas" id="canvas-${tab.id}"></canvas>
            <span class="tab-close-corner" title="Close Window">×</span>
            <span style="position:relative; z-index:2; display:flex; align-items:center; justify-content:center; pointer-events:none;">${dynamicLabel}</span>
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

        window.setupTabDragEvents(tabEl, tab.id);
        tabsDock.appendChild(tabEl);
        window.initFluidSolver(tab.id);
    });
};

// ⚙️ PHYSICAL GRID FLUID SOLVER (Stam-Derivative Solver Engine)
window.initFluidSolver = function(tabId) {
    const canvas = document.getElementById(`canvas-${tabId}`);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = 44; canvas.height = 44;

    const RES = 16; 
    let u = new Float32Array(RES * RES), v = new Float32Array(RES * RES);
    let u_prev = new Float32Array(RES * RES), v_prev = new Float32Array(RES * RES);
    let d = new Float32Array(RES * RES), d_prev = new Float32Array(RES * RES);

    window.fluidInstances[tabId] = { u, v, u_prev, v_prev, d, d_prev, RES };

    canvas.onmousemove = (e) => {
        const rect = canvas.getBoundingClientRect();
        const mx = Math.floor(((e.clientX - rect.left) / rect.width) * RES);
        const my = Math.floor(((e.clientY - rect.top) / rect.height) * RES);
        if (mx > 0 && mx < RES-1 && my > 0 && my < RES-1) {
            const idx = mx + my * RES;
            d[idx] = 1.0; 
            u[idx] = (e.movementX || 0) * 0.2;
            v[idx] = (e.movementY || 0) * 0.2;
        }
    };
    if (window.fluidAnimations[tabId]) { cancelAnimationFrame(window.fluidAnimations[tabId]); }
    
    function step() {
        const toggleSwitch = document.getElementById("toggle-fluid-sim");
        if (toggleSwitch && !toggleSwitch.checked) {
            ctx.clearRect(0,0,44,44);
            window.fluidAnimations[tabId] = requestAnimationFrame(step);
            return;
        }

        for(let i=0; i<RES*RES; i++) {
            d[i] *= 0.94; u[i] *= 0.92; v[i] *= 0.92;
            u[i] += (Math.random()-0.5)*0.02; v[i] += (Math.random()-0.5)*0.02;
        }

        for (let y=1; y<RES-1; y++) {
            for (let x=1; x<RES-1; x++) {
                let xp = x - u[x+y*RES], yp = y - v[x+y*RES];
                if(xp<0.5) xp=0.5; if(xp>RES-1.5) xp=RES-1.5;
                if(yp<0.5) yp=0.5; if(yp>RES-1.5) yp=RES-1.5;
                let i0=Math.floor(xp), i1=i0+1, j0=Math.floor(yp), j1=j0+1;
                let s1=xp-i0, s0=1-s1, t1=yp-j0, t0=1-t1;
                d_prev[x+y*RES] = s0*(t0*d[i0+j0*RES]+t1*d[i0+j1*RES])+s1*(t0*d[i1+j0*RES]+t1*d[i1+j1*RES]);
            }
        }
        d.set(d_prev);

        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0,0,44,44);
        const cellW = 44/RES;
        for(let y=0; y<RES; y++) {
            for(let x=0; x<RES; x++) {
                let den = d[x+y*RES];
                if(den > 0.02) {
                    ctx.fillStyle = `rgba(255,255,255,${Math.min(den, 0.45)})`;
                    ctx.fillRect(x*cellW, y*cellW, cellW+0.5, cellW+0.5);
                }
            }
        }
        window.fluidAnimations[tabId] = requestAnimationFrame(step);
    }
    step();
};

let sourceDragElement = null;
window.setupTabDragEvents = function(el, id) {
    el.addEventListener("dragstart", (e) => {
        sourceDragElement = el;
        el.style.opacity = "0.4";
        e.dataTransfer.effectAllowed = "move";
    });
    el.addEventListener("dragover", (e) => {
        e.preventDefault();
        return false;
    });
    el.addEventListener("drop", (e) => {
        e.stopPropagation();
        if (sourceDragElement && sourceDragElement !== el) {
            const srcIdx = parseInt(sourceDragElement.getAttribute("data-index"));
            const targetIdx = parseInt(el.getAttribute("data-index"));
            
            // FIXED: Splice extraction array normalization error
            const movedTab = window.openTabs.splice(srcIdx, 1)[0];
            window.openTabs.splice(targetIdx, 0, movedTab);

            const srcInst = window.fluidInstances[movedTab.id];
            const targetInst = window.fluidInstanwindow.closeTabItem = function(zoneId) {
    if (window.fluidAnimations[zoneId]) { cancelAnimationFrame(window.fluidAnimations[zoneId]); delete window.fluidAnimations[zoneId]; }
    if (window.fluidInstances[zoneId]) { delete window.fluidInstances[zoneId]; }

    const targetedTab = window.openTabs.find(tab => tab.id === zoneId);
    window.openTabs = window.openTabs.filter(tab => tab.id !== zoneId);
    
    if (zoneId === "player-zone") {
        const iframe = document.getElementById("cobra-game-iframe");
        if (iframe) iframe.src = "";
    }

    // FIX: Renders a completely clean black screen canvas, then smoothly fades red caution text in over 1 second
    if (targetedTab && targetedTab.isHome) {
        document.body.style.transition = "background-color 0.4s ease";
        document.body.style.backgroundColor = "#000000";
        document.body.innerHTML = `
            <div class="void-screen-override" style="position:fixed; top:0; left:0; width:100vw; height:100vh; background:#000000; z-index:999999; display:flex; justify-content:center; align-items:center; color:#ff3333; font-family:monospace; font-size:1.2rem; letter-spacing:1px; opacity:0; transition:opacity 1s ease 0.3s;">
                <span>You shouldn't be here, refresh the site...</span>
            </div>
        `;
        setTimeout(() => {
            const voidEl = document.querySelector(".void-screen-override");
            if (voidEl) voidEl.style.opacity = "1";
        }, 50);
        return;
    }

    if (window.openTabs.length > 0) {
        window.switchZone(window.openTabs[window.openTabs.length - 1].id);
    } else {
        window.switchZone("dashboard-zone");
    }
};

window.launchGameUrl = function(targetUrl, title) {
    const titleEl = document.getElementById("game-frame-title");
    const iframe = document.getElementById("cobra-game-iframe");
    if (titleEl) titleEl.textContent = title;
    if (iframe) { iframe.src = targetUrl; window.switchZone("player-zone"); }
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
                <img src="${game.thumbUrl}" alt="${game.title}" class="card-circle-thumb" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="width:100%; height:100%; object-fit:cover; position:absolute; top:0; left:0; z-index:1;">
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
    // FIX: Render modules are compiled immediately, but we hide dashboard initialization values safely behind our 2.8s loader timeline
    window.renderGames();

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
            setTimeout(() => {
                preloader.remove();
                // FIX: Triggers window viewport rendering state ONLY after preloader screen is cleared out of background thread spaces
                window.switchZone("dashboard-zone");
            }, 500); 
        }
    }, 2800);
});
ces[id];
            if(srcInst) srcInst.d.fill(1.0);
            if(targetInst) targetInst.d.fill(1.0);

            const activeTabItem = document.querySelector(".cobra-tab-item.active-tab");
            const activeZoneId = activeTabItem ? activeTabItem.id.replace("side-tab-", "") : "dashboard-zone";
            window.refreshTabsUI(activeZoneId);
        }
    });
    el.addEventListener("dragend", () => {
        el.style.opacity = "1";
        sourceDragElement = null;
    });
};
