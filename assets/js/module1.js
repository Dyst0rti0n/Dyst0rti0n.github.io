document.addEventListener('DOMContentLoaded', function () {
    // Poll functionality
    function submitPoll() {
        var radios = document.getElementsByName('editor');
        var selected = '';
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                selected = radios[i].value;
                break;
            }
        }
        if (selected) {
            localStorage.setItem('favoriteEditor', selected);
            document.getElementById('poll-form').style.display = 'none';
            document.getElementById('poll-results').style.display = 'block';
            updatePollResults(selected);
        } else {
            alert('Please select an option before voting.');
        }
    }

    function updatePollResults(selected) {
        var resultElement = document.getElementById('result-' + selected.toLowerCase());
        var currentVotes = parseInt(resultElement.innerText);
        resultElement.innerText = currentVotes + 1;
    }

    var favoriteEditor = localStorage.getItem('favoriteEditor');
    if (favoriteEditor) {
        document.getElementById('poll-form').style.display = 'none';
        document.getElementById('poll-results').style.display = 'block';
        updatePollResults(favoriteEditor);
    }

    // Code editor functionality
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/golang");

    const defaultCode = `package main

import "fmt"

func main() {
    fmt.Println("Hello, Hackers!")
}`;

    editor.setValue(defaultCode);

    document.getElementById('run-code').addEventListener('click', function() {
        var userCode = editor.getValue();
        showPopup('Running code...');
        runCode(userCode);
    });

    document.getElementById('reset-code').addEventListener('click', function() {
        editor.setValue(defaultCode);
        showPopup('Code reset to default.');
    });

    document.getElementById('copy-code').addEventListener('click', function() {
        navigator.clipboard.writeText(editor.getValue()).then(function() {
            showPopup('Code copied to clipboard');
        }, function() {
            showPopup('Failed to copy code');
        });
    });

    function runCode(code) {
        const outputElement = document.getElementById('output');
        outputElement.textContent = 'Running...';

        fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                language: 'go',
                version: 'latest',
                files: [{ name: 'main.go', content: code }]
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.run && data.run.output) {
                outputElement.textContent = data.run.output;
                showPopup('Code executed successfully.');
            } else {
                outputElement.textContent = 'Error running code.';
                showPopup('Error running code.');
            }
        })
        .catch(error => {
            outputElement.textContent = 'Error: ' + error;
            showPopup('Error: ' + error);
        });
    }

    function showPopup(message) {
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.innerText = message;
        document.body.appendChild(popup);
        setTimeout(() => {
            popup.remove();
        }, 3000);
    }

    // Expose the submitPoll function to be used in the inline onclick handler
    window.submitPoll = submitPoll;
});