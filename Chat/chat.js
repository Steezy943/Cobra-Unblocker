// 💬 COBRA TERMINAL REMADE SUPABASE REALTIME MULTI-CHANNEL ENGINE
const NEW_SUPABASE_URL = "https://hgpzlhwznbaqjcvddjpt.supabase.co";
const NEW_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhncHpsaHd6bmJhcWpjdmRkanB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4MDQzNTEsImV4cCI6MjEwNzM4MDM1MX0.VrhpMbqnMqnspu4n42lhE0mYvO-DnIfTwo4vMtrKYKw";

let supabase = null;

// Clean verification loop stops initialization crashes if credentials aren't ready yet
if (
    NEW_SUPABASE_URL && 
    !NEW_SUPABASE_URL.includes("YOUR_NEW") && 
    typeof window.supabase !== 'undefined'
) {
    supabase = window.supabase.createClient(NEW_SUPABASE_URL, NEW_SUPABASE_ANON_KEY);
}

window.initCobraChat = async function() {
    const chatMount = document.getElementById("cobra-chat-mount");
    if (!chatMount) return;

    const isConnected = supabase !== null;

    // A. BONE-DRY VIEW COMPONENT GENERATION
    chatMount.innerHTML = `
        <div class="chat-container-layout">
            
            <!-- COLUMN 1: SIDEBAR TEXT CHANNELS -->
            <aside class="chat-sidebar-channels">
                <div class="chat-server-header">
                    <span>COBRA TERMINAL</span>
                    <span class="dropdown-chevron">▼</span>
                </div>
                <div class="chat-channels-scroller">
                    <div class="category-header-wrap"><span>Text Channels</span></div>
                    <div class="chat-channel-row active" data-channel="general">
                        <span class="hashtag-prefix">#</span><span>general-discussion</span>
                    </div>
                </div>
                
                <!-- ACCOUNT FOOTER -->
                <div class="chat-user-footer">
                    <div class="user-avatar-circle">
                        <span>P1</span>
                        <div class="user-status-indicator" style="background: ${isConnected ? '#00ff66' : '#ff3333'};"></div>
                    </div>
                    <div class="user-meta-capsule">
                        <span class="user-display-name">Player_One</span>
                        <span class="user-status-text">${isConnected ? 'Supabase Realtime Live' : 'Offline Demo Mode'}</span>
                    </div>
                </div>
            </aside>

            <!-- COLUMN 2: MAIN SCROLL VIEWPORT -->
            <div class="chat-main-feed">
                <header class="chat-feed-topbar">
                    <div class="active-meta-left"><span class="hashtag-symbol">#</span><span>general-discussion</span></div>
                </header>

                <div class="chat-messages-container" id="chat-stream-scroller">
                    <div class="chat-welcome-anchor" id="chat-anchor-node">
                        <div class="anchor-hashtag-badge">#</div>
                        <h2 class="anchor-main-title">Welcome to #general-discussion!</h2>
                        <p class="anchor-sub-desc">This is the start of a clean, database-synchronized data stream corridor.</p>
                    </div>
                </div>

                <div class="chat-input-outer-wrapper">
                    <div class="chat-input-inner-bar">
                        <input type="text" id="chat-live-input-box" placeholder="Message #general-discussion...">
                        <div class="chat-input-macros"><span id="chat-submit-trigger" style="cursor:pointer; color:#fff;">⚡</span></div>
                    </div>
                </div>
            </div>

            <!-- COLUMN 3: ROSTER -->
            <aside class="chat-members-sidebar">
                <div class="members-category-label">Terminal Nodes</div>
                <div class="chat-member-card-row">
                    <div class="member-avatar-badge" style="border-color: #fff; color: #fff;">👑</div>
                    <span class="member-username-string" style="color: #fff; font-weight: 600;">Steezy943</span>
                </div>
                <div class="chat-member-card-row">
                    <div class="member-avatar-badge">P1</div>
                    <span class="member-username-string">Player_One</span>
                </div>
            </aside>
        </div>
    `;

    const messageInput = document.getElementById("chat-live-input-box");
    const submitTrigger = document.getElementById("chat-submit-trigger");
    const streamScroller = document.getElementById("chat-stream-scroller");

    // B. TEXT PACKET GRAPHICS RENDER LOOP
    function appendMessageToLayout(author, avatar, text, timestamp) {
        const row = document.createElement("div");
        row.className = "live-message-row";

        const time = timestamp ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now";

        row.innerHTML = `
            <div class="msg-avatar-fallback">${avatar}</div>
            <div class="msg-content-block">
                <div class="msg-header-meta">
                    <span class="msg-author-name">${author}</span>
                    <span class="msg-timestamp-label">at ${time}</span>
                </div>
                <p class="msg-text-paragraph">${text}</p>
            </div>
        `;
        if (streamScroller) {
            streamScroller.appendChild(row);
            streamScroller.scrollTo({ top: streamScroller.scrollHeight, behavior: 'smooth' });
        }
    }

    // C. EVENT ROUTER: DISPATCH STRINGS OUTWARD
    async function handlePacketTransmission() {
        if (!messageInput) return;
        const textVal = messageInput.value.trim();
        if (textVal === "") return;

        messageInput.value = "";

        if (isConnected) {
            // Post onto your new Supabase database instance endpoint
            const { error } = await supabase
                .from('messages')
                .insert([{ author: 'Player_One', avatar: 'P1', message: textVal, channel: 'general' }]);
            if (error) console.error("Database write exception:", error);
        } else {
            // Fallback simulated layout loop for testing styles instantly offline
            appendMessageToLayout("Player_One", "P1", textVal, null);
            setTimeout(() => {
                appendMessageToLayout("Cobra_Bot", "🤖", "Local echo trace accepted. Wire Supabase credentials to save records globally.", null);
            }, 600);
        }
    }

    // D. WIRE EVENTS
    if (messageInput) {
        messageInput.onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); handlePacketTransmission(); } };
    }
    if (submitTrigger) {
        submitTrigger.onclick = () => { handlePacketTransmission(); };
    }

    // E. LOAD LOGS & OPEN SOCKET CHANNELS IF READY
    if (isConnected) {
        const { data } = await supabase
            .from('messages')
            .select('*')
            .order('created_at', { ascending: true })
            .limit(60);

        if (data) {
            data.forEach(msg => appendMessageToLayout(msg.author, msg.avatar, msg.message, msg.created_at));
        }

        // Open live websocket changes monitoring line
        supabase
            .channel('room-changes')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
                const incoming = payload.new;
                appendMessageToLayout(incoming.author, incoming.avatar, incoming.message, incoming.created_at);
            })
            .subscribe();
    }
};

// F. LAYOUT VIEW NAVIGATION LIFECYCLES INTEGRATION
const coreGlobalSwitch = window.switchZone;
window.switchZone = function(zoneId) {
    if (coreGlobalSwitch) coreGlobalSwitch(zoneId);
    if (zoneId === "chat-zone") {
        setTimeout(() => { window.initCobraChat(); }, 20);
    }
};
