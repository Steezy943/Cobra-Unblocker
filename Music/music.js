// 🎵 COBRA CORE GLOBAL AUDIO PLAYER & DATASTORE MODULE
// Maintain background context variables globally so switching tabs never kills playback
if (!window.cobraAudioInstance) {
    window.cobraAudioInstance = new Audio();
}

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
                    <div class="music-card-wrapper streams-graph-card">
                        <div class="card-header-flex">
                            <div class="metric-block">
                                <span class="metric-label">Streams</span>
                                <h2 class="metric-value">255,850</h2>
                            </div>
                            <div class="platform-nodes-cluster" style="display: flex; align-items: center; gap: 12px;">
                                <img src="Music/Icons/refreshicon.png" alt="Refresh Metrics" title="Re-sync Stream Logs" style="width: 14px; height: 14px; object-fit: contain; filter: brightness(0) invert(0.4); cursor: pointer; transition: transform 0.3s;" onmouseover="this.style.filter='brightness(0) invert(1)'" onmouseout="this.style.filter='brightness(0) invert(0.4)'" onclick="this.style.transform='rotate(360deg)'">
                                <span class="platform-icon-badge" title="Spotify Node">🎵</span>
                                <span class="platform-icon-badge" title="YouTube Node">📺</span>
                                <span class="platform-icon-badge" title="Apple Music">🍏</span>
                            </div>
                        </div>
                        <div class="mock-graph-vector-canvas">
                            <div class="graph-line-pulse"></div>
                            <div class="graph-target-node"></div>
                        </div>
                        <div class="graph-months-labels-row">
                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                        </div>
                    </div>

                    <div class="music-card-wrapper earnings-meter-card">
                        <div class="metric-block">
                            <span class="metric-label">Earnings</span>
                            <h2 class="metric-value">$102,941</h2>
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
                <div class="music-card-wrapper listeners-stats-card">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1rem;">
                        <div class="metric-block">
                            <span class="metric-label">Listeners Now</span>
                            <h2 class="metric-value">1,283</h2>
                        </div>
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
                    <div class="player-album-art-frame" style="display: flex; align-items: center; gap: 12px; position: relative;">
                        <!-- Injected dynamic album graphic cover art elements image tag -->
                        <img id="player-cover-art-target" src="Music/Coverart/placeholder" alt="" style="width: 44px; height: 44px; border-radius: 4px; object-fit: cover; border: 1px solid #222;">
                        <div class="player-overlay-text-details">
                            <h4 id="player-active-track-title">No Track Selected</h4>
                            <p id="player-active-artist-name">Click a release below to stream</p>
                        </div>
                    </div>
                    <div class="player-audio-controls-row">
                        <div class="timeline-bar-scrub"><div class="timeline-fill" id="audio-timeline-fill" style="width: 0%;"></div></div>
                        <div class="controls-buttons-cluster">
                            <button class="audio-macro-btn" id="btn-audio-prev">⏮</button>
                            <button class="audio-macro-btn play-pause-toggle-circle" id="btn-audio-toggle" style="padding: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #fff; border: 1px solid #fff;">
                                <img id="player-macro-state-img" src="Music/Icons/musicplay.png" alt="" style="width: 12px; height: 12px; object-fit: contain;">
                            </button>
                            <button class="audio-macro-btn" id="btn-audio-next">⏭</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // B. EXACT PATH MAPPING MATCHING YOUR REPOSITORY TREE SCREENSHOT
    const tracksCatalog = [
        { id: "01", title: "FLOUNDER", artist: "Smokedope2016", file: "Music/Songs/FLOUNDER.mp3", cover: "Music/Coverart/flounder.jpg" },
        { id: "02", title: "In Da Party", artist: "Smokedope2016", file: "Music/Songs/In Da Party.mp3", cover: "Music/Coverart/daparty.jpg" },
        { id: "03", title: "Sleep", artist: "Smokedope2016", file: "Music/Songs/Sleep.mp3", cover: "Music/Coverart/sleepsd.jpg" },
        { id: "04", title: "IM NOT GOD BUT I WISH I WAS (feat, Joeyy)", artist: "Smokedope2016", file: "Music/Songs/smokedope2016 - IM NOT GOD BUT I WISH I WAS (feat, Joeyy).mp3", cover: "Music/Coverart/ING.jpg" }
    ];

    let currentTrackIndex = -1;

    // C. GENERATE TRACK ENTRIES IN CATALOG CONTAINER
    const catalogScroller = document.getElementById("music-catalog-scroller");
    if (catalogScroller) {
        tracksCatalog.forEach((track, index) => {
            const trackRow = document.createElement("div");
            trackRow.className = "music-track-list-row";
            trackRow.innerHTML = `
                <span class="track-index-digit">${track.id}</span>
                <img src="${track.cover}" alt="" style="width: 28px; height: 28px; border-radius: 4px; object-fit: cover; border: 1px solid #222;">
                <div class="track-title-meta-group">
                    <span class="track-core-title">${track.title}</span>
                    <span class="track-core-artist">${track.artist}</span>
                </div>
                <span class="track-row-arrow-trigger">▶</span>
            `;

            trackRow.addEventListener("click", () => {
                currentTrackIndex = index;
                playTrack(track);
            });

            catalogScroller.appendChild(trackRow);
        });
    }

    function playTrack(track) {
        document.getElementById("player-active-track-title").textContent = track.title;
        document.getElementById("player-active-artist-name").textContent = track.artist;
        document.getElementById("player-cover-art-target").src = track.cover;

        window.cobraAudioInstance.src = track.file;
        window.cobraAudioInstance.play()
            .then(() => {
                document.getElementById("player-macro-state-img").src = "Music/Icons/musicpause.png";
            })
            .catch(err => console.log("Audio play error: Run site on localhost server node context.", err));

        const rows = document.querySelectorAll(".music-track-list-row");
        rows.forEach(r => r.classList.remove("active"));
        if(rows[currentTrackIndex]) rows[currentTrackIndex].classList.add("active");
    }

    // D. PERSISTENT PLAYER AUDIO RE-SYNC AND PROGRESS INTERFACING UPDATES
    const toggleBtn = document.getElementById("btn-audio-toggle");
    const stateImg = document.getElementById("player-macro-state-img");
    const timelineFill = document.getElementById("audio-timeline-fill");

    if (window.cobraAudioInstance.src && window.cobraAudioInstance.src !== "") {
        if (!window.cobraAudioInstance.paused) {
            stateImg.src = "Music/Icons/musicpause.png";
        }
        const decodeSrc = decodeURIComponent(window.cobraAudioInstance.src);
        const matchTrack = tracksCatalog.find(t => decodeSrc.includes(t.file));
        if (matchTrack) {
            document.getElementById("player-active-track-title").textContent = matchTrack.title;
            document.getElementById("player-active-artist-name").textContent = matchTrack.artist;
            document.getElementById("player-cover-art-target").src = matchTrack.cover;
        }
    }
    if (toggleBtn && stateImg) {
        toggleBtn.onclick = function() {
            if (window.cobraAudioInstance.src === "" || window.cobraAudioInstance.src.endsWith("music-zone")) {
                if(tracksCatalog.length > 0) { currentTrackIndex = 0; playTrack(tracksCatalog[0]); }
                return;
            }
            if (!window.cobraAudioInstance.paused) {
                window.cobraAudioInstance.pause();
                stateImg.src = "Music/Icons/musicplay.png";
            } else {
                window.cobraAudioInstance.play();
                stateImg.src = "Music/Icons/musicpause.png";
            }
        };
    }

    window.cobraAudioInstance.ontimeupdate = function() {
        if (window.cobraAudioInstance.duration && timelineFill) {
            const pct = (window.cobraAudioInstance.currentTime / window.cobraAudioInstance.duration) * 100;
            timelineFill.style.width = `${pct}%`;
        }
    };

    window.cobraAudioInstance.onended = function() {
        if (currentTrackIndex > -1 && currentTrackIndex < tracksCatalog.length - 1) {
            currentTrackIndex++;
            playTrack(tracksCatalog[currentTrackIndex]);
        } else {
            stateImg.src = "Music/Icons/musicplay.png";
            if(timelineFill) timelineFill.style.width = "0%";
        }
    };
};

document.addEventListener("DOMContentLoaded", () => {
    window.initMusicDashboard();
});

const originalSwitchZone = window.switchZone;
window.switchZone = function(zoneId) {
    if (originalSwitchZone) originalSwitchZone(zoneId);
    if (zoneId === "music-zone") {
        setTimeout(() => { window.initMusicDashboard(); }, 20);
    }
};
