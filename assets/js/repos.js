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
  
        // Duplicate the repos for a seamless loop
        const repos = document.querySelectorAll('.repo');
        repos.forEach(repo => {
          const clone = repo.cloneNode(true);
          reposContainer.appendChild(clone);
        });
  
        // Start the automatic scrolling with increased speed
        let scrollAmount = 0;
        setInterval(() => {
          reposContainer.scrollBy({ left: 2, behavior: 'smooth' }); // Adjust scroll speed as needed
          scrollAmount += 2;
          if (scrollAmount >= reposContainer.scrollWidth / 2) {
            reposContainer.scrollLeft = 0; // Reset scroll to start seamlessly
            scrollAmount = 0;
          }
        }, 20); // Reduced interval for faster speed
      })
      .catch(error => console.error('Error fetching repos:', error));
  });
  