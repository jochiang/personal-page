# Deployment Guide

## Quick Start (GitHub Pages)

### Option 1: New Repository

1. **Initialize Git repository** (if not already done):
   ```bash
   cd G:\personal_page
   git init
   git add .
   git commit -m "Initial commit: Windows XP personal website"
   ```

2. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Repository name: `personal-page` (or any name you prefer)
   - Make it Public
   - Don't initialize with README (we already have one)
   - Click "Create repository"

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/jochiang/personal-page.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Under "Source", select "Deploy from a branch"
   - Select branch: `main`
   - Select folder: `/ (root)`
   - Click "Save"
   - Wait 1-2 minutes for deployment

5. **Access your site**:
   - Your site will be live at: `https://jochiang.github.io/personal-page/`

### Option 2: Using `jochiang.github.io` (User Site)

For a cleaner URL without the repo name:

1. Create a repository named exactly: `jochiang.github.io`
2. Follow steps 1, 3, 4, and 5 from Option 1
3. Your site will be at: `https://jochiang.github.io/`

## Customization

Before deploying, you may want to customize:

1. **GitHub Username** - Update in `js/startMenu.js` line 44:
   ```javascript
   GitHub.fetchAndDisplayRepos('YOUR_USERNAME', 'repos');
   ```

2. **Personal Info** - Update in:
   - `index.html` line 27 (Start Menu header)
   - `js/startMenu.js` (About and Contact window content)

3. **Page Title** - Update in `index.html` line 6:
   ```html
   <title>Your Name - Personal Website</title>
   ```

## Testing Locally

Simply open `index.html` in your web browser:

```bash
# Windows
start index.html

# Or just double-click index.html in File Explorer
```

## Troubleshooting

### GitHub API Rate Limiting
- Unauthenticated requests are limited to 60 per hour
- If you need more, consider adding a GitHub token (not recommended for public sites)

### Site Not Updating
- Changes can take 1-2 minutes to propagate
- Try a hard refresh (Ctrl+F5 or Cmd+Shift+R)
- Check the "Actions" tab in your GitHub repo for deployment status

### CORS Issues (Local Testing)
- Some browsers may block API requests when opening files directly
- Use a local server: `python -m http.server 8000` or VS Code Live Server

## Future Enhancements

Ideas for extending your site:
- Add desktop icons
- Include more project showcases
- Add a blog window
- Implement window minimize animations
- Add sound effects (optional)
- Create custom wallpapers

## Support

For issues with:
- **XP.css**: https://github.com/botoxparty/XP.css
- **GitHub Pages**: https://docs.github.com/pages
- **GitHub API**: https://docs.github.com/rest
