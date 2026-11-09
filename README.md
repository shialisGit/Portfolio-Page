# Christos Shiali | Portfolio

A personal portfolio focused on AI engineering, computer vision, and applied machine learning. Built as a static site with no framework and no build step.

**Live site:** [shialisgit.github.io/Portfolio-Page](https://shialisgit.github.io/Portfolio-Page/)

## What changed

The previous pixel-art portfolio was replaced with an editorial, research-lab style design:

- Fully rewritten content based on the current CV (Alpha Bank, AstroBank, MSc AI at the University of Cyprus).
- Seven detailed case studies instead of short project blurbs.
- Custom SVG technical diagrams instead of GIFs.
- Dark and light themes, persisted in `localStorage`.
- Responsive layout, keyboard focus states, skip link, and reduced-motion support.
- Local-time display, project filters, scroll reveals, and a subtle animated signal field.
- Downloadable CV and a print-friendly resume page.

## Structure

```
.
├── index.html                 # Main portfolio
├── resume.html                # Web resume / print view
├── work/                      # Seven case-study pages
├── projects/                  # Old URLs redirect to the new case studies
├── assets/
│   ├── css/site.css           # Full design system
│   ├── js/site.js             # Theme, nav, filters, canvas, scroll behaviour
│   ├── img/                   # Custom SVG project artwork + favicon
│   └── Christos_Shiali_CV.pdf # Downloadable CV
├── server.js                  # Zero-dependency local static server
├── package.json
└── legacy/                    # Original pixel-art assets (kept for reference, unused)
```

## Run locally

Requires Node.js 18 or newer.

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

If port 3000 is busy:

```bash
# Windows PowerShell
$env:PORT=3001; npm run dev
```

You can also use Python instead of Node:

```bash
python -m http.server 3000
```

The site is static, so opening `index.html` directly works too - the local server is only there to provide a stable origin for things like clipboard access.

## Editing

- **CV:** replace `assets/Christos_Shiali_CV.pdf` with a new PDF. Keep the same filename so every download link keeps working, or update the links in `index.html`, `resume.html`, and `work/*.html`.
- **Case studies:** edit the relevant file in `work/`. Each page shares the header, footer, and case-study layout from `assets/css/site.css`.
- **Project artwork:** the SVGs in `assets/img/` are hand-written and use the same dark palette in both themes. Replace or extend them as needed.
- **Theme colours and typography:** all tokens are at the top of `assets/css/site.css`.

## Deploying

The site is plain static files. Push the repository to GitHub and enable GitHub Pages for the branch/folder you want to serve. No build command is required.

## Notes

- `projects/*.html` are redirect stubs for the old project URLs. They can be removed once old links no longer matter.
- `legacy/` contains the original pixel-art styles, scripts, fonts, and images. Nothing in the new site references it.
- The downloadable PDF matches `resume.html`. Regenerate it from the resume page when the CV changes.
