# Vialed site assets

## Logos to drop in

Place these three 1024×1024 PNGs in this directory:

- `vialed-logo-light.png` — opaque purple gradient with V mark. Used as the
  primary site logo (header + footer) and as the source for all favicons.
- `vialed-logo-dark.png` — transparent background, glowing purple V. Available
  for any future placement that needs a transparent V on dark.
- `vialed-logo-tinted.png` — transparent grayscale. Likely unused on the site;
  kept here in case we ever need a monochrome variant.

## Generating favicons (after dropping in `vialed-logo-light.png`)

Run from the repo root. `sips` ships with macOS — no install needed.

```bash
cd assets
sips -z 16 16   vialed-logo-light.png --out favicon-16x16.png
sips -z 32 32   vialed-logo-light.png --out favicon-32x32.png
sips -z 180 180 vialed-logo-light.png --out apple-touch-icon.png
```

Optional: generate a 512×512 social/OG image (referenced by index.html as
`assets/og-image.png`). For a true 1200×630 OG card you'll want to
composite the logo on a background — `sips` alone won't do that well.

## Swapping the logo references

The header and footer in `index.html`, `privacy.html`, `terms.html`, and
`support.html` currently reference `logo-placeholder.svg`. When the real
PNG is in place, find-and-replace `logo-placeholder.svg` → `vialed-logo-light.png`
across those four files.

## App Store badge

`app-store-badge.svg` is a placeholder. Download the official badge from
<https://developer.apple.com/app-store/marketing/guidelines/> and overwrite
the file with the same name — no HTML changes needed.

## Screenshots

Phone-shaped placeholders in the HTML are commented with the exact filename
that will replace them, e.g. `<!-- replace with screenshot-calculator.png -->`.
Drop PNGs into this directory using those names and replace the
`<div class="phone-shot">…</div>` block with `<img src="assets/<name>.png" alt="…" class="phone-shot" />`.

Recommended capture size: 1284×2778 (iPhone 14 Pro Max @3x) or any 9:19.5
ratio. The layout reserves the slot so swapping won't shift surrounding
content.
