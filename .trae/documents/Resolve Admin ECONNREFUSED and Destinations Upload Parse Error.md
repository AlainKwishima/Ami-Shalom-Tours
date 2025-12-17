## Issues Observed
- Network error: `TypeError: fetch failed` with `[cause]: { code: 'ECONNREFUSED' }` in `src/lib/api/client.ts:30` when `/admin` loads and `AdminDashboardPage` fetches backend data.
- Parse error: Duplicate identifier `handleImageUploadSelect` in `src/components/admin/destinations/destinations-manager.tsx:46` causing 500 on `/admin/destinations`, and cascading 500s.

## Fix Plan
### 1) Destinations Upload Parse Error
- Remove the redundant placeholder `const handleImageUploadSelect = () => {}` and keep a single function definition.
- Ensure the `<input type="file" ... onChange={...}>` references the single handler or use the inline handler consistently.
- File to patch: `src/components/admin/destinations/destinations-manager.tsx` around lines 58–90 and 288–326, remove the duplicate declaration and keep just one.

### 2) Harden Admin Dashboard Against Backend Downtime
- Wrap backend calls in `AdminDashboardPage` in try/catch and fall back to empty stats when fetch fails, to avoid route 500.
- Implementation: in `src/app/admin/(protected)/page.tsx:12-22`, replace `Promise.all([...])` with guarded calls; on errors (including ECONNREFUSED), compute stats as zeros and render the dashboard skeleton.
- Keep redirect on `AuthTokenMissingError` unchanged.

### 3) Improve Client Error Messaging
- Catch network errors in `apiRequest` and throw a descriptive error instead of crashing the route. Specifically wrap the `fetch` call in try/catch.
- File: `src/lib/api/client.ts:30-43`. If `fetch` throws, rethrow a clean message like `Backend unreachable at ${url}` to aid debugging while not crashing SSR pages (they will handle errors via try/catch).

### 4) Environment & Backend
- Ensure `NEXT_PUBLIC_API_BASE_URL` points to a running backend URL.
- Start backend (NestJS) locally or set it to Insforge base. Confirm backend CORS `CORS_ORIGIN` includes your frontend origin.
- If using Insforge, update `.env` with `INSFORGE_BASE_URL`, `INSFORGE_API_KEY`, `INSFORGE_STORAGE_BUCKET`, and `MONGODB_URI`.

### 5) Validate Gallery Uploads
- After fixing the parse error, test Admin → Gallery file uploads; verify returned URLs and thumbnails.
- Test Admin → Destinations uploads; verify preview list and persistence without manual URLs.

## Verification
- Rebuild app; ensure `/admin`, `/admin/destinations`, `/admin/gallery` load without 500s.
- With backend down, `/admin` should still render with zeros and not crash.
- With backend up, stats populate and gallery/destinations operations succeed.

## Notes
- No design changes; only robust error handling and bugfix to the duplicate handler.
- I will implement these patches across the referenced files and share build results and testing steps after applying the changes.