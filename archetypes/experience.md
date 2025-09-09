---
title: "{{ replace .Name "-" " " | title }}"

# ---- Dates ----
# Keep `date` as the start for sorting. Use `start`/`end` for display.
date: {{ .Date }}            # start (used for sort)
start: {{ .Date }}           # start of range (ISO)
end: ""                      # end of range (ISO). Leave "" for Present.

# ---- Meta ----
summary: ""
type: "experience"

# Optional org info (purely informational; use in your content if desired)
company: ""
company_url: ""

# ---- Media ----
# Uncropped by default in list cards; not shown as hero on single.
cover: ""                    # /images/your-cover.jpg or https://...

# ---- Tags ----
experience_tags: []          # e.g., ["Hardware", "ML", "Teaching"]

# ---- Links (rendered as buttons on the single page) ----
external: ""                 # e.g., https://drive.google.com/...
website: ""                  # e.g., https://lab.example.com
pdf: ""                      # e.g., /files/my-resume.pdf
links:                       # additional buttons (optional)
  # - label: "Poster"
  #   url: "/files/poster.pdf"
  #   icon: "fas fa-file"
  # - label: "Docs"
  #   url: "https://example.com/docs"
  #   icon: "fas fa-book"

draft: true
---

A few sentences about your role, impact, and key technologies/tools.
- Bullet 1
- Bullet 2
