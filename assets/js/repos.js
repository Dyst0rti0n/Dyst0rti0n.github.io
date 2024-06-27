document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.github.com/users/Dyst0rti0n/repos')
        .then(response => response.json())
        .then(data => {
            const reposContainer = document.querySelector('.carousel-container');
            data.forEach(repo => {
                const repoDiv = document.createElement('div');
                repoDiv.className = 'repo';
                repoDiv.innerHTML = `
                    <h3>${repo.name}</h3>
                `;
                repoDiv.addEventListener('click', () => {
                    window.open(repo.html_url, '_blank');
                });
                reposContainer.appendChild(repoDiv);
            });

            // Automatic scrolling
            let scrollAmount = 0;
            function scrollCarousel() {
                reposContainer.scrollBy({ left: 1, behavior: 'smooth' });
                scrollAmount += 1;
                if (scrollAmount >= reposContainer.scrollWidth - reposContainer.clientWidth) {
                    reposContainer.scrollLeft = 0;
                    scrollAmount = 0;
                }
            }
            setInterval(scrollCarousel, 10);
        })
        .catch(error => console.error('Error fetching repos:', error));
});
