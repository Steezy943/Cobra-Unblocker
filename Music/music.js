// 🎵 COBRA CORE MATRIX AUDIO STREAMING DASHBOARD SUBSYSTEM
window.initMusicDashboard = function() {
    const musicZone = document.getElementById("music-zone");
    if (!musicZone) return;

    // A. BONE-DRY MARKUP OVERRIDE INJECTION
    musicZone.innerHTML = `
        <div class="music-dashboard-container">
            
            <!-- MAIN LEFT PANELS COLUMN (GRAPHS, DATA AND CONTROLS GRIDS) -->
            <div class="music-main-workspace-feed">
                
                <!-- ROW 1: OVERVIEW ANALYTICS AND EARNINGS MATRICES -->
                <div class="music-dashboard-grid-row">
                    <!-- Analytics Streams Graph Card Module -->
                    <div class="music-card-wrapper streams-graph-card">
                        <div class="card-header-flex">
                            <div class="metric-block">
                                <span class="metric-label">Streams</span>
                                <h2 class="metric-value">255,850</h2>
                            </div>
                            <div class="platform-nodes-cluster" style="display: flex; align-items: center; gap: 12px;">
                                <!-- FIXED: Injected your brand-new refreshicon.png asset cleanly with monochromatic filters -->
                                <img src="Music/Icons/refreshicon.png" alt="Refresh Metrics" title="Re-sync Stream Logs" style="width: 14px; height: 14px; object-fit: contain; filter: brightness(0) invert(0.4); cursor: pointer; transition: transform 0.3s;" onmouseover="this.style.filter='brightness(0) invert(1)'" onmouseout="this.style.filter='brightness(0) invert(0.4)'" onclick="this.style.transform='rotate(360deg)'">
                                <span class="platform-icon-badge" title="Spotify Node">🎵</span>
                                <span class="platform-icon-badge" title="YouTube Node">📺</span>
                                <span class="platform-icon-badge" title="Apple Music">🍏</span>
                            </div>
                        </div>
                        <!-- Monochromatic Sparkline Graph Canvas Hook -->
                        <div class="mock-graph-vector-canvas">
                            <div class="graph-line-pulse"></div>
                            <div class="graph-target-node"></div>
                        </div>
                        <div class="graph-months-labels-row">
                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                        </div>
                    </div>

                    <!-- Earnings Financial Matrix Card Module -->
                    <div class="music-card-wrapper earnings-meter-card">
                        <div class="metric-block">
                            <span class="metric-label">Earnings</span>
                            <h2 class="metric-value">$7,343</h2>
                        </div>
                        <div class="progress-bars-stack">
                            <div class="progress-bar-row"><span>Clearing</span><div class="bar-track"><div class="bar-fill" style="width: 85%;"></div></div></div>
                            <div class="progress-bar-row"><span>Clearing</span><div class="bar-track"><div class="bar-fill" style="width: 65%;"></div></div></div>
                            <div class="progress-bar-row"><span>Clearing</span><div class="bar-track"><div class="bar-fill" style="width: 45%;"></div></div></div>
                            <div class="progress-bar-row"><span>Clearing</span><div class="bar-track"><div class="bar-fill" style="width: 30%;"></div></div></div>
                        </div>
                    </div>
                </div>

                <!-- ROW 2: TARGET AUDIENCE GRAPH AND TRACKS CATALOG FEED -->
                <div class="music-dashboard-grid-row">
                    <!-- Target Audience Bar Graph Card Module -->
                    <div class="music-card-wrapper audience-chart-card">
                        <h3 class="panel-section-title">Target Audience</h3>
                        <div class="audience-bars-container">
                            <div class="audience-bar-column"><div class="bar-track-vertical"><div class="vertical-fill" style="height: 45%;"></div></div><span>Mon</span></div>
                            <div class="audience-bar-column"><div class="bar-track-vertical"><div class="vertical-fill" style="height: 65%;"></div></div><span>Tue</span></div>
                            <div class="audience-bar-column"><div class="bar-track-vertical"><div class="vertical-fill" style="height: 85%;"></div></div><span>Wed</span></div>
                            <div class="audience-bar-column"><div class="bar-track-vertical"><div class="vertical-fill" style="height: 55%;"></div></div><span>Thu</span></div>
                            <div class="audience-bar-column"><div class="bar-track-vertical"><div class="vertical-fill" style="height: 90%;"></div></div><span>Fri</span></div>
                            <div class="audience-bar-column"><div class="bar-track-vertical"><div class="vertical-fill" style="height: 40%;"></div></div><span>Sat</span></div>
                            <div class="audience-bar-column"><div class="bar-track-vertical"><div class="vertical-fill" style="height: 30%;"></div></div><span>Sun</span></div>
                        </div>
                    </div>

                    <!-- Top Releases Dynamic List Feeding Track Blocks -->
                    <div class="music-card-wrapper top-releases-card">
                        <div class="card-header-flex" style="margin-bottom: 12px;">
                            <h3 class="panel-section-title">Top Releases</h3>
                            <span class="view-all-action">All Releases</span>
                        </div>
                        <div class="releases-tracks-scroller" id="music-catalog-scroller">
                            <!-- Track entries populate dynamically here via Javascript array mappings -->
                        </div>
                    </div>
                </div>

            </div>
            <!-- RIGHT PANEL SIDEBAR COLUMN (LIVE PARAMETERS STATISTICS AND INTEGRATED PLAYER) -->
            <div class="music-sidebar-workspace-panel">
                
                <!-- Live Listeners Statistic Matrix Card Module -->
                <div class="music-card-wrapper listeners-stats-card">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1rem;">
                        <div class="metric-block">
                            <span class="metric-label">Listeners Now</span>
                            <h2 class="metric-value">1,283</h2>
                        </div>
                        <!-- UI Alignment: Added physical notification icon asset via folder path layout -->
                        <img src="Music/Icons/notificationicon.png" alt="" style="width: 20px; height: 20px; object-fit: contain; filter: brightness(0) invert(1); cursor: pointer;">
                    </div>
                    
                    <div class="geography-demographics-stack">
                        <div class="geo-row-item"><span>🇺🇸 United States</span><span class="geo-percentage">70%</span></div>
                        <div class="geo-row-item"><span>🇦🇪 Dubai</span><span class="geo-percentage">18%</span></div>
                        <div class="geo-row-item"><span>🇳🇬 Nigeria</span><span class="geo-percentage">6%</span></div>
                        <div class="geo-row-item"><span>🇧🇷 Brazil</span><span class="geo-percentage">6%</span></div>
                    </div>
                </div>

                <!-- Integrated Media Player Window Dock Capsule -->
                <div class="music-card-wrapper media-player-dock-card">
                    <div class="player-album-art-frame">
                        <div class="fallback-vinyl-disk">🎵</div>
                        <div class="player-overlay-text-details">
                            <h4 id="player-active-track-title">Let Me Rest</h4>
                            <p id="player-active-artist-name">Wizkid</p>
                        </div>
                    </div>
                    <!-- Audio Navigation Control Macros Interface Panel -->
                    <div class="player-audio-controls-row">
                        <div class="timeline-bar-scrub"><div class="timeline-fill" style="width: 35%;"></div></div>
                        <div class="controls-buttons-cluster">
                            <button class="audio-macro-btn" id="btn-audio-prev">⏮</button>
                            <!-- UI Alignment: Localized custom assets for your interactive music play and music pause action buttons -->
                            <button class="audio-macro-btn play-pause-toggle-circle" id="btn-audio-toggle" style="padding: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #fff; border: 1px solid #fff;">
                                <img id="player-macro-state-img" src="Music/Icons/musicpause.png" alt="" style="width: 12px; height: 12px; object-fit: contain;">
                            </button>
                            <button class="audio-macro-btn" id="btn-audio-next">⏭</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;

    // B. CENTRAL ARCHITECTURE CATALOG DATASTORE ARRAY
    const tracksCatalog = [
        { id: "01", title: "God's Time", artist: "Jcole", url: "#" },
        { id: "02", title: "Dreamer", artist: "Shasha P", url: "#" },
        { id: "03", title: "All for You", artist: "Drake", url: "#" },
        { id: "04", title: "Pray", artist: "Eminem", url: "#" },
        { id: "05", title: "You", artist: "Asap Rocky", url: "#" },
        { id: "06", title: "Always on my heart", artist: "Usher", url: "#" }
    ];

    // C. GENERATE DYNAMIC CATALOG INTERFACE ROWS
    const catalogScroller = document.getElementById("music-catalog-scroller");
    if (catalogScroller) {
        tracksCatalog.forEach(track => {
            const trackRow = document.createElement("div");
            trackRow.className = "music-track-list-row";
            trackRow.innerHTML = `
                <span class="track-index-digit">${track.id}</span>
                <div class="track-thumbnail-avatar">🎵</div>
                <div class="track-title-meta-group">
                    <span class="track-core-title">${track.title}</span>
                    <span class="track-core-artist">${track.artist}</span>
                </div>
                <span class="track-row-arrow-trigger">▶</span>
            `;

            trackRow.addEventListener("click", () => {
                document.getElementById("player-active-track-title").textContent = track.title;
                document.getElementById("player-active-artist-name").textContent = track.artist;
                
                document.querySelectorAll(".music-track-list-row").forEach(r => r.classList.remove("active"));
                trackRow.classList.add("active");
            });

            catalogScroller.appendChild(trackRow);
        });
    }

    // D. PLAYER LOGIC EVENT UTILITIES WIRE LISTENERS
    const toggleBtn = document.getElementById("btn-audio-toggle");
    const stateImg = document.getElementById("player-macro-state-img");
    if (toggleBtn && stateImg) {
        toggleBtn.onclick = function() {
            if (stateImg.src.includes("musicpause.png")) {
                stateImg.src = "Music/Icons/musicplay.png";
            } else {
                stateImg.src = "Music/Icons/musicpause.png";
            }
        };
    }
};

// CORE INTEGRATION MAPPING RULE: Forces compilation directly whenever standard zone swaps cross over this path link
document.addEventListener("DOMContentLoaded", () => {
    // Standard initialization block if dashboard opens directly
    window.initMusicDashboard();
});

// Intercept hook targeting live window state switches inside master script frameworks
const originalSwitchZone = window.switchZone;
window.switchZone = function(zoneId) {
    if (originalSwitchZone) originalSwitchZone(zoneId);
    if (zoneId === "music-zone") {
        setTimeout(() => { window.initMusicDashboard(); }, 20);
    }
};
