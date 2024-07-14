// Fetch GitHub Repos
async function fetchGitHubRepos() {
    const response = await fetch('https://api.github.com/users/Dyst0rti0n/repos');
    const repos = await response.json();
    displayRepos(repos);
}

function displayRepos(repos) {
    const carousel = document.querySelector('.carousel-strip');
    repos.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.classList.add('carousel-item');
        repoCard.innerHTML = `
            <a href="${repo.html_url}" target="_blank">
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description available'}</p>
            </a>
        `;
        carousel.appendChild(repoCard);
    });

    // Initialize Slick Carousel
    $(document).ready(function(){
        $('.carousel-strip').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false
        });
    });
}

// Initialize the fetch function on page load
document.addEventListener('DOMContentLoaded', fetchGitHubRepos);
