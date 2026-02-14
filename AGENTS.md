# AGENTS.md — DJ-Portfolio

## What

A **portfolio website for Dimpana P Jadhav**, a Mechanical Engineering student at BNMIT, Bengaluru. It showcases projects, education, experience, certifications, and achievements — all manageable by a non-technical user through markdown files.

## Why

The owner is not a developer. The architecture prioritizes:

- **Easy content updates** — all dynamic content lives in `.md` files with YAML frontmatter (no code edits needed)
- **Visual impact** — dark theme, 3D backgrounds, particle effects, animated typography
- **Performance** — Astro's static-first approach with selective React hydration

---

## Tech Stack

| Layer          | Technology                                                                |
| -------------- | ------------------------------------------------------------------------- |
| Framework      | Astro 5.x (static site generator)                                         |
| UI Islands     | React 19 (hydrated via `client:load` / `client:only`)                     |
| 3D / Animation | Three.js (`@react-three/fiber`), Framer Motion (`motion/react`), anime.js |
| Styling        | Vanilla CSS with CSS custom properties (no Tailwind)                      |
| Content        | Astro Content Collections with Zod schema validation                      |
| Fonts          | Cormorant Garamond (serif headings) + Inter (sans body) via Google Fonts  |

---

## Project Structure

```
DJ-Portfolio/
├── src/
│   ├── pages/
│   │   ├── index.astro              # Main single-page layout (all sections)
│   │   └── projects/[slug].astro    # Dynamic project detail pages
│   ├── layouts/
│   │   └── Layout.astro             # Base HTML + global design system CSS
│   ├── components/
│   │   ├── V8Engine.astro           # Sketchfab 3D engine embed (hero bg)
│   │   ├── Education.astro          # Timeline from education collection
│   │   ├── Experience.astro         # Timeline from experience collection
│   │   ├── Certifications.astro     # (unused — merged into Achievements)
│   │   ├── Achievements.tsx         # React: card grid + modal (certifications + achievements)
│   │   ├── Achievements.css         # Styles for Achievements component
│   │   ├── Antigravity.jsx          # React + Three.js particle system (background)
│   │   ├── ShinyText.jsx            # React: animated gradient text effect
│   │   ├── ShinyText.css            # Styles for ShinyText component
│   │   └── TextPressure.jsx         # (experimental, unused)
│   └── content/                     # ← ALL DYNAMIC CONTENT LIVES HERE
│       ├── config.ts                # Zod schemas for all 6 collections
│       ├── projects/                # Project .md files
│       ├── education/               # Education .md files
│       ├── experience/              # Experience .md files
│       ├── certifications/          # Certification .md files
│       ├── achievements/            # Achievement .md files
│       └── socials/links.md         # Email, LinkedIn, GitHub, Instagram URLs
├── public/
│   ├── images/                      # All static images (profile, projects, achievements)
│   └── favicon.svg
├── astro.config.mjs                 # React integration, Vite dev server config
├── package.json
└── tsconfig.json
```

---

## Content Collections

All collections are defined in `src/content/config.ts`. Each `.md` file has YAML frontmatter validated by its Zod schema, plus an optional markdown body.

| Collection       | Key Fields                                                                           | Notes                                  |
| ---------------- | ------------------------------------------------------------------------------------ | -------------------------------------- |
| `projects`       | title, description, tags[], coverImage, gallery[{type,src,caption}], featured, order | Gallery supports images + videos       |
| `education`      | institution, location, degree, score, startYear, endYear, isCurrent, order           | `isCurrent` highlights active entry    |
| `experience`     | company, role, location, startDate, endDate, isCurrent, order                        | Markdown body rendered inline          |
| `certifications` | title, issuer, date, credentialUrl, image, gallery[], order                          | Merged with achievements on the page   |
| `achievements`   | title, description, date, image, gallery[], order                                    | Merged with certifications on the page |
| `socials`        | email, linkedin, github, instagram                                                   | Single file: `links.md`                |

> Files prefixed with `_` (e.g., `_template.md`) are ignored by Astro and serve as copy-paste templates.

---

## Page Sections (index.astro)

The main page renders these sections top-to-bottom:

1. **Header** — Fixed navbar, glassmorphism background, hamburger menu on mobile
2. **Hero** — Profile photo (organic blob mask), `ShinyText` name, CTA
3. **About** — Hardcoded personal info + interest badges
4. **Portfolio** — Grid of project cards → links to `/projects/[slug]`
5. **Experience** — Timeline (conditionally rendered if entries exist)
6. **Education** — Timeline with glowing markers for current institution
7. **Achievements** — React component combining certifications + achievements with Framer Motion expand-to-modal
8. **Contact** — Email + social links from `socials` collection
9. **Footer** — Nav, copyright, socials

**Background layers** (behind sections):

- `V8Engine.astro` — Sketchfab iframe, grayscale, fades on scroll
- `Antigravity.jsx` — Three.js particles, fixed position, desktop only (≥900px)
- Sections have `backdrop-filter: blur` + semi-transparent backgrounds

---

## Design System

Defined as CSS custom properties in `Layout.astro`:

- **Palette**: `--bg-primary: #242526`, `--accent-primary: #ff4b4b` (red)
- **Typography**: `--font-serif` for headings, `--font-sans` for body
- **Spacing scale**: `--space-xs` through `--space-2xl`
- **Transitions**: `--transition-fast/normal/slow`
- **Responsive**: Font-size scales at 1536px, 1366px, 768px breakpoints

---

## How to Work on This Project

### Commands

```bash
npm install       # Install dependencies
npm run dev       # Dev server at http://127.0.0.1:4321
npm run build     # Production build to dist/
npm run preview   # Preview production build
```

### Adding Content

1. Copy the `_template.md` from the relevant `src/content/` subdirectory
2. Fill in the YAML frontmatter (schemas in `config.ts`)
3. Add images to `public/images/` and reference as `/images/filename.jpg`
4. The `order` field controls display sequence (lower = first)

### Modifying Styles

- Global design tokens → `src/layouts/Layout.astro` (`<style is:global>`)
- Section-specific styles → inline `<style>` blocks in `index.astro`
- Component styles → co-located `.css` files or inline `<style>` in `.astro` files

### Key Conventions

- **Astro components** (`.astro`) are server-rendered by default
- **React components** use `client:load` (hydrate on page load) or `client:only="react"` (CSR only, no SSR)
- All social links, email, etc. come from `src/content/socials/links.md` — update there, not in page code
- The About section is **hardcoded** in `index.astro` (not from a collection)

---

## Known Issues / TODOs

- About section content is hardcoded — could be moved to a content collection
- `Certifications.astro` and `TextPressure.jsx` exist but are unused
- No scroll-to-top button yet
- Mobile: flight-path animation not visible, needs optimization
- SEO meta tags are minimal
- No real V8 GLB model yet (using Sketchfab embed as placeholder)
