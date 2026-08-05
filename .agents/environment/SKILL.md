# Environment & Config

Env vars, `.env` handling, Vite config, and the small things you need to know to not break the build.

---

## Env vars

The project reads **three** env vars at build/runtime:

| Var | Purpose | Required? |
|---|---|---|
| `VITE_API_URL` | Base URL of the backend API. | Yes |
| `VITE_GOOGLE_CLIENT_ID` | OAuth client ID for Google sign-in. | Only if Google login is enabled |
| `VITE_GOOGLE_REDIRECT_URL` | OAuth redirect URL — must match a URI registered for the client in Google Cloud Console. | Only if Google login is enabled |

Defined in:
- `.env.example` — template, committed to the repo.
- `.env` — actual values, **gitignored**, per developer / per environment.

**Rule:** any env var must be prefixed with `VITE_` for Vite to expose it to the client. `import.meta.env.VITE_*` is the only way to read them.

```js
// src/config/apiRoutes.js
export const apiRoutes = {
  apiUrl: import.meta.env.VITE_API_URL,
  // ...
};
```

```js
// src/globals/hooks/useGoogleLogin.js
googleUrl.search = new URLSearchParams({
  client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URL,
  // ...
}).toString();
```

### Adding a new env var

1. Add to `.env.example` with a fake value: `VITE_NEW_THING=changeme`.
2. Add to your local `.env` with the real value.
3. Read via `import.meta.env.VITE_NEW_THING`.
4. **Never commit `.env`.** The `.gitignore` already excludes it.
5. If the value must be set at build time in Docker, pass it as a build arg — see the Deployment section.

### ⚠️ Google env vars in `.env`

Your `.env` is **already committed with real-looking credentials** (`VITE_GOOGLE_CLIENT_ID`, `VITE_GOOGLE_REDIRECT_URL`). The `.gitignore` excludes `.env`, but if you have a `.env` that was committed in the past, treat those values as **public** and rotate them in Google Cloud Console.

---

## `.env` files

| File | Committed? | Purpose |
|---|---|---|
| `.env.example` | Yes | Template. Copy to `.env` and fill in. |
| `.env` | No | Local dev values. |
| `.env.local` | No | Same as `.env` (Vite supports it; same gitignore). |
| `.env.production` | Depends | Used at build time for prod. Usually set by CI, not committed. |

Vite loads `.env` and `.env.local` automatically. The first existing variable wins.

---

## Vite config

`vite.config.js`:

```js
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/globals/components"),
      "@modals": path.resolve(__dirname, "./src/globals/components/modals"),
      "@hooks": path.resolve(__dirname, "./src/globals/hooks"),
    },
  },
});
```

### Plugins

- **`@vitejs/plugin-react`** — JSX / Fast Refresh. Don't replace.
- **`@tailwindcss/vite`** — Tailwind 4 Vite integration. Don't replace.
- **`vite-plugin-svgr`** — allows importing SVGs as React components: `import Icon from "./icon.svg?react"`. Used by `src/assets/icons.js`.

### Aliases

The aliases are configured in two places that **must stay in sync**. As of now, they are slightly out of sync — see the table below.

| Alias | Resolves to | In `vite.config.js`? | In `jsconfig.json`? |
|---|---|---|---|
| `@` | `src/` | yes | yes |
| `@components` | `src/globals/components` | yes | yes |
| `@modals` | `src/globals/components/modals` | yes | yes |
| `@hooks` | `src/globals/hooks` | yes | yes |
| `@constants` | `src/globals/constants` | yes | **NO** |
| `@services` | `src/globals/services` | **NO** | yes |
| `@utils` | `src/utils` | **NO** | yes |

> **TODO:** align both files so the same aliases exist in both. The runtime imports `@services/...` and `@utils/...` (see `useGoogleLogin.js`, `fetchWithAuth.js`) and they work because Vite resolves them via `node_modules` resolution, but IntelliSense will not.

To add a new alias:

1. Add to `vite.config.js` (the `resolve.alias` object).
2. Mirror in `jsconfig.json` under `compilerOptions.paths` (for IDE IntelliSense).
3. Document in `AGENTS.md` (aliases table).

### Build target

Vite 8. Build target is browser-default ESM. No transpile targets configured. If we need to support older browsers, add `build.target` here.

---

## JSConfig (IDE)

`jsconfig.json` mirrors the Vite aliases for editor support. Vite won't fail if this is wrong, but IntelliSense will be broken.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/globals/components/*"],
      "@modals/*": ["src/globals/components/modals/*"],
      "@hooks/*": ["src/globals/hooks/*"]
    },
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "target": "ES2020"
  },
  "include": ["src/**/*"]
}
```

**Keep this in sync with `vite.config.js` aliases.** If you add an alias to Vite, add it here too.

---

## ESLint config

`eslint.config.js` (flat config):

- `@eslint/js` — base recommended rules.
- `globals.browser` — browser globals available without `import`.
- `eslint-plugin-react-hooks` — hooks rules.
- `eslint-plugin-react-refresh` — HMR-safe component rules.

Run `npm run lint`. Zero errors before commit.

**No Prettier.** Formatting is by hand. Be consistent with the existing code (see `.agents/code-conventions/SKILL.md`).

---

## Scripts

| Script | Command | What it does |
|---|---|---|
| `dev` | `vite` | Dev server with HMR. |
| `build` | `vite build` | Production build to `dist/`. |
| `preview` | `vite preview` | Serve the production build locally. |
| `lint` | `eslint .` | Lint everything. |

**No test script.** No `test`, no `test:watch`, no `test:coverage`. See `.agents/code-conventions/SKILL.md` for the manual verification checklist.

---

## What to NOT change without asking

- `vite.config.js` plugins — removing or swapping breaks the build.
- `tailwindcss/vite` plugin config — Tailwind 4 config is in CSS, not JS.
- `.gitignore` — adding entries is fine, removing is not.
- The `engines` field of `package.json` (when added) — this defines the supported Node version.

---

## Deployment

Not currently set up in this repo. When it is:
- `npm run build` outputs to `dist/`. Static files, deployable to any static host.
- The backend URL is baked at build time via `VITE_API_URL`. To change backend, rebuild with a different env.
- For SPA routing, the host must serve `index.html` for any path (fallback). On Vercel: automatic. On Netlify: add `_redirects: /* /index.html 200`. On Nginx: `try_files $uri /index.html`.
