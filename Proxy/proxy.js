// 🔒 COBRA MATRIX MINIMALIST WEB SEARCH PROXY LIFECYCLE HANDLER
document.addEventListener("DOMContentLoaded", () => {
    const proxyZone = document.getElementById("proxy-zone");
    if (!proxyZone) return;

    // A. BONE-DRY MARKUP OVERRIDE INJECTION
    proxyZone.innerHTML = `
        <div class="proxy-master-framework">
            
            <!-- STAGE 1: HIGH-END CONTRAST TAB NAVIGATION DECK RAIL -->
            <div class="proxy-browser-deck-bar">
                <div class="proxy-tab-row-deck" id="proxy-tabs-container">
                    <div class="proxy-deck-tab active" data-url="https://google.com">
                        <span class="tab-favicon-node">🔍</span>
                        <span class="tab-title-text">Cobra Search Engine</span>
                        <span class="tab-deck-close-x">×</span>
                    </div>
                </div>
                <button class="proxy-deck-add-tab-btn" id="btn-proxy-new-tab">+</button>
            </div>

            <!-- STAGE 2: ADDRESS AND LOCATOR NAVIGATION CONTROL FIELD BAR -->
            <div class="proxy-address-control-bar">
                <div class="nav-arrow-btn">◀</div>
                <div class="nav-arrow-btn">▶</div>
                <div class="nav-arrow-btn" id="btn-proxy-refresh">🔄</div>
                <div class="proxy-url-input-envelope">
                    <span class="padlock-icon">🔒</span>
                    <input type="text" id="proxy-address-locator-field" value="cobra://search" placeholder="Enter absolute target web domain or address string...">
                </div>
            </div>

            <!-- STAGE 3: RUNTIME VIEWPORT SWITCH CANVAS -->
            <div class="proxy-viewport-canvas-wrapper" id="proxy-viewport-frame-mount">
                
                <!-- DEFAULT SEARCH LANDING MODULE (Perfect Google Screen Mockup Replica) -->
                <div class="google-mockup-landing active" id="proxy-search-landing-view">
                    <div class="google-mockup-centered-hero">
                        <h1 class="google-mockup-logo-brand">COBRA</h1>
                        
                        <!-- Search Frame Wrapper Control -->
                        <div class="google-mockup-search-container">
                            <span class="search-magnifier-node">🔍</span>
                            <input type="text" id="google-mockup-main-input" placeholder="Search unblocked web nodes or input absolute site URLs...">
                            <div class="search-utilities-cluster-right">
                                <span title="Voice Search Interface Toggle" class="utility-icon-node">🎙️</span>
                                <span title="Visual Camera Capture Search Node" class="utility-icon-node">📷</span>
                                <span title="AI Processing Synthesis Matrix State" class="utility-icon-node" style="font-size: 0.75rem; border: 1px solid #222; padding: 2px 6px; border-radius: 12px; white-space: nowrap;">✨ AI Mode</span>
                            </div>
                        </div>

                        <!-- Macro Action Buttons Grid Panel -->
                        <div class="google-mockup-buttons-row">
                            <button class="google-mockup-action-btn" id="btn-mockup-submit-search">Cobra Search</button>
                            <button class="google-mockup-action-btn" id="btn-mockup-feeling-lucky">I'm Feeling Lucky</button>
                        </div>
                    </div>
                </div>

                <!-- DYNAMIC CORE PROXY WEB CONTAINER FRAME IFRAME VIEW -->
                <iframe id="proxy-core-secure-viewport-iframe" class="proxy-hidden-frame" src="" allowfullscreen></iframe>

            </div>
        </div>
    `;

    // B. TARGET GRAPHICS LOGIC CONNECTIONS DEFINITIONS
    const mainSearchInput = document.getElementById("google-mockup-main-input");
    const addressLocator = document.getElementById("proxy-address-locator-field");
    const iframeViewport = document.getElementById("proxy-core-secure-viewport-iframe");
    const searchLandingView = document.getElementById("proxy-search-landing-view");
    const submitBtn = document.getElementById("btn-mockup-submit-search");
    const luckyBtn = document.getElementById("btn-mockup-feeling-lucky");
    const refreshBtn = document.getElementById("btn-proxy-refresh");

    function executeProxyRequest(inputStr) {
        if (!inputStr || inputStr.trim() === "") return;
        let targetUrl = inputStr.trim();

        // Safe address pattern verification parser engine mapping lines
        if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
            if (targetUrl.includes(".") && !targetUrl.includes(" ")) {
                targetUrl = "https://" + targetUrl;
            } else {
                // Fallback route directly into duckduckgo monochromatic parameters search API
                targetUrl = `https://duckduckgo.com{encodeURIComponent(targetUrl)}`;
            }
        }

        // Toggle layout visibility masks to hide landing layout and expose active iframe canvas frame
        if (searchLandingView) searchLandingView.classList.remove("active");
        if (iframeViewport) {
            iframeViewport.classList.remove("proxy-hidden-frame");
            iframeViewport.src = targetUrl;
        }
        if (addressLocator) addressLocator.value = targetUrl;

        // Update active tab label configurations dynamically on page routing changes
        const activeTabTitle = document.querySelector(".proxy-deck-tab.active .tab-title-text");
        if (activeTabTitle) activeTabTitle.textContent = targetUrl.replace("https://", "").replace("http://", "");
    }

    // C. EVENT WIRE LISTENERS ASSIGNMENTS
    if (mainSearchInput) {
        mainSearchInput.addEventListener("keydown", (e) => { if (e.key === "Enter") executeProxyRequest(mainSearchInput.value); });
    }
    if (addressLocator) {
        addressLocator.addEventListener("keydown", (e) => { if (e.key === "Enter") executeProxyRequest(addressLocator.value); });
    }
    if (submitBtn) {
        submitBtn.addEventListener("click", () => { if (mainSearchInput) executeProxyRequest(mainSearchInput.value); });
    }
    if (luckyBtn) {
        luckyBtn.addEventListener("click", () => { executeProxyRequest("https://github.com"); });
    }
    if (refreshBtn) {
        refreshBtn.addEventListener("click", () => { if (iframeViewport && iframeViewport.src !== "") iframeViewport.src = iframeViewport.src; });
    }

    // D. BROWSER TAB DECK CLOSE BUTTON ROUTER LOGIC FALLBACK
    const closeTabX = document.querySelector(".tab-deck-close-x");
    if (closeTabX) {
        closeTabX.addEventListener("click", (e) => {
            e.stopPropagation();
            // Reset state to empty search deck loop instead of completely soft-locking view spaces
            if (iframeViewport) { iframeViewport.src = ""; iframeViewport.classList.add("proxy-hidden-frame"); }
            if (searchLandingView) searchLandingView.classList.add("active");
            if (addressLocator) addressLocator.value = "cobra://search";
            if (mainSearchInput) mainSearchInput.value = "";
            const activeTabTitle = document.querySelector(".proxy-deck-tab.active .tab-title-text");
            if (activeTabTitle) activeTabTitle.textContent = "Cobra Search Engine";
        });
    }
});
