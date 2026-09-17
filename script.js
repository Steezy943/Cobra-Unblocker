document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".nav-item");
    const viewZones = document.querySelectorAll(".view-zone");
    const proxyCard = document.querySelector(".proxy-button-card");

    // Reusable function to clear panels and activate targeted zone
    function switchZone(zoneId) {
        navItems.forEach(nav => {
            nav.classList.remove("active");
            if(nav.getAttribute("data-zone") === zoneId) {
                nav.classList.add("active");
            }
        });
        
        viewZones.forEach(zone => zone.classList.remove("active"));
        const targetZone = document.getElementById(zoneId);
        if (targetZone) {
            targetZone.classList.add("active");
        }
    }

    // Sidebar navigation clicks
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const targetZoneId = item.getAttribute("data-zone");
            switchZone(targetZoneId);
        });
    });

    // Clicking the dynamic image proxy button routes directly to Apps Zone
    if (proxyCard) {
        proxyCard.addEventListener("click", () => {
            const targetZoneId = proxyCard.getAttribute("data-zone");
            switchZone(targetZoneId);
        });
    }
});
