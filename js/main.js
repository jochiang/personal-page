// Main initialization script

document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Windows XP Personal Website...');

    // Initialize all modules
    if (window.Taskbar) {
        Taskbar.init();
        console.log('✓ Taskbar initialized');
    }

    if (window.StartMenu) {
        StartMenu.init();
        console.log('✓ Start Menu initialized');
    }

    console.log('✓ Window Manager ready');
    console.log('✓ GitHub integration ready');

    // Welcome message
    console.log('%c Welcome to Windows XP! ', 'background: #245edb; color: white; font-size: 16px; padding: 4px;');
    console.log('Click the Start button to begin exploring.');

    // Optional: Open a welcome window on first load
    setTimeout(() => {
        openWelcomeWindow();
    }, 500);
});

// Open a welcome window
function openWelcomeWindow() {
    const content = `
        <div class="window-content">
            <h2>Welcome to My Personal Page!</h2>
            <p>This is a Windows XP-themed personal website built with vanilla HTML, CSS, and JavaScript.</p>
            <p><strong>Features:</strong></p>
            <ul class="tree-view">
                <li>🪟 Draggable and resizable windows</li>
                <li>📋 Functional taskbar with window management</li>
                <li>🎯 Animated Start menu</li>
                <li>🐙 GitHub repository integration</li>
            </ul>
            <p style="margin-top: 16px;"><strong>Getting Started:</strong></p>
            <p>Click the <strong>Start</strong> button in the bottom-left corner to explore:</p>
            <ul class="tree-view">
                <li>📁 <strong>My GitHub Repos</strong> - Browse my repositories</li>
                <li>👤 <strong>About Me</strong> - Learn more about me</li>
                <li>📧 <strong>Contact</strong> - Get in touch</li>
                <li>💼 <strong>Projects</strong> - View my work</li>
            </ul>
            <p style="margin-top: 16px; color: #666; font-size: 11px;">
                💡 Tip: You can drag windows by the title bar and resize them from the bottom-right corner!
            </p>
        </div>
    `;

    WindowManager.createWindow('welcome', 'Welcome!', content, {
        width: 550,
        height: 500,
        x: 150,
        y: 100
    });
}
