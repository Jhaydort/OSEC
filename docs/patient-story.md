# Patient Story submission

Live local page: http://localhost:5173/patient-story
Figma reference: Patient Story form 513:1995. The existing page CSS, responsive rules, header, footer and Patient Stories carousel were not changed by this integration. Consent now reads: “I give OSEC permission to publish my story and name on its website.”

## Integration

Installed `@supabase/supabase-js` (previously absent).

- `src/lib/supabaseClient.ts`: single anonymous client using `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`; session persistence, auto-refresh and URL session detection disabled. No secret/service-role key.
- `src/lib/submitPatientStory.ts`: one explicit INSERT into `patient_reviews`, with an affected-row count, no returned record and automatic retries disabled.
- `src/data/patientStory.ts`: existing validation/normalization plus an explicit column allowlist. Extra input properties cannot enter the INSERT.
- `src/pages/PatientStoryPage.tsx`: existing inline validation; synchronous in-flight guard; disabled controls and Submitting... label; success clears values and replaces the form with the requested thank-you copy. Failure preserves entered values and enables a deliberate retry, displaying only the requested friendly error.
- `src/components/patient-story/StarRating.tsx`: disabled while submitting.
- `src/vite-env.d.ts`: environment variable types.
- `package.json` / lockfile: Supabase dependency.
- `.env.local`: existing NEXT_PUBLIC_ names corrected to VITE_ names without changing values. Already Git-ignored by `.env.*`.

## Exact mapping

| Form | Database |
| --- | --- |
| fullName | full_name |
| email | email |
| phoneNumber | phone_number |
| service | service (existing service ID) |
| rating | rating |
| review | review |
| consentToPublish | consent_to_publish |

Every INSERT explicitly supplies `status: 'pending'` and `approved_at: null`. Neither is derived from URL/form input. `display_name` is not used. The final column names were verified through a zero-row query before insertion. No RLS changes, UPDATE/DELETE privileges, admin functionality or public-carousel connection were made.

Email and phone are not rendered in the success state or any public component. Any future public integration must use only full_name, service, rating and review, restricted to approved rows with publishing consent; private email/phone must not be exposed.

## One authorized live test

Submitted through the browser form on 2026-09-21 at 14:19:13 UTC (15:19:13 Lagos).

- Exactly one POST observed.
- Supabase returned HTTP 201 and Content-Range `*/1`, confirming one affected row.
- No inserted row was requested back.
- The success state appeared: “Thank You for Sharing Your Story”.

Accepted payload:

```json
{
  "full_name": "OSEC Test Patient",
  "email": "test@example.com",
  "phone_number": "08000000000",
  "service": "specialist-consultation",
  "rating": 5,
  "review": "This is a test submission used to verify the OSEC Patient Story form integration.",
  "consent_to_publish": false,
  "status": "pending",
  "approved_at": null
}
```

The anonymous client cannot read the pending row back under the stated SELECT policy. Verify the stored row manually in Supabase → Table Editor → patient_reviews, including the fields above. The server response verifies this submission inserted one row; it does not count any unrelated/pre-existing test rows.

## Verification

- `node --test tests/patient-story.test.mjs tests/contact.test.mjs`: validation, mapping/extra-field rejection, optional consent and existing mocked Resend contract.
- Browser requests intercepted locally for invalid/no-network validation, double-click prevention, in-flight disabling, HTTP failure preserving every value, retry and success. Mock requests never reached Supabase.
- One real test only; a local attempt marker prevents accidentally rerunning it. Do not rerun the live test script.
- Build: `npm.cmd run build`.
- Local evidence (gitignored): `.cache/cta-check/story-live-insert-result.json`, `story-submission-success.png`, and `story-submission-mock.mjs`.
- The earlier Step 1 browser verifier is retired because its submissions would now reach the live backend.
- No GitHub push.
