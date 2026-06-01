# vialed-site

Marketing site for [Vialed](https://vialed.app), the iOS peptide tracking app.

Static HTML + CSS, no build step, no JavaScript framework. Hosted on
GitHub Pages with a custom domain.

## Structure

```
.
├── index.html        Main landing page
├── privacy.html      Privacy policy (stub)
├── terms.html        Terms of service (stub)
├── support.html      Support page (contact emails wired in)
├── styles.css        Single stylesheet, dark-mode design system
├── CNAME             Custom domain for GitHub Pages
└── assets/           Logos, favicons, App Store badge, screenshots
```

## Local preview

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Push to the `main` branch of `SAESoftware/vialed-site`. GitHub Pages serves
it at <https://vialed.app>.

See `assets/README.md` for how to drop in the real logo and screenshots.
