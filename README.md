# Windows XP Personal Website

A retro Windows XP-themed personal portfolio website with draggable windows, animated Start menu, and GitHub integration.

## Features

- **Authentic Windows XP UI** - Styled with [XP.css](https://botoxparty.github.io/XP.css/)
- **Draggable Windows** - Click and drag windows by their title bar
- **Resizable Windows** - Resize from the bottom-right corner
- **Working Taskbar** - Shows open windows and system clock
- **Animated Start Menu** - Smooth slide-up animation
- **GitHub Integration** - Fetches and displays your repositories
- **Window Management** - Minimize, maximize, and close windows

## Setup

1. Clone this repository
2. Update the GitHub username in `js/startMenu.js` (line 44) if needed:
   ```javascript
   GitHub.fetchAndDisplayRepos('jochiang', 'repos');
   ```
3. Open `index.html` in a web browser to test locally

## GitHub Pages Deployment

1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Set source to "Deploy from a branch"
4. Select `main` branch and `/ (root)` folder
5. Click Save
6. Your site will be available at: `https://jochiang.github.io/[repo-name]/`

## File Structure

```
personal_page/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # Custom styles and layout
├── js/
│   ├── main.js            # Initialization
│   ├── windowManager.js   # Window creation, drag, resize
│   ├── taskbar.js         # Taskbar management
│   ├── startMenu.js       # Start menu logic
│   └── github.js          # GitHub API integration
└── README.md              # This file
```

## Technologies

- Vanilla HTML5, CSS3, JavaScript (ES6+)
- [XP.css](https://botoxparty.github.io/XP.css/) for Windows XP styling
- GitHub REST API for repository data

## Browser Compatibility

Works best in modern browsers (Chrome, Firefox, Safari, Edge). Requires JavaScript enabled.

## License

Free to use and modify for personal projects.
