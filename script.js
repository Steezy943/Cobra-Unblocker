document.addEventListener("DOMContentLoaded", () => {
    const viewZones = document.querySelectorAll(".view-zone");
    const settingsToggle = document.getElementById("settings-toggle");
    const homeBtn = document.getElementById("btn-home");
    const gamesGrid = document.getElementById("games-grid-container");
    const portalSearch = document.querySelector(".portal-search-input");
    const hubButtons = document.querySelectorAll(".portal-hub-btn");

    // ==========================================
    // 🎮 FIXED GAMES LIST CATALOGUE (Matches your repo!)
    // ==========================================
    const gamesList = [
        { fileName: "How2Fish.html", title: "How 2 Fish", category: "Casual" }
    ];

    function switchZone(zoneId) {
        viewZones.forEach(zone => zone.classList.remove("active"));
        const targetZone = document.getElementById(zoneId);
        if (targetZone) {
            targetZone.classList.add("active");
        }
    }

    // Grid navigation link execution
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

    // Dynamic library generation loop
    function renderGames(filterText = "") {
        if (!gamesGrid) return;
        gamesGrid.innerHTML = "";

        const filtered = gamesList.filter(game => 
            game.title.toLowerCase().includes(filterText.toLowerCase())
        );

        filtered.forEach(game => {
            const baseName = game.fileName.replace(".html", "");
            const thumbPath = `Assets/Thumbnails/${baseName}.jpg`;

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

            card.addEventListener("click", () => {
                launchGameFrame(game.fileName, game.title);
            });

            gamesGrid.appendChild(card);
        });
    }

    // Text tracking input filter mapping
    if (portalSearch) {
        portalSearch.addEventListener("input", (e) => {
            const value = e.target.value;
            if (value.trim() !== "") {
                switchZone("games-zone");
                renderGames(value);
            }
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
            if (!popup) return alert("Allow popups for about:blank execution!");
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
