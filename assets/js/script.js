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
  
        // Duplicate the repos for a seamless loop
        const repos = document.querySelectorAll('.repo');
        repos.forEach(repo => {
          const clone = repo.cloneNode(true);
          reposContainer.appendChild(clone);
        });
  
        // Start the automatic scrolling with increased speed
        let scrollAmount = 0;
        setInterval(() => {
          reposContainer.scrollBy({ left: 3, behavior: 'smooth' }); // Increased scroll speed
          scrollAmount += 3;
          if (scrollAmount >= reposContainer.scrollWidth / 2) {
            reposContainer.scrollLeft = 0; // Reset scroll to start seamlessly
            scrollAmount = 0;
          }
        }, 30); // Reduced interval for faster speed
      })
      .catch(error => console.error('Error fetching repos:', error));
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const terminal = document.getElementById('terminal');
    const handle = document.getElementById('drag-handle');
    let currentDirectory = '~/Dyst0rti0n\'s_blog/';
  
    function updatePrompt() {
      input.value = ''; // Clear the input value to prevent multiple prompts
      const prompt = document.createElement('span');
      prompt.textContent = `${currentDirectory} $ `;
      input.before(prompt);
    }
  
    input.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        handleCommand(input.value);
        input.value = '';
        updatePrompt();
      }
    });
  
    function handleCommand(command) {
      const outputLine = document.createElement('div');
      outputLine.innerHTML = `<span>${currentDirectory} $ ${command}</span>`;
      output.appendChild(outputLine);
  
      if (command === 'help') {
        outputHelp();
      } else if (command.startsWith('cd ')) {
        navigateTo(command.split(' ')[1]);
      } else if (command === 'date') {
        displayDate();
      } else {
        outputUnknownCommand();
      }
  
      output.scrollTop = output.scrollHeight;
      expandTerminal();
    }
  
    function displayDate() {
      const date = new Date();
      const outputLine = document.createElement('div');
      outputLine.textContent = `Current Date: ${date.toDateString()}`;
      output.appendChild(outputLine);
    }
  
    function outputHelp() {
      const helpText = `
        Available commands:
        - help: Show this help message
        - cd [page]: Navigate to a different page (home, about, contact)
        - date: Display the current date
      `;
      const helpLines = helpText.trim().split('\n');
      helpLines.forEach(line => {
        const outputLine = document.createElement('div');
        outputLine.textContent = line;
        output.appendChild(outputLine);
      });
    }
  
    function navigateTo(page) {
      if (['home', 'about', 'contact'].includes(page)) {
        currentDirectory = `~/Dyst0rti0n's_blog/${page}/`;
        updatePrompt();
        if (page === 'home') {
          window.location.href = '/';
        } else {
          window.location.href = `${page}`;
        }
      } else {
        outputUnknownCommand();
      }
    }
  
    function outputUnknownCommand() {
      const outputLine = document.createElement('div');
      outputLine.textContent = 'Unknown command. Type "help" for a list of available commands.';
      output.appendChild(outputLine);
    }
  
    function expandTerminal() {
      terminal.style.height = '30%';
      terminal.scrollTop = terminal.scrollHeight;
    }
  
    handle.addEventListener('mousedown', function(e) {
      e.preventDefault();
      document.addEventListener('mousemove', resizeTerminal);
      document.addEventListener('mouseup', stopResizing);
    });
  
    function resizeTerminal(e) {
      terminal.style.height = `${window.innerHeight - e.clientY}px`;
    }
  
    function stopResizing() {
      document.removeEventListener('mousemove', resizeTerminal);
      document.removeEventListener('mouseup', stopResizing);
    }
  
    // Initialize prompt
    updatePrompt();
  });
  