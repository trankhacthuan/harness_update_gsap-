# US-XXX Story Title

## Status

planned

## Lane

tiny | normal | high-risk

## Product Contract

Describe the behavior this story must make true.

## Relevant Product Docs

- `docs/product/...`

## Acceptance Criteria

- Criterion 1.
- Criterion 2.
- Criterion 3.

## Design Notes

- Feature module(s) touched or created (`features/<name>/`):
- Routes / rendering mode (static / ISR / SSR / client):
- Data sources and boundary inputs (parse-first):
- Server vs Client Components:
- Server actions / use cases / repositories (`features/<name>/server`):
- Domain types and rules:
- SEO metadata needs:

## Motion Contract

Required for every story that adds or changes user-facing UI.

- Purpose (cause, continuity, hierarchy, or feedback):
- GSAP targets and owning Client Component:
- Trigger and sequence/timeline:
- ScrollTrigger/plugin use and justification:
- `prefers-reduced-motion` final state:
- Cleanup strategy (`useGSAP` scope / `gsap.context().revert()`):
- E2E and visual proof:

## Web Page Checklist

Fill this when the story adds or changes a route. Delete it for non-UI stories.

- [ ] Loading state (`loading.tsx` / skeleton)
- [ ] Empty state
- [ ] Error state (`error.tsx` / inline)
- [ ] Keyboard navigable, visible focus, correct landmarks/headings
- [ ] Labels / alt text / ARIA where needed (`jsx-a11y` clean, axe clean)
- [ ] Responsive 320px → wide desktop, no horizontal scroll
- [ ] Values come from `app/styles/tokens.css`; no raw design values in the CSS Module
- [ ] At least one visible GSAP-backed behavior satisfies the motion contract
- [ ] Motion prefers `transform`/`autoAlpha`, is scoped/cleaned up, and respects reduced motion
- [ ] Design review answered with evidence (`docs/DESIGN.md` section 8)
- [ ] No invented content; placeholders listed in `docs/product/MISSING.md`
- [ ] `metadata` exported if the route is indexable
- [ ] Forms: client + server validation, error summary, success path

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id <id> --unit 1 --integration 1 --e2e 0 --platform 0`.

| Layer | Expected proof |
| --- | --- |
| Unit | |
| Integration | |
| E2E | |
| Platform | |
| Release | |

## Harness Delta

Document any harness updates made or proposed because of this story.

## Evidence

Add commands, reports, screenshots, or links after validation exists.
