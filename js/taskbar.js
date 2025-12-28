// Taskbar Manager - handles taskbar window buttons and clock

const Taskbar = (() => {
    const taskbarWindows = document.getElementById('taskbar-windows');
    const clockEl = document.getElementById('clock');
    const windowButtons = new Map();

    // Add a window to the taskbar
    function addWindow(id, title) {
        if (windowButtons.has(id)) return;

        const button = document.createElement('button');
        button.className = 'taskbar-window-button';
        button.textContent = title;
        button.dataset.windowId = id;

        button.addEventListener('click', () => {
            const windowData = WindowManager.getWindow(id);
            if (!windowData) return;

            if (windowData.minimized) {
                WindowManager.restoreWindow(id);
            } else if (windowData.zIndex === getHighestZIndex()) {
                WindowManager.minimizeWindow(id);
            } else {
                WindowManager.bringToFront(id);
            }
        });

        taskbarWindows.appendChild(button);
        windowButtons.set(id, button);
        setActive(id);
    }

    // Remove a window from the taskbar
    function removeWindow(id) {
        const button = windowButtons.get(id);
        if (!button) return;

        button.remove();
        windowButtons.delete(id);
    }

    // Update window button state
    function updateWindow(id) {
        const button = windowButtons.get(id);
        const windowData = WindowManager.getWindow(id);
        if (!button || !windowData) return;

        if (windowData.minimized) {
            button.classList.remove('active');
        } else {
            // Check if this is the active window
            if (windowData.zIndex === getHighestZIndex()) {
                setActive(id);
            }
        }
    }

    // Set a window as active in the taskbar
    function setActive(id) {
        // Remove active class from all buttons
        windowButtons.forEach(button => button.classList.remove('active'));

        // Add active class to the specified button
        const button = windowButtons.get(id);
        if (button) {
            button.classList.add('active');
        }
    }

    // Helper to get the highest z-index
    function getHighestZIndex() {
        let highest = 0;
        windowButtons.forEach((button, id) => {
            const windowData = WindowManager.getWindow(id);
            if (windowData && windowData.zIndex > highest) {
                highest = windowData.zIndex;
            }
        });
        return highest;
    }

    // Update the clock
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        const displayHours = now.getHours() % 12 || 12;

        clockEl.textContent = `${displayHours}:${minutes} ${ampm}`;
    }

    // Initialize clock
    function initClock() {
        updateClock();
        setInterval(updateClock, 60000); // Update every minute
    }

    // Initialize taskbar
    function init() {
        initClock();
    }

    // Public API
    return {
        init,
        addWindow,
        removeWindow,
        updateWindow,
        setActive
    };
})();

// Make available globally
window.Taskbar = Taskbar;
