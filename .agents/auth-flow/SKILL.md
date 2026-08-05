# Auth Flow

The complete authentication lifecycle: login, register, recover password, on-boarding, token refresh, logout. Read this before touching any auth-related code.

---

## Roles

- **`Admin`** — full access to admin modules (`/home`, `/users`, `/entries`, `/exits`, `/parking`, `/finance`, `/on-boarding`).
- **`Cliente`** — customer-facing modules (`/check-in`, `/vehicle-payment`).

A user has one role. Determined at registration, stored in the user object, exposed via `useCurrentUser().user.role`.

---

## Public vs protected

**Public routes** (no auth required):
- `/` — `LandingPage` (login, register, recover).
- `/login` — same as `/`, kept for compatibility (`ProtectedRoutes` redirects here on 401).
- `/privacy-policy`, `/terms`, `/cookies` — static legal pages, registered directly in `AppRouter.jsx`.

**Protected routes** — every entry in `src/router/constants/routes.js` is wrapped in `<ProtectedRoutes roles={...}>`. The wrapper:
1. Calls `useCurrentUser()` (which hits `/users/me`).
2. If loading → render nothing.
3. If error or `!hasRole(roles)` → `<Navigate to="/login" replace />`.
4. Otherwise → `<Outlet />` (renders the route).

`hasRole(roles)` accepts a string or an array. Returns `true` if `user.role` is in the list.

---

## Login flow

File: `src/modules/landing/hooks/useLogin.js`.

```
User submits form
  → useLogin.handleSubmit(e, openInnerModal)
    → validate(form) — built-in useFormValidation
    → POST /auth/login (via loginService, in src/globals/services/)
    → if success:
        queryClient.fetchQuery(["currentUser"], getCurrentUserService)
          → freshData.onboarding_completed === false
              → navigate("/on-boarding")
          → freshData.data[0].role === "Cliente"
              → navigate("/check-in")
          → else (Admin with onboarding done)
              → navigate("/home")
    → if error:
        openInnerModal("error", { currentTarget: triggerButton })
```

**Important:** the `useLogin` hook uses a slightly different `openInnerModal` signature than other hooks — it passes `{ currentTarget: triggerButton }` instead of using `getModalTrigger(e)`. This is a minor inconsistency. Other hooks call `getModalTrigger(e)` directly.

---

## Google OAuth login

File: `src/globals/hooks/useGoogleLogin.js` + `src/globals/services/googleLoginService.js`.

The Google button lives in `LoginAndRegisterButtons.jsx` and uses the same UI in both `LoginModal` and `RegisterModal`. The hook is **the single owner of the OAuth flow** — neither modal knows about the redirect_uri, the popup, or the code exchange.

```
User clicks "Continuar con Google"
  → useGoogleLogin().handleGoogleLogin(event, openInnerModal)
      → captures event.currentTarget as the modal trigger (so errors anchor to the button)
      → captures openInnerModal so the hook can open the error modal from inside
      → generates a one-shot state (crypto.randomUUID())
      → opens a centered popup to https://accounts.google.com/o/oauth2/v2/auth
          ?client_id=VITE_GOOGLE_CLIENT_ID
          &redirect_uri=VITE_GOOGLE_REDIRECT_URL  (= http://localhost:5173 by default)
          &response_type=code
          &scope=openid email profile
          &state=<uuid>
      → starts listening for window 'message' events from the popup
```

The OAuth callback page is **the root URL itself** (`http://localhost:5173/?code=...&state=...`). A tiny effect on the root reads `code` + `state`, validates the `state` against the one stored in the ref, and posts the message back to the opener. After that the popup closes and the opener's `useEffect` listener fires:

```
message received (data.state matches, data.type === "google-oauth-code")
  → useGoogleLogin.handleGoogleCode(code)
      → POST /auth/google  (googleLoginService)
      → queryClient.fetchQuery(["currentUser"], getCurrentUserService)
      → navigate("/on-boarding" | "/check-in" | "/home")  (same logic as password login)

message received (data.type === "google-oauth-error")
  → showError(data.error)  // opens inner modal "googleError" anchored to the button
```

**Failure paths:**
- Popup blocked by the browser → `showError("El navegador bloqueó la ventana de Google.")`.
- Backend returns `{ error }` → show error modal with backend's message.
- `state` mismatch on the callback → message is ignored, popup is closed, user stays on landing.
- Multiple clicks → `exchangingRef` blocks a second exchange while the first is in flight.
- The user closes the popup manually → no message arrives, no error, the hook just sits in `loading: true`. **TODO:** detect popup close and reset loading.

**Env vars required:**
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_GOOGLE_REDIRECT_URL` (must exactly match a redirect URI registered in Google Cloud Console for that client).

---

## Register flow

File: `src/modules/landing/hooks/useRegister.js`.

```
User submits form
  → useRegister.handleSubmit
    → validate(form)
    → POST /auth/register (via registerService, in src/globals/services/)
    → if success:
        queryClient.fetchQuery(["currentUser"], getCurrentUserService)
          → freshData.onboarding_completed === false
              → navigate("/on-boarding")
          → freshData.data[0].role === "Cliente"
              → navigate("/check-in")
          → else (Admin with onboarding done)
              → navigate("/home")
    → if error or catch:
        setError(msg), openInnerModal("error", triggerButton)
```

The current register flow **does** branch on role the same way login does, so a `Cliente` that registers and is already onboarded lands on `/check-in`. If you need to test an `Admin` user that is *not* onboarded, the only path is register-as-Admin → `/on-boarding` → `/home`.

---

## On-boarding flow

File: `src/modules/on-boarding/OnBoardingPage.jsx` + `useCompleteOnBoarding.js` + `useOnboardingSections.js`.

Three sections, controlled by `useOnboardingSections`:
1. `userInfo` (progress 100) — name, first_surname, second_surname.
2. `parkingName` (progress 300) — parking name.
3. `parkingLocation` (progress 200) — country (SelectMenu).

`useOnboardingSections` keeps `activeSection` and `progress` in state. `handleContinue(fromSection, toSection, newProgress)` validates the current section before advancing. `handleReturn` skips validation.

On submit of the last section:
```
PUT /auth/complete-on-boarding
  → if success:
      queryClient.fetchQuery(["currentUser"], ...)  // refresh user data with onboarding_completed=true
      navigate("/home")
  → if error:
      openInnerModal("error", triggerButton)
```

`SECTION_FIELDS` in `useCompleteOnBoarding.js` maps section name → required fields. Update this when adding a new section.

---

## Recover password

File: `src/modules/landing/hooks/useRecoverPassword.js` + `src/globals/services/recoverPasswordService.js`.

```
User enters email, submits
  → POST /auth/recover-password (recoverPasswordService, plain fetch — no auth)
  → if response.success:
      openInnerModal("sentEmail", triggerButton)  // shows SuccessModal
  → if error:
      setError(error)  // currently swallowed — no modal shown. Consider fixing.
```

The endpoint is **public** (called via plain `fetch`, not `fetchWithAuth`).

---

## Logout

File: `src/globals/hooks/useLogout.js` (called from `NavbarMenuModal`).

```
User clicks logout (in NavbarMenuModal)
  → useLogout()
    → POST /auth/logout
    → queryClient.clear()  // wipes ALL cached data — current user, lists, stats, etc.
    → navigate("/")  // back to landing
    → if error: setError, no modal shown
```

`queryClient.clear()` is critical — it prevents the next user from seeing the previous user's cached data. **Never** remove this call.

The logout item is the only entry in `secondSectionItems` in `src/globals/constants/asideMenuItems.js` and has no `roles` (visible to both roles).

---

## Token refresh

File: `src/utils/fetchWithAuth.js`.

The backend uses two cookies:
- **Access token** — short-lived, sent on every request.
- **Refresh token** — long-lived, used only to mint new access tokens.

`fetchWithAuth` flow:
1. Send the original request with `credentials: "include"`.
2. If response is 401, try to refresh:
   - If a refresh is already in flight (`isRefreshing`), wait for it.
   - Otherwise, POST `/auth/refresh`. If it succeeds, retry the original request once.
   - If the refresh itself fails → `window.location.href = "/login"` and return without retrying.
3. Return whatever the retry (or original) response is.

### Known issue: `window.location.href = "/login"`

When the refresh token expires, we do a **full page reload** to `/login`. This is ugly:
- Loses all in-memory state (modals, forms, scroll).
- Defeats the SPA — we lose React Router's soft navigation.
- No error message shown to the user.

**TODO (if you want to fix it):**
- Replace `window.location.href = "/login"` with a `navigate("/")` (requires moving this logic into a hook that has access to `useNavigate`).
- Optionally: clear queryClient before navigating, show a "Tu sesión expiró" toast, redirect to landing instead of `/login` (which is the same page anyway).

The right place to fix this is in `useLogout` (call `queryClient.clear()` + `navigate("/")`) and remove the `window.location.href` hacks in `fetchWithAuth.js`. The `fetchWithAuth` should just `throw` on refresh failure and let the calling hook handle navigation.

---

## Current user

File: `src/globals/hooks/useCurrentUser.js`.

```
const { user, hasRole, loading, error } = useCurrentUser();
```

Backed by `useQuery({ queryKey: ["currentUser"], queryFn: getCurrentUserService, staleTime: 1h })`.

**`hasRole(roles)`** — accepts string or array. Returns true if `user.role` is in the list. **This is the only function the agent should use to gate access** in components. Don't roll your own role check.

The query has `staleTime: 1h` — the user object is considered fresh for an hour. After that, the next call refetches. In practice, the query is invalidated explicitly after login, register, on-boarding, profile updates, and logout.

**What it does NOT do:** it doesn't handle the "user not logged in" case specially. The backend returns 401, `fetchWithAuth` tries to refresh, on failure → redirect. The hook just reports `error` and `user: null` if everything fails.

---

## File map

| File | Purpose |
|---|---|
| `src/utils/fetchWithAuth.js` | Auto-refresh wrapper, 401 → refresh → retry |
| `src/globals/hooks/useCurrentUser.js` | Current user query, `hasRole` helper |
| `src/globals/hooks/useLogout.js` | Logout: clear cache + navigate to landing |
| `src/globals/hooks/useGoogleLogin.js` | Google OAuth popup, code exchange, post-Google redirect |
| `src/router/ProtectedRoutes.jsx` | Role-gated route wrapper (redirects to `/login`) |
| `src/router/constants/routes.js` | Route → role mapping (`layoutRoutes` + `standAloneRoutes`) |
| `src/router/AppRouter.jsx` | Mounts public routes, Layout, and protected routes |
| `src/modules/landing/hooks/useLogin.js` | Login + post-login redirect |
| `src/modules/landing/hooks/useRegister.js` | Register + post-register redirect |
| `src/modules/landing/hooks/useRecoverPassword.js` | Password recovery |
| `src/globals/services/loginService.js` | Public `fetch` to `/auth/login` |
| `src/globals/services/registerService.js` | Public `fetch` to `/auth/register` |
| `src/globals/services/recoverPasswordService.js` | Public `fetch` to `/auth/recover-password` |
| `src/globals/services/googleLoginService.js` | Public `fetch` to `/auth/google` (code exchange) |
| `src/globals/services/logoutService.js` | Authenticated `fetchWithAuth` to `/auth/logout` |
| `src/globals/services/getCurrentUserService.js` | Authenticated `fetchWithAuth` to `/users/me` |
| `src/modules/on-boarding/hooks/useCompleteOnBoarding.js` | 3-section on-boarding submit |
| `src/modules/on-boarding/hooks/useOnboardingSections.js` | On-boarding section/progress state |
| `src/globals/services/updateCurrentUserInfoService.js` | PUT `/users/update/me` |
| `src/globals/services/updateCurrentUserPasswordService.js` | PUT `/users/update-password` |
