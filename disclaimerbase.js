document.addEventListener("DOMContentLoaded", () => {
    // Wait 3000 milliseconds (3 seconds) before running the popup logic
    setTimeout(() => {
        // Create the outer layout overlay element
        const overlay = document.createElement("div");
        overlay.id = "disclaimer-modal";
        overlay.className = "disclaimer-overlay";

        // Build internal HTML structure including logo path and copy requirements
        overlay.innerHTML = `
            <div class="disclaimer-content">
                <img src="Assets/Img/SiteLogo" alt="Site Logo" class="disclaimer-logo">
                <p class="disclaimer-text">
                    Report any problems like (games not working/proxy not working/music not working/chat not working) in the issues tab on the GitHub page 
                    <a href="https://github.com" target="_blank" class="disclaimer-link">https://github.com</a>.
                    <br><br>
                    <span class="wip-text">(The chat, music, and proxy are currently WIP, please be patient)</span>
                </p>
                <button id="close-disclaimer" class="disclaimer-btn">OK</button>
            </div>
        `;

        // Append the disclaimer directly into the webpage body
        document.body.appendChild(overlay);

        // Slight micro-delay to let the elements register in DOM before fading in
        setTimeout(() => {
            overlay.classList.add("show");
        }, 50);

        // Add a click handler to close and sweep away the modal cleanly
        const closeBtn = document.getElementById("close-disclaimer");
        closeBtn.addEventListener("click", () => {
            overlay.classList.remove("show");
            
            // Completely clean up DOM node after transition finishes
            setTimeout(() => {
                overlay.remove();
            }, 400);
        });
    }, 3000);
});
