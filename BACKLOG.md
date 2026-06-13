# vialed-site — Backlog

Notes tracked here are scoped to the marketing site, not the iOS app
itself (which has its own backlog at `~/peptide-app/BACKLOG.md`).

## Launch-day TODO

**Replace the App Store URL placeholder.** ~~Hero and final-CTA both
link to the App Store URL placeholder.~~ Done — both badge links now
use the live App ID `id6769218409`
(`https://apps.apple.com/app/vialed/id6769218409`). The badge SVG has
also been swapped from the placeholder to Apple's official "Download on
the App Store" SVG at `assets/app-store-badge.svg`. ✅ Complete.

## Privacy and terms — post-launch migration

Vialed-specific Privacy Policy and Terms of Service are now drafted at
`/privacy.html` and `/terms.html`. Both are marked "Draft — pending
legal review." Once they're reviewed and the site is live at
`vialed.app`:

1. **Update App Store Connect.** The Privacy Policy URL and EULA URL
   currently submitted to App Store Connect point to
   `madebysae.com/privacy` and `madebysae.com/terms`, which are
   website-level docs that explicitly disclaim that they apply to the
   Vialed app. Update App Store Connect to point at
   `vialed.app/privacy` and `vialed.app/terms` instead.
2. **Decide what happens to the madebysae.com docs.** Two reasonable
   options:
   - Redirect `madebysae.com/privacy` → `vialed.app/privacy` and same
     for terms (cleanest if the madebysae.com pages were only ever
     used as the Vialed canonical URLs).
   - Keep the madebysae.com docs as actual SAE Software corporate
     website privacy/terms (i.e., for `madebysae.com` itself, not for
     any product), and update their content if needed.

## iCloud sync — claim vs. reality

The landing page (feature 6, FAQ Q2 and Q3) says "iCloud sync to your
own account." The iOS project has no CloudKit/iCloud configuration —
SwiftData is set up with a plain `ModelConfiguration` and there is no
entitlements file checked in. The new Privacy Policy carefully phrases
iCloud as "if you have iCloud enabled... and choose to use Vialed's
iCloud sync feature," so it's not promising something the app doesn't
do. But the marketing copy is stronger than the implementation.

Decide before launch:

- **Wire up iCloud sync.** SwiftData supports CloudKit sync with a
  small config change and an iCloud entitlement. If sync is on the V1
  list, build it.
- **Soften the marketing copy.** If iCloud is post-V1, change the
  landing page from "iCloud sync to your own account" to "local
  storage; optional iCloud sync coming soon" or just "local storage"
  and adjust the Privacy Policy paragraph accordingly.

Either way, the marketing claim and the shipped code need to match
before the App Store listing goes live.

## Real assets to drop in

Tracked in `assets/README.md`:
- Three 1024×1024 logo PNGs (`vialed-logo-light.png`,
  `vialed-logo-dark.png`, `vialed-logo-tinted.png`)
- Favicon PNGs (16/32/180) generated from the light logo
- Apple's official App Store badge SVG
- Seven phone screenshots (one hero + six features)
- Optional `og-image.png` (1200×630) for social sharing

## "Research use only" caveat

The footer disclaimer and FAQ Q1 on the previous version of the site
referenced peptides "for research use only" not being for human
consumption. That language does not appear in the in-app medical
disclaimer (`MedicalDisclaimerContent.swift` in the iOS project). The
new `/disclaimer.html` matches the in-app text verbatim, which means
the research-use caveat lives only in FAQ Q1 of `index.html` now.

Decide whether to:
- Add the research-use line to the in-app disclaimer (keeps web + app
  consistent), or
- Remove it from FAQ Q1 entirely (the in-app text is the locked,
  Apple-reviewed source of truth), or
- Leave the split as-is (FAQ has a narrower research-use mention; the
  comprehensive disclaimer covers everything else).
