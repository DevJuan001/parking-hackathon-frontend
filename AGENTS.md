# AGENTS.md

Context guide for agents working on this project. **Read this file before making any changes.** Conventions, architecture, and processes are detailed in the skills under `.agents/`.

---

## Project

**Name:** `parking-hackathon-frontend`
**Stack:** React 19 + Vite 8 + Tailwind CSS 4 + React Router 7 + TanStack Query 5 + GSAP
**Backend:** REST API with cookie-based auth (access + refresh), base URL on `VITE_API_URL`
**Roles:** `Admin` and `Cliente` (route protected by role)
**UI:** System-default light/dark mode, fonts Inter / DM Sans / Poppins, icons Material Symbols Rounded

## Commands

| Task | Command |
|---|---|
| Dev server | `npm run dev` |
| Prod build | `npm run build` |
| Preview build | `npm run preview` |
| Lint | `npm run lint` |

Always run `npm run lint` before closing a task. No typecheck (pure JS, not TS).

---

## Import aliases

Configured in `vite.config.js` and `jsconfig.json`. Use the most specific one available:

| Alias | Resolves to |
|---|---|
| `@` | `src/` |
| `@components` | `src/globals/components/` |
| `@modals` | `src/globals/components/modals/` |
| `@hooks` | `src/globals/hooks/` |

```jsx
// ✅ Correct
import Modal from "@modals/Modal";
import { useTheme } from "@hooks/useTheme";
import HomePage from "@/modules/home/HomePage";

// ❌ Avoid (long relative paths)
import Modal from "../../../../globals/components/modals/Modal";
```

Short relative paths **within the same module** (e.g. `./hooks/useX` from a module component) are fine — don't migrate them to aliases unnecessarily.

---

## Workflow: requirement → design → implementation

**Every task the user requests follows this 3-phase flow. Don't skip phases.**

### 1. Requirement (what)
- Restate the request in 1-2 sentences.
- Identify the affected module (`src/modules/<x>/`) or if it's cross-cutting.
- List observable acceptance criteria (UI, endpoints, validations).
- If anything is ambiguous, ask **before** starting. Don't assume.

### 2. Design (how)
Before touching code:
- **Routing:** does it affect routes? If yes, add an entry in `src/router/constants/routesConfig.js` with its `roles`.
- **Data:** does it need a new endpoint? The contract goes in `apiRoutes` (`src/config/apiRoutes.js`) and the service in `src/modules/<x>/services/`. Hook in `src/modules/<x>/hooks/` using `useQuery` (GET) or `useState` + service (mutations).
- **UI:** new component, modification, or modal? Decide if it goes in `globals/components/` (reusable across modules) or `modules/<x>/components/` (specific).
- **Modals:** they use the global `Modal` with `useFlipModal` (FLIP animation + shared elements). Review `.agents/architecture/SKILL.md` before inventing a new one.
- **Errors:** every form uses `useInnerModal` to show `ErrorModal` / `SuccessModal`. Every mutation invalidates relevant queries with `queryClient.invalidateQueries`.
- **Dark mode:** every color must have its `dark:` variant.

### 3. Implementation (do)
- Create the service, the hook, the components following the module's structure.
- Use aliases. No unnecessary comments.
- Names in Spanish for UI/domain, English for technical variables.
- Verify with `npm run lint` before closing the task.

---

## Skills

Detailed context, read the relevant skill before acting:

| Skill | When to read it |
|---|---|
| `.agents/architecture/SKILL.md` | Structure decisions, where each file goes, how the modal / routing / data fetching system works |
| `.agents/code-conventions/SKILL.md` | Code style, naming, Tailwind conventions, error handling, validations |
| `.agents/commits-and-prs/SKILL.md` | Commit format, branches, PR description |

---

## Hard rules (non-negotiable)

1. **Don't break the modal system.** Any new modal goes inside a global `Modal`. Don't create your own `<dialog>` or portals.
2. **Don't introduce custom global state.** For shared state: TanStack Query (server state) or prop drilling. If something needs context, justify it.
3. **Don't add dependencies without asking.** If a feature needs a new lib, explain it before installing.
4. **Don't hardcode URLs or long strings.** Constants in `src/config/` or `src/modules/<x>/constants/`. Repeated UI strings → constant.
5. **Don't use `localStorage` for anything but `theme`.** Auth is handled by HttpOnly cookies from the backend.
6. **Every mutation must invalidate queries.** `queryClient.invalidateQueries({ queryKey: [...] })` with the correct key.

---

## Common anti-patterns in this repo (avoid)

- Creating a `useEffect` to sync local state when it can be derived.
- Passing refs or modal callbacks with magic strings — use `useInnerModal` and constants.
- Repeating the same `useQuery` config in 5 files. If it happens, extract to a helper.
- Forgetting the `dark:` variant on hardcoded colors.
- Importing sibling-module components with relative paths — use `@/modules/<x>/...`.
