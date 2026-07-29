# Content I18n Design

## Goal

Localize all user-facing content on the site using the existing Paraglide/inlang setup. This includes:

- Homepage prose in `src/routes/+page.svelte`
- Content sheet titles, descriptions, item names, item descriptions, and media alt text
- UI chrome and accessibility text associated with content sheets
- A visible locale switcher in the layout

The current Italian CV PDF remains available in both locales for now, with copy structured so an English PDF can be added later without a code refactor.

## Current State

- Paraglide is already configured in Vite and SvelteKit middleware.
- The project already supports `it` and `en`, with `it` as the base locale.
- Message files exist in `messages/it.json` and `messages/en.json`, but currently only contain a placeholder message.
- Most user-facing copy is still hardcoded in:
  - `src/routes/+page.svelte`
  - `src/lib/content/*/data.ts`
- The locale switcher links are present in `src/routes/+layout.svelte` but hidden.

## Chosen Approach

Use Paraglide messages as the single source of truth for all translatable strings.

Introduce a small content module whose interface returns fully assembled `ContentSheet` objects for the current locale. That module will:

- Read localized strings from Paraglide message functions
- Reuse the existing imported media assets
- Return the same `ContentSheet` shape consumed by existing components

This keeps the translation system unified, avoids duplicating content structure across locales, and limits the refactor to a clean seam between translated strings and media definitions.

## Module Design

Create a localized content builder module, for example `src/lib/content/index.ts`, with a small external interface:

- `getHomepageContent()` for homepage copy groups and labels
- `getContentSheets()` for the four sheet objects currently imported directly in `+page.svelte`

Internally, the module will compose:

- Static media imports from the existing `src/lib/content/*` directories
- Paraglide message calls for all text fields

The purpose of this seam is to keep `+page.svelte` simple. The page should consume already-shaped localized data rather than assembling many message calls inline.

## Translation Key Strategy

Keep message keys explicit and grouped by feature area instead of mirroring file names mechanically.

Suggested structure:

- `home.*` for homepage prose, skills, CTA labels, and aria labels
- `content.abaPerugia.*`
- `content.conceptsUni.*`
- `content.restor.*`
- `content.workshops.*`
- `layout.localeSwitcher.*`

Each content item should get stable keys for:

- `name`
- `description`
- `alt` when relevant

This allows item names to be translated in English where appropriate, per the chosen requirement.

## Page Refactor

Refactor `src/routes/+page.svelte` so that it:

- Imports localized homepage copy and content sheets from the content layer
- Uses Paraglide-backed strings for all visible prose
- Uses localized aria labels for content sheet triggers
- Uses localized copy for the CV link label while still pointing to the current Italian PDF

The page should not import the individual `src/lib/content/*/data.ts` files directly after this change.

## Content Refactor

Replace the current hardcoded sheet `data.ts` exports with one of these two internal patterns:

1. Keep media declarations near each content directory and expose builder helpers
2. Move all assembly into a single central content module

Preferred option: keep media declarations close to their assets, but move translatable strings out of those files. This preserves locality for assets while centralizing translation ownership in Paraglide.

The resulting `ContentSheet` objects must remain compatible with:

- `src/lib/components/content-sheet.svelte`
- `src/lib/components/content-item.svelte`
- `src/lib/content/types.ts`

## Locale Switcher

Make the switcher visible in `src/routes/+layout.svelte`.

Requirements:

- Render as `it [flag] / en [flag]`
- Current locale has an underline
- Hover state also underlines, using a different color from the current-state underline
- Continue using localized href generation through Paraglide

The switcher can remain visually minimal and live near the top-level layout content rather than introducing new navigation structure.

## Accessibility

Localize all user-facing accessibility strings, including:

- Trigger `aria-label`s for opening sheets
- Fallback image alt text where generated from item names
- Any switcher labels needed for screen readers

When fallback alt text is generated from localized item names, the computed text should naturally reflect the active locale.

## CV Handling

Keep the existing `/curriculum-vitae.pdf` link available in both locales for now.

The localized copy should make clear that the currently available document is Italian. The implementation should also make it straightforward to later switch to:

- Separate locale-specific PDF URLs, or
- Two explicit links when both PDFs exist

No routing or asset duplication is required in this pass.

## Testing

Verification for this change should focus on:

- `bun run check`
- Manual verification that both locales render correctly
- Manual verification that locale switching updates:
  - Homepage prose
  - Content sheet text
  - Trigger labels
  - Layout switcher state

Add automated tests only if a focused regression test is low-cost and clearly valuable. Given the current site shape, manual verification plus type checking is likely sufficient for the first pass.

## Risks and Mitigations

### Risk: Message key sprawl

Many strings will move into message files.

Mitigation: keep keys grouped by area and item, and avoid flat unrelated naming.

### Risk: Content assembly becomes noisy

If `+page.svelte` calls many message functions directly, readability will drop.

Mitigation: keep a dedicated content builder seam that returns ready-to-render objects.

### Risk: Future content edits require touching both code and messages

Media stays in code while text moves to message files.

Mitigation: keep each content area's media helper near its asset directory and use stable item naming so message ownership is predictable.

## Out of Scope

- Adding new locales beyond `it` and `en`
- CMS integration or Markdown-based content authoring
- Reworking the overall page layout
- Shipping an English CV PDF asset in this pass

## Implementation Outline

1. Populate real Paraglide message catalogs for Italian and English
2. Introduce a localized content builder seam
3. Refactor `+page.svelte` to consume localized copy and sheets
4. Expose the visible locale switcher in `+layout.svelte`
5. Run type checks and manually verify both locales
