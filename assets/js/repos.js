document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.github.com/users/Dyst0rti0n/repos')
        .then(response => response.json())
        .then(data => {
            const reposContainer = document.querySelector('.carousel-container');
            data.forEach(repo => {
                const repoDiv = document.createElement('div');
                repoDiv.className = 'repo';
                repoDiv.innerHTML = `<h3>${repo.name}</h3>`;
                repoDiv.addEventListener('click', () => {
                    window.open(repo.html_url, '_blank');
                });
                reposContainer.appendChild(repoDiv);
            });

            let scrollAmount = 0;
            function scrollCarousel() {
                reposContainer.scrollBy({ left: 1, behavior: 'smooth' });
                scrollAmount += 1;
                if (scrollAmount >= reposContainer.scrollWidth - reposContainer.clientWidth) {
                    reposContainer.scrollLeft = 0;
                    scrollAmount = 0;
                }
            }
            setInterval(scrollCarousel, 20);

            // Allow dragging to scroll
            let isDown = false;
            let startX;
            let scrollLeft;

            reposContainer.addEventListener('mousedown', (e) => {
                isDown = true;
                reposContainer.classList.add('active');
                startX = e.pageX - reposContainer.offsetLeft;
                scrollLeft = reposContainer.scrollLeft;
            });

            reposContainer.addEventListener('mouseleave', () => {
                isDown = false;
                reposContainer.classList.remove('active');
            });

            reposContainer.addEventListener('mouseup', () => {
                isDown = false;
                reposContainer.classList.remove('active');
            });

            reposContainer.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - reposContainer.offsetLeft;
                const walk = (x - startX) * 1.5; 
                reposContainer.scrollLeft = scrollLeft - walk;
            });
        })
        .catch(error => console.error('Error fetching repos:', error));
});
