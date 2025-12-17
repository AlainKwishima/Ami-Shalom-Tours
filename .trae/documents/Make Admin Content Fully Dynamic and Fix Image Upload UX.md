## Goals
- Fix gallery uploads failing and fully wire Insforge Storage.
- Allow uploading image files directly in Destinations (no manual URL entry); show previews and manage images.
- Migrate mock/static content to the database and expose it in Admin for CRUD.
- Keep all existing features/design; add dynamic backing and admin controls.

## Diagnosed Issues
- Gallery uploads: Backend used browser FormData/Blob via axios; in Node this fails. Insforge env may be missing (BASE_URL/API_KEY/BUCKET). Fallback to local disk works; but user expects Insforge.
- Destinations UI: Form requires image URLs; no file upload workflow.
- Mock content: Frontend still reads `src/lib/destinations-data.ts`; Admin lists DB content only, so static items don’t appear.

## Implementation Plan
### 1) Storage Upload Fixes (Insforge)
1. Add Node-compatible multipart upload using `form-data` in a shared Nest service (StorageService):
   - Build FormData with file buffer and `bucket`.
   - POST to `${INSFORGE_BASE_URL}/storage/upload` with `Authorization: Bearer ${INSFORGE_API_KEY}`.
   - Return `url` from Insforge response.
2. Integrate StorageService into GalleryService:
   - If Insforge configured, upload and use returned URL; else fallback to local `/uploads/gallery/*` path.
3. Env vars:
   - Add `INSFORGE_STORAGE_BUCKET` (e.g., `public`).
   - Confirm `INSFORGE_BASE_URL`, `INSFORGE_API_KEY`, CORS settings.
4. Verify: Upload via Admin → Gallery; image shows with returned URL.

### 2) Destinations: Direct File Upload UX
1. Enhance DestinationsManager component:
   - Add file input supporting multiple images.
   - On select, POST each file to `/gallery` (already supports multipart), capture returned `imageUrl`.
   - Auto-populate destination images array with these URLs; show preview thumbnails with delete/replace.
   - Keep images textarea hidden or replace with a managed list UI; do not require manual URLs.
2. Add actions:
   - Reuse existing `createGalleryItemAction(formData)`; batch call for multiple files.
3. Persist:
   - Save destination with `images` array.
4. Verify: Create/edit destination without entering URLs; upload images and preview.

### 3) Migrate Mock Data → Database
1. Seed destinations:
   - Create a backend seed bootstrap (ContentBootstrap) that checks if `destinations` collection is empty and imports items from the current static dataset (copy over title, slug, location, description, price, duration, gallery, itinerary, included/notIncluded, bestTime, difficulty, groupSize, rating).
   - Convert static image paths to gallery items or `images` URLs (initially keep local public assets; later admins replace via uploads).
2. Seed reviews:
   - Insert the default/home reviews into the `reviews` collection as published.
3. Seed homepage content:
   - Create or upsert `pages` entries (e.g., slug `home`) with `sections` map: hero_title, hero_subtitle, features_texts, etc.
4. Run seed automatically on startup if collections are empty, or provide a one-off script.
5. Verify in Admin:
   - Destinations, Gallery, Reviews, Pages show initial content and allow CRUD.

### 4) Frontend: Load Dynamic Content
1. Destinations Grid and Detail already converted to API.
2. Reviews:
   - Home reviews (`ReviewsSection`) already fetches `/reviews`; ensure pagination/limit and robustness.
3. Homepage sections:
   - Update critical home sections (hero, key headings/descriptions) to fetch `GET /pages/home` and use `sections` values; fall back to current static strings if missing.
4. Verify pages render data from DB; admin edits reflect on frontend after refresh.

### 5) Improve Error Handling in Admin
1. AI service hardened (try/catch, safe fallbacks) to prevent 500s.
2. Standardize serverRequest error handling paths in admin actions (already used); keep redirects on 401 and display toasts on failures.

### 6) Deliverables & Docs
- Changes summary: Insforge storage integration, destinations file upload UX, seed bootstrap for mock content, frontend dynamic loading, error hardening.
- Database tables/collections touched: `destinations`, `gallery`, `reviews`, `pages`.
- API endpoints used:
  - Public: `GET /destinations`, `GET /destinations/:id`, `GET /gallery`, `POST /reviews`, `GET /reviews`, `GET /pages/:slug`.
  - Admin: `POST /gallery`, `DELETE /gallery/:id`, CRUD on destinations/pages.
- Image upload instructions:
  - Admin → Gallery: upload images, optional link to a destination.
  - Admin → Destinations: use new upload picker; previews appear; images persist without manual URLs.
- Admin usage instructions:
  - Destinations: create/edit, upload images, edit text/metadata; delete.
  - Pages: edit `home` sections; changes reflect on frontend.
  - Reviews: view/remove inappropriate reviews.
- Env required:
  - FRONTEND: `NEXT_PUBLIC_API_BASE_URL`.
  - BACKEND: `INSFORGE_BASE_URL`, `INSFORGE_API_KEY`, `INSFORGE_STORAGE_BUCKET`, `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CORS_ORIGIN`, `PORT`, `NODE_ENV`.

## Notes
- No existing data or pages are removed. Static assets remain as fallback until replaced by uploaded images.
- We’ll keep the UI consistent with the current design system; only augment admin flows.
- After approval, I’ll implement the admin UX changes, backend storage service adjustments, and the seed bootstrap, then run a build and provide usage instructions.