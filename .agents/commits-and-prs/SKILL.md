# Commits & PRs

Commit format, branches, PR description.

---

## Branches

- `main` — production. Only merges via approved PR.
- `feat/<scope>-<short-desc>` — features. E.g.: `feat/parking-add-tariff`.
- `fix/<scope>-<short-desc>` — bugs. E.g.: `fix/login-redirect-on-401`.
- `chore/<desc>` — refactors, deps, config. E.g.: `chore/update-vite-config`.
- `docs/<desc>` — docs only. E.g.: `docs/add-agents-md`.

Scope = module name (`parking`, `users`, `landing`) or cross-cutting (`deps`, `eslint`, `vite`).

---

## Commits

Format: **Conventional Commits**, in English, no trailing period.

```
<type>(<scope>): <short description in imperative>
```

Types:
- `feat` — new feature
- `fix` — bug fix
- `chore` — refactor, tooling, dependencies
- `docs` — docs only
- `style` — formatting without logic change
- `refactor` — code change without fix or feature

Examples:
```
feat(parking): add create-spot modal with vehicle type selector
fix(auth): redirect to login when refresh token fails
chore(deps): bump vite to 8.0.16
docs: add AGENTS.md and skills
```

Commit body (optional, for non-trivial changes):

```
feat(parking): add create-spot modal with vehicle type selector

- Create createSpotService
- useCreateSpot hook with validation
- Modal with SelectMenu + FormField
- Invalidate "spots" query on success
```

---

## Pull Requests

### Title
Same format as commit. No `PR:` prefix or `#`.

### Description
```markdown
## What changes
- Observable bullet 1
- Observable bullet 2

## How to test
1. Concrete QA steps
2. ...

## Screenshots / videos
(optional, if there's a visual change)

## Notes
- Non-obvious design decisions
- Trade-offs
- Known TODOs
```

### Checklist before opening PR
- [ ] `npm run lint` passes with no errors.
- [ ] Tested in light and dark mode.
- [ ] Tested on mobile + desktop (if there's a layout change).
- [ ] No `console.log` or commented-out debug code.
- [ ] If I added a dependency, it's justified in the description.
- [ ] If I added a route, it's in `routesConfig.js` with its `roles`.
- [ ] If I added an endpoint, it's in `apiRoutes.js` and the service in `services/`.

### Review
- Minimum 1 approval before merge.
- Squash & merge to keep `main` clean.
- Delete the branch after merge.

---

## Hard rules

- **No direct commits to `main`.** Always via PR.
- **Don't mix change types** (no commit that's `feat + fix + chore`).
- **Small, focused commits.** If your PR is +800 lines without justification, split it.
- **Don't push credentials, .env, or secrets.** The `.gitignore` already excludes `.env`, verify.
- **Don't `--force` to `main`.** If you need to rewrite history of your own branch, ok; of `main`, never.
