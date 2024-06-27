document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const terminal = document.getElementById('terminal');
    const handle = document.getElementById('drag-handle');
    let currentDirectory = '~/Dyst0rti0n\'s_blog/';
    let firstUse = true; // Track if this is the first use
  
    function updatePrompt() {
      input.value = ''; // Clear the input value to prevent multiple prompts
      const prompt = document.createElement('span');
      prompt.textContent = `${currentDirectory} $ `;
      input.before(prompt);
    }
  
    function showHelpMessage() {
      const helpMessage = document.createElement('div');
      helpMessage.textContent = "Type 'help' for commands";
      output.appendChild(helpMessage);
    }
  
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
        outputLine.textContent = line.trim();
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
  
    if (firstUse) {
      showHelpMessage();
      firstUse = false;
    }
  
    input.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        handleCommand(input.value);
        input.value = '';
        updatePrompt();
      }
    });
  });
  