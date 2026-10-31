# US-028 Required GSAP UI Motion

## Status

implemented

## Lane

normal

## Product Contract

Websites built with the Harness must include purposeful GSAP-backed UI motion
by default. Every user-facing route defines its effect, lifecycle,
reduced-motion state, and proof before implementation.

## Relevant Product Docs

- `docs/DESIGN.md`
- `docs/MOTION.md`
- `docs/product/PRODUCT.md`
- `docs/decisions/0009-web-stack.md`
- `docs/decisions/0013-required-gsap-ui-motion.md`

## Acceptance Criteria

- GSAP and `@gsap/react` are part of the default stack and first-story setup.
- Every UI story template requires a motion contract and visible GSAP behavior.
- Context rules force retrieval of the motion policy for page, component, and
  animation work.
- Normal and reduced-motion E2E proof is required; imports alone do not count.
- Both installers distribute the new policy, decision, and the bundled GSAP
  skills under `docs/skills/gsap/` (MIT, from GreenSock `gsap-skills`).
- Existing accessibility, performance, content, and architecture gates remain
  active.

## Design Notes

- This is a Harness policy change; it does not scaffold application code.
- `subtle-gsap` is the default and `expressive-gsap` is opt-in through the
  brief. An explicit owner request may select `none`.
- GSAP runs only in the smallest Client Component that owns the animated DOM.

## Validation

| Layer | Expected proof |
| --- | --- |
| Unit | Rust workspace tests remain green. |
| Integration | PowerShell and bash installer dry-runs include the new files. |
| E2E | Not applicable until a generated product app exists; the contract is added to its Playwright ladder. |
| Platform | Markdown links, installer syntax, and whitespace checks pass. |
| Release | Not required; CLI source and schema are unchanged. |

## Harness Delta

Adds a reusable GSAP motion policy, retrieval trigger, story contract,
validation gates, and a durable architecture decision.

## Evidence

- `cargo test --workspace`: 27 passed, 0 failed.
- `scripts/bin/harness-cli story verify US-028`: passed.
- `cargo fmt --check`: passed.
- `cargo clippy --workspace -- -D warnings`: passed.
- PowerShell parser and Git for Windows `bash -n`: both installer scripts passed.
- PowerShell and bash installer dry-runs listed `docs/MOTION.md` and decision
  `0013`; a real PowerShell copy smoke installed both files and an AGENTS entry,
  then removed the verified temporary target.
- Product-app E2E and Lighthouse were not run because this Harness repository
  intentionally has no scaffolded product app. The generated-app validation
  contract now requires both normal-motion and reduced-motion proof.
