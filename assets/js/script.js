document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
  
    input.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        handleCommand(input.value);
        input.value = '';
      }
    });
  
    function handleCommand(command) {
      const outputLine = document.createElement('div');
      outputLine.textContent = `> ${command}`;
      output.appendChild(outputLine);
  
      if (command === 'help') {
        outputHelp();
      } else if (command.startsWith('navigate')) {
        navigateTo(command.split(' ')[1]);
      } else {
        outputUnknownCommand();
      }
  
      output.scrollTop = output.scrollHeight;
    }
  
    function outputHelp() {
      const helpText = `
        Available commands:
        - help: Show this help message
        - navigate [page]: Navigate to a different page (home, about, contact)
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
        window.location.href = `${page}`;
      } else {
        outputUnknownCommand();
      }
    }
  
    function outputUnknownCommand() {
      const outputLine = document.createElement('div');
      outputLine.textContent = 'Unknown command. Type "help" for a list of available commands.';
      output.appendChild(outputLine);
    }
  
    console.log('Welcome to the hacker-themed blog. Enjoy your stay!');
  });
  