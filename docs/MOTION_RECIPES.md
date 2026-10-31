# Motion Recipes

Copyable GSAP patterns for the locked Next.js stack. Each recipe obeys
`docs/MOTION.md` (scoped `useGSAP`, reduced-motion branch, cleanup). Pick recipes
to fit the brief; do not use the same one on every section. Technical detail:
`docs/skills/gsap/*/SKILL.md`.

Shared setup in one client module (for example `app/lib/gsap.ts`):

```ts
"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // only if a recipe needs it

gsap.registerPlugin(useGSAP, ScrollTrigger);
export { gsap, useGSAP, ScrollTrigger };

/** Read a CSS token (duration, distance) from tokens.css. */
export const token = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();
export const seconds = (name: string) => parseFloat(token(name));
```

Every recipe runs inside this frame. Initial hidden states are set only inside
the no-preference branch, so content stays readable if JavaScript fails or the
user prefers reduced motion:

```tsx
const scope = useRef<HTMLElement>(null);

useGSAP(() => {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    /* recipe goes here */
  }, scope);
  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set("[data-motion]", { clearProps: "all", autoAlpha: 1 });
  }, scope);
  return () => mm.revert();
}, { scope });
```

## 1. Hero line reveal (hierarchy, mount)

```ts
gsap.timeline({ defaults: { ease: "power3.out" } })
  .from("[data-motion='eyebrow']", { autoAlpha: 0, y: 12, duration: 0.4 })
  .from("[data-motion='title']", { autoAlpha: 0, y: 32, duration: 0.7 }, "-=0.2")
  .from("[data-motion='lead']", { autoAlpha: 0, y: 16, duration: 0.5 }, "-=0.4")
  .from("[data-motion='action']", { autoAlpha: 0, y: 12, duration: 0.4, stagger: 0.08 }, "-=0.3");
```

## 2. Image settle (continuity, mount)

```ts
gsap.from("[data-motion='hero-image']", {
  scale: 1.08, autoAlpha: 0, duration: 1.1, ease: "power2.out",
});
```

Wrap the image in an `overflow: hidden` frame with a fixed aspect ratio so the
scale never shifts layout.

## 3. Section reveal with batching (hierarchy, scroll)

Use one batch for many similar items, not one ScrollTrigger each.

```ts
gsap.set("[data-motion='reveal']", { autoAlpha: 0, y: 24 });
ScrollTrigger.batch("[data-motion='reveal']", {
  start: "top 85%",
  once: true,
  onEnter: (els) =>
    gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out", overwrite: true }),
});
```

## 4. Scroll-linked progress (cause and effect)

```ts
gsap.timeline({
  scrollTrigger: { trigger: "[data-motion='story']", start: "top 70%", end: "bottom 40%", scrub: true },
}).fromTo("[data-motion='story-line']", { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, ease: "none" });
```

Do not pin without a reason recorded in the motion contract. Reduced motion
renders the final state.

## 5. Clip-path image reveal (expressive)

```ts
gsap.fromTo("[data-motion='clip']",
  { clipPath: "inset(0 0 100% 0)" },
  { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power3.inOut",
    scrollTrigger: { trigger: "[data-motion='clip']", start: "top 80%", once: true } });
```

## 6. Interaction feedback with `contextSafe` (feedback)

```tsx
const { contextSafe } = useGSAP({ scope });
const onToggle = contextSafe((open: boolean) => {
  gsap.to(panelRef.current, { height: open ? "auto" : 0, autoAlpha: open ? 1 : 0, duration: 0.35, ease: "power2.out" });
});
```

Animating `height` is an allowed exception for disclosure panels only; record it
in the motion contract. Focus management must not depend on the tween.

## 7. Menu or dialog open (cause and effect)

```ts
const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } })
  .from(overlayRef.current, { autoAlpha: 0, duration: 0.25 })
  .from("[data-motion='menu-item']", { y: 16, autoAlpha: 0, stagger: 0.05, duration: 0.35 }, "-=0.1");
// open: tl.play(); close: tl.reverse(). Esc closes and focus returns to the trigger.
```

## 8. Number emphasis (expressive)

```ts
const obj = { v: 0 };
gsap.to(obj, {
  v: target, duration: 1.2, ease: "power1.out", snap: { v: 1 },
  onUpdate: () => { el.textContent = String(obj.v); },
  scrollTrigger: { trigger: el, start: "top 85%", once: true },
});
```

The final number must already be in the HTML so reduced-motion and no-JS users
read it.

## Choosing

| Goal | Recipe |
| --- | --- |
| First impression | 1 + 2 |
| Reading flow down the page | 3, sparingly 4 |
| Premium feel | 5 on one feature image only |
| Controls and navigation | 6, 7 |
| Proof points | 8 |

Rule of thumb: one signature moment per page, quiet everywhere else. Prove each
recipe with `docs/templates/starter/e2e/motion.spec.ts`.
