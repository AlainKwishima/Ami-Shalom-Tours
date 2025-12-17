## Project Overview
- Frontend: Next.js App Router located in `src/app/` with shared components under `src/components/` and utilities under `src/lib/`.
- Backend: NestJS in `backend/` exposing REST endpoints consumed by the frontend.
- Theme: Tailwind-based design with shared layout pieces (`Navbar`, `Footer`) and consistent page patterns (e.g., `about`, `contact`).
- Error Handling: App Router error pages exist (`src/app/error.tsx`, `src/app/not-found.tsx`).

## Task 1: Fix UI Inconsistencies (Review & Booking)
- Apply global layout:
  - Import and render `Navbar` and `Footer` on both pages to match other public pages.
  - Use the same light theme, spacing, and container widths used by `contact/page.tsx` and `about/page.tsx`.
- Files to update:
  - `src/app/write-review/page.tsx`: wrap content in a `div.min-h-screen`, add `Navbar` at top and `Footer` at bottom, change dark `bg-slate-950` section to the shared light container pattern (`bg-gray-50` outer, `max-w-5xl/7xl` inner, consistent `px`/`py`).
  - `src/app/book-tour/page.tsx`: mirror the same layout and theme changes as above.
- Keep existing form components (`WriteReviewForm`, `BookTourForm`) intact and only adjust their parent layout.

## Task 2: Fix Build Error (Missing `/_error`)
- Root cause: Project uses the App Router with `src/app/error.tsx` already present, but the build script uses `--turbopack` which can trigger legacy `/_error` resolution in some environments.
- Actions:
  - Update `package.json` scripts to use stable builds:
    - Change `"build"` from `next build --turbopack` to `next build`.
    - Change `"dev"` from `next dev --turbopack` to `next dev` (optional; keep turbopack for dev if desired, but remove from build).
  - Verify no stray `pages/` directories exist at the project root; confirm App Router-only structure.
  - Confirm `src/app/error.tsx` is correctly exported and client-marked (already verified).
- Outcome: Build completes without the `Error [PageNotFoundError]: Cannot find module for page: /_error` mismatch.

## Task 3: Fix Admin Authentication
- Current flow:
  - Login: `src/app/admin/(auth)/login/page.tsx` posts to `src/app/admin/api/auth/login/route.ts` which sets `ami_admin_token` via `cookies()`.
  - Protected access: `src/app/admin/(protected)/layout.tsx` uses `getCurrentUser()` from `src/lib/auth/session.ts`, which calls backend `GET /auth/profile` with the token.
- Improvements:
  - Standardize user resolution:
    - Refactor `getCurrentUser()` to call `serverRequest('/auth/profile')` for consistent token handling and error propagation.
  - Harden redirect logic:
    - In `src/app/admin/(protected)/page.tsx`, treat `401` from backend like a missing token to redirect to `/admin/login` (defensive handling beyond `AuthTokenMissingError`).
  - Keep cookie handling:
    - Ensure `setAuthCookie` and `clearAuthCookie` remain `httpOnly`, `sameSite: 'lax'`, and `path: '/'`.
- Files to update:
  - `src/lib/auth/session.ts`: unify profile fetch via `serverRequest` and simplify role checks.
  - `src/app/admin/(protected)/page.tsx`: catch backend `401`/auth failures and redirect.
  - No changes to route handlers unless errors are observed; they are correct today.

## Validation
- Run `npm run build` to confirm the build error is gone.
- Smoke-test pages:
  - Navigate to `/write-review` and `/book-tour` to confirm consistent theme, layout, and footer presence.
- Admin auth:
  - Log in via `/admin/login` with valid credentials.
  - Confirm redirect to `/admin`, sidebar/topbar render, and data loads.
  - Attempt opening a protected route without a token; confirm redirect to `/admin/login`.

## Notes
- All changes follow existing patterns and do not remove functionality.
- The only notable refactor is consolidating profile fetching into `serverRequest` for consistent token handling and error behavior across the admin area.