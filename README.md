# iluzon.exe — Graphic Designer / Video Editor / Motion Designer Portfolio

An original, experimental portfolio for iluzon.exe — a graphic
designer, video editor and motion designer based in Nepal — built in
the minimal / editorial / motion-heavy register of top-tier Awwwards
& FWA design-engineer sites, with its own content, palette, and
interaction details.

## Stack

- React 19 + Vite
- GSAP + ScrollTrigger for the motion system
- Three.js / React Three Fiber / drei for the WebGL hero object
- Lenis for smooth scrolling, synced to GSAP's ticker
- Plain CSS with a custom-property design-token system
- lucide-react for the handful of icons used

No UI kit, no Tailwind, no Bootstrap — everything is bespoke so the
visual language stays tightly controlled.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to /dist
npm run preview   # preview the production build
```

## What's inside

- `src/styles/` — design tokens (`variables.css`), the type scale
  (`typography.css`), and global resets (`globals.css`).
- `src/animations/` — the reusable motion system: shared GSAP/easing
  setup, scroll-triggered entrances + parallax, magnetic hover /
  cursor-following helpers, and the project open/close page
  transition timelines.
- `src/components/` — one folder per UI piece (Header, CustomCursor,
  SmoothScroll, Hero, ProjectList/Item/Preview, About, Awards,
  Contact, WebGL, PageTransition, Footer), each with its co-located
  CSS.
- `src/pages/` — `Home` (composes the marketing sections) and
  `Project` (the case-study detail view).
- `src/data/projects.js` — the five example case studies. Swap in
  real projects and images here; each project's `color` field also
  drives its floating hover-preview swatch and detail hero panel
  until real imagery is added.
- `src/App.jsx` — wires the custom cursor, smooth scroll, header, and
  orchestrates the GSAP timeline that transitions between the home
  list and a project's detail page.

## Notes for going further

- The hero's WebGL visual is `WebGL/GalleryScene.jsx` + `WebGL/Gallery.jsx`:
  an original curved-panel image ribbon (16 cylindrical panels in a
  four-turn helix, slow rotation + vertical drift) built from scratch
  for this project. Its 5 textures are drawn at runtime onto canvases
  (`WebGL/galleryTextures.js`) using the site's own palette rather than
  any external imagery — swap `drawComposition()` for real
  `<img>`-based `THREE.TextureLoader` textures once you have final
  reel stills or key frames to show.
- Project artwork elsewhere is currently represented as flat colour
  swatches (`project.color`) rather than photos/video, so there's
  nothing licensed or placeholder-stock baked in. Drop real stills or
  clips into `public/projects/` and swap the swatch `<div>`s in
  `ProjectPreview.jsx` and `pages/Project/Project.jsx` for `<img>` /
  `<video>` elements once you have final assets.
- The custom cursor, WebGL hero visual, and heavier hover previews
  are already gated behind `pointer: coarse` / mobile / reduced-motion
  checks, so touch devices get a simplified, still-polished layout.
- All non-user-triggered motion respects `prefers-reduced-motion`.
