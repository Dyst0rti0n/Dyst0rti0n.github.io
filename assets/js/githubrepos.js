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

    // Initialize Slick Carousel after the repos have been appended
    initializeSlickCarousel();
}

function initializeSlickCarousel() {
    const carouselStrip = document.querySelector('.carousel-strip');
    if (carouselStrip) {
        $(carouselStrip).slick({
            autoplay: true,          // Automatically cycle through items
            autoplaySpeed: 2000,     // Set autoplay speed (in milliseconds)
            infinite: true,          // Infinite looping
            slidesToShow: 3,         // Show 3 slides by default
            slidesToScroll: 1,       // Scroll one slide at a time
            arrows: true,            // Show navigation arrows
            dots: true,              // Show navigation dots
            draggable: true,         // Enable dragging with the mouse
            pauseOnHover: true,      // Pause autoplay on hover
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,  // Show 2 slides on medium screens
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,  // Show 1 slide on small screens
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }
}


// Initialize the fetch function on page load
document.addEventListener('DOMContentLoaded', fetchGitHubRepos);
