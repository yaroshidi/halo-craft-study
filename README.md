# Halo craft study (Northlane)

Private technical recreation that studies the craft of sunday.ai — structure, sticky chapters, curtain transitions, scrub media, FAQ — without copying their brand, product, assets, or copy.

## Brand (fictional)

- **Company:** Northlane
- **Product:** Halo — the quiet housemate
- **Accessory:** Capture Sleeve™

## Stack

Plain HTML/CSS/JS + GSAP 3 + ScrollTrigger + Lenis (CDN). Built with `python3 build.py` → `dist/`.

## Preview

```bash
python3 build.py
cd dist && python3 -m http.server 8765
```

Open http://127.0.0.1:8765/

`robots.txt` Disallows all; pages are `noindex`. Do not publish to yar.website.

## Studied vs invented

| Studied (craft) | Invented |
| --- | --- |
| Sticky scroll chapters, curtain, contents rail, FAQ rhythm | Northlane / Halo / Capture Sleeve™ |
| Quiet light UI, soft media frames | All copy, timeline, specs |
| Lenis + GSAP motion patterns | Stock-safe Pexels media, original Halo copy |

## License

Study repo for Yar. Not a client template until explicitly released.
