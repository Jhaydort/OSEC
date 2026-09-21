# Public Patient Stories

The existing `PatientStories` homepage carousel now loads from the shared anonymous Supabase client through `src/lib/fetchPatientStories.ts`. The temporary local testimonial is removed. Submission form code is unchanged by this task.

Every request selects only `full_name, service, rating, review`, filters `status = approved` and `consent_to_publish = true`, and orders by `approved_at` descending (nulls last), then `id` descending. Ordering columns are not returned. Pages of 100 are accumulated so the API row limit does not silently restrict the carousel. Any failed page shows the neutral unavailable state rather than a partial result.

The existing quote, attribution, rating badge, arrows and touch gestures remain. Service IDs use existing service titles. Navigation dots now correspond to records and retain the original SVG's 12px circles, 6px gaps and colors. Loading and empty/error states retain the card space; no placeholder patient content is published.

## Verification (2026-09-21)

Run the Vite app and `node tests/public-patient-stories.browser.mjs` (uses the workspace's cached Playwright and installed Chrome).

Browser API fixtures verified pending/consenting, approved/nonconsenting and rejected stories are excluded by the requested filters; approved/consenting stories render the name, service, rating and review. These are mocked moderation cases, not proof of the live RLS policy. Also verified 105 records over multiple pages, arrow wrapping, dot selection, loading, friendly failure, and section overflow at 480, 430, 390, 375 and 1280px.

The live read-only query returned HTTP 200 and zero approved, consenting rows. No database writes, moderation changes, or RLS changes were made. Actual pending/approved/no-consent/approved-consent transitions still require a database administrator to update a fake record in the Supabase Table Editor and refresh the homepage. Email and phone number are absent from every public projection. The production build passed.
