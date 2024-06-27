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
  
        // Start the automatic scrolling with increased speed
        setInterval(() => {
          reposContainer.scrollBy({ left: 3, behavior: 'smooth' }); // Increased scroll speed
        }, 30); // Reduced interval for faster speed
      })
      .catch(error => console.error('Error fetching repos:', error));
  });
  