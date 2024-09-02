---
layout: post
title: "Building Your First API with Go"
image: /assets/images/blogs/api-in-go/first-api.jpg
categories: programming golang
---

Welcome back to the wonderful world of Go, where writing code is almost as satisfying as those weird videos you see on the internet of things being squished. Whether you're a complete beginner or have dabbled in the beauty of go, building your first API with Go is going to be a fun journey. By the end of this guide, you’ll have your very own API up and running—perfect for impressing your latest github followers because they mean the world to you. Let's go.

### Why Go for API Development?

Before we begin, let’s talk about why Go is your new best mate when it comes to building APIs:

- **Simplicity:** Go is like that friend who explains complicated things in a way that just makes sense. The syntax is clean, and it won’t have you pulling your hair out (unless you’re into that sort of thing).
- **Speed:** Go is fast — think cheetah on roller skates fast. Since it’s a compiled language, it’s ready to go the moment you hit run.
- **Concurrency:** Go’s got goroutines, which are basically little worker bees that let you handle multiple requests at once without lifting a finger.

### Setting Up Your Go Environment

Alright, first things first. We need to get Go installed and ready to rumble.

1. **Install Go:**
   - Pop over to the [official Go website](https://golang.org/dl/) and grab the latest version for your operating system.
   - Follow the installation instructions—don’t worry, it’s easier than assembling IKEA furniture.
   - To make sure everything’s set up correctly, open your terminal and type:
     ```sh
     go version
     ```
   - You should see something like `go version go1.23.0`, which means you’re good to go (pun totally intended).

2. **Set Up Your Workspace:**
   - Let’s create a little home for your project:
     ```sh
     mkdir my-first-api
     cd my-first-api
     ```
   - Now, initialise a new Go module in your project directory:
     ```sh
     go mod init my-first-api
     ```
   - Maith thú! You’re all set to start coding.

### Writing Your First API Endpoint

Now that we’ve got everything set up, let’s jump into the fun part—writing some sweet goodness!

1. **Create a Simple HTTP Server:**

   We’re going to start with a basic HTTP server. Trust me, it’s easier than making a cup of tea unless you've got parkinsons.

   Create a new file called `main.go` in your project directory and drop this code in:

   ```go
   package main

   import (
       "fmt"
       "net/http"
   )

   func main() {
       http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
           fmt.Fprintf(w, "Welcome to my first API!")
       })

       http.ListenAndServe(":8080", nil)
   }
   ```

   What’s happening here?
   - We’re importing a couple of handy packages: `fmt` for formatting strings and `net/http` for handling HTTP requests.
   - `http.HandleFunc` sets up a route for the root URL (`/`). When someone visits this URL, the server responds with "Welcome to my first API!".
   - `http.ListenAndServe(":8080", nil)` starts the server on port 8080. Simple as that!

2. **Run Your Server:**
   - Fire up your terminal and run this command:
     ```sh
     go run main.go
     ```
   - Now, open your web browser and head over to `http://localhost:8080`. If everything’s gone according to plan, you’ll see the message "Welcome to my first API!" staring back at you. You’re officially an API creator! See not so bad unlike trying to exploit one; we all can't be Corey Ball.

### Creating a Simple GET Endpoint

Let’s make things a bit more interesting. How about a GET endpoint that returns some JSON data?

1. **Add a New Endpoint:**
   - Update your `main.go` file to include a `/users` endpoint:
     ```go
     package main

     import (
         "encoding/json"
         "fmt"
         "net/http"
     )

     type User struct {
         ID   int    `json:"id"`
         Name string `json:"name"`
     }

     func main() {
         http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
             fmt.Fprintf(w, "Welcome to my first API!")
         })

         http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
             users := []User{
                 {ID: 1, Name: "John Doe"},
                 {ID: 2, Name: "Jane Doe"},
             }
             w.Header().Set("Content-Type", "application/json")
             json.NewEncoder(w).Encode(users)
         })

         http.ListenAndServe(":8080", nil)
     }
     ```

   What’s new?
   - We’ve defined a `User` struct, which is just a fancy way of saying we’ve created a blueprint for our user objects.
   - The `/users` endpoint returns a list of users in JSON format.

2. **Test Your New Endpoint:**
   - Run your server again:
     ```sh
     go run main.go
     ```
   - Point your web browser to `http://localhost:8080/users`, and you should see something like this:
     ```json
     [
       {
         "id": 1,
         "name": "John Doe"
       },
       {
         "id": 2,
         "name": "Jane Doe"
       }
     ]
     ```

### Handling POST Requests

Now let’s get really fancy and add the ability to create new users with a POST request.

1. **Update Your Code:**
   - Let’s tweak your `main.go` file a bit more:
     ```go
     package main

     import (
         "encoding/json"
         "fmt"
         "net/http"
     )

     type User struct {
         ID   int    `json:"id"`
         Name string `json:"name"`
     }

     var users []User

     func main() {
         users = []User{
             {ID: 1, Name: "John Doe"},
             {ID: 2, Name: "Jane Doe"},
         }

         http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
             fmt.Fprintf(w, "Welcome to my first API!")
         })

        // The commented explaination starts here
         http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
             if r.Method == http.MethodGet {
                 w.Header().Set("Content-Type", "application/json")
                 json.NewEncoder(w).Encode(users)
             } else if r.Method == http.MethodPost {
                 var newUser User
                 json.NewDecoder(r.Body).Decode(&newUser)
                 newUser.ID = len(users) + 1
                 users = append(users, newUser)
                 w.Header().Set("Content-Type", "application/json")
                 json.NewEncoder(w).Encode(newUser)
             }
         })
         // Ends here. This looks confusing and complex so let me break it down.
         /*
            This code handles requests to the "/users" endpoint.

            // First, we check if the request method is GET:
            // If it's a GET request, we want to send back the list of users.
            // We set the response content type to JSON, so the client knows what to expect.
            // Then, we take our list of users, convert it into JSON format, and send it back as the response.

            // If the request method is POST:
            // We assume the client is trying to add a new user.
            // We create a variable to temporarily hold the data for this new user.
            // The request body, which is in JSON format, is decoded (converted) into this variable.
            // Next, we assign a unique ID to the new user. We do this by taking the current length of our list of users and adding 1.
            // We then add (append) this new user to our list of users.
            // As with the GET request, we set the response content type to JSON.
            // Finally, we take the new user object, convert it to JSON, and send it back as the response to confirm that the user was added successfully.
        */


         http.ListenAndServe(":8080", nil)
     }
     ```

   Here’s what’s happening:
   - We’ve got a global `users` slice to store our users.
   - The `/users` endpoint now checks if the request method is `GET` or `POST`. For `POST` requests, it grabs the data from the request, creates a new user, and adds them to the list.

2. **Test the POST Request:**
   - Use a tool like `curl` or Postman to send a POST request:
     ```cmd
     curl -X POST -d "{\"name\": \"Tom\"}" -H "Content-Type: application/json" http://localhost:8080/users
     ```
   - You should get a response like this:
     ```json
     {
       "id": 3,
       "name": "Tom"
     }
     ```

Unfortunately this is where the road ends for now. But it doesn't have to; I will be continuing to work on this and turning it into a full scale project at [this link](https://github.com/Dyst0rti0n/)

### Conclusion

Look at you, all grown up and building APIs like a pro! If this is your first time using go, you've just created a simple yet powerful API that can handle both GET and POST requests. You’ve learned how to set up a basic HTTP server, send and receive JSON data, and even handle user input. Not too shabby for a day’s work!

Remember, this is just the beginning. Go is a powerful tool that can handle much more complex tasks, and the more you play around with it, the more you’ll discover its potential.
