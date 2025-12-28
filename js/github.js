// GitHub Integration - fetch and display repositories

const GitHub = (() => {
    const API_BASE = 'https://api.github.com';

    // Fetch repositories for a user
    async function fetchRepos(username) {
        try {
            const response = await fetch(`${API_BASE}/users/${username}/repos?sort=updated&per_page=100`);

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const repos = await response.json();
            return repos;
        } catch (error) {
            console.error('Error fetching repos:', error);
            throw error;
        }
    }

    // Render repository list
    function renderRepoList(repos) {
        if (!repos || repos.length === 0) {
            return '<div class="window-content"><p>No repositories found.</p></div>';
        }

        const repoItems = repos.map(repo => {
            const stars = repo.stargazers_count || 0;
            const forks = repo.forks_count || 0;
            const language = repo.language || 'N/A';
            const description = repo.description || 'No description available';

            return `
                <div class="repo-item" onclick="window.open('${repo.html_url}', '_blank')">
                    <div class="repo-name">📁 ${repo.name}</div>
                    <div class="repo-description">${description}</div>
                    <div class="repo-meta">
                        <span>⭐ ${stars}</span>
                        <span>🔱 ${forks}</span>
                        <span>💻 ${language}</span>
                        ${repo.fork ? '<span>🔀 Fork</span>' : ''}
                    </div>
                </div>
            `;
        }).join('');

        return `<div class="repos-list">${repoItems}</div>`;
    }

    // Render error message
    function renderError(error) {
        return `
            <div class="error">
                <strong>Error loading repositories</strong>
                <p>${error.message || 'Failed to fetch repositories from GitHub.'}</p>
                <p>Please try again later.</p>
            </div>
        `;
    }

    // Fetch and display repos in a window
    async function fetchAndDisplayRepos(username, windowId) {
        const windowData = WindowManager.getWindow(windowId);
        if (!windowData) return;

        const windowBody = windowData.element.querySelector('.window-body');

        try {
            // Show loading state
            windowBody.innerHTML = '<div class="loading">Loading GitHub repositories</div>';

            // Fetch repos
            const repos = await fetchRepos(username);

            // Render repos
            windowBody.innerHTML = renderRepoList(repos);
        } catch (error) {
            // Show error
            windowBody.innerHTML = renderError(error);
        }
    }

    // Public API
    return {
        fetchRepos,
        renderRepoList,
        fetchAndDisplayRepos
    };
})();

// Make available globally
window.GitHub = GitHub;
