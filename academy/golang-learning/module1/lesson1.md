---
layout: post
title: "Module 1: The Initiation"
---

## Mission 1: Welcome to the Cyber Academy

### Introduction

Welcome, recruit! You’ve been selected to join the Cyber Academy, the frontline in the battle against cyber threats. Under the guidance of Agent Go and with the help of Byte the Cyber Dog, you will master the art of Go programming and become a formidable cyber detective.

### Mission 1.1: Setting Up Your Cyber Lab

**Objective:** Install Go, set up a code editor, and write your first Go program.

**Step 1: Install Go**

Before we dive into action, let's gear up! Download and install Go from the [official website](https://golang.org/dl/). Think of this as equipping yourself with the ultimate toolkit for your cyber missions.

**Step 2: Choose Your Weapon (Code Editor)**

What's your favorite code editor? Vote in the poll and see what other cyber detectives are using!

<div id="poll">
  <h3>What's your favorite code editor?</h3>
  <form>
    <label class="poll-option">
      <input type="radio" id="vscode" name="editor" value="VSCode">
      <span>VSCode</span>
    </label>
    <label class="poll-option">
      <input type="radio" id="sublime" name="editor" value="Sublime Text">
      <span>Sublime Text</span>
    </label>
    <label class="poll-option">
      <input type="radio" id="vim" name="editor" value="Vim">
      <span>Vim</span>
    </label>
    <label class="poll-option">
      <input type="radio" id="other" name="editor" value="Other">
      <span>Other</span>
    </label>
    <br>
    <input type="button" value="Vote" onclick="submitPoll()">
  </form>
  <div id="poll-results" style="display:none;">
    <h4>Poll Results</h4>
    <ul>
      <li>VSCode: <span id="result-vscode">0</span> votes</li>
      <li>Sublime Text: <span id="result-sublime">0</span> votes</li>
      <li>Vim: <span id="result-vim">0</span> votes</li>
      <li>Other: <span id="result-other">0</span> votes</li>
    </ul>
  </div>
</div>

<script>
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
      incrementVote(selected);
      alert('Thank you for voting for ' + selected + '!');
    } else {
      alert('Please select an option before voting.');
    }
  }

  function incrementVote(editor) {
    var votes = JSON.parse(localStorage.getItem('pollResults')) || {VSCode: 0, "Sublime Text": 0, Vim: 0, Other: 0};
    votes[editor]++;
    localStorage.setItem('pollResults', JSON.stringify(votes));
    displayResults();
  }

  function displayResults() {
    var votes = JSON.parse(localStorage.getItem('pollResults')) || {VSCode: 0, "Sublime Text": 0, Vim: 0, Other: 0};
    document.getElementById('result-vscode').innerText = votes.VSCode;
    document.getElementById('result-sublime').innerText = votes["Sublime Text"];
    document.getElementById('result-vim').innerText = votes.Vim;
    document.getElementById('result-other').innerText = votes.Other;
    document.getElementById('poll-results').style.display = 'block';
  }

  document.addEventListener('DOMContentLoaded', (event) => {
    var favoriteEditor = localStorage.getItem('favoriteEditor');
    if (favoriteEditor) {
      alert('You have already voted for ' + favoriteEditor);
      displayResults();
    }
  });
</script>


**Step 3: Write and Run Your First Go Program**

Time to test your new gear! Create a new file named `main.go` and type the following code. Watch the magic happen as you run your first Go program.

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Cyber World!")
}
```

### Exercise:

*Change the message to something more exciting, like 'Hello, future Go hacker' and run it again.*

---------------------------------------------------------------------

### Quiz: Getting to Know Go

**Question 1:** What command do you use to check the installed version of Go?
- [ ] go --version
- [ ] go version
- [ ] go -v

**Question 2:** Which package is used to format input and output in Go?
- [ ] fmt
- [ ] io
- [ ] os

<script>
  document.querySelectorAll('input[type="radio"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      var correctAnswers = {
        'go version': 'Question 1',
        'fmt': 'Question 2'
      };
      var questionId = this.name.split('-')[1];
      var isCorrect = correctAnswers[this.value];
      if (isCorrect) {
        alert('Correct!');
        localStorage.setItem('quizAnswer' + questionId, this.value);
      } else {
        alert('Incorrect, try again.');
      }
    });
  });

  // On page load, check if the user has already answered the quiz
  document.addEventListener('DOMContentLoaded', (event) => {
    var correctAnswers = {
      'go version': 'Question 1',
      'fmt': 'Question 2'
    };
    for (var questionId in correctAnswers) {
      var answer = localStorage.getItem('quizAnswer' + questionId);
      if (answer) {
        document.querySelector('input[name="quiz-' + questionId + '"][value="' + answer + '"]').checked = true;
      }
    }
  });
</script>

**Interactive Coding:**

### Achievements and Badges

Earn badges for completing modules and share them in your GitHub profile!

![Beginner Badge](../../../assets/images/golang/beginner_badge.jpg)

<button id="complete-module1">Complete Module 1</button>

<script>
    document.getElementById('complete-module1').addEventListener('click', function() {
        localStorage.setItem('module1Completed', true);
        alert('Module 1 completed! You can now access Module 2.');
    });
</script>