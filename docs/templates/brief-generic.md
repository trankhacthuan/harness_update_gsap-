# Brief template — any website

Fill every `[...]`, give the whole file to the agent as the task prompt, and put
the same facts in `docs/product/PRODUCT.md`. Missing data becomes
`[CẦN BỔ SUNG: ...]` (`docs/CONTENT_RULES.md`). This is a spec intake: pages are
normal-lane stories; forms that store personal data and any database work are
**high-risk**.

---

# ROLE
You are an art director and front-end developer. Build a real, usable site with
its own identity, not a generic AI landing page. Follow `docs/DESIGN.md`,
`docs/ART_DIRECTION.md`, `docs/MOTION.md`, and `docs/MOTION_RECIPES.md`.

# FACTS (never invent)
Name: [NAME] | Tagline: [TAGLINE] | What we offer: [OFFER] | For whom: [AUDIENCE]
Contact: [PHONE / EMAIL / ADDRESS / HOURS] | Social: [LINKS]
Real details to write from (fill 3 or more): [materials / process / origin / people / place / results]

# DIRECTION
- Mood keywords: [3-5 WORDS]
- Direction from `docs/ART_DIRECTION.md`: [Editorial warm | Modern minimal | Dark premium | Bold playful | Natural organic | Technical clear | other + reason]
- References (learn structure, do not copy): [LINK: layout rhythm], [LINK: typography], [LINK: content presentation]
- Brand palette / fonts if fixed: [HEX / FONTS or "choose and justify"]
- Bans: [anything to avoid]

# MOTION
- Profile: [subtle-gsap (default) | expressive-gsap | none (only on explicit owner request)]
- Signature moment (one): [e.g. hero line reveal + image settle]
- Recipes to prefer from `docs/MOTION_RECIPES.md`: [numbers or "choose"]

# STRUCTURE
Pages and sections in order: [LIST]. Primary action: [e.g. book / buy / contact].
Forms and data stored: [LIST or none].

# DELIVERY (the agent must do all of these)
1. Record type pair, color system with contrast ratios, layout idea, and motion contract, each with a reason.
2. Create `app/styles/tokens.css` from `docs/templates/starter/tokens.css`, adapted to the direction.
3. Build mobile-first (375px), then 768 and 1440.
4. Add `e2e/` specs from `docs/templates/starter/e2e/` and run normal-motion and reduced-motion proof.
5. Capture screenshots, critique them against `docs/DESIGN.md` section 9, fix, and re-capture.
6. Run Lighthouse and paste the numbers. Fill `docs/product/MISSING.md`.
