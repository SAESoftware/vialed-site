# Vialed site assets

## Logos to drop in

Place these three 1024×1024 PNGs in this directory:

- `vialed-logo-light.png` — opaque purple gradient with V mark. Used as the
  primary site logo (header + footer) and as the source for all favicons.
- `vialed-logo-dark.png` — transparent background, glowing purple V. Available
  for any future placement that needs a transparent V on dark.
- `vialed-logo-tinted.png` — transparent grayscale. Likely unused on the site;
  kept here in case we ever need a monochrome variant.

## Favicons & app icons

The favicon set is generated from the **Vialed app icon** (the neon V on the
indigo background — the 1024×1024 App Store icon), copied into this repo as
`assets/icon-source-1024.png`. Source of truth: the Xcode asset catalog at
`~/peptide-app/.../AppIcon.appiconset/light.png` (copy out read-only; don't
edit the app repo).

Keep the art **square and edge-filling** — do NOT pre-round the corners or
make the background transparent. Browsers, Google, and iOS apply their own
rounded mask; pre-rounding at small sizes produces a muddy double-border, and
a transparent V vanishes on light browser chrome.

Regenerate (needs Pillow: `python3 -m pip install Pillow`):

```bash
python3 - <<'PY'
from PIL import Image
img = Image.open("assets/icon-source-1024.png").convert("RGBA")
for s, p in [(512,"assets/icon-512.png"), (192,"assets/icon-192.png"),
             (180,"assets/apple-touch-icon.png"),
             (32,"assets/favicon-32x32.png"), (16,"assets/favicon-16x16.png")]:
    img.resize((s, s), Image.LANCZOS).save(p)
img.save("favicon.ico", format="ICO", sizes=[(32,32),(16,16)])
PY
```

Outputs: `favicon.ico` (root, 16+32), `assets/favicon-16x16.png`,
`assets/favicon-32x32.png`, `assets/apple-touch-icon.png` (180),
`assets/icon-192.png`, `assets/icon-512.png`. The 192/512 are referenced by
`/site.webmanifest`. `<head>` tags live in every page's `<head>`.

The OG/social card is a separate image — `index.html` uses the reconstitution
marketing PNG (`images/marketing/reconstitution-card.png`), not a favicon.

## Swapping the logo references

The header and footer in `index.html`, `privacy.html`, `terms.html`, and
`support.html` currently reference `logo-placeholder.svg`. When the real
PNG is in place, find-and-replace `logo-placeholder.svg` → `vialed-logo-light.png`
across those four files.

## App Store badge

`app-store-badge.svg` is Apple's official "Download on the App Store"
badge (US/UK English, black), sourced from
<https://developer.apple.com/app-store/marketing/guidelines/>. To refresh
it, overwrite the file with the same name — no HTML changes needed.

## Screenshots

Phone-shaped placeholders in the HTML are commented with the exact filename
that will replace them, e.g. `<!-- replace with screenshot-calculator.png -->`.
Drop PNGs into this directory using those names and replace the
`<div class="phone-shot">…</div>` block with `<img src="assets/<name>.png" alt="…" class="phone-shot" />`.

Recommended capture size: 1284×2778 (iPhone 14 Pro Max @3x) or any 9:19.5
ratio. The layout reserves the slot so swapping won't shift surrounding
content.
