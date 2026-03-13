---
layout: default
title: ブログ
---

# 技術ブログ

GitHub Pages・ツール開発・Web制作のメモを書いています。

---

## 最新記事

{% for post in site.posts %}
### [{{ post.title }}]({{ post.url }})

📅 {{ post.date | date: "%Y-%m-%d" }}

{{ post.excerpt }}

---

{% endfor %}
