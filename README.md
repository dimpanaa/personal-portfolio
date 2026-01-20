# DJ-Portfolio

A premium portfolio website for **Dimpana Jadhav** built with Astro and Three.js.

## Features

- 🎨 Dark theme with #242526 background
- 🔧 V8 engine 3D animation background (Three.js)
- 📱 Mobile-first responsive design
- ⚡ Fast performance with Astro

## Tech Stack

- **Framework**: Astro
- **3D Graphics**: Three.js
- **Styling**: Vanilla CSS with custom properties

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
│   │   └── V8Engine.astro     # Three.js 3D background
│   ├── layouts/
│   │   └── Layout.astro        # Base layout with global styles
│   └── pages/
│       └── index.astro         # Main page with all sections
├── public/
│   ├── favicon.svg
│   └── models/                 # Place V8 engine GLB here
├── package.json
└── astro.config.mjs
```

## Status

✅ Phase 1: Setup complete  
✅ Phase 2: V8 engine + sections complete  
⏳ Phase 3: Polish (next)
