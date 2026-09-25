// 🚀 GLOBAL NAVIGATION ROUTER ENGINE
window.switchZone = function(zoneId) {
    const viewZones = document.querySelectorAll(".view-zone");
    viewZones.forEach(zone => zone.classList.remove("active"));
    
    const targetZone = document.getElementById(zoneId);
    if (targetZone) {
        targetZone.classList.add("active");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log("Cobra Router: Navigated directly to #" + zoneId);
    } else {
        console.error("Cobra Router Error: View segment #" + zoneId + " is missing from the document.");
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

// 🎮 INTERACTIVE GRID RENDERER
window.renderGames = function(filterText = "") {
    const gamesGrid = document.getElementById("games-grid-container");
    if (!gamesGrid) return;
    gamesGrid.innerHTML = "";

    // Safely look up global database array array
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

// INITIALIZE RUNTIME LISTENERS
document.addEventListener("DOMContentLoaded", () => {
    const portalSearch = document.querySelector(".portal-search-input");
    const gamesSearchInput = document.getElementById("games-search-input");
    const homeBtn = document.getElementById("btn-home");

    // Home Reset routine
    if (homeBtn) {
        homeBtn.addEventListener("click", () => {
            if (portalSearch) portalSearch.value = "";
            if (gamesSearchInput) gamesSearchInput.value = "";
            window.renderGames();
        });
    }

    // Input Synchronization Listeners
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

    // Render original arcade inventory catalog immediately
    window.renderGames();

    // 🧹 FORCE REMOVE PRELOADER BARRIER
    setTimeout(() => {
        const preloader = document.getElementById("cobra-preloader");
        if (preloader) {
            preloader.style.opacity = "0";
            preloader.style.display = "none";
            preloader.style.pointerEvents = "none";
            preloader.remove(); 
            console.log("Cobra Core: Click interface unblocked completely.");
        }
    }, 3200);
});
