# Vassili Alexopoulos - Personal Website

A Hugo-based personal portfolio website that integrates with Obsidian vault content for seamless content management.

## Architecture Overview

This site uses **Hugo** static site generator with the **hugo-profile** theme, featuring a unique Obsidian vault integration for content management.

### Content Sources
- **Projects**: Local content in `content/projects/` (managed in this repo)
- **Blog**: External Obsidian vault → `content/blogs/`
- **Experience**: External Obsidian vault → `content/experience/`
- **Achievements**: External Obsidian vault → `content/achievements/`

### Key Features
- **Obsidian Integration**: Write content in Obsidian, publish via Hugo module mounts
- **Tag Filtering**: Client-side JavaScript filtering for projects and blog posts
- **Responsive Design**: Bootstrap-based grid layout with custom styling
- **Search**: JSON output enables client-side search functionality
- **Image Processing**: Automatic WebP conversion and responsive sizing

## Repository Structure

```
├── hugo.yaml              # Main configuration file
├── content/
│   ├── projects/          # Local project content (individual folders)
│   ├── blogs/             # → Mounted from Obsidian vault
│   ├── experience/        # → Mounted from Obsidian vault
│   └── achievements/      # → Mounted from Obsidian vault
├── layouts/
│   ├── projects/          # Custom project list/single templates
│   ├── blogs/             # Custom blog list template
│   └── partials/          # Obsidian callouts & media processing
├── static/
│   ├── css/               # Custom styles (tags, callouts, layout fixes)
│   ├── js/                # Tag filtering, callouts, search
│   └── images/            # Static images and project covers
├── themes/hugo-profile/   # Git submodule theme
└── archetypes/            # Content templates for new posts
```

## Development Workflow

### Adding New Projects
1. Create folder: `content/projects/project-name/`
2. Add `index.md` with frontmatter (use `archetypes/projects.md` template)
3. Include project images in the same folder
4. Use `project_tags` for categorization

### Content Management
- **Blog posts**: Write in Obsidian vault (`PublicBlog` folder)
- **Experience entries**: Add to Obsidian vault (`PublicExperience` folder)
- **Achievements**: Add to Obsidian vault (`PublicAchievements` folder)
- **Projects**: Manage locally in this repository

### Configuration
- **Site settings**: Edit `hugo.yaml`
- **Personal info**: Update `params` section in `hugo.yaml`
- **Navigation**: Modify `menu.main` in `hugo.yaml`
- **Theme customization**: Override layouts in `layouts/` directory

## Key Configuration (hugo.yaml)

### Module Mounts
```yaml
module:
  mounts:
    - source: "/Users/Vassilis/Documents/Obsidian Vault/PublicBlog"
      target: "content/blogs"
    - source: "/Users/Vassilis/Documents/Obsidian Vault/PublicExperience"
      target: "content/experience"
    - source: "/Users/Vassilis/Documents/Obsidian Vault/PublicAchievements"
      target: "content/achievements"
```

### Taxonomies
- `tags`: Blog post tags
- `project_tags`: Project categorization
- `experience_tags`: Experience categorization
- `categories`: General content categories

### Tag System

The tag system provides consistent styling, filtering, and organization across all content types with a centralized configuration.

#### Key Features

- **Unified Styling**: Consistent colors and appearance across all tags
- **Section-Specific Visibility**: Control which tags appear in different sections (blogs, projects, experience)
- **Smart Filtering**: Client-side filtering with visual feedback
- **Responsive Design**: Automatically handles many tags with dropdowns
- **Case-Insensitive**: Matches tags regardless of case (e.g., "Python" matches "python")

#### Configuration (`data/tag-config.yaml`)

Tags are configured in `data/tag-config.yaml` with the following structure:

```yaml
tags:
  "Tag Name":
    color: "#HEXCODE"  # Color in hex format
    weight: 100        # Higher weights sort first
    sections:          # Where this tag should appear
      - "projects"
      - "blogs"
      - "experience"

  # Example: Software Development
  "Python":
    color: "#F59E0B"
    weight: 90
    sections: ["projects", "experience", "blogs"]

  # Example: Hardware
  "PCB Design":
    color: "#D97706"
    weight: 80
    sections: ["projects", "experience"]

# Fallback colors for unconfigured tags
fallback_colors:
  - "#3B82F6"  # Blue
  - "#10B981"  # Green
  - "#8B5CF6"  # Purple
  # ... more fallback colors

display:
  max_visible_tags: 5  # Show this many tags before using dropdown
  show_dropdown: true  # Enable dropdown for many tags
  sort_by_weight: true # Sort by weight first, then alphabetically
```

#### Usage in Content

1. **Blog Posts** (in front matter):
   ```yaml
   ---
   tags: ["Python", "Machine Learning"]
   ---
   ```

2. **Projects** (in front matter):
   ```yaml
   ---
   project_tags: ["Hardware", "PCB Design", "Embedded Systems"]
   ---
   ```

3. **Experience** (in front matter):
   ```yaml
   ---
   experience_tags: ["Teaching", "Mentoring"]
   ---
   ```

#### Best Practices
- Use consistent casing in your content (though matching is case-insensitive)
- Keep tag names concise but descriptive
- Reuse existing tags when possible
- Add new tags to `tag-config.yaml` to ensure consistent styling
- Use the `sections` field to control where each tag appears
- Set appropriate weights to control sort order (higher weights appear first)

#### How It Works
1. Tags are collected from content front matter
2. The system looks up each tag in `tag-config.yaml`
3. If found, it applies the configured color and respects section visibility
4. If not found, it assigns a fallback color from the rotation
5. The tag filter bar shows up to `max_visible_tags` tags, with the rest in a dropdown

### Custom Features
- **Pretty URLs**: Custom permalinks for each section
- **Tag filtering**: JavaScript-based filtering system with consistent styling
- **Obsidian callouts**: Custom partial for rendering callout blocks
- **Image processing**: Intelligent cover image resolution

## Running the Site

```bash
# Development server
hugo server -D

# Build for production
hugo

# Update theme submodule
git submodule update --remote themes/hugo-profile
```

## Deployment

The site is configured for static hosting. Update `baseURL` in `hugo.yaml` before deploying to production.

## Theme

Uses [hugo-profile](https://github.com/gurusabarish/hugo-profile) theme as a Git submodule with custom overrides for enhanced functionality.
