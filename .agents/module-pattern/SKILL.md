# Module Pattern

How to create a new module correctly. Every existing module (`users`, `parking`, `entries`, `exits`, etc.) follows the same structure. This skill codifies it so new modules fit the project.

---

## When to create a new module

Create a new module when:
- You're adding a new top-level page (new route in `routesConfig.js`).
- You're adding a feature that has its own state, services, and UI distinct from existing modules.

**Don't** create a new module for:
- A small UI change to an existing page → add to `modules/<existing>/components/`.
- A reusable component used by 2+ modules → goes in `globals/components/`.
- A new endpoint that doesn't have its own page → add the service to an existing module.

When in doubt, fit it into the most similar existing module. Promote to a new module only when it grows.

---

## Folder structure (template)

```
src/modules/<feature-name>/
├── <FeatureName>Page.jsx       # Entry component, default export
├── components/
│   ├── ui/                     # Tables, panels, KPIs, lists
│   │   ├── <Feature>Kpi.jsx
│   │   ├── <Feature>Kpis.jsx
│   │   ├── <Feature>Table.jsx
│   │   └── ...
│   └── modals/                 # Module-specific modals
│       ├── Create<Resource>Modal.jsx
│       ├── Edit<Resource>Modal.jsx
│       └── ...
├── hooks/                      # React Query wrappers + mutation hooks
│   ├── use<Resource>.js        # useQuery
│   ├── use<Resource>Stats.js   # useQuery for KPIs
│   ├── useCreate<Resource>.js
│   ├── useUpdate<Resource>.js
│   ├── useDelete<Resource>.js
│   └── useFilter<Resource>.js  # if filtering is non-trivial
├── services/                   # Pure HTTP functions
│   ├── getAll<Resource>sService.js
│   ├── create<Resource>Service.js
│   ├── update<Resource>Service.js
│   └── delete<Resource>Service.js
└── constants/
    └── modalTitles.js          # { createX: "...", editX: "...", filter: "Filtrar" }
```

**Naming convention:** `<feature-name>` in the folder is `kebab-case`. Component / file names are `PascalCase`. Service functions are `camelCase`.

**Don't add folders you don't need yet.** A module with one page and one modal doesn't need a `constants/` folder. Add folders as the module grows.

---

## File responsibilities

### `<FeatureName>Page.jsx`

The entry component. Responsibilities:
- Get the `useModal` state for the page.
- Fetch the data via the page-level hook (`useEntries`, `useUsers`, etc.) or multiple hooks.
- Render `<Layout>` (with optional `avatarOnClick` if it should open the user menu).
- Render `<TopSection>` with section name, add button, filter button.
- Render the data UI (tables, panels, KPIs).
- Render the `<Modal>` with the appropriate content based on `modalType`.

**Example skeleton:**

```jsx
import { useModal } from "@hooks/useModal";
import { modalTitles } from "./constants/modalTitles";
import Layout from "@components/Layout/Layout";
import TopSection from "@components/ui/TopSection";
import Modal from "@modals/Modal";
import { useX } from "./hooks/useX";
import CreateXModal from "./components/modals/CreateXModal";
import EditXModal from "./components/modals/EditXModal";

export default function XPage() {
  const { isOpen, modalType, modalData, triggerRef, openModal, closeModal } = useModal();
  const { xs, loading, filters, setFilters } = useX();

  return (
    <Layout>
      <TopSection
        sectionName="Recursos"
        addButtonText="Crear Recurso"
        createOnClick={(e) => openModal(null, "createX", e.currentTarget)}
        filterOnClick={(e) => openModal(null, "filter", e.currentTarget)}
      />

      <XTable xs={xs} loading={loading} openModal={openModal} />

      {modalType && (
        <Modal
          isOpen={isOpen}
          title={modalTitles[modalType]}
          type={modalType}
          onClose={closeModal}
          triggerRef={triggerRef}
          location={modalType === "createX" ? "center" : "anchored"}
          growDirection="bottom-center"
        >
          {modalType === "createX" && <CreateXModal onClose={closeModal} />}
          {modalType === "editX" && <EditXModal x={modalData} onClose={closeModal} />}
        </Modal>
      )}
    </Layout>
  );
}
```

### `components/ui/<X>Table.jsx`

A table that:
- Takes the data array + loading state as props.
- Renders three states: `noData`, `isFirstLoad` (Skeleton), `data` (rows).
- For each row, has action buttons that call `openModal(row, "editX", e.currentTarget)`.
- Uses `Skeleton` from `@components/ui/Skeleton` for the loading state.
- Uses `ActionButtons` from `@components/ui/ActionButtons` for edit/delete actions.

**Reference:** `src/modules/entries/components/ui/EntriesTable.jsx` (simple) or `src/modules/users/components/ui/UsersTable.jsx` (with status badges + action buttons).

### `components/ui/<X>Kpi.jsx` / `<X>Kpis.jsx`

Small stat cards. `Kpi` is a single card (title + value). `Kpis` is a row of them, fed by a `use<X>Stats` hook.

### `components/modals/Create<X>Modal.jsx` / `Edit<X>Modal.jsx`

Form modals. Pattern:
- Use `useCreate<X>` or `useUpdate<X>` hook for form state + submit.
- Use `useInnerModal` for error / success modals inside.
- Form fields use `FormField` and `SelectMenu` from globals.
- `ConfirmCancelButtons` for the submit/cancel.
- Show `ErrorModal` and `SuccessModal` based on `innerType`.

**Reference:** any of the parking modals (`CreateFloorModal.jsx`, `EditSpotModal.jsx`, etc.) is a good template.

### `hooks/use<X>.js` (list query)

```js
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAll<Resource>sService } from "../services/getAll<Resource>sService";

export function use<X>() {
  const [filters, setFilters] = useState({ /* initial */ });

  const query = useQuery({
    queryKey: ["<resource>s", filters],
    queryFn: () => getAll<Resource>sService(filters),
    refetchInterval: 25_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 60_000,
  });

  const xs = query.data?.data ?? [];

  return { xs, loading: query.isLoading, error: query.error, filters, setFilters };
}
```

### `hooks/useCreate<X>.js` (mutation)

```js
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getModalTrigger } from "@/utils/getModalTrigger";
import { useFormValidation } from "@hooks/useFormValidation";
import { create<X>Service } from "../services/create<X>Service";

export function useCreate<X>() {
  const [form, setForm] = useState({ /* initial */ });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const { validate } = useFormValidation();

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

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
      const response = await create<X>Service(form);
      if (response.success === true) {
        await queryClient.invalidateQueries({ queryKey: ["<resource>s"] });
        openInnerModal("success", triggerButton);
      } else {
        setError("No se pudo crear X, intentalo nuevamente mas tarde.");
        openInnerModal("error", triggerButton);
      }
    } catch {
      setError("No se pudo crear X, intentalo nuevamente mas tarde.");
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return { handleSubmit, handleChange, form, loading, error };
}
```

### `services/create<X>Service.js`

```js
import { apiRoutes } from "@/config/apiRoutes";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export async function create<X>Service(data) {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.<resource>}/create`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );

  const json = await response.json();

  if (!response.ok) {
    return { error: json.detail || "Error en la petición", data: null };
  }

  return json;
}
```

**Conventions for services:**
- Export named async functions ending in `Service`.
- Return `{ error, data: null }` on failure for POST/PUT/DELETE (so the hook can check `.success`).
- Throw on failure for GET (so `useQuery` marks the query as errored).
- Always go through `fetchWithAuth` for authenticated endpoints.
- Public endpoints (login, register) use plain `fetch`.

### `constants/modalTitles.js`

```js
export const modalTitles = {
  createX: "Crear X",
  editX: "Editar X",
  filter: "Filtrar",
};
```

If the module has many modals, this file keeps the page clean.

---

## Integration with the rest of the app

### Routing

Add the page to `src/router/constants/routesConfig.js`:

```js
{
  path: "/x",
  component: XPage,
  roles: ["Admin"],  // or ["Cliente"] or both
}
```

If public, add it directly in `AppRouter.jsx` outside the `.map()`.

### Sidebar (Aside)

Add an entry to `src/globals/constants/asideMenuItems.js`:

```js
{
  itemId: "x",
  name: "X",
  path: "/x",
  icon: "icon_name",  // Material Symbols name
  roles: ["Admin"],
}
```

`roles` on the sidebar item is used to filter the visible items per user. Make sure it matches the route's roles.

### API routes

Add the resource to `src/config/apiRoutes.js`:

```js
export const apiRoutes = {
  // ...
  x: "/x",
};
```

Use it in services: `${apiRoutes.apiUrl}${apiRoutes.x}/create`.

---

## What doesn't fit this pattern

- **On-boarding** (`src/modules/on-boarding/`) — has its own multi-section state, no list/stats. Folder is `service/` (singular) instead of `services/`. Don't use as a template for normal modules.
- **Landing** (`src/modules/landing/`) — public marketing page, not a CRUD module. Has its own data files and components.
- **Check-in** (`src/modules/check-in/`) and **vehicle-payment** (`src/modules/vehicle-payment/`) — single-screen flows with state machine (`activeSection`), no list/table/KPIs. Different structure but still useful as reference for similar flows.
