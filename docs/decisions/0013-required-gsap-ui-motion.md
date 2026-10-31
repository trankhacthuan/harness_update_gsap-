# 0013 Required GSAP UI Motion

Date: 2026-10-27

## Status

Accepted. Amends `0009-web-stack.md` and the motion policy in
`docs/DESIGN.md`.

## Context

The previous default used CSS transitions plus `IntersectionObserver` and no
animation library. That made motion optional and allowed an agent to deliver a
technically complete UI without implementing visible animation. The owner wants
the Harness to produce websites whose UI includes intentional GSAP effects by
default, while preserving accessibility and performance.

The upstream GSAP skill set is useful technical guidance, but installing skill
files alone does not prove that generated UI contains a working effect.
Harness-level contracts and validation are needed.

## Decision

- GSAP and `@gsap/react` are part of the locked default web stack.
- Every user-facing route has a motion contract and at least one visible,
  purposeful GSAP-backed behavior.
- `subtle-gsap` is the default profile. `expressive-gsap` is selected when the
  brief or story calls for richer choreography. `none` is allowed only when the
  owner explicitly requests no motion.
- CSS transitions remain appropriate for simple native hover/focus feedback,
  but do not satisfy the route-level GSAP requirement.
- `prefers-reduced-motion` always produces a complete, usable final state
  without spatial movement, pinning, or continuous animation.
- `docs/MOTION.md` is the implementation and validation policy. UI stories and
  the design review must include motion evidence.

## Alternatives Considered

1. Install the GSAP skills without changing Harness policy — rejected because
   skills guide code generation but do not require a visible result.
2. Require GSAP for every hover and focus state — rejected because CSS is
   simpler and more resilient for native micro-interactions.
3. Keep GSAP optional — rejected because it does not meet the owner's desired
   default output.

## Consequences

Positive:

- UI work has a concrete animation outcome and proof path.
- GSAP usage follows consistent React lifecycle, cleanup, reduced-motion, and
  ScrollTrigger rules.
- Motion intent is recorded before implementation instead of added as polish.

Tradeoffs:

- Every generated app includes additional client JavaScript.
- UI stories require browser and performance proof.
- Agents must isolate animation in small Client Components to preserve the
  Server Component and performance benefits of Next.js.

## Validation

- Installer manifests include `docs/MOTION.md` and this decision.
- UI story templates require a motion contract.
- Context rules retrieve the motion policy for UI and animation work.
- E2E guidance covers normal and reduced-motion modes.
