// 💬 COBRA TERMINAL SECURE SUPABASE REALTIME CHAT ENGINE WITH AUTHENTICATION
const NEW_SUPABASE_URL = "https://supabase.co";
const NEW_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhncHpsaHd6bmJhcWpjdmRkanB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4MDQzNTEsImV4cCI6MjEwNzM4MDM1MX0.VrhpMbqnMqnspu4n42lhE0mYvO-DnIfTwo4vMtrKYKw";

let supabase = null;
if (typeof window.supabase !== 'undefined') {
    supabase = window.supabase.createClient(NEW_SUPABASE_URL, NEW_SUPABASE_ANON_KEY);
}

window.initCobraChat = async function() {
    const chatMount = document.getElementById("cobra-chat-mount");
    if (!chatMount) return;

    // 1. Check for an active user session token layout parameters
    let activeUser = null;
    if (supabase) {
        const { data: { user } } = await supabase.auth.getUser();
        activeUser = user;
    }

    const isAuthed = activeUser !== null;
    const userLabel = isAuthed ? activeUser.email.split('@')[0] : "Guest_Node";
    const avatarBadge = isAuthed ? userLabel.substring(0, 2).toUpperCase() : "??";

    // A. INJECT THE SYSTEM FRAMEWORK BASE MARKUP
    chatMount.innerHTML = `
        <div class="chat-container-layout" style="position: relative;">
            
            <!-- COBRA AUTH SYSTEM PROTECTION CONTROLLER LAYER SHIELD -->
            \${!isAuthed ? `
            <div class="chat-auth-shield">
                <div class="auth-panel-card" id="cobra-auth-card-viewport">
                    <h2 class="auth-notice-head">Make an account lol</h2>
                    <p class="auth-notice-sub">Login to access and talk in chat!</p>
                    
                    <div class="auth-form-cluster">
                        <input type="text" id="auth-username-field" class="auth-terminal-input" placeholder="Enter custom username...">
                        <input type="password" id="auth-pass-field" class="auth-terminal-input" placeholder="Enter network code passphrase...">
                    </div>
                    
                    <div class="auth-action-btn-row">
                        <button class="auth-submit-node" id="btn-execute-login">Sign In</button>
                    </div>
                    <span class="auth-toggle-alt-link" id="btn-toggle-auth-mode">Need a terminal account? Register node</span>
                </div>
            </div>
            ` : ''}

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
                
                <!-- ACCOUNT FOOTER AREA -->
                <div class="chat-user-footer">
                    <div class="user-avatar-circle">
                        <span>\${avatarBadge}</span>
                        <div class="user-status-indicator" style="background: \${isAuthed ? '#00ff66' : '#ff3333'};"></div>
                    </div>
                    <div class="user-meta-capsule">
                        <span class="user-display-name">\${userLabel}</span>
                        <span class="user-status-text">\${isAuthed ? 'Encrypted Link Live' : 'Link Offline'}</span>
                    </div>
                    \${isAuthed ? `<span id="btn-terminal-logout" title="Disconnect Session" style="cursor:pointer; font-size:0.8rem; margin-left:auto; color:#444;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#444'">❌</span>` : ''}
                </div>
            </aside>

            <!-- COLUMN 2: MESSAGE FEED VIEWPORT -->
            <div class="chat-main-feed">
                <header class="chat-feed-topbar">
                    <div class="active-meta-left"><span class="hashtag-symbol">#</span><span>general-discussion</span></div>
                </header>

                <div class="chat-messages-container" id="chat-stream-scroller">
                    <div class="chat-welcome-anchor">
                        <div class="anchor-hashtag-badge">#</div>
                        <h2 class="anchor-main-title">Welcome to #general-discussion!</h2>
                        <p class="anchor-sub-desc">This is the start of an encrypted, database-synchronized communication channel.</p>
                    </div>
                </div>

                <div class="chat-input-outer-wrapper">
                    <div class="chat-input-inner-bar">
                        <input type="text" id="chat-live-input-box" !isAuthed ? 'disabled' : '' placeholder="{isAuthed ? 'Message #general-discussion...' : 'Access encrypted: Authentication mandatory'}">
                        <div class="chat-input-macros"><span id="chat-submit-trigger" style="cursor:pointer; color:#fff;">⚡</span></div>
                    </div>
                </div>
            </div>
            <!-- COLUMN 3: ROSTER OVERLAY -->
            <aside class="chat-members-sidebar">
                <div class="members-category-label">Terminal Core</div>
                <div class="chat-member-card-row">
                    <div class="member-avatar-badge" style="border-color: #fff; color: #fff;">👑</div>
                    <span class="member-username-string" style="color: #fff; font-weight: 600;">Steezy943</span>
                </div>
                <div class="chat-member-card-row">
                    <div class="member-avatar-badge">${avatarBadge}</div>
                    <span class="member-username-string">${userLabel}</span>
                </div>
            </aside>
        </div>
    `;

    // B. EXIT INITIALIZATION EARLY IF AUTH LAYER HOOK LACKS TOKENS
    if (!isAuthed) {
        setupAuthenticationListeners();
        return;
    }

    const messageInput = document.getElementById("chat-live-input-box");
    const submitTrigger = document.getElementById("chat-submit-trigger");
    const streamScroller = document.getElementById("chat-stream-scroller");
    const logoutBtn = document.getElementById("btn-terminal-logout");

    if (logoutBtn) {
        logoutBtn.onclick = async () => {
            await supabase.auth.signOut();
            window.initCobraChat();
        };
    }

    // C. STREAM INCOMING DATA BLOCKS ONTO ELEMENT VIEWPORT
    function renderMessagePacket(senderEmail, text, createdTime) {
        const row = document.createElement("div");
        row.className = "live-message-row";

        const senderLabel = senderEmail ? senderEmail.split('@')[0] : "Unknown_User";
        const initialSymbol = senderLabel.substring(0, 2).toUpperCase();
        const formattedTime = createdTime ? new Date(createdTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now";

        row.innerHTML = `
            <div class="msg-avatar-fallback">${initialSymbol}</div>
            <div class="msg-content-block">
                <div class="msg-header-meta">
                    <span class="msg-author-name">${senderLabel}</span>
                    <span class="msg-timestamp-label">at ${formattedTime}</span>
                </div>
                <p class="msg-text-paragraph">${text}</p>
            </div>
        `;
        if (streamScroller) {
            streamScroller.appendChild(row);
            streamScroller.scrollTo({ top: streamScroller.scrollHeight, behavior: 'smooth' });
        }
    }

    // D. DATA TRANSMISSION PIPELINE OUTBOUND ROUTER
    async function firePacketOutward() {
        if (!messageInput || !supabase) return;
        const pureText = messageInput.value.trim();
        if (pureText === "") return;

        messageInput.value = "";

        const { error } = await supabase
            .from('messages')
            .insert([{ message: pureText, channel: 'general', user_email: activeUser.email }]);

        if (error) console.error("Database tracking fault exception:", error);
    }

    if (messageInput) {
        messageInput.onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); firePacketOutward(); } };
    }
    if (submitTrigger) {
        submitTrigger.onclick = () => { firePacketOutward(); };
    }

    // E. EXTRACT HISTORICAL PACKET LOGS & START LIVE SUBSCRIPTION LOOP
    const { data: logs } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(80);

    if (logs) {
        logs.forEach(msg => renderMessagePacket(msg.user_email, msg.message, msg.created_at));
    }
    supabase
        .channel('room-changes')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
            const freshPacket = payload.new;
            renderMessagePacket(freshPacket.user_email, freshPacket.message, freshPacket.freshPacket.created_at);
        })
        .subscribe();

    // F. IN-LINE ROUTER FOR SIGN-UP/LOGIN FORM OVERLAYS
    function setupAuthenticationListeners() {
        const userIn = document.getElementById("auth-username-field");
        const passIn = document.getElementById("auth-pass-field");
        const submitBtn = document.getElementById("btn-execute-login");
        const toggleBtn = document.getElementById("btn-toggle-auth-mode");
        const noticeSub = document.querySelector(".auth-notice-sub");
        let registerMode = false;

        if (toggleBtn) {
            toggleBtn.onclick = () => {
                registerMode = !registerMode;
                document.querySelector(".auth-notice-head").textContent = registerMode ? "Create Node Account" : "Make an account lol";
                noticeSub.textContent = registerMode ? "Register a free security profile name to join Cobra discussion tracks." : "Login to access and talk in chat!";
                submitBtn.textContent = registerMode ? "Register Account" : "Sign In";
                toggleBtn.textContent = registerMode ? "Already registered? Sign back in" : "Need a terminal account? Register node";
            };
        }

        if (submitBtn) {
            submitBtn.onclick = async () => {
                const usernameRaw = userIn.value.trim();
                const ps = passIn.value;
                if (!usernameRaw || !ps) return;

                // Programmatically convert pure text usernames into database email keys safely
                const computedEmail = `${usernameRaw.toLowerCase()}@cobra.io`;

                noticeSub.style.color = "#ff3333";
                if (registerMode) {
                    noticeSub.textContent = "Creating profile credentials matrix...";
                    const { error } = await supabase.auth.signUp({ email: computedEmail, password: ps });
                    if (error) { noticeSub.textContent = error.message; }
                    else {
                        noticeSub.style.color = "#00ff66";
                        noticeSub.textContent = "Registration successful! You can sign in now.";
                        registerMode = false;
                        submitBtn.textContent = "Sign In";
                        document.querySelector(".auth-notice-head").textContent = "Make an account lol";
                    }
                } else {
                    noticeSub.textContent = "Verifying encrypted credentials token...";
                    const { error } = await supabase.auth.signInWithPassword({ email: computedEmail, password: ps });
                    if (error) { noticeSub.textContent = error.message; }
                    else { window.initCobraChat(); }
                }
            };
        }
    }
};

// G. INTERCEPT COMPONENT ROUTING ACTIONS FOR DASHBOARD SIDEBAR
const coreGlobalSwitch = window.switchZone;
window.switchZone = function(zoneId) {
    if (coreGlobalSwitch) coreGlobalSwitch(zoneId);
    if (zoneId === "chat-zone") {
        setTimeout(() => { window.initCobraChat(); }, 20);
    }
};
