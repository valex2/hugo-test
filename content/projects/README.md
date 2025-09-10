# Projects

This directory contains project markdown files for your portfolio. Each project should be a single markdown file with front matter and content.

## Creating a New Project

1. Create a new markdown file in this directory with a descriptive filename (e.g., `my-awesome-project.md`)
2. Use the following front matter template:

```yaml
---
title: "Project Title"
date: 2023-01-01
draft: false
summary: "A brief description of the project"
cover: "project-image.jpg"  # Place images in /static/images/projects/
project_tags: ["tag1", "tag2"]  # Add relevant tags

# Optional links (uncomment and fill as needed)
# repo: "https://github.com/username/repo"
# website: "https://example.com"
# demo: "https://demo.example.com"
# pdf: "document.pdf"  # Place PDFs in /static/files/
# paper: "https://arxiv.org/abs/..."

# Or use the flexible links array for custom buttons:
# links:
#   - label: "Documentation"
#     url: "https://docs.example.com"
#     icon: "fas fa-book"
#   - label: "Video"
#     url: "https://youtube.com/..."
#     icon: "fas fa-video"
---

## Project Overview

Write your project content here using Markdown.
```

## Adding Images

1. Place all project images in `/static/images/projects/`
2. Reference them in your markdown using the filename only (e.g., `cover: "project-screenshot.jpg"`)
3. In your markdown content, use HTML for better control over image sizing:
   ```html
   <img src="project-screenshot.jpg" alt="Description of image" style="max-width: 80%; height: auto; display: block; margin: 1rem auto;">
   ```
   
   Or for multiple images side by side:
   ```html
   <div style="display: flex; gap: 1rem; justify-content: center; margin: 1rem 0;">
     <img src="screenshot1.jpg" alt="First image" style="max-width: 45%; height: auto;">
     <img src="screenshot2.jpg" alt="Second image" style="max-width: 45%; height: auto;">
   </div>
   ```
   
   Adjust the `max-width` percentage to control the image size while maintaining aspect ratio.

## Tags

Use the `project_tags` front matter to add tags to your project. These will be used for filtering on the projects page.

## Example Project

Here's a complete example of a project markdown file:

```markdown
---
title: "My Awesome Project"
date: 2023-06-15
draft: false
summary: "A web application built with React and Node.js"
cover: "awesome-project-cover.jpg"
project_tags: ["Web Development", "React", "Node.js"]
repo: "https://github.com/username/awesome-project"
demo: "https://awesome-project.example.com"
---

## Project Overview

This is my awesome project that does amazing things.

## Features

- Feature 1
- Feature 2
- Feature 3

## Technologies Used

- React
- Node.js
- MongoDB

## Screenshot

![Screenshot](awesome-project-screenshot.jpg)
```
