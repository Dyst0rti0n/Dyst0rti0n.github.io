---
layout: post
title: "Building a URL Shortener in Go"
date: 2024-07-16
image: /assets/images/blogs/url-go-shortener.jpg
categories: golang programming
---
Have you ever thought about creating your own URL shortener with Go? Today, we're going to do just that. So, grab a coffee, get comfortable, and let's dive into the world of URL shortening with a touch of scary web design.

### Why Build a URL Shortener?

Let’s be honest. At some point, you’ve used Bitly, TinyURL, or one of those other URL shorteners. But wouldn’t it be cooler to say, “Oh, I just use my own custom URL shortener”? Plus, it’s a great way to learn the ins and outs of Go, web servers, and databases.

![Setting up Go environment](/assets/images/blogs/url-shortener/go-environment.jpg)

### Step 1: Setting Up Your Go Environment

First things first, make sure you have Go installed. If not, head over to [golang.org](https://golang.org/) and follow the instructions. Once you’re set up, create a new project directory:

```sh
mkdir go-url-shortener
cd go-url-shortener
go mod init go-url-shortener
```

![Web Server](/assets/images/blogs/url-shortener/simple-web-server.jpg)

### Step 2: Creating a Simple Web Server

Let’s start by creating a basic web server. Open up your favourite text editor *I'm a vscode nerd* and create a file called `main.go`:

```go
package main

import (
    "fmt"
    "log"
    "net/http"
)

// helloHandler responds to HTTP requests with a greeting.
func helloHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, Go URL Shortener!")
}

func main() {
    // Handle root URL path
    http.HandleFunc("/", helloHandler)
    fmt.Println("Starting server at port 8080")
    // Start the web server on port 8080
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatal(err)
    }
}
```

Run your server with `go run main.go` and visit [http://localhost:8080](http://localhost:8080). You should see "Hello, Go URL Shortener!" on your screen. That's it! You've just created a basic web server in Go.

![Shortener Logic](/assets/images/blogs/url-shortener/shortener-logic.jpg)

### Step 3: Designing the URL Shortening Logic

Now, let's move on to the fun part: shortening URLs. We’ll need a way to map long URLs to short URLs and vice versa. For simplicity, we’ll use an in-memory map (you can replace this with a database later if you’re feeling adventurous).

```go
var urlMap = make(map[string]string)

// shortenerHandler handles URL shortening requests.
func shortenerHandler(w http.ResponseWriter, r *http.Request) {
    longURL := r.URL.Query().Get("url")
    if longURL == "" {
        http.Error(w, "URL is required", http.StatusBadRequest)
        return
    }

    // Generate a simple short URL identifier
    shortURL := fmt.Sprintf("%d", len(urlMap)+1)
    urlMap[shortURL] = longURL

    fmt.Fprintf(w, "Short URL: http://localhost:8080/%s\n", shortURL)
}

// redirectHandler handles URL redirection requests.
func redirectHandler(w http.ResponseWriter, r *http.Request) {
    shortURL := r.URL.Path[len("/"):]
    longURL, ok := urlMap[shortURL]
    if !ok {
        http.Error(w, "URL not found", http.StatusNotFound)
        return
    }

    http.Redirect(w, r, longURL, http.StatusFound)
}

func main() {
    // Handle short URL redirections
    http.HandleFunc("/", redirectHandler)
    // Handle URL shortening requests
    http.HandleFunc("/shorten", shortenerHandler)
    fmt.Println("Starting server at port 8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatal(err)
    }
}
```

Now, run your server again and visit [http://localhost:8080/shorten?url=https://golang.org/](http://localhost:8080/shorten?url=https://golang.org/). You should get a short URL in response. Try accessing the short URL, and it should redirect you to the long URL. Magic!

![Persistence](/assets/images/blogs/url-shortener/persistence.jpg)

### Step 4: Adding a Touch of Persistence

Okay, an in-memory map is great for quick demos, but what happens when your server restarts? Goodbye, URLs! Let’s add some persistence using a simple file-based storage.

Add this to your `main.go`:

```go
import (
    "encoding/json"
    "os"
)

// saveURLs saves the URL map to a JSON file.
func saveURLs() error {
    data, err := json.Marshal(urlMap)
    if err != nil {
        return err
    }
    return os.WriteFile("urls.json", data, 0644)
}

// loadURLs loads the URL map from a JSON file.
func loadURLs() error {
    data, err := os.ReadFile("urls.json")
    if err != nil {
        return err
    }
    return json.Unmarshal(data, &urlMap)
}

func shortenerHandler(w http.ResponseWriter, r *http.Request) {
    longURL := r.URL.Query().Get("url")
    if longURL == "" {
        http.Error(w, "URL is required", http.StatusBadRequest)
        return
    }

    shortURL := fmt.Sprintf("%d", len(urlMap)+1)
    urlMap[shortURL] = longURL

    // Save the URL map to file
    if err := saveURLs(); err != nil {
        http.Error(w, "Failed to save URL", http.StatusInternalServerError)
        return
    }

    fmt.Fprintf(w, "Short URL: http://localhost:8080/%s\n", shortURL)
}

func main() {
    // Load the URL map from file at startup
    if err := loadURLs(); err != nil && !os.IsNotExist(err) {
        log.Fatalf("Failed to load URLs: %v", err)
    }

    http.HandleFunc("/", redirectHandler)
    http.HandleFunc("/shorten", shortenerHandler)
    fmt.Println("Starting server at port 8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatal(err)
    }
}
```

Now your URLs will be saved to a file and reloaded when the server restarts. Try it out by shortening a URL, stopping the server, and starting it again. Your short URL should still work!

![html site](/assets/images/blogs/url-shortener/html-site.jpg)

### Step 5: Making It Slightly Pretty

Finally, let’s add a simple HTML form to make our URL shortener user-friendly. Create an `index.html` file:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Go URL Shortener</title>
</head>
<body>
    <h1>Go URL Shortener</h1>
    <form action="/shorten" method="GET">
        <label for="url">Long URL:</label>
        <input type="text" id="url" name="url" required>
        <button type="submit">Shorten</button>
    </form>
</body>
</html>
```

Update your `main.go` to serve the HTML file:

```go
import ( 
    "strings"
)

// redirectHandler handles URL redirection requests.
func redirectHandler(w http.ResponseWriter, r *http.Request) {
    shortURL := strings.TrimPrefix(r.URL.Path, "/")
    longURL, ok := urlMap[shortURL]
    if !ok || shortURL == "" {
        http.ServeFile(w, r, "index.html")
        return
    }

    http.Redirect(w, r, longURL, http.StatusFound)
}

func main() {
    // Load the URL map from file at startup
    if err := loadURLs(); err != nil && !os.IsNotExist(err) {
        log.Fatalf("Failed to load URLs: %v", err)
    }

    // Handle URL shortening requests at /shorten
    http.HandleFunc("/shorten", shortenerHandler)
    // Handle short URL redirections and root path
    http.HandleFunc("/", redirectHandler)

    fmt.Println("Starting server at port 8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatal(err)
    }
}
```

Now you can visit [http://localhost:8080/](http://localhost:8080/) and use the form to shorten URLs. Wahayy, you’ve just built your very own URL shortener in Go. Which means you shall now use Go for the rest of your life because of it's simplicity.


