/**
 * ============================================
 * WINDOWS XP PORTFOLIO - JAVASCRIPT
 * Arjumand Ali - Frontend Developer
 * Unified Explorer Navigation
 * ============================================
 */

// ── GLOBAL STATE ──
const AppState = {
    windows: {},
    windowZIndex: 100,
    activeWindow: null,
    startMenuOpen: false,
    easterEggSequence: '',
    isMobile: window.innerWidth <= 768,
    calendarOpen: false,
    calendarDate: new Date(),
    // Explorer navigation
    explorerSection: 'home',
    explorerHistory: ['home'],
    explorerHistoryIndex: 0,
    explorerFoldersVisible: true, // tree vs task panel
    projCurrentFilter: 'all',
    projSelectedId: null,
};

// ── WINDOW CONFIG ──
const WindowConfig = {
    mycomputer:  { title: 'My Computer', icon: 'assets/icon-mycomputer.png', width: 860, height: 560, x: 60, y: 30 },
    devconsole:  { title: 'Developer Console', icon: 'assets/icon-settings.png', width: 500, height: 400, x: 300, y: 150 }
};

// ── SECTION CONFIG ──
const SectionConfig = {
    home:        { title: 'My Computer',       icon: 'assets/icon-mycomputer.png', addr: 'My Computer',          addrIcon: '🖥️' },
    about:       { title: 'About Me',           icon: 'assets/icon-user.png',       addr: 'My Computer\\About Me', addrIcon: '👤' },
    projects:    { title: 'Projects',           icon: 'assets/icon-folder.png',     addr: 'My Computer\\Projects', addrIcon: '📁' },
    skills:      { title: 'Control Panel',      icon: 'assets/icon-settings.png',   addr: 'My Computer\\Control Panel', addrIcon: '⚙️' },
    experience:  { title: 'Experience',         icon: 'assets/icon-briefcase.png',  addr: 'My Computer\\Experience', addrIcon: '💼' },
    contact:     { title: 'Outlook Express',    icon: 'assets/icon-email.png',      addr: 'My Computer\\Contact',  addrIcon: '✉️' },
    resume:      { title: 'Resume.pdf',         icon: 'assets/icon-pdf.png',        addr: 'My Computer\\Resume',   addrIcon: '📄' },
    devconsole:  { title: 'Developer Console',  icon: 'assets/icon-settings.png',   addr: 'My Computer\\Dev Console', addrIcon: '💻' },
};

// ── PROJECT DATA ──
const ProjectData = {
    parrotsec: {
        name: 'ParrotSec Website', fullName: 'ParrotSec Website Recreation', icon: '🌐',
        description: 'A pixel-perfect recreation of the Parrot Security OS website using modern web technologies. Features fully responsive design, smooth GSAP animations, cybersecurity-themed aesthetics, and attention to every detail of the original design.',
        tech: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'], category: 'frontend', type: 'File Folder', status: 'Completed', year: '2024', badge: 'HTML', badgeClass: '',
    },
    optimus: {
        name: 'Optimus Prime Portfolio', fullName: 'Optimus Prime Themed Portfolio', icon: '🤖',
        description: 'A Transformers-inspired portfolio website featuring the iconic Optimus Prime theme. Includes 3D CSS transforms, metallic gradients, Autobot-inspired UI elements, and immersive animation sequences.',
        tech: ['HTML5', 'CSS3', 'Three.js', 'GSAP'], category: 'frontend', type: 'File Folder', status: 'Completed', year: '2024', badge: 'JS', badgeClass: 'js',
    },
    cyberpunk: {
        name: 'Cyberpunk Cursor', fullName: 'Cyberpunk Cursor System', icon: '⚡',
        description: 'A custom cursor system with cyberpunk aesthetics. Features neon trails, dynamic hover effects, and fully customizable cursor states for immersive, branded web experiences.',
        tech: ['JavaScript', 'CSS3', 'Canvas API'], category: 'experimental', type: 'File Folder', status: 'Completed', year: '2023', badge: 'CSS', badgeClass: 'css',
    },
    darkmode: {
        name: 'Dark Mode Engine', fullName: 'Dark Mode Tailwind Engine', icon: '🌙',
        description: 'A comprehensive theming engine for Tailwind CSS that enables seamless dark/light mode transitions. Includes custom color palettes, CSS variable management, and automatic theme detection from system preferences.',
        tech: ['Tailwind CSS', 'JavaScript', 'CSS Variables'], category: 'theming', type: 'File Folder', status: 'Active', year: '2024', badge: 'TW', badgeClass: 'tw',
    },
    xptheme: {
        name: 'XP Theme Framework', fullName: 'XP Theme CSS Framework', icon: '🖥️',
        description: 'A CSS framework that recreates the Windows XP aesthetic for modern web applications. Includes authentic gradients, raised/sunken borders, interactive components, and the classic Luna theme color system.',
        tech: ['CSS3', 'SASS', 'JavaScript'], category: 'theming', type: 'File Folder', status: 'Active', year: '2026', badge: 'CSS', badgeClass: 'css',
    },
    uikit: {
        name: 'Structured UI Kit', fullName: 'Structured UI Component Kit', icon: '🧱',
        description: 'A disciplined, architecture-first UI component library focused on clean structure and maintainable code. Emphasizes structural thinking in design, zero-chaos philosophy, and systematic component patterns.',
        tech: ['HTML5', 'CSS3', 'JavaScript', 'Web Components'], category: 'frontend', type: 'File Folder', status: 'In Progress', year: '2025', badge: 'UI', badgeClass: '',
    }
};

// ── RUN COMMANDS ──
const RunCommands = {
    mycomputer: 'home', about: 'about', projects: 'projects',
    skills: 'skills', experience: 'experience', contact: 'contact',
    resume: 'resume', devconsole: 'devconsole', cmd: 'devconsole',
    explorer: 'home', outlook: 'contact',
};

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
    // ── BOOT SEQUENCE ──────────────────────────────────────────────
    // Step 1: Let the GIF play. We estimate its duration — adjust
    //         GIF_DURATION_MS to match your actual GIF length.
    //         (3500ms = 3.5 seconds. Change to match your GIF.)
    const GIF_DURATION_MS = 3500;

    const bootScreen  = document.getElementById('boot-screen');
    const bootOverlay = document.getElementById('boot-fade-overlay');
    const desktop     = document.getElementById('desktop');
    const taskbar     = document.getElementById('taskbar');

    // Step 2: When GIF ends → fade the black overlay IN (GIF wipes to black)
    setTimeout(() => {
        if (bootOverlay) bootOverlay.classList.add('active'); // 0.8s CSS transition
    }, GIF_DURATION_MS);

    // Step 3: After overlay is fully black (0.8s) → reveal desktop + play sound
    setTimeout(() => {
        revealDesktop(bootScreen, desktop, taskbar);
    }, GIF_DURATION_MS + 800);
    // ───────────────────────────────────────────────────────────────
});

function revealDesktop(bootScreen, desktop, taskbar) {
    // Hide boot screen instantly (it's behind the desktop now)
    if (bootScreen) bootScreen.style.display = 'none';

    // Fade the desktop and taskbar in smoothly (CSS transition: 1s)
    if (desktop) desktop.classList.add('visible');
    if (taskbar) taskbar.classList.add('visible');

    // ── PLAY STARTUP SOUND ──────────────────────────────────────────
    // The sound plays exactly as the desktop fades in — just like real XP.
    // File needed: assets/startup.mp3
    // ───────────────────────────────────────────────────────────────
    const sound = document.getElementById('xp-startup-sound');
    if (sound) {
        sound.volume = 0.8;
        sound.play().catch(() => {
            // Browsers block autoplay; the sound will be silently skipped.
            // The user can interact with the page and it will still work.
        });
    }

    initializeComponents();
}

function initializeComponents() {
    if (AppState._initialized) return;
    AppState._initialized = true;
    initializeClock();
    initializeDesktopIcons();
    initializeWindows();
    initializeStartMenu();
    initializeEasterEgg();
    initializeShutdown();
    initializeCalendar();
    initializeVolumeControl();
    initializeRunDialog();
    initializeTrayIcons();
    initializeExplorerResizer();
    showWelcomeBalloon();
}

// ═══════════════════════════════════════════════
// EXPLORER NAVIGATION SYSTEM
// ═══════════════════════════════════════════════

function explorerNavigate(section, pushHistory = true) {
    if (!SectionConfig[section]) return;

    AppState.explorerSection = section;

    // History management
    if (pushHistory) {
        // Truncate forward history
        AppState.explorerHistory = AppState.explorerHistory.slice(0, AppState.explorerHistoryIndex + 1);
        AppState.explorerHistory.push(section);
        AppState.explorerHistoryIndex = AppState.explorerHistory.length - 1;
    }

    const cfg = SectionConfig[section];

    // Update titlebar icon & title
    const titleEl = document.getElementById('explorer-title');
    const iconEl = document.getElementById('explorer-titlebar-icon');
    if (titleEl) titleEl.textContent = cfg.title;
    if (iconEl) iconEl.src = cfg.icon;

    // Update address bar
    const addrText = document.getElementById('explorer-addr-text');
    const addrIcon = document.getElementById('explorer-addr-icon');
    if (addrText) addrText.textContent = cfg.addr;
    if (addrIcon) addrIcon.textContent = cfg.addrIcon;

    // Update taskbar tab title
    const tab = document.querySelector('.taskbar-tab[data-window="mycomputer"] span');
    if (tab) tab.textContent = cfg.title;

    // Update sidebar tree active state
    document.querySelectorAll('.tree-item').forEach(item => {
        item.classList.toggle('active', item.dataset.section === section);
    });

    // Update back/forward buttons
    updateNavButtons();

    // Update status bar
    updateExplorerStatus(section);

    // Render content
    renderExplorerContent(section);
}

function explorerGoBack() {
    if (AppState.explorerHistoryIndex > 0) {
        AppState.explorerHistoryIndex--;
        explorerNavigate(AppState.explorerHistory[AppState.explorerHistoryIndex], false);
    }
}

function explorerGoForward() {
    if (AppState.explorerHistoryIndex < AppState.explorerHistory.length - 1) {
        AppState.explorerHistoryIndex++;
        explorerNavigate(AppState.explorerHistory[AppState.explorerHistoryIndex], false);
    }
}

function updateNavButtons() {
    const backBtn = document.getElementById('explorer-back-btn');
    const fwdBtn = document.getElementById('explorer-forward-btn');
    if (backBtn) backBtn.classList.toggle('disabled', AppState.explorerHistoryIndex === 0);
    if (fwdBtn) fwdBtn.classList.toggle('disabled', AppState.explorerHistoryIndex >= AppState.explorerHistory.length - 1);
}

function updateExplorerStatus(section) {
    const countEl = document.getElementById('explorer-status-count');
    const infoEl = document.getElementById('explorer-status-info');
    const rightEl = document.getElementById('explorer-status-right');
    const cfg = SectionConfig[section];
    if (countEl) {
        const counts = { home: '8 objects', about: '4 tabs', projects: '6 projects', skills: '9 skills', experience: '3 positions', contact: '3 methods', resume: '1 file', devconsole: 'System access' };
        countEl.textContent = counts[section] || '0 objects';
    }
    if (infoEl) infoEl.textContent = cfg ? cfg.title : 'My Computer';
    if (rightEl) rightEl.textContent = cfg ? cfg.addrIcon + ' ' + cfg.title : '🖥️ My Computer';
}

function toggleExplorerFolders() {
    AppState.explorerFoldersVisible = !AppState.explorerFoldersVisible;
    const treePanel = document.getElementById('explorer-tree-panel');
    const taskPanel = document.getElementById('explorer-task-panel');
    if (AppState.explorerFoldersVisible) {
        treePanel.style.display = 'block';
        taskPanel.style.display = 'none';
    } else {
        treePanel.style.display = 'none';
        taskPanel.style.display = 'block';
    }
}

// ── RESIZER ──
function initializeExplorerResizer() {
    const resizer = document.getElementById('explorer-resizer');
    const sidebar = document.getElementById('explorer-sidebar');
    if (!resizer || !sidebar) return;

    let isResizing = false, startX, startWidth;
    resizer.addEventListener('mousedown', e => {
        isResizing = true;
        startX = e.clientX;
        startWidth = sidebar.offsetWidth;
        resizer.classList.add('resizing');
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    });
    document.addEventListener('mousemove', e => {
        if (!isResizing) return;
        const newWidth = Math.max(140, Math.min(320, startWidth + e.clientX - startX));
        sidebar.style.width = newWidth + 'px';
        sidebar.style.minWidth = newWidth + 'px';
    });
    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            resizer.classList.remove('resizing');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    });
}

// ═══════════════════════════════════════════════
// CONTENT RENDERERS
// ═══════════════════════════════════════════════

function renderExplorerContent(section) {
    const panel = document.getElementById('explorer-content');
    if (!panel) return;

    // Fade out → render → fade in
    panel.style.opacity = '0';
    setTimeout(() => {
        let html = '';
        switch (section) {
            case 'home':       html = renderHome(); break;
            case 'about':      html = renderAbout(); break;
            case 'projects':   html = renderProjects(); break;
            case 'skills':     html = renderSkills(); break;
            case 'experience': html = renderExperience(); break;
            case 'contact':    html = renderContact(); break;
            case 'resume':     html = renderResume(); break;
            case 'devconsole': html = renderDevConsole(); break;
            default:           html = renderHome();
        }
        panel.innerHTML = html;
        panel.style.opacity = '1';
        panel.style.transition = 'opacity 0.15s ease';

        // Post-render hooks
        if (section === 'skills') setTimeout(animateSkillBars, 100);
        if (section === 'about') {
            initAboutTabs();
            setTimeout(animateAboutPerfBars, 400);
        }
        if (section === 'projects') initProjectsContent();
        if (section === 'contact') initContactForm();
        if (section === 'resume') initResumeDownload();

    }, 100);
}

// ── HOME ──
function renderHome() {
    return `<div class="ec-home ec-fade">
        <div class="ec-section-label">💾 Hard Disk Drives</div>
        <div class="ec-icon-grid">
            <div class="ec-file-icon" onclick="explorerNavigate('projects')">
                <span class="ec-file-img">💿</span>
                <span class="ec-file-label">Projects (C:)</span>
                <span class="ec-file-sub">Frontend Work</span>
            </div>
            <div class="ec-file-icon" onclick="explorerNavigate('skills')">
                <span class="ec-file-img">💽</span>
                <span class="ec-file-label">Skills (D:)</span>
                <span class="ec-file-sub">React · CSS · JS</span>
            </div>
            <div class="ec-file-icon" onclick="explorerNavigate('experience')">
                <span class="ec-file-img">🗄️</span>
                <span class="ec-file-label">Experience (E:)</span>
                <span class="ec-file-sub">Work History</span>
            </div>
        </div>

        <div class="ec-section-label">📁 Portfolio Folders</div>
        <div class="ec-icon-grid">
            <div class="ec-file-icon" onclick="explorerNavigate('about')">
                <img src="assets/icon-user.png" alt="" class="ec-file-img-real">
                <span class="ec-file-label">About Me</span>
            </div>
            <div class="ec-file-icon" onclick="explorerNavigate('projects')">
                <img src="assets/icon-folder.png" alt="" class="ec-file-img-real">
                <span class="ec-file-label">Projects</span>
            </div>
            <div class="ec-file-icon" onclick="explorerNavigate('skills')">
                <img src="assets/icon-settings.png" alt="" class="ec-file-img-real">
                <span class="ec-file-label">Skills</span>
            </div>
            <div class="ec-file-icon" onclick="explorerNavigate('experience')">
                <img src="assets/icon-briefcase.png" alt="" class="ec-file-img-real">
                <span class="ec-file-label">Experience</span>
            </div>
            <div class="ec-file-icon" onclick="explorerNavigate('contact')">
                <img src="assets/icon-email.png" alt="" class="ec-file-img-real">
                <span class="ec-file-label">Contact</span>
            </div>
            <div class="ec-file-icon" onclick="explorerNavigate('resume')">
                <img src="assets/icon-pdf.png" alt="" class="ec-file-img-real">
                <span class="ec-file-label">Resume</span>
            </div>
        </div>

        <div class="ec-section-label">🌐 Network &amp; System</div>
        <div class="ec-icon-grid">
            <div class="ec-file-icon" onclick="explorerNavigate('contact')"><span class="ec-file-img">🌐</span><span class="ec-file-label">GitHub</span></div>
            <div class="ec-file-icon" onclick="explorerNavigate('contact')"><span class="ec-file-img">💼</span><span class="ec-file-label">LinkedIn</span></div>
            <div class="ec-file-icon" onclick="explorerNavigate('contact')"><span class="ec-file-img">✉️</span><span class="ec-file-label">Email Me</span></div>
            <div class="ec-file-icon" onclick="explorerNavigate('resume')"><span class="ec-file-img">📄</span><span class="ec-file-label">Resume.pdf</span></div>
            <div class="ec-file-icon" onclick="explorerNavigate('devconsole')"><span class="ec-file-img">💻</span><span class="ec-file-label">Dev Console</span></div>
        </div>
    </div>`;
}

// ── ABOUT ──
function renderAbout() {
    return `<div class="ec-about ec-fade">
        <div class="ec-tabbar" id="ec-about-tabbar">
            <button class="ec-tab active" data-tab="general">General</button>
            <button class="ec-tab" data-tab="hardware">Hardware</button>
            <button class="ec-tab" data-tab="advanced">Advanced</button>
            <button class="ec-tab" data-tab="biography">Biography</button>
        </div>
        <div class="ec-panels-wrap">

            <!-- GENERAL -->
            <div class="ec-panel active" id="ec-tab-general">
                <div class="ec-general">
                    <div class="ec-hero">
                        <div class="ec-avatar-wrap">
                            <div class="ec-avatar-crt">
                                <div class="ec-avatar-inner">
                                    <div class="ec-avatar-initials">AA</div>
                                </div>
                                <div class="ec-crt-scanlines"></div>
                                <div class="ec-crt-glare"></div>
                            </div>
                            <div class="ec-status-badge">
                                <span class="ec-status-dot"></span><span>ONLINE</span>
                            </div>
                        </div>
                        <div class="ec-hero-info">
                            <div>
                                <div class="ec-name">Arjumand Ali</div>
                                <div class="ec-role-chip">Frontend Developer &amp; Theming Engineer</div>
                            </div>
                            <div class="ec-meta-grid">
                                <div class="ec-meta-row"><span class="ec-meta-ico">📍</span><span class="ec-meta-key">Location</span><span class="ec-meta-val">Pakistan</span></div>
                                <div class="ec-meta-row"><span class="ec-meta-ico">🌙</span><span class="ec-meta-key">Schedule</span><span class="ec-meta-val">Night Office</span></div>
                                <div class="ec-meta-row"><span class="ec-meta-ico">📅</span><span class="ec-meta-key">Active Since</span><span class="ec-meta-val">2020</span></div>
                                <div class="ec-meta-row"><span class="ec-meta-ico">🔋</span><span class="ec-meta-key">Status</span><span class="ec-meta-val ec-green">Available for Work</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="ec-info-box">
                        <div class="ec-info-box-title">Registered to:</div>
                        <div class="ec-info-row"><span class="ec-info-lbl">Name</span><span class="ec-info-val">Arjumand Ali</span></div>
                        <div class="ec-info-row"><span class="ec-info-lbl">Organization</span><span class="ec-info-val">Arjumand Ali Systems © 2026</span></div>
                        <div class="ec-info-row"><span class="ec-info-lbl">Product ID</span><span class="ec-info-val ec-mono">55274-OEM-6421743-00000</span></div>
                    </div>
                    <div class="ec-os-badge">
                        <div class="ec-os-flag">
                            <div class="ec-flag-q1"></div><div class="ec-flag-q2"></div>
                            <div class="ec-flag-q3"></div><div class="ec-flag-q4"></div>
                        </div>
                        <div>
                            <div class="ec-os-name">Portfolio <span class="ec-os-xp">XP</span></div>
                            <div class="ec-os-edition">Professional Edition</div>
                            <div class="ec-os-build">Build 2026.02 — Service Pack 3</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- HARDWARE -->
            <div class="ec-panel" id="ec-tab-hardware">
                <div class="ec-hardware">
                    <div class="ec-hw-header-row">
                        <span class="ec-hw-big-title">Device Manager</span>
                        <button class="xp-button" onclick="explorerNavigate('skills')">Properties</button>
                    </div>
                    <div class="ec-hw-tree">
                        <div class="ec-hw-cat"><div class="ec-hw-cat-label">▶ 🧠 Processors</div><div class="ec-hw-cat-children">
                            <div class="ec-hw-device"><span class="ec-hw-dot green"></span>Intel Core i5 Mindset @ 3.6 GHz Logical Thinking</div>
                            <div class="ec-hw-device"><span class="ec-hw-dot green"></span>Creative Co-Processor — Design Acceleration Unit</div>
                        </div></div>
                        <div class="ec-hw-cat"><div class="ec-hw-cat-label">▶ 💾 Memory</div><div class="ec-hw-cat-children">
                            <div class="ec-hw-device"><span class="ec-hw-dot green"></span>16 GB Dedication RAM — Dual Channel</div>
                            <div class="ec-hw-device"><span class="ec-hw-dot green"></span>Unlimited Motivation Cache — L3</div>
                        </div></div>
                        <div class="ec-hw-cat"><div class="ec-hw-cat-label">▶ 🎨 Display Adapters</div><div class="ec-hw-cat-children">
                            <div class="ec-hw-device"><span class="ec-hw-dot green"></span>Creative Engine GPU — Pixel Perfect Mode</div>
                            <div class="ec-hw-device"><span class="ec-hw-dot green"></span>Aesthetic Render Pipeline — 4K UI Output</div>
                        </div></div>
                        <div class="ec-hw-cat"><div class="ec-hw-cat-label">▶ 🌐 Network Adapters</div><div class="ec-hw-cat-children">
                            <div class="ec-hw-device"><span class="ec-hw-dot green"></span>GitHub Realtek — 10 Gbps Commit Speed</div>
                            <div class="ec-hw-device"><span class="ec-hw-dot green"></span>LinkedIn Social Adapter — Professional Mode</div>
                        </div></div>
                        <div class="ec-hw-cat"><div class="ec-hw-cat-label">▶ 🔌 Other Devices</div><div class="ec-hw-cat-children">
                            <div class="ec-hw-device"><span class="ec-hw-dot green"></span>Height Module — 6'1" Extended Edition</div>
                            <div class="ec-hw-device"><span class="ec-hw-dot green"></span>Night Shift Controller — Nocturnal Operating Mode</div>
                        </div></div>
                    </div>
                </div>
            </div>

            <!-- ADVANCED -->
            <div class="ec-panel" id="ec-tab-advanced">
                <div class="ec-advanced">
                    <div class="ec-adv-block">
                        <div class="ec-adv-block-header">
                            <span class="ec-adv-icon">⚡</span>
                            <div class="ec-adv-block-text">
                                <div class="ec-adv-block-title">Performance</div>
                                <div class="ec-adv-block-sub">Visual effects, processor and memory usage</div>
                            </div>
                            <button class="xp-button" onclick="explorerNavigate('skills')">Settings</button>
                        </div>
                        <div class="ec-perf-bars">
                            <div class="ec-perf-row"><span class="ec-perf-lbl">HTML / CSS</span><div class="ec-perf-track"><div class="ec-perf-fill" data-perf="93" style="width:0%"></div></div><span class="ec-perf-num">93%</span></div>
                            <div class="ec-perf-row"><span class="ec-perf-lbl">JavaScript</span><div class="ec-perf-track"><div class="ec-perf-fill" data-perf="75" style="width:0%"></div></div><span class="ec-perf-num">75%</span></div>
                            <div class="ec-perf-row"><span class="ec-perf-lbl">UI Architecture</span><div class="ec-perf-track"><div class="ec-perf-fill" data-perf="90" style="width:0%"></div></div><span class="ec-perf-num">90%</span></div>
                            <div class="ec-perf-row"><span class="ec-perf-lbl">Theming / Design</span><div class="ec-perf-track"><div class="ec-perf-fill ec-perf-fill--gold" data-perf="95" style="width:0%"></div></div><span class="ec-perf-num">95%</span></div>
                            <div class="ec-perf-row"><span class="ec-perf-lbl">Problem Solving</span><div class="ec-perf-track"><div class="ec-perf-fill" data-perf="88" style="width:0%"></div></div><span class="ec-perf-num">88%</span></div>
                        </div>
                    </div>
                    <div class="ec-adv-block">
                        <div class="ec-adv-block-header">
                            <span class="ec-adv-icon">👤</span>
                            <div class="ec-adv-block-text"><div class="ec-adv-block-title">User Profiles</div><div class="ec-adv-block-sub">Desktop settings related to your login</div></div>
                            <button class="xp-button">Settings</button>
                        </div>
                        <table class="ec-profiles-table">
                            <thead><tr><th>Name</th><th>Size</th><th>Type</th><th>Status</th></tr></thead>
                            <tbody>
                                <tr><td>Arjumand (This PC)</td><td>∞ MB</td><td>Roaming</td><td style="color:#008000">Active</td></tr>
                                <tr><td>Developer Mode</td><td>500 MB</td><td>Local</td><td>Standby</td></tr>
                                <tr><td>Night Shift Profile</td><td>200 MB</td><td>Local</td><td style="color:#008000">Active</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="ec-adv-block">
                        <div class="ec-adv-block-header">
                            <span class="ec-adv-icon">🚀</span>
                            <div class="ec-adv-block-text"><div class="ec-adv-block-title">Startup &amp; Recovery</div><div class="ec-adv-block-sub">System startup, failure, and debugging</div></div>
                            <button class="xp-button">Settings</button>
                        </div>
                        <div class="ec-startup-rows">
                            <div class="ec-startup-row"><span>Default OS:</span><span class="ec-mono">Portfolio XP Professional</span></div>
                            <div class="ec-startup-row"><span>Boot time:</span><span class="ec-mono">0.3s (GSAP accelerated)</span></div>
                            <div class="ec-startup-row"><span>Crash policy:</span><span class="ec-mono">Auto-restart &amp; debug</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- BIOGRAPHY -->
            <div class="ec-panel" id="ec-tab-biography">
                <div class="ec-biography">
                    <div class="ec-terminal">
                        <div class="ec-terminal-titlebar">
                            <div class="ec-terminal-dots">
                                <span class="ec-term-dot ec-term-dot--red"></span>
                                <span class="ec-term-dot ec-term-dot--yellow"></span>
                                <span class="ec-term-dot ec-term-dot--green"></span>
                            </div>
                            <span class="ec-terminal-title">C:\\Users\\Arjumand\\README.txt — Notepad</span>
                        </div>
                        <div class="ec-terminal-body">
                            <div class="ec-term-line"><span class="ec-term-prompt">C:\\&gt;</span> <span class="ec-term-cmd">type README.txt</span></div>
                            <div class="ec-term-blank"></div>
                            <div class="ec-term-line ec-term-out">A frontend developer who builds digital worlds from the ground up —</div>
                            <div class="ec-term-line ec-term-out">clean, structured, and deliberately engineered. Specializing in</div>
                            <div class="ec-term-line ec-term-out">pixel-perfect UI, custom theming systems, and disciplined CSS</div>
                            <div class="ec-term-line ec-term-out">architecture that scales.</div>
                            <div class="ec-term-blank"></div>
                            <div class="ec-term-line ec-term-out">Based in Pakistan. Operates at night. Ships in the morning.</div>
                            <div class="ec-term-blank"></div>
                            <div class="ec-term-line"><span class="ec-term-prompt">C:\\&gt;</span> <span class="ec-term-cursor">_</span></div>
                        </div>
                    </div>
                    <div class="ec-bio-label">System Traits</div>
                    <div class="ec-traits-grid">
                        <div class="ec-trait-card"><div class="ec-trait-icon">🧱</div><div class="ec-trait-name">Structural Thinker</div><div class="ec-trait-desc">Builds systems, not just pages</div></div>
                        <div class="ec-trait-card"><div class="ec-trait-icon">🎯</div><div class="ec-trait-name">Disciplined Approach</div><div class="ec-trait-desc">Zero chaos, maximum clarity</div></div>
                        <div class="ec-trait-card"><div class="ec-trait-icon">👑</div><div class="ec-trait-name">Leadership Mindset</div><div class="ec-trait-desc">Lead through code quality</div></div>
                        <div class="ec-trait-card"><div class="ec-trait-icon">🚫</div><div class="ec-trait-name">No Chaos Policy</div><div class="ec-trait-desc">Order in every commit</div></div>
                    </div>
                    <div class="ec-bio-label">Event Log</div>
                    <div class="ec-timeline">
                        <div class="ec-tl-item"><div class="ec-tl-line"></div><div class="ec-tl-dot"></div><div class="ec-tl-year">2020</div><div class="ec-tl-desc">Started system optimization &amp; Windows UI modding</div></div>
                        <div class="ec-tl-item"><div class="ec-tl-line"></div><div class="ec-tl-dot"></div><div class="ec-tl-year">2022</div><div class="ec-tl-desc">Mastered CSS architecture &amp; design systems</div></div>
                        <div class="ec-tl-item"><div class="ec-tl-line"></div><div class="ec-tl-dot"></div><div class="ec-tl-year">2023</div><div class="ec-tl-desc">Launched freelance frontend development career</div></div>
                        <div class="ec-tl-item"><div class="ec-tl-line"></div><div class="ec-tl-dot ec-tl-dot--active"></div><div class="ec-tl-year" style="color:#008000">2026</div><div class="ec-tl-desc">Building Portfolio XP — this very site ✨</div></div>
                    </div>
                </div>
            </div>

        </div>
        <div class="ec-footer">
            <button class="xp-button primary" onclick="explorerNavigate('home')">OK</button>
            <button class="xp-button" onclick="explorerNavigate('home')">Cancel</button>
            <button class="xp-button" onclick="explorerNavigate('contact')">Apply</button>
        </div>
    </div>`;
}

// ── PROJECTS ──
function renderProjects() {
    const files = Object.entries(ProjectData).map(([id, p]) => `
        <div class="ec-proj-file" data-project="${id}" data-filter="${p.category}" tabindex="0">
            <div class="ec-proj-icon-wrap">
                <img src="assets/icon-folder.png" alt="">
                <span class="ec-proj-badge ${p.badgeClass}">${p.badge}</span>
            </div>
            <span class="ec-proj-file-name">${p.name.replace(' ', '<br>')}</span>
        </div>
    `).join('');

    return `<div class="ec-projects ec-fade">
        <div class="ec-proj-cat-bar">
            <button class="ec-proj-cat-btn active" data-filter="all">All Projects</button>
            <button class="ec-proj-cat-btn" data-filter="frontend">Frontend</button>
            <button class="ec-proj-cat-btn" data-filter="theming">Theming</button>
            <button class="ec-proj-cat-btn" data-filter="experimental">Experimental</button>
        </div>
        <div class="ec-proj-grid" id="ec-proj-grid">${files}</div>
        <div class="ec-proj-detail-panel" id="ec-proj-detail-panel"></div>
    </div>`;
}

// ── SKILLS ──
function renderSkills() {
    return `<div class="ec-skills ec-fade">
        <div class="ec-cp-title">System Skills — Control Panel</div>
        <div class="ec-skill-category">
            <div class="ec-category-title"><img src="assets/icon-mycomputer.png" alt="">Frontend Core</div>
            <div class="ec-skill-list">
                <div class="ec-skill-item"><span class="ec-skill-name">HTML5</span><div class="ec-skill-bar-container"><div class="ec-skill-bar" data-level="95"><span class="ec-skill-level">Expert</span></div></div></div>
                <div class="ec-skill-item"><span class="ec-skill-name">CSS3</span><div class="ec-skill-bar-container"><div class="ec-skill-bar" data-level="90"><span class="ec-skill-level">Expert</span></div></div></div>
                <div class="ec-skill-item"><span class="ec-skill-name">JavaScript</span><div class="ec-skill-bar-container"><div class="ec-skill-bar" data-level="75"><span class="ec-skill-level">Intermediate</span></div></div></div>
            </div>
        </div>
        <div class="ec-skill-category">
            <div class="ec-category-title"><img src="assets/icon-settings.png" alt="">Frameworks &amp; Tools</div>
            <div class="ec-skill-list">
                <div class="ec-skill-item"><span class="ec-skill-name">Tailwind CSS</span><div class="ec-skill-bar-container"><div class="ec-skill-bar learning" data-level="60"><span class="ec-skill-level">Learning</span></div></div></div>
                <div class="ec-skill-item"><span class="ec-skill-name">Next.js</span><div class="ec-skill-bar-container"><div class="ec-skill-bar learning" data-level="50"><span class="ec-skill-level">Learning</span></div></div></div>
                <div class="ec-skill-item"><span class="ec-skill-name">PHP</span><div class="ec-skill-bar-container"><div class="ec-skill-bar learning" data-level="40"><span class="ec-skill-level">Learning</span></div></div></div>
            </div>
        </div>
        <div class="ec-skill-category">
            <div class="ec-category-title"><img src="assets/icon-settings.png" alt="">System Knowledge</div>
            <div class="ec-skill-list">
                <div class="ec-skill-item"><span class="ec-skill-name">Windows Optimization</span><div class="ec-skill-bar-container"><div class="ec-skill-bar" data-level="85"><span class="ec-skill-level">Advanced</span></div></div></div>
                <div class="ec-skill-item"><span class="ec-skill-name">Performance Tuning</span><div class="ec-skill-bar-container"><div class="ec-skill-bar" data-level="80"><span class="ec-skill-level">Advanced</span></div></div></div>
                <div class="ec-skill-item"><span class="ec-skill-name">Structured UI Design</span><div class="ec-skill-bar-container"><div class="ec-skill-bar" data-level="90"><span class="ec-skill-level">Expert</span></div></div></div>
            </div>
        </div>
    </div>`;
}

// ── EXPERIENCE ──
function renderExperience() {
    return `<div class="ec-experience ec-fade">
        <div class="ec-exp-item">
            <div class="ec-exp-header"><h3>Frontend Developer</h3><span class="ec-exp-period">2023 - Present</span></div>
            <p class="ec-exp-company">Freelance &amp; Personal Projects</p>
            <ul class="ec-exp-duties">
                <li>Developed responsive, pixel-perfect web interfaces</li>
                <li>Implemented custom theming engines and design systems</li>
                <li>Optimized performance and accessibility standards</li>
                <li>Created Windows XP recreation portfolio (this site)</li>
            </ul>
        </div>
        <div class="ec-exp-item">
            <div class="ec-exp-header"><h3>UI/Theming Engineer</h3><span class="ec-exp-period">2022 - 2023</span></div>
            <p class="ec-exp-company">Self-Directed Learning</p>
            <ul class="ec-exp-duties">
                <li>Mastered CSS architecture and design patterns</li>
                <li>Built custom component libraries</li>
                <li>Studied Windows UI design principles</li>
                <li>Developed disciplined coding methodologies</li>
            </ul>
        </div>
        <div class="ec-exp-item">
            <div class="ec-exp-header"><h3>System Optimization Specialist</h3><span class="ec-exp-period">2020 - 2022</span></div>
            <p class="ec-exp-company">Personal &amp; Community Projects</p>
            <ul class="ec-exp-duties">
                <li>Windows performance tuning and optimization</li>
                <li>Custom UI modifications and theming</li>
                <li>Structured approach to system configuration</li>
                <li>Community support and documentation</li>
            </ul>
        </div>
    </div>`;
}

// ── CONTACT ──
function renderContact() {
    return `<div class="ec-contact ec-fade">
        <div class="ec-contact-sidebar">
            <h4>Contact Methods</h4>
            <ul>
                <li><a href="mailto:arjumand@example.com"><span>📧</span> Email</a></li>
                <li><a href="https://linkedin.com/in/arjumandali" target="_blank"><span>💼</span> LinkedIn</a></li>
                <li><a href="https://github.com/arjumandali" target="_blank"><span>🐙</span> GitHub</a></li>
            </ul>
        </div>
        <div class="ec-contact-main">
            <h3>New Message</h3>
            <form id="ec-contact-form" class="ec-contact-form">
                <div class="ec-form-row"><label for="ec-name">From:</label><input type="text" id="ec-name" name="name" placeholder="Your Name" required></div>
                <div class="ec-form-row"><label for="ec-email">Email:</label><input type="email" id="ec-email" name="email" placeholder="your@email.com" required></div>
                <div class="ec-form-row"><label for="ec-subject">Subject:</label><input type="text" id="ec-subject" name="subject" placeholder="Message Subject"></div>
                <div class="ec-form-row ec-msg-row"><label for="ec-message">Message:</label><textarea id="ec-message" name="message" rows="6" placeholder="Type your message here..." required></textarea></div>
                <div class="ec-form-actions">
                    <button type="submit" class="xp-button primary">Send</button>
                    <button type="reset" class="xp-button">Clear</button>
                </div>
            </form>
        </div>
    </div>`;
}

// ── RESUME ──
function renderResume() {
    return `<div class="ec-resume ec-fade">
        <img src="assets/icon-pdf.png" alt="" class="ec-resume-icon">
        <h2>Arjumand Ali - Resume.pdf</h2>
        <p>Frontend Developer &amp; Theming Engineer</p>
        <div class="ec-resume-details"><p>📄 PDF Document | 2 Pages | Last Updated: February 2026</p></div>
        <div class="ec-resume-actions">
            <button id="ec-download-resume" class="xp-button primary ec-dl-btn">
                <span>💾</span> Download Resume
            </button>
            <p class="ec-dl-note">Click to download the complete resume in PDF format</p>
        </div>
    </div>`;
}

// ── DEV CONSOLE ──
function renderDevConsole() {
    return `<div class="ec-devconsole ec-fade">
        <div class="ec-console-line system">Microsoft Windows XP [Version 5.1.2600]</div>
        <div class="ec-console-line system">(C) Copyright 1985-2001 Microsoft Corp.</div>
        <div class="ec-console-line system">(C) Modified 2026 Arjumand Ali Systems</div>
        <div class="ec-console-line" style="height:8px"></div>
        <div class="ec-console-line success">C:\\Users\\Arjumand&gt; xpdev</div>
        <div class="ec-console-line success">Accessing developer mode...</div>
        <div class="ec-console-line success">Authentication successful.</div>
        <div class="ec-console-line" style="height:8px"></div>
        <div class="ec-console-line highlight">╔══════════════════════════════════════════════════════════════╗</div>
        <div class="ec-console-line highlight">║  Welcome, Arjumand Ali — System Architect Mode Enabled.      ║</div>
        <div class="ec-console-line highlight">╚══════════════════════════════════════════════════════════════╝</div>
        <div class="ec-console-line" style="height:8px"></div>
        <div class="ec-console-line info">System Status: <span class="status-ok">OPERATIONAL</span></div>
        <div class="ec-console-line info">Frontend Stack: HTML5, CSS3, JavaScript (Vanilla)</div>
        <div class="ec-console-line info">Animation Engine: GSAP 3.12.2</div>
        <div class="ec-console-line info">Design Philosophy: Structural, Disciplined, No Chaos</div>
        <div class="ec-console-line" style="height:8px"></div>
        <div class="ec-console-line">C:\\Users\\Arjumand\\Developer&gt; <span class="ec-cursor">_</span></div>
    </div>`;
}

// ═══════════════════════════════════════════════
// POST-RENDER INITIALIZERS
// ═══════════════════════════════════════════════

function initAboutTabs() {
    document.querySelectorAll('.ec-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            document.querySelectorAll('.ec-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.ec-panel').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const panel = document.getElementById(`ec-tab-${target}`);
            if (panel) panel.classList.add('active');
            if (target === 'advanced') setTimeout(animateAboutPerfBars, 100);
        });
    });
}

function animateAboutPerfBars() {
    document.querySelectorAll('.ec-perf-fill').forEach(bar => {
        const pct = bar.dataset.perf;
        if (pct && typeof gsap !== 'undefined') {
            gsap.fromTo(bar, { width: '0%' }, { width: `${pct}%`, duration: 1, ease: 'power2.out' });
        } else if (pct) {
            bar.style.width = pct + '%';
        }
    });
}

function animateSkillBars() {
    document.querySelectorAll('.ec-skill-bar').forEach(bar => {
        const lvl = bar.dataset.level;
        if (!lvl) return;
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(bar, { width: '0%' }, { width: `${lvl}%`, duration: 0.8, ease: 'power2.out' });
        } else {
            bar.style.width = lvl + '%';
        }
    });
}

function initProjectsContent() {
    // Category filter
    document.querySelectorAll('.ec-proj-cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.ec-proj-cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            AppState.projCurrentFilter = filter;
            filterProjFiles(filter);
        });
    });

    // File click / double-click
    document.querySelectorAll('.ec-proj-file').forEach(file => {
        let clickTimer = null;
        const pid = file.dataset.project;
        file.addEventListener('click', () => {
            selectProjFile(file, pid);
            if (clickTimer) {
                clearTimeout(clickTimer); clickTimer = null;
                showProjDetail(pid);
            } else {
                clickTimer = setTimeout(() => { clickTimer = null; }, 300);
            }
        });
        file.addEventListener('keydown', e => {
            if (e.key === 'Enter') { selectProjFile(file, pid); showProjDetail(pid); }
            if (e.key === ' ') { e.preventDefault(); selectProjFile(file, pid); }
        });
    });

    // Click outside to deselect
    document.getElementById('ec-proj-grid')?.addEventListener('click', e => {
        if (e.target.id === 'ec-proj-grid') deselectProjFiles();
    });
}

function filterProjFiles(filter) {
    document.querySelectorAll('.ec-proj-file').forEach(f => {
        const match = filter === 'all' || f.dataset.filter === filter;
        f.classList.toggle('hidden-by-filter', !match);
    });
}

function selectProjFile(fileEl, pid) {
    deselectProjFiles();
    fileEl.classList.add('selected');
    AppState.projSelectedId = pid;
}

function deselectProjFiles() {
    document.querySelectorAll('.ec-proj-file').forEach(f => f.classList.remove('selected'));
    AppState.projSelectedId = null;
    hideProjDetail();
}

function showProjDetail(pid) {
    const p = ProjectData[pid]; if (!p) return;
    const panel = document.getElementById('ec-proj-detail-panel'); if (!panel) return;

    panel.className = 'ec-proj-detail-panel visible';
    panel.innerHTML = `
        <div class="ec-proj-detail-header">
            <div class="ec-proj-detail-icon">${p.icon}</div>
            <div>
                <div class="ec-proj-detail-name">${p.fullName}</div>
                <div class="ec-proj-detail-cat">${p.category.charAt(0).toUpperCase() + p.category.slice(1)} · ${p.status} · ${p.year}</div>
            </div>
        </div>
        <div class="ec-proj-detail-body">
            <div class="ec-proj-detail-desc">
                ${p.description}
                <div class="ec-proj-tech-chips">${p.tech.map(t => `<span class="ec-proj-tech-chip">${t}</span>`).join('')}</div>
                <div class="ec-proj-links">
                    <button class="xp-button primary" style="font-size:10px;padding:3px 10px;">🌐 Live Demo</button>
                    <button class="xp-button" style="font-size:10px;padding:3px 10px;">🐙 GitHub</button>
                </div>
            </div>
            <div class="ec-proj-detail-meta">
                <div class="ec-proj-detail-row"><span>Type:</span><span>${p.type}</span></div>
                <div class="ec-proj-detail-row"><span>Year:</span><span>${p.year}</span></div>
                <div class="ec-proj-detail-row"><span>Status:</span><span>${p.status}</span></div>
                <div class="ec-proj-detail-row"><span>Stack:</span><span>${p.tech.length} technologies</span></div>
            </div>
        </div>
    `;
}

function hideProjDetail() {
    const panel = document.getElementById('ec-proj-detail-panel');
    if (panel) { panel.className = 'ec-proj-detail-panel'; panel.innerHTML = ''; }
}

function initContactForm() {
    const form = document.getElementById('ec-contact-form'); if (!form) return;
    form.addEventListener('submit', e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        if (!data.name || !data.email || !data.message) { alert('Please fill in all required fields.'); return; }
        const btn = form.querySelector('button[type="submit"]'), orig = btn.textContent;
        btn.textContent = 'Sending...'; btn.disabled = true;
        setTimeout(() => {
            alert('Message sent successfully! I will get back to you soon.');
            showBalloon('📧 Message Sent!', `Thank you, ${data.name}! I'll get back to you soon.`);
            form.reset(); btn.textContent = orig; btn.disabled = false;
        }, 1500);
    });
}

function initResumeDownload() {
    document.getElementById('ec-download-resume')?.addEventListener('click', e => {
        e.preventDefault();
        const txt = `ARJUMAND ALI\nFrontend Developer & Theming Engineer\n\nCONTACT\nLocation: Pakistan\nEmail: arjumand@example.com\nLinkedIn: linkedin.com/in/arjumandali\nGitHub: github.com/arjumandali\n\nSUMMARY\nA frontend developer with a passion for clean, structured code and disciplined design principles.\n\nSKILLS\n- HTML5 (Expert)\n- CSS3 (Expert)\n- JavaScript (Intermediate)\n- Tailwind CSS (Learning)\n- Next.js (Learning)\n- PHP (Learning)\n- Windows Optimization (Advanced)\n- Structured UI Design (Expert)\n\nEXPERIENCE\nFrontend Developer | Freelance | 2023 - Present\nUI/Theming Engineer | Self-Directed | 2022 - 2023\nSystem Optimization Specialist | 2020 - 2022\n`;
        const blob = new Blob([txt], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'Arjumand_Ali_Resume.txt';
        document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
        showBalloon('💾 Download Started', 'Arjumand_Ali_Resume.txt is being saved!');
    });
}

// ═══════════════════════════════════════════════
// WINDOW MANAGEMENT (simplified — only My Computer + Dev Console)
// ═══════════════════════════════════════════════

function initializeWindows() {
    document.querySelectorAll('.xp-window').forEach(win => {
        const id = win.dataset.windowId; if (!id) return;
        AppState.windows[id] = { element: win, minimized: false, maximized: false, closed: true };
        const bar = win.querySelector('.window-titlebar');
        if (bar && !AppState.isMobile) makeWindowDraggable(win, bar);
        win.querySelector('.window-btn.minimize')?.addEventListener('click', () => minimizeWindow(id));
        if (!AppState.isMobile) win.querySelector('.window-btn.maximize')?.addEventListener('click', () => toggleMaximizeWindow(id));
        win.querySelector('.window-btn.close')?.addEventListener('click', () => closeWindow(id));
        win.addEventListener('mousedown', () => focusWindow(id));
    });
}

function openWindow(id) {
    // For any section navigation calls, route to explorer
    if (id !== 'mycomputer' && id !== 'devconsole' && SectionConfig[id]) {
        openWindow('mycomputer');
        setTimeout(() => explorerNavigate(id), 50);
        return;
    }

    const el = document.getElementById(`window-${id}`), cfg = WindowConfig[id];
    if (!el || !cfg) return;
    const st = AppState.windows[id];
    if (st && !st.closed && !st.minimized) { focusWindow(id); return; }
    if (!AppState.isMobile) {
        el.style.width = `${cfg.width}px`;
        el.style.height = `${cfg.height}px`;
        el.style.left = `${cfg.x}px`;
        el.style.top = `${cfg.y}px`;
    }
    el.classList.add('active'); el.setAttribute('aria-hidden', 'false');
    if (st) { st.closed = false; st.minimized = false; }
    if (typeof gsap !== 'undefined') {
        gsap.fromTo(el, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.2)' });
    }
    focusWindow(id);
    addTaskbarTab(id, cfg);

    // On first open of mycomputer, render home
    if (id === 'mycomputer') {
        setTimeout(() => {
            if (AppState.explorerSection === 'home') {
                explorerNavigate('home', false);
            }
        }, 50);
    }
}

function closeWindow(id) {
    const el = document.getElementById(`window-${id}`); if (!el) return;
    if (typeof gsap !== 'undefined') {
        gsap.to(el, { scale: 0.9, opacity: 0, duration: 0.2, ease: 'power2.in', onComplete: () => {
            el.classList.remove('active', 'focused'); el.setAttribute('aria-hidden', 'true');
            if (AppState.windows[id]) { AppState.windows[id].closed = true; AppState.windows[id].minimized = false; }
        }});
    } else {
        el.classList.remove('active', 'focused'); el.setAttribute('aria-hidden', 'true');
        if (AppState.windows[id]) { AppState.windows[id].closed = true; AppState.windows[id].minimized = false; }
    }
    removeTaskbarTab(id);
}

function minimizeWindow(id) {
    const el = document.getElementById(`window-${id}`); if (!el) return;
    const tab = document.querySelector(`.taskbar-tab[data-window="${id}"]`);
    if (tab && typeof gsap !== 'undefined') {
        const tr = tab.getBoundingClientRect(), wr = el.getBoundingClientRect();
        gsap.to(el, { x: tr.left - wr.left + tr.width/2 - wr.width/2, y: window.innerHeight - wr.top - 30, scale: 0.1, opacity: 0, duration: 0.3, ease: 'power2.in',
            onComplete: () => { el.classList.add('minimized'); el.classList.remove('focused'); el.style.transform = ''; if (AppState.windows[id]) AppState.windows[id].minimized = true; updateTaskbarTab(id, false); }
        });
    } else {
        el.classList.add('minimized'); el.classList.remove('focused');
        if (AppState.windows[id]) AppState.windows[id].minimized = true;
        updateTaskbarTab(id, false);
    }
}

function toggleMaximizeWindow(id) {
    const el = document.getElementById(`window-${id}`); if (!el || AppState.isMobile) return;
    const st = AppState.windows[id], cfg = WindowConfig[id];
    if (st && st.maximized) {
        if (typeof gsap !== 'undefined') gsap.to(el, { width: cfg.width, height: cfg.height, left: cfg.x, top: cfg.y, duration: 0.3, ease: 'power2.out' });
        else { el.style.width = cfg.width+'px'; el.style.height = cfg.height+'px'; el.style.left = cfg.x+'px'; el.style.top = cfg.y+'px'; }
        el.classList.remove('maximized'); if (st) st.maximized = false;
    } else {
        if (typeof gsap !== 'undefined') gsap.to(el, { width: '100%', height: 'calc(100% - 34px)', left: 0, top: 0, duration: 0.3, ease: 'power2.out' });
        else { el.style.width = '100%'; el.style.height = 'calc(100% - 34px)'; el.style.left = '0'; el.style.top = '0'; }
        el.classList.add('maximized'); if (st) st.maximized = true;
    }
}

function focusWindow(id) {
    document.querySelectorAll('.xp-window').forEach(w => w.classList.remove('focused'));
    const el = document.getElementById(`window-${id}`); if (!el) return;
    el.classList.add('focused'); AppState.activeWindow = id;
    AppState.windowZIndex++; el.style.zIndex = AppState.windowZIndex;
    updateTaskbarTab(id, true);
}

function makeWindowDraggable(win, handle) {
    let drag = false, sx, sy, ix, iy;
    handle.addEventListener('mousedown', e => {
        if (e.target.closest('.window-controls') || win.classList.contains('maximized')) return;
        drag = true; sx = e.clientX; sy = e.clientY; ix = win.offsetLeft; iy = win.offsetTop;
        const mm = e2 => { if (!drag) return; win.style.left = `${ix + e2.clientX - sx}px`; win.style.top = `${iy + e2.clientY - sy}px`; };
        const mu = () => { drag = false; document.removeEventListener('mousemove', mm); document.removeEventListener('mouseup', mu); };
        document.addEventListener('mousemove', mm); document.addEventListener('mouseup', mu);
    });
}

// ── TASKBAR TABS ──
function addTaskbarTab(id, cfg) {
    removeTaskbarTab(id);
    const c = document.getElementById('taskbar-windows'); if (!c) return;
    const tab = document.createElement('button');
    tab.className = 'taskbar-tab'; tab.dataset.window = id;
    tab.innerHTML = `<img src="${cfg.icon}" alt=""><span>${cfg.title}</span>`;
    tab.addEventListener('click', () => {
        const st = AppState.windows[id]; if (!st) return;
        if (st.minimized || st.closed) restoreWindow(id);
        else if (AppState.activeWindow === id) minimizeWindow(id);
        else focusWindow(id);
    });
    c.appendChild(tab); updateTaskbarTab(id, true);
}
function removeTaskbarTab(id) { document.querySelector(`.taskbar-tab[data-window="${id}"]`)?.remove(); }
function updateTaskbarTab(id, active) { const tab = document.querySelector(`.taskbar-tab[data-window="${id}"]`); if (tab) tab.classList.toggle('active', active); }
function restoreWindow(id) {
    const el = document.getElementById(`window-${id}`); if (!el) return;
    if (AppState.windows[id]?.closed) { openWindow(id); return; }
    el.classList.remove('minimized'); if (AppState.windows[id]) AppState.windows[id].minimized = false;
    if (typeof gsap !== 'undefined') gsap.fromTo(el, { scale: 0.8, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.2)' });
    focusWindow(id);
}

// ── START MENU ──
function initializeStartMenu() {
    const btn = document.getElementById('start-button'), menu = document.getElementById('start-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', e => { e.stopPropagation(); toggleStartMenu(); });
    document.getElementById('start-logoff-btn')?.addEventListener('click', () => { closeStartMenu(); showBalloon('🔒 Log Off', 'Saving your session...\nPortfolio XP will remember you!'); });
    document.getElementById('start-help-btn')?.addEventListener('click', () => { closeStartMenu(); showBalloon('❓ Help & Support', 'Type "xpdev" anytime to unlock the secret Developer Console!\n\nDouble-click desktop icons to open windows.'); });
    document.addEventListener('click', e => { if (!menu.contains(e.target) && !btn.contains(e.target)) closeStartMenu(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && AppState.startMenuOpen) closeStartMenu(); });
}
function toggleStartMenu() { AppState.startMenuOpen ? closeStartMenu() : openStartMenu(); }
function openStartMenu() {
    const menu = document.getElementById('start-menu'), btn = document.getElementById('start-button');
    if (!menu || !btn) return;
    menu.classList.add('active'); menu.setAttribute('aria-hidden', 'false');
    btn.classList.add('active'); btn.setAttribute('aria-expanded', 'true');
    AppState.startMenuOpen = true;
    if (typeof gsap !== 'undefined') gsap.fromTo(menu, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out' });
}
function closeStartMenu() {
    const menu = document.getElementById('start-menu'), btn = document.getElementById('start-button');
    if (!menu || !btn) return;
    if (typeof gsap !== 'undefined') gsap.to(menu, { y: 20, opacity: 0, duration: 0.15, ease: 'power2.in', onComplete: () => { menu.classList.remove('active'); menu.setAttribute('aria-hidden', 'true'); } });
    else { menu.classList.remove('active'); menu.setAttribute('aria-hidden', 'true'); }
    btn.classList.remove('active'); btn.setAttribute('aria-expanded', 'false');
    AppState.startMenuOpen = false;
}

// ── DESKTOP ICONS ──
function initializeDesktopIcons() {
    document.querySelectorAll('.desktop-icon').forEach(icon => {
        icon.addEventListener('click', e => { e.stopPropagation(); selectIcon(icon); });
        icon.addEventListener('dblclick', e => {
            e.stopPropagation();
            const w = icon.dataset.window;
            const section = icon.dataset.section;
            if (w) {
                openWindow(w);
                if (section) setTimeout(() => explorerNavigate(section), 80);
            }
        });
        icon.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const w = icon.dataset.window;
                const section = icon.dataset.section;
                if (w) { openWindow(w); if (section) setTimeout(() => explorerNavigate(section), 80); }
            }
        });
        if (!AppState.isMobile) makeDraggable(icon);
    });
    document.getElementById('desktop')?.addEventListener('click', e => { if (e.target.id === 'desktop') deselectAllIcons(); });
}
function selectIcon(icon) { deselectAllIcons(); icon.classList.add('selected'); }
function deselectAllIcons() { document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected')); }
function makeDraggable(el) {
    let dragging = false, sx, sy, ix, iy;
    el.addEventListener('mousedown', e => {
        if (e.button !== 0) return;
        dragging = true; sx = e.clientX; sy = e.clientY; ix = el.offsetLeft; iy = el.offsetTop;
        el.classList.add('dragging');
        const mm = e2 => { if (!dragging) return; el.style.position = 'absolute'; el.style.left = `${ix + e2.clientX - sx}px`; el.style.top = `${iy + e2.clientY - sy}px`; };
        const mu = () => { dragging = false; el.classList.remove('dragging'); document.removeEventListener('mousemove', mm); document.removeEventListener('mouseup', mu); };
        document.addEventListener('mousemove', mm); document.addEventListener('mouseup', mu);
    });
}

// ── MY COMPUTER TASK SECTION TOGGLE ──
function mcToggleSection(id) { document.getElementById(id)?.classList.toggle('mc-collapsed'); }

// ── EASTER EGG ──
function initializeEasterEgg() {
    document.addEventListener('keydown', e => {
        AppState.easterEggSequence += e.key.toLowerCase();
        if (AppState.easterEggSequence.length > 5) AppState.easterEggSequence = AppState.easterEggSequence.slice(-5);
        if (AppState.easterEggSequence === 'xpdev') {
            AppState.easterEggSequence = '';
            openWindow('mycomputer');
            setTimeout(() => explorerNavigate('devconsole'), 80);
            showBalloon('🎉 Easter Egg Unlocked!', 'Developer Console activated.\nWelcome, System Architect!');
        }
    });
}

// ── SHUTDOWN ──
function initializeShutdown() {
    document.getElementById('shutdown-btn')?.addEventListener('click', () => { closeStartMenu(); triggerShutdown(); });
}
function triggerShutdown() {
    const s = document.getElementById('shutdown-screen'); if (!s) return;
    document.querySelectorAll('.xp-window').forEach(w => w.classList.remove('active', 'focused'));
    s.classList.add('active');
    setTimeout(() => {
        s.innerHTML = `<div class="shutdown-message"><p style="font-size:24px;margin-bottom:20px;">It is now safe to turn off your computer.</p><p style="font-size:14px;color:#aaa;">Thank you for visiting Arjumand Ali's portfolio.</p><button onclick="location.reload()" style="margin-top:30px;padding:10px 20px;font-size:14px;cursor:pointer;font-family:Tahoma,sans-serif;">Restart System</button></div>`;
    }, 4000);
}

// ── CLOCK ──
function initializeClock() { updateClock(); setInterval(updateClock, 1000); }
function updateClock() {
    const el = document.getElementById('clock'), dateEl = document.getElementById('clock-date');
    if (!el) return;
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, '0');
    const ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    el.textContent = `${h}:${m} ${ap}`;
    if (dateEl) {
        const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        dateEl.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
    }
}

// ── CALENDAR ──
function initializeCalendar() {
    const btn = document.getElementById('clock-btn'), popup = document.getElementById('calendar-popup');
    const prevBtn = document.getElementById('cal-prev'), nextBtn = document.getElementById('cal-next');
    if (!btn || !popup) return;
    btn.addEventListener('click', e => {
        e.stopPropagation();
        AppState.calendarOpen = !AppState.calendarOpen;
        popup.classList.toggle('open', AppState.calendarOpen);
        btn.setAttribute('aria-expanded', AppState.calendarOpen);
        if (AppState.calendarOpen) renderCalendar();
    });
    prevBtn?.addEventListener('click', e => { e.stopPropagation(); AppState.calendarDate.setMonth(AppState.calendarDate.getMonth() - 1); renderCalendar(); });
    nextBtn?.addEventListener('click', e => { e.stopPropagation(); AppState.calendarDate.setMonth(AppState.calendarDate.getMonth() + 1); renderCalendar(); });
    document.addEventListener('click', e => {
        if (!popup.contains(e.target) && !btn.contains(e.target)) {
            AppState.calendarOpen = false; popup.classList.remove('open'); btn.setAttribute('aria-expanded', 'false');
        }
    });
    renderCalendar();
}
function renderCalendar() {
    const grid = document.getElementById('cal-grid'), monthYearEl = document.getElementById('cal-month-year'), todayLabel = document.getElementById('cal-today-label');
    if (!grid) return;
    const now = new Date(), d = AppState.calendarDate, year = d.getFullYear(), month = d.getMonth();
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    if (monthYearEl) monthYearEl.textContent = `${months[month]} ${year}`;
    if (todayLabel) todayLabel.textContent = `Today: ${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    const firstDay = new Date(year, month, 1).getDay(), daysInMonth = new Date(year, month + 1, 0).getDate(), daysInPrev = new Date(year, month, 0).getDate();
    grid.innerHTML = '';
    for (let i = firstDay - 1; i >= 0; i--) { const d2 = document.createElement('div'); d2.className = 'cal-day other-month'; d2.textContent = daysInPrev - i; grid.appendChild(d2); }
    for (let i = 1; i <= daysInMonth; i++) {
        const d2 = document.createElement('div');
        const isToday = i === now.getDate() && month === now.getMonth() && year === now.getFullYear();
        const dow = new Date(year, month, i).getDay();
        d2.className = 'cal-day' + (isToday ? ' today' : '') + (dow === 0 ? ' sunday' : '');
        d2.textContent = i; grid.appendChild(d2);
    }
    const remaining = 42 - grid.children.length;
    for (let i = 1; i <= remaining; i++) { const d2 = document.createElement('div'); d2.className = 'cal-day other-month'; d2.textContent = i; grid.appendChild(d2); }
}

// ── VOLUME ──
function initializeVolumeControl() {
    const slider = document.getElementById('vol-slider'), pct = document.getElementById('vol-pct');
    const muteCheck = document.getElementById('vol-mute'), volIcon = document.getElementById('vol-icon');
    if (!slider) return;
    slider.addEventListener('input', () => {
        const val = slider.value;
        if (pct) pct.textContent = `${val}%`;
        if (volIcon) { if (val == 0) volIcon.textContent = '🔇'; else if (val < 40) volIcon.textContent = '🔈'; else if (val < 70) volIcon.textContent = '🔉'; else volIcon.textContent = '🔊'; }
    });
    muteCheck?.addEventListener('change', () => { if (volIcon) volIcon.textContent = muteCheck.checked ? '🔇' : '🔊'; slider.disabled = muteCheck.checked; });
}

// ── RUN DIALOG ──
function initializeRunDialog() {
    const dialog = document.getElementById('run-dialog'), input = document.getElementById('run-input');
    const okBtn = document.getElementById('run-ok-btn'), cancelBtn = document.getElementById('run-cancel-btn');
    document.getElementById('start-run-btn')?.addEventListener('click', () => { closeStartMenu(); openRunDialog(); });
    okBtn?.addEventListener('click', () => {
        const cmd = input?.value.trim().toLowerCase();
        const target = RunCommands[cmd] || cmd;
        if (SectionConfig[target] || target === 'home') {
            closeRunDialog();
            openWindow('mycomputer');
            setTimeout(() => explorerNavigate(target), 80);
        } else {
            input.style.borderColor = '#cc0000';
            setTimeout(() => { input.style.borderColor = ''; }, 1200);
        }
    });
    cancelBtn?.addEventListener('click', closeRunDialog);
    input?.addEventListener('keydown', e => { if (e.key === 'Enter') okBtn.click(); if (e.key === 'Escape') closeRunDialog(); });
}
function openRunDialog() { const d = document.getElementById('run-dialog'), i = document.getElementById('run-input'); if (!d) return; d.classList.add('active'); d.setAttribute('aria-hidden', 'false'); setTimeout(() => i?.focus(), 50); }
function closeRunDialog() { const d = document.getElementById('run-dialog'), i = document.getElementById('run-input'); if (!d) return; d.classList.remove('active'); d.setAttribute('aria-hidden', 'true'); if (i) i.value = ''; }

// ── TRAY ICONS ──
function initializeTrayIcons() {
    document.querySelectorAll('.tray-icon-wrap').forEach(w => w.addEventListener('click', e => e.stopPropagation()));
    document.getElementById('tray-hide-btn')?.addEventListener('click', e => { e.stopPropagation(); showBalloon('💡 All icons are visible', 'No hidden notification icons.'); });
}

// ── BALLOON ──
function showWelcomeBalloon() {
    setTimeout(() => { showBalloon('👋 Welcome to Portfolio XP!', 'Double-click desktop icons or use the sidebar tree to navigate.\nType "xpdev" to unlock a secret!'); }, 1200);
}
function showBalloon(title, message) {
    document.getElementById('taskbar-balloon')?.remove();
    const balloon = document.createElement('div');
    balloon.id = 'taskbar-balloon';
    balloon.style.cssText = `position:fixed;bottom:calc(var(--taskbar-height) + 8px);right:12px;background:#ffffe1;border:1px solid #808080;box-shadow:2px 2px 6px rgba(0,0,0,0.35);padding:8px 28px 8px 10px;min-width:200px;max-width:280px;z-index:9998;font-family:Tahoma,sans-serif;font-size:11px;border-radius:4px;`;
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = `position:absolute;top:3px;right:5px;background:none;border:none;font-size:14px;cursor:pointer;color:#555;line-height:1;padding:0;font-family:inherit;`;
    closeBtn.addEventListener('click', () => balloon.remove());
    const titleEl = document.createElement('div'); titleEl.style.cssText = 'font-weight:bold;margin-bottom:4px;color:#000;'; titleEl.textContent = title;
    const msgEl = document.createElement('div'); msgEl.style.cssText = 'color:#333;white-space:pre-line;'; msgEl.textContent = message;
    balloon.appendChild(closeBtn); balloon.appendChild(titleEl); balloon.appendChild(msgEl);
    document.body.appendChild(balloon);
    setTimeout(() => balloon.remove(), 5000);
}

// ── RECYCLE BIN ──
document.addEventListener('click', e => { if (e.target.closest?.('.recycle-bin')) { showBalloon('🗑️ Recycle Bin', 'Recycle Bin is empty.\n(No chaos allowed!)'); } });

// ── RESIZE ──
window.addEventListener('resize', () => { AppState.isMobile = window.innerWidth <= 768; });

// ── CONSOLE SIGNATURE ──
console.log('%c Windows XP Portfolio ', 'background:#0054E3;color:#fff;font-size:20px;font-weight:bold;padding:10px;');
console.log('%c Arjumand Ali — Frontend Developer & Theming Engineer ', 'color:#3A9E3A;font-size:14px;');
console.log('%c Type "xpdev" to unlock the developer console! ', 'color:#FDB813;font-size:12px;');
