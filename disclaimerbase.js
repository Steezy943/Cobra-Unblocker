// Starts the 3-second countdown immediately when the file is hit
setTimeout(() => {
    const overlay = document.createElement("div");
    overlay.id = "disclaimer-modal";
    overlay.className = "disclaimer-overlay";

    // Adjust "Assets/Img/SiteLogo" here if it has a file extension like .png or .ico
    overlay.innerHTML = `
        <div class="disclaimer-content">
            <img src="Assets/Img/SiteLogo.png" alt="Site Logo" class="disclaimer-logo">
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

    // Apply visibility class
    setTimeout(() => {
        overlay.classList.add("show");
    }, 50);

    // Close and remove modal
    const closeBtn = document.getElementById("close-disclaimer");
    closeBtn.addEventListener("click", () => {
        overlay.classList.remove("show");
        setTimeout(() => overlay.remove(), 400);
    });
}, 3000);
