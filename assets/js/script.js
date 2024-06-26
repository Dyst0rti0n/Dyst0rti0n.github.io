document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const welcomeMessage = 'Welcome to the hacker-themed blog. Enjoy your stay!';
    const commands = ['cd', 'ls', 'date', 'help'];
    const pages = ['home', 'about', 'contact'];
    let index = 0;
  
    function typeMessage() {
      if (index < welcomeMessage.length) {
        output.textContent += welcomeMessage.charAt(index);
        index++;
        setTimeout(typeMessage, 50);
      }
    }
  
    typeMessage();
  
    input.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        handleCommand(input.value);
        input.value = '';
      } else if (event.key === 'Tab') {
        event.preventDefault();
        autoCompleteCommand(input.value);
      }
    });
  
    function handleCommand(command) {
      const outputLine = document.createElement('div');
      outputLine.textContent = `> ${command}`;
      output.appendChild(outputLine);
  
      if (command === 'help') {
        outputHelp();
      } else if (command.startsWith('cd ')) {
        navigateTo(command.split(' ')[1]);
      } else if (command === 'ls') {
        listPages();
      } else if (command === 'date') {
        displayDate();
      } else {
        outputUnknownCommand();
      }
  
      output.scrollTop = output.scrollHeight;
    }
  
    function autoCompleteCommand(inputValue) {
      const matchingCommands = commands.filter(cmd => cmd.startsWith(inputValue));
      if (matchingCommands.length === 1) {
        input.value = matchingCommands[0] + ' ';
      }
    }
  
    function displayDate() {
      const date = new Date();
      const outputLine = document.createElement('div');
      outputLine.textContent = `Current Date: ${date.toDateString()}`;
      output.appendChild(outputLine);
    }
  
    function listPages() {
      const outputLine = document.createElement('div');
      outputLine.textContent = pages.join(' ');
      output.appendChild(outputLine);
    }
  
    function outputHelp() {
      const helpText = `
        Available commands:
        - help: Show this help message
        - cd [page]: Navigate to a different page (home, about, contact)
        - ls: List available pages
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
      if (pages.includes(page)) {
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
  });
  