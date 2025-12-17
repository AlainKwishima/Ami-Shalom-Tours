## Summary of Issues
- TypeScript: "Cannot find name 'createGalleryItemAction'" in `src/components/admin/destinations/destinations-manager.tsx`.
- TypeScript: "Parameter 'u' implicitly has an 'any' type" in two `.filter(...)` calls in the same file.
- Tailwind canonical class suggestions across destination components and navbar mobile menu.

## Changes to Apply
### 1) Import Missing Action in DestinationsManager
- Add the missing import at the top of `src/components/admin/destinations/destinations-manager.tsx`:
  - `import { createGalleryItemAction } from '@/app/admin/actions/gallery';`
  - Place near existing imports (after line ~15), consistent with current style.

### 2) Fix Implicit 'any' in `.filter` Type Predicate
- Annotate the `urls` parameter type in `.then` blocks so the filter type guard is fully typed.
- First occurrence around line 77:
  - Change: `then((urls) => { const next = urls.filter((u): u is string => typeof u === 'string'); ... })`
  - To: `then((urls: (string | null)[]) => { const next = urls.filter((u): u is string => typeof u === 'string'); ... })`
- Second occurrence around line 314:
  - Make the same change to the `.then((urls: (string | null)[]) => { ... })` block.

### 3) Optional: Clean Up Unused Local Handler (if present)
- If a stub `const handleImageUploadSelect = () => {};` still exists, remove it to avoid “assigned but never used” warnings.
- Keep either the single named handler or the inline `onChange` handler (both are fine, but not both).

### 4) Tailwind Canonical Classes (Non-blocking)
- Update classes flagged by Tailwind Intellisense to canonical forms (these are suggestions, not errors):
  - In `src/components/destinations/destination-detail-hero.tsx:24`, replace `bg-gradient-to-t` with `bg-linear-to-t`.
  - In `src/components/destinations/destination-itinerary.tsx:32`, replace `flex-shrink-0` with `shrink-0`.
  - In `src/components/destinations/destination-overview.tsx:45,71,78,85`, replace `flex-shrink-0` with `shrink-0`.
  - In `src/components/destinations/destination-pricing.tsx:34,57`, replace `flex-shrink-0` with `shrink-0`.
  - In `src/components/layout/navbar/mobile-menu.tsx:15`, update `h-[100vh]` → `h-screen` and `w-[100vw]` → `w-screen`.

## Verification
- Run a production build to confirm TS diagnostics are resolved and no parse errors occur.
- Navigate to `/admin/destinations` and ensure uploads work without TypeScript errors.
- Optionally confirm Tailwind changes remove warnings in the IDE.

## Notes
- These fixes are minimal and align with existing code style.
- Tailwind suggestions are optional; they do not affect runtime behavior but clean up IDE warnings.
- No functional changes beyond fixing types and import; admin UI continues to support file uploads and previews.