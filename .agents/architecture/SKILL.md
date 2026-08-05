# Architecture

Structure decisions, where each file goes, how cross-cutting systems work.

---

## Folder structure

```
src/
├── App.jsx                  # BrowserRouter + mount point
├── main.jsx                 # createRoot + QueryClientProvider
├── assets/                  # SVGs and static assets (icons/*.svg)
├── config/                  # Global config (apiRoutes)
├── globals/                 # Reusable code across modules
│   ├── components/
│   │   ├── Layout/          # Main layout (Aside, Navbar)
│   │   ├── modals/          # Global modals (Modal, ErrorModal, SelectMenu, etc.)
│   │   └── ui/              # UI primitives (Icon, FormField, Loader, Skeleton)
│   ├── constants/           # Global constants (vehicleTypes, modalStyles)
│   ├── hooks/               # Global hooks (useCurrentUser, useFlipModal, useTheme)
│   ├── services/            # Global services (auth, current user)
│   └── styles/              # Global CSS + Tailwind entry
├── modules/                 # One folder per feature/page
│   ├── <feature>/
│   │   ├── components/      # Module-specific UI
│   │   │   ├── ui/          # Tables, KPIs, panels
│   │   │   └── modals/      # Module-specific modals
│   │   ├── constants/       # Module constants (modalTitles, enums)
│   │   ├── hooks/           # Module hooks (useX.js, useCreateX.js)
│   │   ├── services/        # HTTP calls (getAllX, createX, updateX, deleteX)
│   │   └── <Feature>Page.jsx
├── router/                  # AppRouter, ProtectedRoutes, routesConfig
└── utils/                   # Pure helpers (buildQueryParams, fetchWithAuth, format*)
```

**Rules:**
- A new module = a new folder in `src/modules/<name>/`.
- Only goes in `globals/` what **at least 2 different modules** consume.
- If in doubt, it goes in `modules/<x>/`. Promote to `globals/` only when it hurts.

---

## Routing

Central config in `src/router/constants/routes.js`. Two arrays: `layoutRoutes` (wrapped in the global `Layout`, with `Aside` + topbar) and `standAloneRoutes` (rendered bare, no chrome). Each entry:

```js
{
  path: "/users",
  component: UsersPage,
  roles: ["Admin"],            // who can access
  loading: UsersLoading,       // skeleton shown while the page is being lazy-loaded
}
```

`AppRouter.jsx` does the actual rendering. All page components are `lazy()`-loaded and wrapped in a `<Suspense>` that uses the entry's `loading` component as fallback.

**To add a new route:**
1. Create the page in `src/modules/<x>/<X>Page.jsx` (default export).
2. Add the entry to `layoutRoutes` (inside `Layout`) or `standAloneRoutes` (no chrome) in `routes.js` with `path`, `component`, `roles`, and `loading` (a skeleton component).
3. If public (no auth, no role), add it directly in `AppRouter.jsx` next to `LandingPage` — the cookie/privacy/terms pages live there.

`ProtectedRoutes` validates against `useCurrentUser().hasRole(roles)`. If the user doesn't have the role, is loading, or the request errors → `<Navigate to="/login" replace />`.

**Existing routes:**

| Path | Role | Group | Module |
|---|---|---|---|
| `/` | public | — | landing |
| `/login` | public | — | (alias of `/`) |
| `/privacy-policy` | public | — | privacy-policy |
| `/terms` | public | — | terms |
| `/cookies` | public | — | cookies |
| `/on-boarding` | Admin | standAlone | on-boarding |
| `/home` | Admin | layout | home |
| `/users` | Admin | layout | users |
| `/entries` | Admin | layout | entries |
| `/parking` | Admin | layout | parking |
| `/calendar` | Admin | layout | calendar |
| `/exits` | Admin | layout | exits |
| `/finance` | Admin | layout | finance |
| `/vehicle-payment` | Cliente | standAlone | vehicle-payment |
| `/check-in` | Cliente | standAlone | check-in |

Unknown paths hit the catch-all `<Route path="*" element={<Navigate to="/" />} />`.

---

## Modal system

**Every modal goes inside the global `Modal`.** Never create `<dialog>` or own portals.

### System hooks

- `useModal()` (`@hooks/useModal`) — main modal of a component. Returns `{ isOpen, modalType, modalData, triggerRef, openModal(data, type, ref), closeModal }`.
- `useInnerModal()` (`@hooks/useInnerModal`) — modal nested inside another modal (e.g. ErrorModal on top of CreateUserModal). Returns `{ innerType, innerTrigger, openInnerModal(type, event), closeInnerModal }`.
- `useFlipModal()` (`@hooks/useFlipModal`) — FLIP animation + shared elements. Used by `Modal.jsx` internally. Don't touch unless you know what you're doing.

### Anatomy of a custom modal

```jsx
// Inside a "page" component:
const { isOpen, modalType, triggerRef, openModal, closeModal } = useModal();

<button onClick={(e) => openModal(data, "createUser", e.currentTarget)}>
  Create
</button>

{modalType && (
  <Modal
    isOpen={isOpen}
    type={modalType}
    title={modalTitles[modalType]}
    onClose={closeModal}
    triggerRef={triggerRef}
    location={modalType === "createUser" ? "center" : "anchored"}
    growDirection="bottom-center"
  >
    {modalType === "createUser" && <CreateUserModal onClose={closeModal} />}
  </Modal>
)}
```

### Modal types and their styles

Defined in `src/globals/constants/modals.js` (exported as `modals`). Each key defines layout (width, padding, border-radius), an optional `location`, an optional `growDirection`, and an optional `title`. Use the right key instead of inventing styles. Per-module styles (e.g. users, parking) live in `src/modules/<x>/constants/modals.js` and override the global one.

- `default` — generic modal
- `createFloor` / `editFloor` / `editSpot` / `editTariff` / `editReservation` — centered forms
- `filter` — anchored filters (no header, `growDirection: "bottom-center"`)
- `select` — dropdowns
- `menu` — user menu
- `user` — profile/settings modal (`location: "center"`)
- `calendar` — date picker
- `timePicker` — time-only picker
- `entryInfo` / `dayInfo` — full-screen detail panels on mobile
- `chat` — chat overlay
- `logIn` / `register` — full-screen on mobile, large on desktop
- `export` / `search` — anchored utility modals (no header)
- `topSectionMobileOptions` — mobile overflow menu
- `delete` — delete confirmation

### Errors and success in forms

Every mutation must show feedback. Standard pattern:

```jsx
const { innerType, innerTrigger, openInnerModal, closeInnerModal } = useInnerModal();
const { handleSubmit, loading, error } = useCreateX();

return (
  <Modal ...>
    {/* form */}
    <ConfirmCancelButtons onClick={(e) => handleSubmit(e, openInnerModal, onClose)} />

    {innerType === "success" && (
      <SuccessModal triggerRef={innerTrigger} isOpen={true} onClose={onClose} ... />
    )}
    {innerType === "error" && (
      <ErrorModal triggerRef={innerTrigger} isOpen={true} onClose={closeInnerModal} ... />
    )}
  </Modal>
);
```

The `triggerRef` (passed to `openInnerModal`) is used as the anchor point for the FLIP animation of the nested modal — **always** get it from the event with `e.currentTarget` (or use `getModalTrigger(e)` in hooks).

---

## Data fetching

Server state → **TanStack Query**. Never `useEffect` + manual `fetch`.

### Structure per feature

```
modules/<x>/
├── services/
│   ├── getAllXService.js     # GET with query params
│   ├── createXService.js     # POST
│   ├── updateXService.js     # PUT
│   └── deleteXService.js     # DELETE
└── hooks/
    ├── useX.js               # useQuery wrapper
    ├── useCreateX.js         # useState + service + invalidateQueries
    ├── useUpdateX.js
    └── useDeleteX.js
```

### `useQuery` conventions

- `queryKey` always an array. For lists with filters: `["resource", filters]`.
- `staleTime` appropriate to the resource (default 60s; 10s if it refreshes often).
- `refetchInterval` only on data that changes live (entries, exits, spots, floors, tariffs) — between 10s and 25s.
- `refetchIntervalInBackground: false` always.
- `refetchOnWindowFocus: true` always (except `useCurrentUser` which has staleTime 1h).

### Mutation pattern

```js
async function handleSubmit(e, openInnerModal, onClose) {
  e.preventDefault();
  const triggerButton = getModalTrigger(e);

  const isValid = validate(form);
  if (!isValid) {
    openInnerModal("error", triggerButton);
    return;
  }

  setLoading(true);
  try {
    const response = await createXService(form);
    if (response.success === true) {
      await queryClient.invalidateQueries({ queryKey: ["x"] });
      await queryClient.invalidateQueries({ queryKey: ["xStats"] });
      openInnerModal("success", triggerButton);
    } else {
      setError("Couldn't create X, try again later.");
      openInnerModal("error", triggerButton);
    }
  } catch {
    setError("Couldn't create X, try again later.");
    openInnerModal("error", triggerButton);
  } finally {
    setLoading(false);
  }
}
```

**Rule:** every mutation that affects lists must invalidate **all** queryKeys that render that resource (the list + stats + related lists). E.g.: creating a spot → invalidate `["spots"]` and `["availableVehicleTypes"]` if applicable.

---

## API and authentication

- Base URL: `import.meta.env.VITE_API_URL`
- API routes: `src/config/apiRoutes.js` — each resource is a string (`"/users"`, `"/spots"`, `/auth`, `/countries`, `/chatbot`, etc.). Compose URLs as `${apiRoutes.apiUrl}${apiRoutes.<resource>}/<action>`.
- Auth: HttpOnly cookies. The frontend **never** touches tokens.
- Auto refresh: `src/utils/fetchWithAuth.js` intercepts 401, calls `/auth/refresh`, retries. If refresh fails → `window.location.href = "/login"` (full page reload — see `auth-flow/SKILL.md` for the known-issue note and proposed fix).
- Public endpoints (no auth): `login`, `register`, `recover-password`, `refresh`, `google`. Use `fetch` directly for these, or call from `src/globals/services/` only if the whole codebase needs them.

---

## Theming

- `useTheme()` (`@hooks/useTheme`) — persists in `localStorage` (only exception to the no-localStorage rule). Values: `"system"`, `"light"`, `"dark"`.
- Dark mode: `.dark` class on `<html>`. Tailwind 4 dark variant configured in `index.css` with `@custom-variant dark (&:where(.dark, .dark *))`.
- **Rule:** every hardcoded color must have its `dark:` variant (or a value that works in both modes via Tailwind tokens).

---

## Assets and SVG

- Icons: `@components/ui/Icon` (Material Symbols Rounded, font loaded in `Icon.jsx`).
- Custom logos / SVG icons: `src/assets/icons/*.svg` imported as React components with `?react` (vite-plugin-svgr).
- Public images: `public/` (accessible as `/parking-logo.svg` in the HTML).
