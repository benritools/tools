---
layout: default
title: トップページ
---

# 技術ブログ

GitHub Pages・ツール開発・Web制作のメモを書いています。

---

## 最新記事

<div class="blog-list">
  {% for post in site.posts %}
    <article class="blog-item">
      <p>📅 {{ post.date | date: "%Y/%m/%d" }}</p>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    </article>
    <hr>
  {% endfor %}
</div>