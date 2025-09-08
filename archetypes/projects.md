---
# ========== REQUIRED ==========
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
summary: "One-line pitch of the project."

# ========== TAGS / TAXONOMY ==========
# Shown as chips and used for filtering on /projects/
project_tags: []
# Optional category for your own grouping (not used by Hugo taxonomies unless you add one)
project_type: ""     # e.g., hardware | software | policy | research
status: ""           # e.g., active | paused | complete

# ========== IMAGES ==========
# Tile image in /projects/ grid. Prefer page-bundle relative path (file next to index.md).
cover: ""            # e.g., cover.jpg  (or an absolute static path: /images/projects/xyz.jpg)
# Fallbacks the list template understands (optional):
featuredImage: ""    # absolute/static path; used if cover is empty
image: ""            # absolute/static path; used if both above are empty
# Optional override for first-bundle match:
cardImage: ""        # e.g., hero_01.jpg (if you don't want "cover*" auto-match)

# ========== QUICK LINK BUTTONS (rendered under the tags on the single page) ==========
repo: ""             # e.g., https://github.com/username/repo
website: ""          # e.g., https://project-site.example
demo: ""             # e.g., https://demo.example
pdf: ""              # e.g., /files/my_paper.pdf
paper: ""            # e.g., https://doi.org/...

# Flexible list for any other links you want
links:
  - label: ""        # e.g., Docs | Poster | Slides | Video
    url: ""          # e.g., https://example.com/docs  or  /files/poster.pdf
    icon: ""         # Font Awesome class (optional), e.g., "fas fa-book", "fab fa-github"

# ========== OPTIONAL UI TOGGLES ==========
# We disabled the hero image globally in your template, but you can re-enable per page by checking this in the template.
# show_hero: false

# ========== SEO (optional) ==========
# description: "Custom meta description for SEO"
# canonicalURL: "https://example.com/projects/my-project"
# images: ["/images/opengraph/my-project-og.jpg"]  # OG/Twitter cards
---

**What it is.** A couple of sentences describing what this project does and why it exists.

**What I did.** Bullet the highlights or responsibilities:
- item 1
- item 2
- item 3

## Media & Notes

Embed bundle images with Obsidian syntax (the template converts these to `<img>`):
![[example_photo.jpg]]
![[diagram.png|Annotated block diagram]]

Add normal Markdown images too if you like:
![Scope capture](scope_capture.png)

> [!NOTE] Tip  
> You can still use callout blocks as usual if your site parses them.

### Tech Stack
- Hardware: …
- Firmware/Software: …
- Tools: …
