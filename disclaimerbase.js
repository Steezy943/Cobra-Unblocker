// Starts the 3-second countdown immediately when the file is loaded
setTimeout(() => {
    // Check if modal already exists to prevent duplicate overlays
    if (document.getElementById("disclaimer-modal")) return;

    const overlay = document.createElement("div");
    overlay.id = "disclaimer-modal";
    overlay.className = "disclaimer-overlay";

    // Fixed the image path extension to .png
    overlay.innerHTML = `
        <div class="disclaimer-content">
            <img src="Assets/Img/SiteLogo.png" alt="Site Logo" class="disclaimer-logo" onerror="this.style.display='none';">
            <p class="disclaimer-text">
                Report any problems like (games not working/proxy not working/music not working/chat not working) in the issues tab on the GitHub page 
                <a href="https://github.com" target="_blank" class="disclaimer-link">https://github.com</a>.
                <br><br>
                <span class="wip-text">(The chat, music, and proxy are currently WIP, please be patient)</span>
            </p>
            <button id="close-disclaimer" class="disclaimer-btn">OK</button>
        </div>
    `;

    document.body.appendChild(overlay);

    // Make the modal transition visible smoothly
    setTimeout(() => {
        overlay.classList.add("show");
    }, 50);

    // Force clear functions to remove the click-blocking wall completely
    const closeBtn = document.getElementById("close-disclaimer");
    if (closeBtn) {
        closeBtn.onclick = function() {
            overlay.classList.remove("show");
            setTimeout(() => {
                overlay.style.display = "none";
                overlay.remove(); // Drops the element from the DOM entirely
                console.log("Cobra Core: Disclaimer cleared. Background buttons unlocked.");
            }, 400);
        };
    }
}, 3000);
