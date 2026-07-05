# Code Conventions

Code style, naming, Tailwind conventions, error handling, and validations.

---

## Naming

| Thing | Convention | Example |
|---|---|---|
| Components (files and functions) | PascalCase | `EditSpotModal.jsx` → `EditSpotModal` |
| Hooks | camelCase, `use` prefix | `useCreateSpot.js` → `useCreateSpot` |
| Mutation hooks | `use` + `Create`/`Update`/`Delete` + Resource | `useCreateSpot`, `useDeleteFloor` |
| Services | camelCase, verb + Resource + `Service` | `createSpotService`, `getAllFloorsService` |
| Constants (objects) | camelCase | `modalStyles`, `vehicleTypesConstant` |
| UI / domain variables | **Spanish** | `placa`, `vehiculo`, `tarifa`, `montoPagado` |
| Technical variables | English | `loading`, `error`, `isOpen`, `form` |
| Query keys | `["resource"]` or `["resource", filters]` | `["entries", filters]` |
| HTML IDs | `kebab-case` with resource prefix | `confirm-button`, `plates-menu` |

**Function components are always default export.** Hooks and services are **named exports**.

---

## Component structure

```jsx
// 1. Imports grouped by type, separated by blank lines
// Hooks
import { useState } from "react";
import { useCreateX } from "@/modules/x/hooks/useCreateX";
// Components
import FormField from "@components/ui/FormField";
// Modals
import Modal from "@modals/Modal";
// Constants
import { xTypes } from "@/modules/x/constants/xTypes";

// 2. Default export component
export default function XModal({ onClose, data }) {
  // 3. Hooks first
  const { handleSubmit, loading } = useCreateX();
  const [open, setOpen] = useState(false);

  // 4. Handlers
  function handleClick() { ... }

  // 5. Render
  return ( ... );
}
```

**Rules:**
- No inline comments unless the code is genuinely cryptic.
- No `console.log` in commits.
- Don't use `React.FC` — plain function with destructured props.
- Don't use `useEffect` to derive state. If a value is computed from props/state, compute it directly in render.

---

## Tailwind

- Tailwind classes inline, **no `@apply`** in CSS.
- Order is free (Tailwind has no official order), but the most used pattern here is: layout → spacing → sizing → color → state.
- For dark mode: `dark:` after the light equivalent. E.g.: `bg-white dark:bg-black`.
- Custom colors (theme colors) used inline with `[]` to keep JIT validation: `bg-[#fbf9fc] dark:bg-[#101012]`. When a color repeats more than 2 times → constant or CSS variable.
- Responsive: mobile-first. Breakpoints in the repo: `sm`, `md`, `lg`, `xl`, `2xl`.
- Fonts: `font-inter`, `font-dmsans`, `font-poppins`. Apply to whole sections, not every element.

**Anti-patterns:**
- Don't use `style={}` for things Tailwind can do.
- Don't hardcode `#fff` or `#000` when there are tokens (`bg-white`, `bg-black`).
- Don't repeat the same block of 5+ classes → extract to a component.

---

## Forms

### Validation: `useFormValidation`

Global hook in `@hooks/useFormValidation`. API:

```js
const { validate, fieldError, getChanges, clearError, clearErrors } = useFormValidation(rules, optionalFields);

// validate(data) → boolean, fills errors{} internally
// fieldError(name) → string of Tailwind classes to apply to the input with error
// getChanges(original, updated) → { key: value } only for keys that changed
// clearError(name) / clearErrors() → clear
```

For custom rules: pass `rules` and `optionalFields` to the constructor. Otherwise, default = "all fields required, non-empty".

### Inputs: `FormField`

```jsx
<FormField
  id="plate"
  name="plate"
  labelText="Placa"
  value={form.plate}
  onChange={handleChange}
  className={fieldError("plate")}     // class when there's an error
  autoComplete="off"
/>
```

For passwords with visibility toggle, see `ChangePasswordModal.jsx:38-77` as a reference.

### Selects: `SelectMenu`

`@modals/SelectMenu`. Key props: `value`, `onChange`, `options={[{value, label}]}`, `searchable`, `showAllOption`, `miniVersion`.

Internally uses `useSelectMenu` and opens its own modal with the list. To add a "Todos" option, `showAllOption` prepends it automatically.

---

## Error handling

### In services

```js
const response = await fetchWithAuth(url, options);
const json = await response.json();

if (!response.ok) {
  return { error: json.detail || "Request error", data: null };
}

return json;   // { success, data, message, ... } depending on the backend
```

The service **doesn't throw** except in GETs where we want `useQuery` to mark `error`. For POST/PUT/DELETE we return `{ success, data, error, message }` and the hook decides.

### In hooks (mutations)

See pattern in `architecture/SKILL.md`. Summary:
- `success: true` → invalidate queries + `openInnerModal("success", trigger)`.
- `success: false` or `catch` → `setError(msg)` + `openInnerModal("error", trigger)`.
- `validate()` failed → `openInnerModal("error", trigger)` and cut.

### In queries

- `query.isLoading` → show `<Skeleton>`.
- `query.error` → show empty state or message. **Don't** show technical error to the user.
- Empty state: `data.length === 0 && !isLoading` → "No X registered" message with icon.

---

## React Query — anti-patterns

- ❌ Doing `setState(data)` with the result of a query → use `useQuery` directly in the component.
- ❌ `useQuery` without a valid `queryKey` (inline objects break cache). Memo if complex.
- ❌ Forgetting `invalidateQueries` in a mutation → stale data.
- ❌ Mutations without `try/finally` → `loading` stays true.
- ❌ Mixing `useState` for server data → all server state in TanStack Query.

---

## Performance

- Long lists → React reconciles them well. If it passes 200 items, consider virtualization.
- Unnecessary re-renders → avoid context, prefer TanStack Query (which handles it well).
- FLIP modal animations → expensive. Don't nest 3 modals with shared elements at once.

---

## ESLint

Configured in `eslint.config.js` with `@eslint/js`, `react-hooks`, `react-refresh`. Run `npm run lint` before commit. Typical errors:

- `no-unused-vars` — unused variables/imports.
- `react-hooks` rules — `useEffect`/`useCallback` dependencies.

**Never** suppress rules with `// eslint-disable` unless strictly necessary and with a comment explaining why.

---

## Design system

The visual language of the app. Use these tokens; don't invent new colors or shadow values.

### Color tokens

**Backgrounds (light → dark):**

| Use | Light | Dark |
|---|---|---|
| Page background | `#fbf9fc` | `#000` / `#0a0a0a` |
| Card / panel | `#f5f3f6` | `#101012` |
| Hover surface | `#e5e7eb` / `#efedf0` | `#202022` / `#181818` / `#1e1e20cb` |
| Subtle surface | `#efedf0` | `#121214` |
| Input / button neutral | `#FBF9FC` | `#000` |
| Modal inner | `#fbf9fc` | `#000` |

**Text (light → dark):**

| Use | Light | Dark |
|---|---|---|
| Primary | `#1b1b1e` / `#44474e` | `#E4E2E5` / white |
| Secondary / muted | `#75777E` / `#7E777E` | `#7E8088` / `#75777eb7` |
| Disabled | `#0000007a` | `#b4aab4` |
| Placeholder | `#1b1b1e52` / `#7E7777` | `#b4aab4` |

**Borders (light → dark):**

| Use | Light | Dark |
|---|---|---|
| Default | `#e5e7eb` / `#EBE6E7` | `#202022` / `#1e1e20cb` / `#28282b` |
| Strong | `#c3c4c794` | `#202022` |

**Accent:**

| Use | Hex |
|---|---|
| Success (modal) | `#22c55e` / bg `#dcfce7` light, `#052e16` dark |
| Error (modal) | `#dc2626` / bg `#fee2e2` light, `#450a0a96` dark |
| Disabled status | bg `#f3f4f6` light, `#111827` dark |
| Active status | bg `#dcfce7` / text `#16a34a` light, `#1e1e20cb` dark |
| "In use" status | bg `#dbeafe` / text `#1d4ed8` light, `#172554` dark |

**In code:** use Tailwind tokens when they exist (`bg-white`, `bg-black`, `text-gray-500`, `border-gray-200`). For the project-specific hex codes, use inline `bg-[#fbf9fc] dark:bg-[#101012]`. Don't add the hex code as a class extension unless it's used in 3+ places.

### Typography

- **Inter** — body, navigation, KPIs (default).
- **DM Sans** — landing, modals, big numbers, customer-facing pages.
- **Poppins** — auth pages (login, register, recover).
- Apply to sections, not individual elements.
- Weights used: 300, 400, 500, 600, 700.

### Spacing scale

Default Tailwind scale. Common patterns in the repo:
- Card padding: `p-6` to `p-7`.
- Section gaps: `gap-3` to `gap-7`.
- Form field height: `h-16` (66px, with floating label).
- Button height: `h-11` to `h-16`.

### Border radius

| Use | Class |
|---|---|
| Buttons, inputs | `rounded-2xl` / `rounded-3xl` |
| Cards / panels | `rounded-2xl` |
| Hero / big panels | `rounded-[50px]` |
| Pills (nav items) | `rounded-full` / `rounded-3xl` |
| Modals (default) | `rounded-[32px]` |
| Modal (logIn, register) | `md:rounded-[32px]` (full-screen on mobile) |
| Modal (menu) | `rounded-[40px]` |
| Modal (select, calendar) | `rounded-[32px]` |

### Shadows

- `shadow-sm` — inputs, default cards.
- `shadow-lg` — modals.
- `shadow-[0px_0px_20px_-2px_#EBE6E7]` — nav floating (light).
- `dark:shadow-[0px_0px_10px_5px_#ffffff14]` — nav floating (dark).
- `shadow-[0_0_2.5px_1px_#f87171]` — input error (light).
- `dark:shadow-[0_0_4px_1.5px_#7f1d1d]` — input error (dark).

### Animations (Tailwind utilities)

Defined in `index.css` via `@theme`:
- `animate-blur-up` — fade + translateY 10px → 0, 0.3s.
- `animate-blur-down` — fade + translateY -5px → 0, 0.8s.
- `animate-rotation` — 360° spin, 0.8s linear infinite (loaders).
- `animate-shake` — horizontal shake on input error.
- `animate-shimmer` — skeleton loading gradient.
- `animate-jump` — bouncing arrow on landing.
- `animate-clickEffect` — pulse on active nav item.
- `animate-grow-in` / `animate-grow-out` — nav item text reveal.

Use these instead of writing custom CSS animations. For complex animations (modal FLIP, shared elements), use the system in `.agents/animations/SKILL.md`.

---

## Manual verification (no tests)

The project has **no automated tests**. Every PR is verified manually. Use this checklist.

### Before opening a PR

1. **Lint:** `npm run lint` — zero errors, zero warnings.
2. **Build:** `npm run build` — completes without errors.
3. **Dev server:** `npm run dev` — no console errors on initial load.

### Per-module smoke test

For the module you touched, verify in the browser:

1. **Happy path:** create / read / update / delete works end-to-end.
2. **Empty state:** what shows when there's no data? (Skeleton on first load, empty message after.)
3. **Error state:** disconnect the backend, see that the error modal appears and the message is human-readable.
4. **Loading state:** throttle network to "Slow 3G" in DevTools, see the Loader inside the confirm button.
5. **Form validation:** submit empty, see red shadow on fields + shake animation.
6. **Modal animation:** open and close the modal, verify the FLIP animation looks right and shared elements (icon, title) animate smoothly.
7. **Dark mode:** toggle theme in profile → Apariencia, verify every color has a `dark:` variant and there's no white-on-white or black-on-black.
8. **Responsive:** open DevTools device emulation, test `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px). Layout shouldn't break.

### Auth flow (if you touched anything auth-related)

1. Log in as Admin → lands on `/home`.
2. Log in as Cliente without onboarding → lands on `/on-boarding`.
3. Log in as Cliente with onboarding done → lands on `/check-in`.
4. Log out → lands on `/` and queryClient is cleared.
5. Wait for access token to expire → make a request → it refreshes silently, no user-visible disruption.
6. Wait for refresh token to expire → user is redirected to `/`.

### Cross-browser (only if the change is layout-heavy)

- Chrome (primary)
- Firefox
- Safari (if you have it — animations and FLIP can behave differently)

### Screenshots

For PRs with visual changes, attach before/after screenshots in the description. Use light + dark mode. Mobile + desktop if it's a layout change.
