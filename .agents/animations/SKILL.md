# Animations

When to use CSS transitions, when to reach for GSAP, and how the FLIP modal system works.

---

## Decision tree

```
Need animation?
  ├─ Hover/focus state change (button, link, input)
  │    → Tailwind transition-* utilities (transition-colors, transition-all)
  │
  ├─ Page load effect (fade-in, blur-up)
  │    → Tailwind animate-* utilities (animate-blur-up, animate-blur-down)
  │
  ├─ Skeleton / loader / spinner
  │    → Tailwind animate-* (animate-shimmer, animate-rotation) or the <Loader> component
  │
  ├─ Form validation shake
  │    → animate-shake (already wired into useFormValidation's fieldError class)
  │
  ├─ In-place reveal (modal opening without a trigger element)
  │    → Modal type already handles this (Modal.jsx with location="center")
  │
  └─ Element morphs into another (modal opens from a button, shared elements)
       → GSAP FLIP via useFlipModal (the Modal system does this automatically)
```

**Rule of thumb:** if it fits in Tailwind utilities, don't write CSS. If you need element-to-element morphing (the modal opening FROM a button, not just appearing), use the existing modal system.

---

## Tailwind animation utilities

Defined in `src/globals/styles/index.css` under `@theme`. See `.agents/code-conventions/SKILL.md` for the full list. Key ones:

- `animate-blur-up` — fade + 10px slide. For content entering after page load.
- `animate-blur-down` — longer fade-in. For hero sections.
- `animate-rotation` — 360° spin. For `<Loader>`.
- `animate-shake` — horizontal shake. Wired to `useFormValidation`'s error class.
- `animate-shimmer` — moving gradient. For `<Skeleton>`.
- `animate-jump` — vertical bounce. For landing page arrows.
- `animate-clickEffect` — pulse. For active nav items.

**Don't add new animations to `index.css` without a real use case.** The existing set covers the app.

---

## The FLIP modal system

The interesting part: when a user clicks a button and a modal opens, the modal doesn't just appear — it visually "grows" from the button. When closing, it shrinks back. If a piece of the modal's content is already visible in the trigger (e.g. an icon, a title), that element "flies" smoothly between positions.

This is implemented in `src/globals/hooks/useFlipModal.js` (~1100 lines) using **GSAP + Flip plugin + CustomEase**. It runs inside `Modal.jsx` and triggers automatically when a modal opens with a `triggerRef`.

### How the trigger ref is captured

`useModal().openModal(data, type, ref)` takes a `ref` (or DOM element) as the third arg. Most call sites use `e.currentTarget`:

```jsx
<button onClick={(e) => openModal(spot, "editSpot", e.currentTarget)}>
  {spot.name}
</button>
```

`useModal` stores `{ element, rect }` where `rect` is `getBoundingClientRect()` at click time. `useFlipModal` uses this rect to start the FLIP animation from the right position.

**If you call `openModal(data, type)` without a ref**, the modal opens at `location="center"` with no FLIP animation. The user just sees a fade-in. This is the right behavior for modals that don't have a "natural" trigger (login modal opened from a nav button, error modals, etc.).

### `location` and `growDirection`

```jsx
<Modal
  location="center"        // or "anchored" (default)
  growDirection="bottom-right"  // or "top", "bottom-left", etc.
  triggerRef={triggerRef}
/>
```

- `location="anchored"` — modal anchors to the trigger. Where it appears is determined by `growDirection`.
- `location="center"` — modal appears in the center of the screen. No FLIP, no shared elements.
- `growDirection` — which corner of the trigger the modal grows FROM. Default is `"bottom-right"`. Determines which edge of the modal is "anchored" to the trigger.

**When to use what:**

- `location="center"` — forms (create/edit), error/success modals, anything that doesn't have a natural source element.
- `location="anchored"` — modals opened from a list item (e.g. edit spot modal from a spot card), filter modals from the filter button, user menu from the avatar.

### Shared elements (`data-shared-id`)

If a piece of content is in BOTH the trigger and the modal, you can make it "fly" between them with `data-shared-id`:

```jsx
// In the trigger (e.g. NavbarMenuModal avatar button)
<span data-shared-id="avatar">JD</span>

// In the modal (e.g. ProfileModal)
<img data-shared-id="avatar" src="/jd.jpg" />
```

When the modal opens, a "phantom" clone of the source element is created and animated to the target's position. The original target is hidden until the animation completes. On close, the inverse happens.

**In practice:** the codebase uses this sparingly:
- `data-shared-id="login-modal-title"` — the "Iniciar sesión" text in the Hero, and the "Iniciar sesión" title in the LoginModal.

If you want to add more shared elements, just add the same `data-shared-id` to the corresponding DOM in both places. The animation system picks it up automatically.

---

## Common pitfalls

### 1. Calling `openModal` without a ref when you wanted FLIP

If you do `onClick={() => openModal(data, "editSpot")}` (no `e.currentTarget`), the modal opens centered with no animation. Add the ref.

### 2. `useInnerModal` ref passing

When you call `openInnerModal("error", e)` from inside a modal, the `e` is the click event. `useInnerModal` reads `e.currentTarget.getBoundingClientRect()` and uses that as the trigger for the inner modal's FLIP. If you pass a synthetic object instead of an event, the inner modal won't have a proper ref and will just appear centered.

**Correct:** `openInnerModal("error", e)` where `e` is the click event.
**Wrong:** `openInnerModal("error", { element: btn, rect: btn.getBoundingClientRect() })` — that's the manual form, easy to get wrong.

**In hooks (where `e` is the submit event),** use `getModalTrigger(e)` to get the trigger:

```js
const triggerButton = getModalTrigger(e);
openInnerModal("error", triggerButton);  // works
```

### 3. The trigger element is `display: none` or has `visibility: hidden`

FLIP needs the trigger to be measurable. If you hide the trigger behind a parent that has `overflow-hidden` and a small height, the rect can be wrong. Common culprit: the trigger is inside a `tr` with `overflow-hidden`. Avoid that.

### 4. Custom CSS transitions on the trigger

If the trigger has `transition-all` (very common in Tailwind), GSAP will fight with the browser's transition during the FLIP animation. The `useFlipModal` hook kills these transitions internally for the trigger during the animation, but if you add new transition classes to your trigger, check that the animation still looks right.

### 5. Nested modals with shared elements

`useFlipModal` scopes shared elements by `data-flip-modal-id` so two open modals don't fight. But if you open 3 modals in quick succession, the cleanup can get hairy. The rule: don't open 3 modals with FLIP at once.

---

## When to introduce a new animation

Don't add a new Tailwind animation to `index.css` or a new GSAP tween in a component unless:
- An existing animation truly doesn't fit.
- You've discussed with whoever reviews the PR (or yourself, if solo).

Most "I need an animation" moments are solved by `animate-blur-up` or by the modal system. Reach for those first.

If you genuinely need a new one:
- For a one-off effect (e.g. a button that pulses when ready), use inline `className="animate-[my-animation_0.5s]"` with a custom `@keyframes` in `index.css`.
- For complex orchestrated motion (multiple elements animating in sequence), GSAP via a small custom hook in `globals/hooks/`.
