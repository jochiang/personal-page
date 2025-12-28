// Start Menu Manager - handles start menu toggle and actions

const StartMenu = (() => {
    const startButton = document.getElementById('start-button');
    const startMenu = document.getElementById('start-menu');
    let isOpen = false;

    // Toggle start menu
    function toggle() {
        isOpen = !isOpen;

        if (isOpen) {
            startMenu.classList.add('open');
            startButton.classList.add('active');
        } else {
            startMenu.classList.remove('open');
            startButton.classList.remove('active');
        }
    }

    // Close start menu
    function close() {
        if (!isOpen) return;
        isOpen = false;
        startMenu.classList.remove('open');
        startButton.classList.remove('active');
    }

    // Handle menu item clicks
    function handleMenuItemClick(action) {
        close();

        switch (action) {
            case 'repos':
                openReposWindow();
                break;
            case 'about':
                openAboutWindow();
                break;
            case 'contact':
                openContactWindow();
                break;
            case 'projects':
                openProjectsWindow();
                break;
        }
    }

    // Open GitHub Repos window
    function openReposWindow() {
        const content = '<div class="loading">Loading GitHub repositories</div>';
        const windowEl = WindowManager.createWindow('repos', 'GitHub Repositories', content, {
            width: 700,
            height: 500
        });

        // Fetch repos
        if (window.GitHub) {
            GitHub.fetchAndDisplayRepos('jochiang', 'repos');
        }
    }

    // Open About window
    function openAboutWindow() {
        const content = `
            <div class="window-content">
                <h2>About Me</h2>
                <p>Welcome to my Windows XP-themed personal website!</p>
                <p>I'm a developer who loves retro UI design and modern web technologies.</p>
                <p>This site is built with vanilla HTML, CSS, and JavaScript, styled with the excellent <a href="https://botoxparty.github.io/XP.css/" target="_blank">XP.css</a> library.</p>
                <p>Feel free to explore my GitHub repositories and get in touch!</p>
            </div>
        `;
        WindowManager.createWindow('about', 'About Me', content, {
            width: 500,
            height: 350
        });
    }

    // Open Contact window
    function openContactWindow() {
        const content = `
            <div class="window-content">
                <h2>Contact</h2>
                <p>Get in touch with me on GitHub:</p>
                <ul class="tree-view">
                    <li>🐙 <strong>GitHub:</strong> <a href="https://github.com/jochiang" target="_blank">@jochiang</a></li>
                </ul>
                <p style="margin-top: 20px;">Feel free to open an issue or reach out!</p>
            </div>
        `;
        WindowManager.createWindow('contact', 'Contact', content, {
            width: 400,
            height: 250
        });
    }

    // Open Projects window
    function openProjectsWindow() {
        const content = `
            <div class="window-content">
                <h2>Projects</h2>
                <p>Check out my GitHub repositories for a full list of projects!</p>
                <p>Click "My GitHub Repos" from the Start menu to browse all my repositories.</p>
                <p>Some highlights:</p>
                <ul class="tree-view">
                    <li>🪟 This Windows XP-themed personal website</li>
                    <li>💻 Various web development projects</li>
                    <li>🛠️ Open source contributions</li>
                </ul>
            </div>
        `;
        WindowManager.createWindow('projects', 'Projects', content, {
            width: 500,
            height: 350
        });
    }

    // Initialize start menu
    function init() {
        // Start button click
        startButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggle();
        });

        // Menu item clicks
        const menuItems = startMenu.querySelectorAll('.start-menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                handleMenuItemClick(action);
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!startMenu.contains(e.target) && e.target !== startButton && !startButton.contains(e.target)) {
                close();
            }
        });

        // Prevent menu from closing when clicking inside it
        startMenu.addEventListener('click', (e) => {
            if (!e.target.closest('.start-menu-item')) {
                e.stopPropagation();
            }
        });
    }

    // Public API
    return {
        init,
        toggle,
        close
    };
})();

// Make available globally
window.StartMenu = StartMenu;
