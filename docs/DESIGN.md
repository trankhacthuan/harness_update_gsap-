# Design

How this repository turns a brief into a site with its own identity. It applies
to every site built here (`docs/decisions/0010-single-repo-design-ownership.md`).
Brand-specific choices (palette, typefaces, bans) belong in that site's brief,
not here.

## 1. Process

1. Read the brief (`docs/product/PRODUCT.md`) and `docs/CONTENT_RULES.md`.
2. Decide four things and record each with a one-line reason in the brief or
   the story: the **type pair**, the **color system**, the **layout idea**, and
   the **motion contract**.
3. Pick a direction from `docs/ART_DIRECTION.md`. Create tokens (start from
   `docs/templates/starter/tokens.css`), then components, then pages. Values
   come from tokens.
4. Run the design review gate (section 8) and attach the evidence.

## 2. Tokens

- `app/styles/tokens.css` holds CSS custom properties on `:root`: color, type
  scale, spacing scale, radius, shadow, motion duration, easing, z-index.
- Components are CSS Modules and read tokens with `var(--…)`. No raw hex, px
  font sizes, or millisecond values inside a component.
- One background color, one text color, one accent color unless the brief
  states otherwise. Record measured contrast ratios next to the palette.
- No Tailwind and no CSS-in-JS runtime (`docs/decisions/0009-web-stack.md`).

## 3. Typography

- One display face and one body face. Both must render Vietnamese correctly:
  check the string `Ắ Ề Ổ Ữ ặ ệ ớ ự` at every size and weight used.
- Self-host through `next/font`; `font-display: swap`; at most two families and
  four weights in total.
- Body text is at least 16px with a generous line height; a clear step in the
  type scale separates display, heading, and body.

## 4. Layout

- Mobile-first; design and check at **375px** first, then widen.
- Sections must not all share one structure. Vary rhythm: full-bleed image,
  asymmetric columns, large type over image, printed-menu layout. At most one
  section may be a grid of identical cards.
- Touch targets are at least 44×44px; no horizontal scroll at 320px.
- Reserve space for every image (`width`/`height` or `aspect-ratio`) so nothing
  shifts when it loads.

## 5. Motion

- Motion is required UI behavior, not optional polish. Every user-facing route
  includes at least one purposeful GSAP-backed entrance, continuity, or state
  transition unless the owner explicitly requests no motion.
- Every page or component story records a motion contract: purpose, targets,
  trigger, sequence, reduced-motion behavior, and proof.
- Use GSAP + `@gsap/react` for page and component motion. CSS transitions are
  reserved for simple native hover/focus feedback.
- Prefer `transform` and `autoAlpha`; do not animate layout properties without
  a recorded exception. No scroll hijacking, autoplay loops, or decorative
  parallax by default.
- Durations normally stay between 120ms and 600ms with eased curves from
  tokens. A longer sequence must justify its pacing in the motion contract.
- Under `prefers-reduced-motion: reduce`, remove spatial movement and pinning;
  show the final readable state immediately or with a short opacity fade.
- Follow `docs/MOTION.md` for GSAP lifecycle, ScrollTrigger, cleanup, and proof;
  start from `docs/MOTION_RECIPES.md` and vary recipes across sections.

## 6. Performance budget

A page is not done if it misses these on a mid-range phone profile:

| Metric | Budget |
| --- | --- |
| Largest Contentful Paint | ≤ 2.5 s |
| Cumulative Layout Shift | ≤ 0.1 |
| Interaction to Next Paint | ≤ 200 ms |
| Images | sized, lazy-loaded below the fold, hero prioritized, modern formats |

Measure with Lighthouse and the browser performance panel; paste the numbers
into the story evidence. Smoothness on a real device is checked by a human.

## 7. Accessibility

WCAG 2.1 AA baseline. Semantic HTML, one `h1`, ordered headings, labels on every
input, visible focus, keyboard-operable controls. A lightbox or dialog traps
focus, closes on `Esc`, and returns focus to its trigger. Never rely on color
alone for meaning.

## 8. Design review gate

Answer each item with evidence — the section, line, or decision that proves it
— and fix what fails before reporting done:

1. Would a stranger understand what the site offers within 5 seconds? (quote the
   hero heading)
2. Can a visitor reach the main action (for example menu or booking) in at most
   two steps from the home page?
3. Is any section template-like — repeated card grids, gradients, decorative
   icons? Fix it.
4. Is any content invented or unsourced? List it and replace it with a
   placeholder (`docs/CONTENT_RULES.md`).
5. At 375px, are text, call button, forms, and navigation comfortable to use?
6. Do Vietnamese diacritics render correctly in every font and size used?
7. Does each route's motion contract name a visible GSAP behavior, prove it
   runs, and define a usable reduced-motion fallback?

Record the result in the story's evidence section.

## 9. Visual review (look at the page)

Rules and tests do not show whether a page looks good. Before reporting done:

1. Capture screenshots at 375, 768, and 1440px with
   `docs/templates/starter/e2e/visual.spec.ts` into `evidence/screens/`.
2. Open each image and critique it in writing against this checklist:
   - one clear focal point per screen; hierarchy readable in a squint test;
   - consistent spacing rhythm; no cramped or accidentally empty areas;
   - no two adjacent sections share one structure (section 4);
   - text never overlaps images illegibly; contrast holds on photos;
   - the page matches the chosen direction in `docs/ART_DIRECTION.md`;
   - no clipped text, overflow, or layout shift at 375px.
3. Fix every defect found, re-capture, and cite the final image names in the
   story evidence. A human still judges taste on a real device.
