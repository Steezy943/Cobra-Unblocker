// 💬 COBRA MATRIX DYNAMIC DISCORD-REPLICA CHAT SYSTEM ENGINE
document.addEventListener("DOMContentLoaded", () => {
    const chatMount = document.getElementById("cobra-chat-mount");
    if (!chatMount) return;

    // A. CENTRAL OBJECT DATASTORE MATRIX
    const channels = {
        "general": { title: "Welcome to #general!", desc: "This is the absolute initialization point of the #general core text channel window." },
        "gaming": { title: "Welcome to #gaming!", desc: "The staging lounge for all unblocked proxy arcade game discussions." },
        "links": { title: "Welcome to #links!", desc: "Official working source proxies and stealth mirror assets repository links." },
        "link-advertise": { title: "Welcome to #link-advertise!", desc: "Promote and distribute external network bypass nodes here safely." },
        "gamble": { title: "Welcome to #gamble!", desc: "Monochromatic risk matrix engine simulator framework. (System backend coming soon)" }
    };

    let activeChannel = "general";

    // B. PROGRAMMATIC INJECTION OF THE ENTIRE UI TREE STRUCTURE
    chatMount.innerHTML = `
        <div class="chat-container-layout">
            <!-- COLUMN 1: CHANNELS EXPLORER SIDE PANEL -->
            <div class="chat-sidebar-channels">
                <div class="chat-server-header">
                    <span class="server-title-text">Cobra Unblocker</span>
                    <span class="dropdown-chevron">▼</span>
                </div>
                <div class="chat-channels-scroller">
                    <div class="category-header-wrap">
                        <span>▼ Text Channels</span>
                        <span class="add-channel-plus">+</span>
                    </div>
                    <div class="channels-stack-target" id="channels-list-injection">
                        <!-- Channel row links generate programmatically down-script -->
                    </div>
                </div>
                <div class="chat-user-footer">
                    <div class="user-avatar-circle">
                        P1
                        <div class="user-status-indicator"></div>
                    </div>
                    <div class="user-meta-capsule">
                        <span class="user-display-name">Player_One</span>
                        <span class="user-status-text">Online</span>
                    </div>
                    <div class="user-utility-controls">
                        <span title="Mute Mic" class="chat-macro-icon">🎙️</span>
                        <span title="User Settings" class="chat-macro-icon">⚙️</span>
                    </div>
                </div>
            </div>

            <!-- COLUMN 2: MESSAGE TERMINAL VIEWPORT FEED -->
            <div class="chat-main-feed">
                <div class="chat-feed-topbar">
                    <div class="active-meta-left">
                        <span class="hashtag-symbol">#</span>
                        <span id="active-channel-header-title">general</span>
                    </div>
                    <div class="utility-controls-right">
                        <span title="Pinned Messages" class="feed-header-icon">📌</span>
                        <span title="Notification Mutes" class="feed-header-icon">🔔</span>
                        <span title="Member List Toggle" class="feed-header-icon">👥</span>
                        <div class="search-input-wrap">
                            <input type="text" placeholder="Search" class="chat-search-field">
                        </div>
                    </div>
                </div>
                <div class="chat-messages-container" id="chat-stream-viewport">
                    <!-- Dynamic chat welcome cards and live incoming message bubbles mount inside here -->
                </div>
                <div class="chat-input-outer-wrapper">
                    <div class="chat-input-inner-bar">
                        <button class="chat-attach-btn">+</button>
                        <input type="text" id="chat-live-input-box" placeholder="Message #general">
                        <div class="chat-input-macros">
                            <span title="Gift Nitro" class="input-macro-glyph">🎁</span>
                            <span title="Insert GIF" class="input-macro-glyph">🖼️</span>
                            <span title="Open Emoji Palette" class="input-macro-glyph">😀</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- COLUMN 3: SERVER PLAYERS MEMBERS SIDEBAR RAIL -->
            <div class="chat-members-sidebar">
                <div class="members-category-label">Online System Nodes — 1</div>
                <div class="chat-member-card-row">
                    <div class="member-avatar-badge">P1</div>
                    <span class="member-username-string">Player_One</span>
                </div>
            </div>
        </div>
    `;

    // C. INJECT DYNAMIC CHANNEL LINK ROWS OVER CORE MEMORY LISTS
    const channelsListTarget = document.getElementById("channels-list-injection");
    Object.keys(channels).forEach(key => {
        const row = document.createElement("div");
        row.className = `chat-channel-row ${key === activeChannel ? 'active' : ''}`;
        row.innerHTML = `<span class="hashtag-prefix">#</span> ${key} ${key === 'gamble' ? '<span class="wip-tag">wip</span>' : ''}`;
        
        row.addEventListener("click", () => {
            document.querySelectorAll(".chat-channel-row").forEach(r => r.classList.remove("active"));
            row.classList.add("active");
            renderActiveChannel(key);
        });
        channelsListTarget.appendChild(row);
    });

    // D. SYSTEM RENDER SELECTION ENGINE SWITCH HOOKS
    const activeHeaderTitle = document.getElementById("active-channel-header-title");
    const chatInput = document.getElementById("chat-live-input-box");
    const messageContainer = document.getElementById("chat-stream-viewport");

    function renderActiveChannel(chanKey) {
        if (!channels[chanKey] || !messageContainer) return;
        activeChannel = chanKey;
        messageContainer.innerHTML = "";

        // Construct the physical structural context card matching your screenshot parameters
        const welcomeAnchor = document.createElement("div");
        welcomeAnchor.className = "chat-welcome-anchor";
        welcomeAnchor.innerHTML = `
            <div class="anchor-hashtag-badge">#</div>
            <h2 class="anchor-main-title">${channels[chanKey].title}</h2>
            <p class="anchor-sub-desc">${channels[chanKey].desc}</p>
            <div class="anchor-actions-row">
                <span class="anchor-action-link">📝 Edit Channel Details</span>
            </div>
        `;
        messageContainer.appendChild(welcomeAnchor);

        if (activeHeaderTitle) activeHeaderTitle.textContent = chanKey;
        if (chatInput) chatInput.placeholder = `Message #${chanKey}`;
    }

    // E. INTERACTIVE MESSAGE ROUTING STREAM LOGIC TRANSITIONS
    if (chatInput) {
        chatInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && chatInput.value.trim() !== "") {
                const textPayload = chatInput.value.trim();
                chatInput.value = ""; // Instantly clear text prompt field values

                const msgRow = document.createElement("div");
                msgRow.className = "live-message-row";

                const now = new Date();
                const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                msgRow.innerHTML = `
                    <div class="msg-avatar-fallback">P1</div>
                    <div class="msg-content-block">
                        <div class="msg-header-meta">
                            <span class="msg-author-name">Player_One</span>
                            <span class="msg-timestamp-label">Today at ${timeString}</span>
                        </div>
                        <p class="msg-text-paragraph">${textPayload}</p>
                    </div>
                `;

                messageContainer.appendChild(msgRow);
                messageContainer.scrollTop = messageContainer.scrollHeight; // Auto-scroll on submit
            }
        });
    }

    // Initialize layout default configurations right on boot lifecycle execution
    renderActiveChannel("general");
});
