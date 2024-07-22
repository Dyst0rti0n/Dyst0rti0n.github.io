---
layout: post
title: "Module 1: The Initiation"
featured: true
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
  <p>What's your favorite code editor?</p>
  <form>
    <input type="radio" id="vscode" name="editor" value="VSCode">
    <label for="vscode">VSCode</label><br>
    <input type="radio" id="sublime" name="editor" value="Sublime Text">
    <label for="sublime">Sublime Text</label><br>
    <input type="radio" id="vim" name="editor" value="Vim">
    <label for="vim">Vim</label><br>
    <input type="radio" id="other" name="editor" value="Other">
    <label for="other">Other</label><br><br>
    <input type="button" value="Vote" onclick="submitPoll()">
  </form>
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
      alert('Thank you for voting for ' + selected + '!');
    } else {
      alert('Please select an option before voting.');
    }
  }

  // On page load, check if the user has already voted
  document.addEventListener('DOMContentLoaded', (event) => {
    var favoriteEditor = localStorage.getItem('favoriteEditor');
    if (favoriteEditor) {
      alert('You have already voted for ' + favoriteEditor);
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

**Interactive Coding:**

Use [Repl.it](https://repl.it) or similar services to create live coding exercises. Embed these in your lessons.

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