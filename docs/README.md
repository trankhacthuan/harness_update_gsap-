# Documentation Map

This directory holds the project harness and any product contract derived from a
future user-provided spec.

## Main Files

- `HARNESS.md`: how humans and agents collaborate.
- `FEATURE_INTAKE.md`: how prompts become tiny, normal, or high-risk work.
- `ARCHITECTURE.md`: architecture discovery and boundary rules.
- `DESIGN.md`: art direction, tokens, motion, performance budget, design review.
- `MOTION.md`: mandatory GSAP motion contracts, lifecycle rules, and proof.
- `CONTENT_RULES.md`: no invented facts; placeholders and the missing ledger.
- `QUICKSTART.md`: first-run setup.
- `TEST_MATRIX.md`: proof map and per-lane checks; current proof status is
  queried with `scripts/bin/harness-cli query matrix`.
- `HARNESS_BACKLOG.md`: legacy improvement list; current improvement records
  are stored with `scripts/bin/harness-cli backlog`.
- `GLOSSARY.md`: shared terms.

## Folders

- `product/`: the product brief (`PRODUCT.md`) and the missing-content ledger
  (`MISSING.md`).
- `stories/`: feature packets and backlog.
- `decisions/`: durable decisions and tradeoffs.
- `demo/`: concrete walkthroughs that show how the harness transforms input
  into agent-ready work.
- `ART_DIRECTION.md`, `MOTION_RECIPES.md`: how to choose a look and which motion patterns to use.
- `templates/`: reusable spec-intake, story, plan, decision, and validation
  formats.

## Current State

Harness v0 exists before implementation. These docs define how the project will
grow; they do not imply that app code, tests, CI, or deployment automation exist
yet.
