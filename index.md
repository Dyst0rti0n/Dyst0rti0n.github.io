---
layout: default
title: Home
---

<div class="home">
  <h2>Welcome to Dyst0rti0n's Cybersecurity & Programming Blog</h2>
  <p>Exploring advancements in cybersecurity, programming, and more.</p>

  <h3>Latest Posts</h3>
  <ul>
    {% for post in site.posts %}
      <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
        <span>{{ post.date | date: "%B %d, %Y" }}</span>
      </li>
    {% endfor %}
  </ul>
</div>
