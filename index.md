---
layout: default
title: Home
---

<div class="home">
  <h2>Welcome to Dyst0rti0n's Cybersecurity & Programming Blog</h2>
  <p>Exploring advancements in cybersecurity, programming, and more.</p>

  <section class="intro">
    <h3>Introduction</h3>
    <p>Welcome to the ultimate destination for cybersecurity enthusiasts and programming geeks. Dive into the world of hacking, coding, and cutting-edge technology. Stay updated with the latest trends and explore in-depth articles, tutorials, and guides.</p>
  </section>

  <section class="featured-posts">
    <h3>Featured Posts</h3>
    <ul>
      {% assign featured_posts = site.posts | where: "category", "featured" | limit: 3 %}
      {% for post in featured_posts %}
        <li>
          <a href="{{ post.url }}">{{ post.title }}</a>
          <span>{{ post.date | date: "%B %d, %Y" }}</span>
        </li>
      {% endfor %}
    </ul>
  </section>

  <section class="latest-posts">
    <h3>Latest Posts</h3>
    <ul>
      {% for post in site.posts %}
        <li>
          <a href="{{ post.url }}">{{ post.title }}</a>
          <span>{{ post.date | date: "%B %d, %Y" }}</span>
        </li>
      {% endfor %}
    </ul>
  </section>
</div>
