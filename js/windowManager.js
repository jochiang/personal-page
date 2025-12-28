// Window Manager - handles window creation, dragging, resizing, and z-index management

const WindowManager = (() => {
    let windows = new Map();
    let highestZIndex = 100;
    let isDragging = false;
    let isResizing = false;
    let activeWindow = null;
    let dragOffset = { x: 0, y: 0 };
    let resizeStart = { x: 0, y: 0, width: 0, height: 0 };

    // Create a new window
    function createWindow(id, title, content, options = {}) {
        // Check if window already exists
        if (windows.has(id)) {
            const existingWindow = windows.get(id);
            existingWindow.element.classList.remove('minimized');
            existingWindow.element.classList.add('visible');
            bringToFront(id);
            return existingWindow.element;
        }

        const windowEl = document.createElement('div');
        windowEl.className = 'window xp-window visible';
        windowEl.dataset.windowId = id;

        // Default position (centered with slight offset for each new window)
        const defaultX = 100 + (windows.size * 30);
        const defaultY = 80 + (windows.size * 30);

        windowEl.style.left = (options.x || defaultX) + 'px';
        windowEl.style.top = (options.y || defaultY) + 'px';
        windowEl.style.width = (options.width || 600) + 'px';
        windowEl.style.height = (options.height || 400) + 'px';
        windowEl.style.zIndex = ++highestZIndex;

        windowEl.innerHTML = `
            <div class="title-bar">
                <div class="title-bar-text">${title}</div>
                <div class="title-bar-controls">
                    <button aria-label="Minimize" data-action="minimize"></button>
                    <button aria-label="Maximize" data-action="maximize"></button>
                    <button aria-label="Close" data-action="close"></button>
                </div>
            </div>
            <div class="window-body">
                ${content}
            </div>
            <div class="resize-handle"></div>
        `;

        // Add to DOM
        document.getElementById('desktop').appendChild(windowEl);

        // Store window data
        windows.set(id, {
            element: windowEl,
            title: title,
            minimized: false,
            maximized: false,
            zIndex: highestZIndex,
            originalSize: null
        });

        // Set up event handlers
        setupWindowEvents(windowEl, id);

        // Notify taskbar
        if (window.Taskbar) {
            window.Taskbar.addWindow(id, title);
        }

        return windowEl;
    }

    // Set up event handlers for a window
    function setupWindowEvents(windowEl, id) {
        const titleBar = windowEl.querySelector('.title-bar');
        const controls = windowEl.querySelector('.title-bar-controls');
        const resizeHandle = windowEl.querySelector('.resize-handle');

        // Bring to front on click
        windowEl.addEventListener('mousedown', () => bringToFront(id));

        // Dragging
        titleBar.addEventListener('mousedown', (e) => {
            if (e.target.closest('.title-bar-controls')) return;

            isDragging = true;
            activeWindow = windowEl;
            dragOffset.x = e.clientX - windowEl.offsetLeft;
            dragOffset.y = e.clientY - windowEl.offsetTop;
            windowEl.style.cursor = 'move';
            e.preventDefault();
        });

        // Control buttons
        controls.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            if (action === 'minimize') minimizeWindow(id);
            else if (action === 'maximize') maximizeWindow(id);
            else if (action === 'close') closeWindow(id);
        });

        // Resizing
        if (resizeHandle) {
            resizeHandle.addEventListener('mousedown', (e) => {
                isResizing = true;
                activeWindow = windowEl;
                resizeStart.x = e.clientX;
                resizeStart.y = e.clientY;
                resizeStart.width = windowEl.offsetWidth;
                resizeStart.height = windowEl.offsetHeight;
                e.preventDefault();
                e.stopPropagation();
            });
        }
    }

    // Global mouse move handler
    document.addEventListener('mousemove', (e) => {
        if (isDragging && activeWindow) {
            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;

            // Keep window within viewport
            const maxX = window.innerWidth - 100;
            const maxY = window.innerHeight - 100;

            activeWindow.style.left = Math.max(0, Math.min(newX, maxX)) + 'px';
            activeWindow.style.top = Math.max(0, Math.min(newY, maxY)) + 'px';
        }

        if (isResizing && activeWindow) {
            const deltaX = e.clientX - resizeStart.x;
            const deltaY = e.clientY - resizeStart.y;

            const newWidth = Math.max(300, resizeStart.width + deltaX);
            const newHeight = Math.max(200, resizeStart.height + deltaY);

            activeWindow.style.width = newWidth + 'px';
            activeWindow.style.height = newHeight + 'px';
        }
    });

    // Global mouse up handler
    document.addEventListener('mouseup', () => {
        if (isDragging && activeWindow) {
            activeWindow.style.cursor = '';
        }
        isDragging = false;
        isResizing = false;
        activeWindow = null;
    });

    // Bring window to front
    function bringToFront(id) {
        const windowData = windows.get(id);
        if (!windowData) return;

        windowData.element.style.zIndex = ++highestZIndex;
        windowData.zIndex = highestZIndex;

        // Update taskbar active state
        if (window.Taskbar) {
            window.Taskbar.setActive(id);
        }
    }

    // Minimize window
    function minimizeWindow(id) {
        const windowData = windows.get(id);
        if (!windowData) return;

        windowData.element.classList.add('minimized');
        windowData.element.classList.remove('visible');
        windowData.minimized = true;

        if (window.Taskbar) {
            window.Taskbar.updateWindow(id);
        }
    }

    // Maximize/restore window
    function maximizeWindow(id) {
        const windowData = windows.get(id);
        if (!windowData) return;

        if (windowData.maximized) {
            // Restore
            const original = windowData.originalSize;
            windowData.element.style.left = original.left;
            windowData.element.style.top = original.top;
            windowData.element.style.width = original.width;
            windowData.element.style.height = original.height;
            windowData.maximized = false;
        } else {
            // Maximize
            windowData.originalSize = {
                left: windowData.element.style.left,
                top: windowData.element.style.top,
                width: windowData.element.style.width,
                height: windowData.element.style.height
            };
            windowData.element.style.left = '0px';
            windowData.element.style.top = '0px';
            windowData.element.style.width = '100%';
            windowData.element.style.height = 'calc(100vh - 40px)';
            windowData.maximized = true;
        }
    }

    // Close window
    function closeWindow(id) {
        const windowData = windows.get(id);
        if (!windowData) return;

        windowData.element.remove();
        windows.delete(id);

        if (window.Taskbar) {
            window.Taskbar.removeWindow(id);
        }
    }

    // Restore window (from minimized)
    function restoreWindow(id) {
        const windowData = windows.get(id);
        if (!windowData) return;

        windowData.element.classList.remove('minimized');
        windowData.element.classList.add('visible');
        windowData.minimized = false;
        bringToFront(id);

        if (window.Taskbar) {
            window.Taskbar.updateWindow(id);
        }
    }

    // Get window state
    function getWindow(id) {
        return windows.get(id);
    }

    // Public API
    return {
        createWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        restoreWindow,
        bringToFront,
        getWindow
    };
})();

// Make available globally
window.WindowManager = WindowManager;
