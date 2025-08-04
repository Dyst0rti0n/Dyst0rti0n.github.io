/**
 * GitHub Projects Integration
 * Fetches and displays repository information from GitHub
 */
document.addEventListener('DOMContentLoaded', function() {
            const username = 'Dyst0rti0n'; // Replace with your GitHub username
            const projectsContainer = document.getElementById('github-projects');
            const featuredProjects = ['go-url-shortener', 'python-network-analyzer', 'crypto-dashboard', 'go-api-framework'];

            if (!projectsContainer) return;

            // Show loading state
            projectsContainer.innerHTML = '<div class="loading">Loading projects...</div>';

            // Fetch featured repositories
            fetchFeaturedRepositories();

            /**
             * Fetch featured repositories from GitHub
             */
            function fetchFeaturedRepositories() {
                const promises = featuredProjects.map(repo =>
                    fetch(`https://api.github.com/repos/${username}/${repo}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to fetch ${repo}: ${response.status}`);
                        }
                        return response.json();
                    })
                    .catch(error => {
                        console.error(error);
                        return null;
                    })
                );

                Promise.all(promises)
                    .then(repositories => {
                        // Filter out null responses (failed requests)
                        const validRepos = repositories.filter(repo => repo !== null);

                        if (validRepos.length === 0) {
                            projectsContainer.innerHTML = '<div class="error">Failed to load projects. Please try again later.</div>';
                            return;
                        }

                        displayRepositories(validRepos);
                    })
                    .catch(error => {
                        console.error('Error fetching repositories:', error);
                        projectsContainer.innerHTML = '<div class="error">Failed to load projects. Please try again later.</div>';
                    });
            }

            /**
             * Display repositories in the projects container
             */
            function displayRepositories(repositories) {
                projectsContainer.innerHTML = '';

                repositories.forEach(repo => {
                            // Determine language class for badge color
                            const languageClass = getLanguageClass(repo.language);

                            // Create project card
                            const projectCard = document.createElement('div');
                            projectCard.className = 'project-card';
                            projectCard.setAttribute('data-categories', repo.language ? repo.language.toLowerCase() : '');

                            projectCard.innerHTML = `
                <div class="project-header">
                    <h3>${repo.name}</h3>
                    <div class="project-badges">
                        ${repo.language ? `<span class="language-badge ${languageClass}">${repo.language}</span>` : ''}
                        <span class="stars-badge">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            ${repo.stargazers_count}
                        </span>
                    </div>
                </div>
                <p class="project-description">${repo.description || 'No description available.'}</p>
                <div class="project-tech">
                    ${repo.topics && repo.topics.length > 0 ?
                        repo.topics.slice(0, 3).map(topic => `<span class="tech-tag">${topic}</span>`).join('') :
                        ''}
                </div>
                <div class="project-links">
                    <a href="${repo.html_url}" class="github-link" target="_blank" rel="noopener">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        View Code
                    </a>
                    ${repo.homepage ?
                        `<a href="${repo.homepage}" class="demo-link" target="_blank" rel="noopener">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            Live Demo
                        </a>` :
                        ''}
                    <a href="/projects/${repo.name}" class="details-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        Details
                    </a>
                </div>
            `;

            projectsContainer.appendChild(projectCard);
        });
    }

    /**
     * Get language class for badge styling
     */
    function getLanguageClass(language) {
        if (!language) return '';

        const languageMap = {
            'JavaScript': 'lang-js',
            'TypeScript': 'lang-ts',
            'Python': 'lang-py',
            'Go': 'lang-go',
            'Java': 'lang-java',
            'C#': 'lang-csharp',
            'Ruby': 'lang-ruby',
            'PHP': 'lang-php',
            'HTML': 'lang-html',
            'CSS': 'lang-css'
        };

        return languageMap[language] || 'lang-other';
    }

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    if (filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Get filter value
                const filter = this.getAttribute('data-filter');

                // Get all project cards
                const projectCards = document.querySelectorAll('.project-card');

                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-categories').includes(filter.toLowerCase())) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});