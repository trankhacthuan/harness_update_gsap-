# US-029 Design Quality Kit

## Status

implemented

## Lane

normal

## Product Contract

A single prompt should lead an agent to a distinctive, polished site. The
Harness supplies concrete design and motion assets, not only rules.

## Relevant Product Docs

- `docs/DESIGN.md`
- `docs/MOTION.md`
- `docs/ART_DIRECTION.md`
- `docs/MOTION_RECIPES.md`

## Acceptance Criteria

- Art direction presets, anti-template rules, and image sourcing guidance exist.
- Copyable GSAP recipes cover hero, image, batched scroll, dialog, and feedback.
- Starter tokens, a motion Playwright spec, and a screenshot spec are provided.
- `docs/DESIGN.md` adds a visual review gate based on captured screenshots.
- A generic brief template works for any industry.
- Both installers distribute every new file.

## Validation

| Layer | Expected proof |
| --- | --- |
| Unit | Rust workspace tests remain green. |
| Integration | Bash installer dry-run lists all new files; PowerShell script parses. |
| E2E | Not run: no product app exists yet. Starter specs are untested templates. |

## Harness Delta

Adds design and motion assets plus a visual review step to the validation flow.

## Evidence

- `cargo test --workspace`: 27 passed.
- Bash installer dry-run: lists all new files (Created: 71).
- PowerShell parser: 0 errors.
- Starter CSS/TS files were not compiled or run against a real app.
