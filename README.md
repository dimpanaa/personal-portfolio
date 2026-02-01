# DJ-Portfolio

A premium portfolio website for **Dimpana Jadhav** built with Astro and Three.js.

## Features

- 🎨 Dark theme with #242526 background
- 🔧 V8 engine 3D animation background (Three.js)
- 📱 Mobile-first responsive design
- ⚡ Fast performance with Astro
- 📝 **Content Collections** - Easy content management via Markdown files

## Tech Stack

- **Framework**: Astro 5.x
- **3D Graphics**: Three.js / Sketchfab Embed
- **Styling**: Vanilla CSS with custom properties
- **Content**: Astro Content Collections with Zod validation

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
DJ-Portfolio/
├── src/
│   ├── components/
│   │   ├── V8Engine.astro      # Three.js 3D background
│   │   └── Education.astro     # Education section with flight path animation
│   ├── content/                # 📝 CONTENT COLLECTIONS (edit these!)
│   │   ├── config.ts           # Collection schemas
│   │   ├── projects/           # Project markdown files
│   │   ├── education/          # Education markdown files
│   │   ├── experience/         # Experience markdown files
│   │   ├── certifications/     # Certification markdown files
│   │   └── achievements/       # Achievement markdown files
│   ├── layouts/
│   │   └── Layout.astro        # Base layout with global styles
│   └── pages/
│       └── index.astro         # Main page with all sections
├── public/
│   ├── favicon.svg
│   └── models/                 # Place 3D models here
├── package.json
└── astro.config.mjs
```

---

## 📝 Content Management Guide

This portfolio uses **Astro Content Collections** to make content management easy. You don't need to know how to code - just edit markdown files!

### Adding a New Project

1. Create a new file in `src/content/projects/` (e.g., `my-new-project.md`)
2. Use this template:

```markdown
---
title: "Project Title"
description: "Brief description of the project"
tags: ["Tag1", "Tag2", "Tag3"]
featured: true
order: 5
coverImage: "/images/projects/my-project-cover.jpg"
gallery:
  - type: "image"
    src: "/images/projects/my-project-detail.jpg"
    caption: "Optional caption for this image"
  - type: "video"
    src: "/videos/projects/my-project-demo.mp4"
    caption: "Video demonstration"
---

Optional extended description of your project.
You can write as much as you want here using markdown.
```

**Fields explained:**
| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ Yes | Project name displayed on the card |
| `description` | ✅ Yes | Short description (1-2 sentences) |
| `tags` | ✅ Yes | Array of technology/skill tags |
| `featured` | No | Set to `true` to highlight (default: `false`) |
| `order` | No | Display order - lower numbers appear first (default: `100`) |
| `coverImage` | No | Path to card thumbnail (e.g., `/images/projects/cover.jpg`) |
| `gallery` | No | Array of images/videos shown on project detail page (see below) |

**Gallery item format:**
| Field | Required | Description |
|-------|----------|-------------|
| `type` | ✅ Yes | Either `"image"` or `"video"` |
| `src` | ✅ Yes | Path to the file (e.g., `/images/projects/detail.jpg`) |
| `caption` | No | Optional caption displayed below the media |

> **📁 Where to put images/videos:**  
> Place files in `public/images/projects/` or `public/videos/projects/`. Then reference them as `/images/projects/filename.jpg` in your markdown.

---

### Adding Education

1. Create a new file in `src/content/education/` (e.g., `my-university.md`)
2. Use this template:

```markdown
---
institution: "University/School Name"
location: "City"
degree: "Degree or Course Name"
score: "CGPA: X.XX or Percentage: XX%"
startYear: "2020"
endYear: "2024"
isCurrent: false
order: 1
---

Optional description about your studies.
```

**Fields explained:**
| Field | Required | Description |
|-------|----------|-------------|
| `institution` | ✅ Yes | Name of school/college/university |
| `location` | ✅ Yes | City abbreviation (e.g., "BLR") |
| `degree` | ✅ Yes | Degree or course name |
| `score` | ✅ Yes | CGPA, percentage, or grade |
| `startYear` | ✅ Yes | Year you started |
| `endYear` | ✅ Yes | Year you finished (or "Present") |
| `isCurrent` | No | Set to `true` if currently studying here |
| `order` | No | Display order (1 = top/newest, higher = older) |

---

### Adding Experience

1. Create a new file in `src/content/experience/` (e.g., `my-company.md`)
2. Copy from `_template.md` and fill in your details:

```markdown
---
company: "Company Name"
role: "Your Position"
location: "City"
startDate: "Jan 2024"
endDate: "Present"
isCurrent: true
order: 1
---

Description of your responsibilities and achievements.

- Key achievement 1
- Key achievement 2
```

---

### Adding Certifications

1. Create a new file in `src/content/certifications/` (e.g., `solidworks-cert.md`)
2. Use this template:

```markdown
---
title: "Certification Name"
issuer: "Issuing Organization"
date: "Month Year"
credentialUrl: "https://verify-link.com"
order: 1
---

Optional description.
```

---

### Adding Achievements

1. Create a new file in `src/content/achievements/` (e.g., `competition-win.md`)
2. Use this template:

```markdown
---
title: "Achievement Title"
description: "Brief description"
date: "Month Year"
order: 1
---

Extended details about the achievement.
```

---

## Quick Tips

1. **File names**: Use lowercase with hyphens (e.g., `v8-engine-model.md`)
2. **Order field**: Lower numbers appear first (1, 2, 3...)
3. **Preview changes**: Run `npm run dev` to see changes instantly
4. **Template files**: Files starting with `_` (like `_template.md`) are ignored
5. **Images**: Place images in `public/images/` and reference as `/images/filename.jpg`

## Status

✅ Phase 1: Setup complete  
✅ Phase 2: V8 engine + sections complete  
✅ Phase 3: Content Collections setup complete  
⏳ Phase 4: Polish (next)
