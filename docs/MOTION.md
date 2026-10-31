# UI Motion Contract

This document makes intentional UI motion a required part of every website
built with this Harness. It adapts the GSAP core, timeline, ScrollTrigger,
React, framework, plugin, utility, and performance guidance into one policy for
the locked Next.js stack.

Technical guidance is adapted from GreenSock's MIT-licensed `gsap-skills`
repository; this file adds Harness-specific activation and proof requirements.

## Required Outcome

Every user-facing route must include at least one visible, purposeful
GSAP-backed behavior unless the owner explicitly requests no motion. A package
dependency, import, or animation that never becomes visible does not satisfy
this requirement.

Motion must explain one of these things:

- hierarchy: introduce the most important content first;
- continuity: show how content or state changed;
- cause and effect: connect an action to its result;
- feedback: confirm hover, focus, selection, loading, success, or failure.

Do not add movement only to prove that GSAP is installed.

## Motion Profiles

| Profile | Required behavior |
| --- | --- |
| `subtle-gsap` | Default. One short GSAP entrance or continuity sequence per route; native hover/focus may use CSS. |
| `expressive-gsap` | A justified timeline, ScrollTrigger sequence, image/text transition, SVG motion, or interaction plus the subtle baseline. |
| `none` | Allowed only when the owner explicitly requests no motion. The story records that instruction as the reason. |

`prefers-reduced-motion` is an accessibility mode, not the `none` product
profile. It always receives a complete, readable final state without spatial
movement, pinning, or continuous animation.

## Motion Contract

Before implementation, every story that adds or changes UI records:

1. **Purpose** — hierarchy, continuity, cause/effect, or feedback.
2. **Targets** — the exact elements and the Client Component that owns them.
3. **Trigger** — mount, user action, state change, or scroll position.
4. **Sequence** — start state, end state, order, duration, and easing token.
5. **Engine** — GSAP core/timeline and any justified plugin.
6. **Reduced motion** — the complete final state and which movement is removed.
7. **Cleanup** — scope and teardown behavior.
8. **Proof** — the Playwright action/assertion and visual evidence.

Do not begin UI implementation with an empty motion contract.

## Next.js And React Pattern

- Install `gsap` and `@gsap/react` in the first implementation story.
- Keep routes as Server Components where possible. Put animation in the
  smallest Client Component that owns the animated DOM.
- Register `useGSAP` and any plugins once in a client-only shared module or at
  module scope, never on every render.
- Prefer `useGSAP()` with a container ref as `scope`. Target `ref.current` or a
  selector scoped to that container; never use an unscoped page-global
  selector inside a reusable component.
- Let `useGSAP` revert animations on unmount. When it is unavailable, create a
  `gsap.context()` and return `ctx.revert()` from the effect.
- Wrap delayed, event-driven, or callback-created animation with
  `contextSafe()` so cleanup still owns it.
- Do not hide critical content in server-rendered CSS while waiting for
  JavaScript. If animation fails, the page remains readable and operable.

Canonical shape:

```tsx
"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function HeroMotion() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power2.out" } })
        .from("[data-motion='title']", { y: 24, autoAlpha: 0, duration: 0.5 })
        .from("[data-motion='action']", { y: 12, autoAlpha: 0, duration: 0.35 }, "-=0.2");
    }, scope);

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-motion]", { x: 0, y: 0, autoAlpha: 1 });
    }, scope);

    return () => mm.revert();
  }, { scope });

  return <div ref={scope}>{/* semantic content */}</div>;
}
```

## Core And Timeline Rules

- Prefer GSAP transform properties (`x`, `y`, `xPercent`, `yPercent`, `scale`,
  `rotation`) and `autoAlpha` over raw transform strings or layout properties.
- Use a timeline for two or more coordinated steps. Use its position parameter
  and labels instead of chains of unrelated delays.
- Use design tokens for duration and easing. Normal individual transitions are
  120–600ms; longer sequences require a reason in the motion contract.
- When later `from()` or `fromTo()` tweens target the same property, set
  `immediateRender: false` where needed so the earlier state is not overwritten.
- Avoid infinite repeats, autoplay loops, or movement that blocks input.

## ScrollTrigger Rules

- Use ScrollTrigger only when the motion contract explicitly requires
  scroll-linked progress, pinning, or a coordinated reveal.
- Register the plugin once. Put `scrollTrigger` on the timeline or a top-level
  tween, never on a tween that is already a child of a timeline.
- Use `scrub` for scroll-linked progress or `toggleActions` for discrete
  playback; do not combine them without a documented reason.
- Do not animate the pinned element itself; animate its children. Do not use
  ScrollSmoother or other scroll hijacking.
- Call `ScrollTrigger.refresh()` after fonts, images, async content, or layout
  changes alter trigger positions.
- Create triggers in page order and keep them inside the same GSAP context so
  unmount cleanup removes them.
- Reduced-motion mode disables pinning and scroll-linked movement and renders
  the final content state directly.

## Plugins

Plugins are allowed only when the interaction needs them. Register only what
the route uses. SplitText, MorphSVG, Flip, Draggable, MotionPath, DrawSVG, and
other GSAP plugins must still satisfy the same accessibility, cleanup, and
performance gates. Revert SplitText and kill Draggable instances on cleanup.

## Performance And Accessibility Gates

- Animate transforms and `autoAlpha` by default; avoid layout thrashing.
- Use `will-change` only around active animation and remove it afterwards.
- Do not create a separate ScrollTrigger for a large homogeneous list when
  batching or a single timeline is sufficient.
- Keyboard interaction, focus order, announcements, and hit targets work while
  animation runs and after it completes.
- Motion never delays access to navigation, forms, or critical calls to action.
- The route must stay inside the LCP, CLS, and INP budgets in `docs/DESIGN.md`.

## Required Proof

For every changed user-facing route:

1. A normal-motion Playwright run triggers the documented behavior and asserts
   an observable start-to-final change. Prefer computed style, visibility, or
   an application state assertion over a fixed sleep.
2. A reduced-motion Playwright run asserts that all content is visible,
   keyboard-operable, and not pinned or continuously transformed.
3. The design review cites the route, trigger, and visible effect.
4. Lighthouse results remain within the design budget.
5. Review confirms animations are scoped and cleaned up when navigating away.

Static text searches for `gsap`, dependency installation, or screenshots alone
are supporting evidence; they do not prove that the effect runs.

## Do Not

- Do not satisfy the rule with an invisible, off-screen, or zero-duration tween.
- Do not make every element move or reuse the same reveal on every section.
- Do not turn a whole route into a Client Component only to animate one region.
- Do not use global selectors in reusable components.
- Do not leave timelines, ScrollTriggers, listeners, SplitText wrappers, or
  Draggable instances alive after unmount.
- Do not override an owner's explicit request for no motion.
