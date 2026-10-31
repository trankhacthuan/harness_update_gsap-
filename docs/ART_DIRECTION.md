# Art Direction

How to choose a distinctive look for any kind of site before writing CSS. Read
with `docs/DESIGN.md` (rules) and `docs/MOTION.md` (motion). This file helps the
decisions in `DESIGN.md` section 1; it does not replace the brief.

## 1. Pick one direction, commit to it

Choose one row, adapt it to the brief, and record the reason. Mixing directions
produces the generic look this harness exists to avoid.

| Direction | Feels | Palette idea | Type idea | Layout idea | Motion idea |
| --- | --- | --- | --- | --- | --- |
| Editorial warm | crafted, human | cream bg, ink text, one clay/rust accent | high-contrast serif display + humanist sans | large type over image, asymmetric columns | headline line reveal; image slow settle |
| Modern minimal | calm, precise | near-white bg, near-black text, one saturated accent | neo-grotesque display + same-family body | strict grid, big whitespace, oversized numerals | fade-up stagger; hover underline draw |
| Dark premium | refined, nocturnal | charcoal bg, warm white text, one brass accent | elegant serif or condensed display + clean sans | full-bleed imagery, centered statements | slow clip-path image reveal |
| Bold playful | energetic, friendly | light bg, one vivid accent, strong shapes | rounded/geometric display + friendly sans | oversized shapes, tilted blocks | springy pop-ins on user action |
| Natural organic | grounded, soft | sage/sand bg, deep green text, one earth accent | soft serif + light sans | curved masks, layered photos | gentle float-in; SVG line draw |
| Technical clear | trustworthy, sharp | white/light gray, blue-black text, one signal accent | mono accents + grotesque | modular blocks, data rows, diagrams | stepwise diagram reveal; counters |

If the brief names a brand palette or typeface, it overrides the row.

## 2. Make the page look designed, not generated

- **Hero**: one idea. A specific headline (what, for whom, where), one supporting
  line, one primary action, one dominant image or shape.
- **Hierarchy**: at most three type sizes visible per viewport; display is at
  least 3x the body size.
- **Rhythm**: alternate dense and airy sections with `--space-section`; never
  stack two sections of the same structure.
- **Contrast of scale**: one oversized element per page (number, word, or image)
  creates a focal point.
- **Restraint**: one accent color, used only for action and emphasis. No
  gradients, glass, glow, or decorative icons unless the brief asks.
- **Alignment**: one shared left edge for text; break it deliberately and rarely.
- **Details**: consistent radius, hairline dividers from `--color-line`, real
  focus states, balanced headings (`text-wrap: balance`).

## 3. Images

Quality imagery decides how premium a site feels. Order of preference:

1. Owner-supplied photography. Record what is still needed in
   `docs/product/MISSING.md`.
2. Neutral placeholders at the final aspect ratio with a shot description
   (`docs/CONTENT_RULES.md` section 4). The layout must look intentional with them.
3. Licensed stock only when the owner approves it; record source and license in
   the story. Never present stock as the owner's real work, and never invent
   people, reviews, or places.

Every image: explicit `width`/`height` or `aspect-ratio`, `next/image`, `alt`
text describing content, hero marked `priority`, the rest lazy.

## 4. Responsive intent

Design 375px first. Decide per section how it reshapes (stack, crop, reorder)
and note it in the story. The primary action stays visible in the first mobile
screen.

## 5. Record the decision

In the brief or story: direction chosen, palette with contrast ratios, font pair
and why, layout idea, motion profile. These feed the design review gate and the
visual review in `docs/DESIGN.md` section 9.
