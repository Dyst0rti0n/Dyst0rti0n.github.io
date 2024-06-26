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
  
        // Start the automatic scrolling
        setInterval(() => {
          reposContainer.scrollBy({ left: 1, behavior: 'smooth' });
        }, 50);
      })
      .catch(error => console.error('Error fetching repos:', error));
  });
  