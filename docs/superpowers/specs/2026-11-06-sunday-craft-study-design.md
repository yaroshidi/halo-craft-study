# Sunday.ai craft study — design spec

**Date:** 2026-11-06  
**Owner:** Yar (Designer)  
**Goal:** A private technical recreation that studies the craft of [sunday.ai](https://www.sunday.ai/) — structure, motion, typography, and interaction detail — without copying their brand, product, assets, or copy.

## Intent

Build a full marketing-site shell that *feels* like sunday.ai in pacing and polish, implemented in plain HTML/CSS/JS with GSAP + ScrollTrigger + Lenis, so the motion code is inspectable and easy to learn from.

This is a study, not a client deliverable and not a replacement for yar.website or the trionn outreach preview.

## Hard rules

1. **No Sunday/Memo IP.** No logo, wordmarks, product name, photography, video, glove footage, or copied marketing copy.
2. **Structure and craft only.** Layout rhythm, sticky chapters, video blocks, curtain transitions, FAQ pattern, and soft UI details may be studied and rebuilt.
3. **Original fictional brand.** All names, copy, and visuals are invented for this study.
4. **Stock-safe media only.** Use public-domain / clearly licensed stills and short clips, or generative placeholders we own. Prefer muted, documentary-style home footage (kitchen, laundry, soft product stills) that are not from Sunday.
5. **Private preview.** Deploy with `noindex`, `robots.txt` Disallow, and `.nojekyll` if on GitHub Pages. Do not push to `yaroshidi/web-starter-template`, Lovable main, or live yar.website.
6. **Reduced motion.** Every scroll/timeline effect has a static or fade-only fallback when `prefers-reduced-motion: reduce`.
7. **Anti-slop.** Apply the Web Designer skill checklist: no warm beige AI templates, no giant default serif hero, no rounded black pill CTA forest, no oversized empty spacing for its own sake. Match sunday's quiet specificity instead.

## Fictional product

| Field | Value |
| --- | --- |
| Company | **Northlane** |
| Product | **Halo** — a helpful home robot |
| Tagline | The quiet housemate |
| Status | Beta opening late 2027 |
| Voice | Calm, concrete, slightly warm. Short sentences. Real chores, not “transform your home.” |

Halo is a wheeled, soft-shelled helper focused on clearing tables, loading dishwashers, folding simple laundry, and learning new home skills over time. Training happens off-site with consented operators; the marketing site emphasizes privacy and real-home mess.

## Site map

| Route | Purpose | Priority |
| --- | --- | --- |
| `/` | Home — hero, sticky story chapters, skills, privacy/design teaser, FAQ, beta CTA | P0 |
| `/technology/` | Skill capture, onboard models, learning loop, specs | P0 |
| `/design/` | Form, materials, colorways, safety, personalization | P0 |
| `/company/` | Story, team placeholders, values | P1 |
| `/beta/` | Founding household program, form stub | P1 |
| `/journal/` | 2–3 stub posts (list + one article template) | P2 |
| `/legal/privacy/` and `/legal/terms/` | Short placeholders | P2 |

404 page with the same shell (header/footer + curtain).

## Information architecture (home)

Modeled on sunday's chapter rhythm, with original content:

1. **Intro / Contents** — side or top contents rail linking to chapter anchors.
2. **Hero** — “Say hello to Halo” / “The quiet housemate” / beta date / primary CTA (Apply for beta) + secondary (Our story).
3. **Mundane made useful** — short manifesto + skills overview.
4. **Halo in the kitchen** — large media block (video or scrub sequence) + caption.
5. **Works in unfamiliar homes** — media + generalization story.
6. **Always learning** — timeline of skills (invented milestones, clearly fictional).
7. **From imitation to intuition** — teaser into Technology (capture glove fiction renamed: **Skill Mitten** or **Capture Sleeve** — use **Capture Sleeve™**).
8. **Designed for real use** — 3–4 cards: privacy, safety, tailor to your home, easy to clean.
9. **FAQ** — accordion, 5–6 original Q&As.
10. **Beta / newsletter** — founding households + email stub (no real ESP required for study; client-side validation only).
11. **Footer** — nav, social placeholders, legal.

Inner pages reuse the same header, footer, curtain, type scale, and chapter patterns.

## Visual system

### Color

Quiet light theme (sunday is light `#ffffff` with soft neutrals):

- `--bg: #f7f6f3`
- `--bg-elevated: #ffffff`
- `--ink: #1a1a1a`
- `--ink-muted: #5c5c5c`
- `--line: rgba(26,26,26,0.12)`
- `--accent: #2f5d50` (deep green, not Sunday's exact palette)
- `--accent-soft: #dce8e3`

Dark chapter bands only where media needs them (video stages), with a soft edge back to light — not full-site dark mode.

### Type

Do **not** use Sunday's Basel/Styrene files. Use:

- **Sans:** `"IBM Plex Sans"` (self-hosted woff2) for UI and body
- **Display / mono labels:** `"IBM Plex Mono"` for contents labels, captions, meta

Scale (approx):

- Display: clamp(2.5rem, 6vw, 4.5rem), tight tracking
- H2: clamp(1.75rem, 3vw, 2.5rem)
- Body: 1.0625rem / 1.6
- Caption / mono: 0.75–0.875rem, uppercase sparingly for contents only

### Layout

- Max content width ~1120–1200px
- Generous but *intentional* vertical rhythm (section padding 6–10rem desktop, 3–5rem mobile)
- Contents rail: sticky on desktop, horizontal chips on mobile
- Media frames: 16:9 or 4:5 with rounded corners ~12–16px, thin hairline border

### UI details to study

- Transparent header that gains a hairline / blur after scroll
- Soft **page-transition curtain** (opacity + slight translate) between routes
- Play/pause on media with custom controls (minimal)
- FAQ: height animate open/close, one open at a time optional
- Buttons: quiet text or soft fill; avoid black pill forest
- Focus states visible; keyboard operable accordion and nav

## Motion design

### Libraries

- **GSAP 3** + **ScrollTrigger**
- **Lenis** smooth scroll, synced to ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker`
- No Framer Motion (user chose HTML + GSAP)

### Signature patterns (implement all on home)

1. **Curtain transition** — on internal link click, cover → swap → uncover (~500–700ms). Disable for external links and when reduced motion.
2. **Hero entrance** — staggered fade/up of eyebrow, title, subcopy, CTAs (once).
3. **Chapter pin** — at least two sections pin while adjacent media scales or opacity-crossfades (kitchen + learning).
4. **Scrub / progress** — one section where scroll progress drives a frame index or clip-path reveal (can use image sequence *or* a single video with `currentTime` scrub if a short clip is available).
5. **Parallax depth** — subtle (max ~8–12% travel) on background plates only; never on body text.
6. **Contents highlight** — active chapter updates as sections enter viewport.
7. **FAQ** — GSAP height tween, not grid 0fr hacks alone.
8. **Hover** — media slightly scale 1.02; links underline grow; no bounce easings.

Easings: mostly `power2.out` / `power3.inOut`. No elastic or cartoon bounce.

### Performance

- Animate `transform` and `opacity` only
- One shared `requestAnimationFrame` path via GSAP ticker + Lenis
- Lazy-load below-fold media
- Cap particle/canvas experiments: none in v1 (sunday's polish is video + sticky, not WebGL on home)

## Content rules for copy

- Write original Halo/Northlane copy in a calm product voice
- No “AI slop” headlines (“reimagine”, “seamless”, “next-gen”, “transform your workflow”)
- Specific chores and constraints beat abstractions
- Mark trademarks only for invented Capture Sleeve™ if used
- Years on timeline are fictional and labeled as study fiction in the repo README only (not as a watermark on the marketing UI)

## Technical architecture

```
sunday-study/
  docs/superpowers/specs/   # this spec
  public/ or root HTML:
    index.html
    technology/index.html
    design/index.html
    company/index.html
    beta/index.html
    journal/index.html
    journal/hello-halo/index.html
    legal/...
    404.html
  css/
    tokens.css
    base.css
    layout.css
    components.css
    motion.css
  js/
    main.js          # boot Lenis + GSAP + page modules
    curtain.js
    contents.js
    chapters.js
    faq.js
    media.js
  assets/
    fonts/
    images/
    video/           # short stock-safe clips
  robots.txt
  .nojekyll
  README.md
```

Shared partials: because this is plain HTML, use a tiny build step **or** duplicated shells with a `build.py` that injects header/footer from templates (preferred: lightweight Python or Node include step so nav stays DRY). Final published output is static files.

### Browser support

Modern Chromium, Firefox, Safari. Graceful no-Lenis fallback = native scroll.

## Implementation phases

### Phase A — Shell (first shippable preview)

- Tokens, type, header/footer, curtain, home hero + contents + two chapters + FAQ skeleton
- Deploy private preview link

### Phase B — Home complete

- All home chapters, media blocks, scrub/pin polish, beta/newsletter stubs, footer

### Phase C — Inner pages

- Technology, Design, Company, Beta to the same craft bar
- Journal stubs last

### Phase D — Pass for detail

- Cross-browser check, reduced-motion audit, Web Designer slop audit, Lighthouse quick pass
- README explaining what was studied vs invented

## Success criteria

1. A designer can scroll the home page and recognize sunday-level pacing without seeing Sunday's brand.
2. Source is readable: each motion pattern lives in a named module with comments pointing to the behavior (pin, scrub, curtain).
3. Internal navigation always uses the curtain; hard refresh lands correctly.
4. `prefers-reduced-motion: reduce` removes pins/scrubs without breaking layout.
5. Preview is noindexed and not connected to live yar.website.
6. Yar can open the preview link on his laptop; no screenshots/recordings required from the bot unless he asks.

## Out of scope (v1)

- Real CMS (Sanity) or real Mux account
- Real beta form backend / email ESP
- 3D / WebGL Halo model
- Exact font files from sunday.ai
- Cloning their component source from JS bundles
- Publishing as a client template until Yar explicitly asks

## Open decisions (defaults locked unless Yar changes them)

- **Fictional names:** Northlane / Halo / Capture Sleeve™
- **Stack:** HTML + CSS + GSAP + ScrollTrigger + Lenis + small include build
- **Host:** GitHub Pages under a new private-or-public study repo (e.g. `yaroshidi/halo-craft-study`) with noindex — confirm repo name at implementation time
- **Language:** English only

## Next step after approval

Write an implementation plan (phase-ordered tasks with file-level checklist), then build Phase A and share the preview link only.
