---
layout: post
title: "Mastering Containerisation with Docker"
image: /assets/images/blogs/master-docker/master-docker.jpg
categories: cybersecurity docker
---

Welcome to the world of Docker, where shipping software is as smooth as butter on hot toast. If you’re a developer, IT professional, or just someone who likes to tinker with technology, Docker is your new best friend. This guide will take you from Docker novice to a containerisation connoisseur in no time.

### What is Docker and Why Should You Care?

Imagine you’re packing for a holiday. You want everything to fit neatly in your suitcase without any hassle or inconvinience. Docker does the same thing for software: it packages your application, along with all its dependencies, into a neat little container that can run anywhere. Whether you’re deploying on your laptop, a cloud server, or your grandmother’s old desktop, Docker makes sure it works perfectly every time.

### Getting Started with Docker

![Installing Docker](/assets/images/blogs/master-docker/install-docker.jpg)

Before we jump into the deep end, let’s get Docker installed.

1. **Install Docker**:
- **Windows**: Download Docker Desktop from [here](https://www.docker.com/products/docker-desktop) and follow the installation instructions.
- **Mac**: Download Docker Desktop for Mac from [here](https://www.docker.com/products/docker-desktop) and follow the installation instructions.
- **Linux**: Install Docker using your package manager. For example, on Ubuntu:
```sh
  sudo apt-get update
  sudo apt-get install docker-ce docker-ce-cli containerd.io
```

2. **Verify Installation**:
Open a terminal and run:
```sh
  docker --version
```
You should see the Docker version number, confirming that Docker is installed.

### Docker Basics: Your First Container

Let’s start with something simple. How about running a basic web server in a Docker container?

![Docker Web Server Container](/assets/images/blogs/master-docker/web-server.jpg)

1. **Run a Container**:
Open a terminal and run:
```sh
  docker run -d -p 80:80 --name my-nginx nginx
```
This command does a few things:
  `-d` runs the container in detached mode (in the background).
  `-p 80:80` maps port 80 on your host to port 80 in the container.
  `--name my-nginx` names the container `my-nginx`.
  `nginx` specifies the Docker image to use.

2. **Verify the Web Server**:
Open your web browser and go to `http://localhost`.
  You should see the default Nginx welcome page.

### Building Your Own Docker Image

![Building Docker Images](/assets/images/blogs//master-docker/docker-images.jpg)

Running pre-built images is cool, but building your own image is where the real fun begins. Let’s create a simple Python web app and package it into a Docker container.

1. **Create Your Application**:
Create a new directory for your project:
```sh
  mkdir my-python-app
  cd my-python-app
```
Inside this directory, create a file named `app.py` with the following content:
```python
  from flask import Flask
  app = Flask(__name__)

  @app.route('/')
    def hello_world():
      return 'Hello, Docker!'

  if __name__ == '__main__':
    app.run(host='0.0.0.0')
```

![Creating a Dockerfile](/assets/images/blogs/master-docker/dockerfile.jpg)

2. **Create a Dockerfile**:
In the same directory, create a file named `Dockerfile` with the following content:
```Dockerfile
  # Use an official Python runtime as a parent image
  FROM python:3.8-slim

  # Set the working directory in the container
  WORKDIR /app

  # Copy the current directory contents into the container at /app
  ADD . /app

  # Install any needed packages specified in requirements.txt
  RUN pip install flask

  # Make port 80 available to the world outside this container
  EXPOSE 80

  # Define environment variable
  ENV NAME World

  # Run app.py when the container launches
  CMD ["python", "app.py"]
```

3. **Build Your Docker Image**:
In your terminal, navigate to the directory containing your `Dockerfile` and run:
```sh
  docker build -t my-python-app .
```
Docker will package your application into an image named `my-python-app`.

4. **Run Your Docker Container**:
Now that you have an image, run it with:
```sh
  docker run -d -p 80:80 my-python-app
```
Open your web browser and go to `http://localhost`.
  You should see `Hello, Docker!`.

### Docker Compose: Orchestrating Containers

What if you have a more complex application with multiple services? Docker Compose to the rescue! Docker Compose allows you to define and run multi-container Docker applications.

1. **Create a `docker-compose.yml` File**:
In your project directory, create a file named `docker-compose.yml` with the following content:
```yaml
  version: '3'
    services:
      web:
        build: .
        ports:
          - "80:80"
      redis:
        image: "redis:alpine"
```

2. **Run Docker Compose**:
In your terminal, navigate to the directory containing your `docker-compose.yml` file and run:
```sh
  docker-compose up
```
This will start both your Python web app and a Redis container.

### Cleaning Up

![Removing Docker Container](/assets/images/blogs/master-docker/remove-container.jpg)

Don’t forget to clean up your Docker environment to free up resources.

1. **Stop and Remove Containers**:
List all running containers:
```sh
  docker ps
```
Stop a running container:
```sh
  docker stop [container_id]
```
Remove a container:
```sh
  docker rm [container_id]
```

2. **Remove Images**:
List all Docker images:
```sh
  docker images
```
Remove an image:
```sh
  docker rmi [image_id]
```

### Conclusion

Congratulations! You’ve taken your first steps into the world of Docker. By mastering containerisation, you’re well on your way to making your software development process more efficient, scalable, and fun. Docker isn’t just a tool; it’s a game-changer. So keep experimenting, keep learning, and happy containerising!

A checklist-style infographic on how to stop and remove Docker containers and images.