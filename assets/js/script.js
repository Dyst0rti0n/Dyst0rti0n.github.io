document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('input');
  const output = document.getElementById('output');
  const terminal = document.getElementById('terminal');
  const handle = document.getElementById('drag-handle');
  let currentDirectory = 'Dyst0rti0n\'s_blog';
  let initialPrompt = true;
  let directories = {
    'Dyst0rti0n\'s_blog': ['home', 'about', 'contact', 'posts'],
    'Dyst0rti0n\'s_blog/home': [],
    'Dyst0rti0n\'s_blog/about': [],
    'Dyst0rti0n\'s_blog/contact': [],
    'Dyst0rti0n\'s_blog/posts': ['post1.md', 'post2.md']
  };

  function updatePrompt() {
    input.value = ''; // Clear the input value to prevent multiple prompts
    const prompt = document.createElement('span');
    prompt.textContent = `${currentDirectory} $ `;
    input.before(prompt);
  }

  function handleCommand(command) {
    const outputLine = document.createElement('div');
    outputLine.innerHTML = `<span>${currentDirectory} $ ${command}</span>`;
    output.appendChild(outputLine);

    const [cmd, ...args] = command.split(' ');

    switch(cmd) {
      case 'help':
        outputHelp();
        break;
      case 'cd':
        changeDirectory(args[0]);
        break;
      case 'date':
        displayDate();
        break;
      case 'ls':
        listDirectory();
        break;
      case 'pwd':
        printWorkingDirectory();
        break;
      case 'echo':
        echo(args);
        break;
      case 'clear':
        clearScreen();
        break;
      default:
        outputUnknownCommand();
        break;
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
      - cd [page]: Navigate to a different page (home, about, contact, posts)
      - cd ..: Go back one directory
      - ls: List files in the current directory
      - pwd: Print the current directory
      - echo [text]: Print text to the terminal
      - clear: Clear the terminal screen
      - date: Display the current date
    `;
    const helpLines = helpText.trim().split('\n');
    helpLines.forEach(line => {
      const outputLine = document.createElement('div');
      outputLine.textContent = line.trim();
      output.appendChild(outputLine);
    });
  }

  function changeDirectory(dir) {
    if (dir === '..') {
      if (currentDirectory !== 'Dyst0rti0n\'s_blog') {
        const dirParts = currentDirectory.split('/');
        dirParts.pop();
        currentDirectory = dirParts.join('/');
      }
    } else if (directories[currentDirectory + '/' + dir]) {
      currentDirectory = currentDirectory + '/' + dir;
    } else {
      outputUnknownCommand();
      return;
    }
    updatePrompt();
  }

  function listDirectory() {
    const files = directories[currentDirectory] || [];
    const outputLine = document.createElement('div');
    outputLine.textContent = files.join('    ');
    output.appendChild(outputLine);
  }

  function printWorkingDirectory() {
    const outputLine = document.createElement('div');
    outputLine.textContent = currentDirectory;
    output.appendChild(outputLine);
  }

  function echo(args) {
    const outputLine = document.createElement('div');
    outputLine.textContent = args.join(' ');
    output.appendChild(outputLine);
  }

  function clearScreen() {
    output.innerHTML = '';
    const initialLine = document.createElement('div');
    initialLine.textContent = `${currentDirectory} $ `;
    output.appendChild(initialLine);
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
  if (initialPrompt) {
    const initialLine = document.createElement('div');
    initialLine.textContent = `${currentDirectory} $ `;
    output.appendChild(initialLine);
    initialPrompt = false;
  }

  input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      handleCommand(input.value);
      input.value = '';
    }
  });
});
