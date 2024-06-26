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
            <p>${repo.description || 'No description'}</p>
          `;
          repoDiv.addEventListener('click', () => {
            window.open(repo.html_url, '_blank');
          });
          reposContainer.appendChild(repoDiv);
        });
  
        // Initialize Slick Carousel
        $('.carousel-container').slick({
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          arrows: true,
          dots: true
        });
      })
      .catch(error => console.error('Error fetching repos:', error));
  });
  