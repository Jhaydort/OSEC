# OSEC production-readiness implementation — 22 September 2026

Local implementation only. No deployment, DNS change, Search Console configuration, commit or push was performed. The existing design, service content, motion, Supabase moderation/RLS architecture and enquiry backend remain in place.

## Files created

- `.env.example`: public build-time variables and server-only email variable names, with no secret values.
- `src/data/legal.ts`: reviewable Privacy, Terms and Cookie drafts.
- `src/pages/LegalPage.tsx`, `src/pages/LegalPage.css`: shared legal layout using the existing Container, tokens, navigation and Footer; minimal unavailable-page response.
- `src/lib/consent.ts`: versioned preference validation, expiry and persistence.
- `src/lib/analytics.ts`: isolated, consent-gated GA4 and restricted event API.
- `src/components/shared/CookieConsent/CookieConsent.tsx` and `.css`: responsive banner and native preference dialog.
- `src/data/seo.ts`, `src/components/shared/SEO.tsx`, `seo-build.ts`: shared metadata catalogue, client metadata and static route-head generation.
- `tests/consent.test.mjs`, `tests/seo-build.test.mjs`, `tests/production-readiness.browser.mjs`, `tests/analytics-privacy.browser.mjs`: consent, output and browser regression checks.
- This report.

## Files modified

- `index.html`: existing OSEC logo as favicon.
- `src/app/App.tsx`: legal/unavailable routing, global SEO and consent, homepage main landmark, skip link.
- `src/components/layout/Footer/Footer.tsx` and `.css`: legal destinations and accessible Cookie Preferences button with mobile wrapping.
- `src/pages/ContactPage.tsx`, `src/pages/PatientStoryPage.tsx`: parameter-free success events after existing submissions succeed.
- `src/data/links.ts`: consent-gated appointment/WhatsApp events; existing URL and opening behaviour retained.
- `src/components/home/WhoWeAre/WhoWeAre.tsx`: defer video loading until use, accessible video name and handled playback rejection.
- `src/components/ui/ServiceCard/ServiceCard.tsx`: lazy image loading and descriptive CTA accessible names.
- `src/styles/global.css`: keyboard focus fallback and skip-link styling.
- `src/vite-env.d.ts`, `vite.config.ts`, `tsconfig.node.json`: environment types, build hook, avoid generated JavaScript/declaration duplicates in source.
- `vercel.json`: explicit existing/new public route HTML targets, existing API pass-through, SPA shell fallback and legacy Terms redirect.

## Routes and content

- Added `/privacy-policy`, `/terms-and-conditions`, `/cookie-policy`.
- `/terms-of-service` redirects permanently to `/terms-and-conditions` on Vercel.
- Existing `/news-health-articles` links previously returned the homepage. There is no article page/content implementation. The route now honestly reports that full articles are not yet available, with `noindex, follow`. It is excluded from the sitemap. No article copy or Article schema was fabricated.
- Unknown routes display an unavailable-page shell with noindex metadata, instead of an indexable duplicate homepage. The preserved SPA fallback returns a shell; a true HTTP 404 for every unknown route remains a hosting-level enhancement.
- All 12 distinct service detail URLs are retained. Two existing EFTR cards share one URL; their content/cards remain unchanged and SEO/sitemap entries are deduplicated.

## Consent and analytics

- `osec-cookie-consent` local storage contains only version, essential=true, analytics boolean and savedAt. Choices expire after 180 days; missing, malformed, future-dated and outdated-version preferences are rejected.
- Essential is always enabled; analytics defaults off. Accept and Reject have equal visual weight. Manage Preferences uses a native modal dialog with keyboard containment, Escape dismissal, a labelled checkbox and focus restoration. The footer always reopens it.
- Storage failures show a nonfatal notice and preserve the choice for the current page. Cross-tab storage changes propagate. Expiry is checked on focus and periodically; every explicit event also checks expiry.
- GA4 is completely absent when `VITE_GA_MEASUREMENT_ID` is empty/invalid or before opt-in. No pre-consent Google tag or cookieless analytics ping is added by this implementation.
- Withdrawal sets `ga-disable-<ID>`, updates consent to denied, clears pending data-layer commands and attempts to delete accessible first-party `_ga` cookies. A loaded script cannot be unloaded and already-sent requests/data cannot be recalled. This mechanism does not delete provider-held data.
- Events: `book_appointment`, `whatsapp_click`, `contact_form_submit`, `patient_story_submit`, `service_view`. No caller-supplied parameters are accepted. Booking handlers and direct WhatsApp anchors are covered; form events fire only after success. Service views carry no service name or slug.
- Explicit page views report aggregate site visits only: URL origin + `/`, generic title, blank referrer. No health-related paths, query strings, fragments, form text, names, emails, phone numbers or selected services are passed by the utility. Automatic page views are disabled. Advertising consent remains denied, Google signals and advertising personalisation are disabled.
- **Before GA activation:** disable all Enhanced Measurement features in the GA4 web data stream, especially page changes, form interactions, outbound links and site search. Remove/avoid any additional Google Tag Manager, GA plugin or automated event rule that could collect health-related paths or form data outside this utility. Review the Google tag destinations, linked products, data sharing, retention and healthcare suitability with OSEC. Code alone cannot enforce account-side settings. Test the real approved ID in an approved environment before enabling it for visitors.
- Implementation references: [Google privacy controls](https://developers.google.com/tag-platform/security/guides/privacy) and [consent setup](https://developers.google.com/tag-platform/security/guides/consent).

## SEO, sharing and deployment files

- Unique title, description, robots, Open Graph and Twitter metadata cover Home, About, Services, Contact, all distinct service URLs and legal pages. Patient Story is accessible but noindex and absent from the sitemap.
- `VITE_SITE_URL` is the central production HTTPS origin. Invalid configured values fail the build, including `.vercel.app` preview domains. Empty configuration works locally and omits domain-dependent metadata and sitemap output with an explicit build warning. **Set it and rebuild before launch.**
- Build output contains a route-specific `index.html` for every known route so social crawlers receive metadata without running React. Page body content remains client-rendered, as in the original app; this is not full SSR/prerendering. Search engines still need JavaScript to render body content.
- MedicalOrganization and WebSite JSON-LD contain only existing name, public contact/address text and logo. JSON parsing/shape were checked. No review/rating, doctor credential, award, pricing or fabricated article schema. No breadcrumb schema because there is no full visible breadcrumb trail. Rich Results/schema testing of the actual public domain remains manual after deployment approval.
- Uses the existing `/LOGO/Logo.png` branding asset for social images and a summary Twitter card. No generated/replacement brand asset. A separately approved landscape sharing image could improve large previews later.
- `dist/robots.txt` allows public content and disallows `/api/`. It references the sitemap when a production origin is configured. Robots rules are not access controls.
- `dist/sitemap.xml` is generated only with a valid origin: 19 unique indexable URLs (Home, About, Services, Contact, 12 services, 3 legal pages). It excludes APIs, story submission, unavailable news and unknown routes. No invented last-modified dates.
- Vercel still passes `/api/:path*` through to the backend and uses a React shell for other navigation. Explicit public page rewrites preserve route-specific heads. Configuration and target files were checked locally; no live Vercel deployment was made.
- The Word source document inside `assets/` is excluded from copied production output. Originals are untouched. Source-document exclusions also cover common editable/archive formats. Vite's local development asset server is for development only.

## Accessibility, performance and audit findings

- Tested one H1 and one main landmark on each real page. Existing form labels/native rating inputs and menu keyboard behaviour were retained.
- Added homepage main, a skip link, global focus fallback, descriptive service CTA names, labelled video, accessible consent controls and mobile legal-link touch targets.
- Existing service hero dimensions and lazy article/FAQ/physician images were already present. Service card photographs now lazy-load; existing card containers reserve their layout. No asset replacement or layout redesign.
- Existing video is approximately 457 MB; a supplied gastroscopy PNG is approximately 10.8 MB, consultation PNG 7.4 MB and technology PNG 4.7 MB. Video preload is now `none`. Source media was deliberately not recompressed/replaced; approved delivery derivatives/video hosting remain recommended before launch.
- Existing Google Fonts requests remain to preserve the typography system. These requests happen independently of analytics consent and are disclosed in the drafts. OSEC should review provider use or approve self-hosting of the same fonts if needed.
- No frontend service-role/private key was introduced. `.env.local` values were not printed or modified. The intentionally browser-public Supabase publishable key remains part of the existing client design. Public queries still select only four fields and require approved + publication consent. No RLS, data or moderation changes were made.
- Existing Resend sender is `onboarding@resend.dev`. Confirm a verified sending domain/sender and server `RESEND_API_KEY` before launch; see `docs/contact-email.md`. No real email was sent during QA.

## OSEC legal review required

All three policies visibly say draft and show **Last updated: 22 September 2026**. Review the complete copy in `src/data/legal.ts`; resolve every `[OSEC TO CONFIRM]`, then remove the draft notice only after approval.

Placeholders cover legal entity/registered details; purpose-specific lawful bases and health-information handling; identity checks and rights-request responses; moderation/removal/editorial procedures; storage regions/international transfers/safeguards; provider contracts/recipients; retention/deletion/backups/logs; responsible privacy contact; children's/guardian procedures; booking confirmation/fees/cancellations/refunds; asset licensing; legally appropriate liability language; governing law/jurisdiction/disputes; analytics retention/account processing; and additional deployed-provider storage.

The public contact details were reused from the existing footer, not independently verified. Review them too. Draft rights language was checked against the [Nigeria Data Protection Commission's information](https://ndpc.gov.ng/our-data-privacy-policy/); this does not establish OSEC's own legal bases, compliance or registration status.

## QA and reproducibility

- `npm run build` includes frontend and API TypeScript checks. It passed with empty optional configuration and synthetic configured values. There is no existing lint script. Vite reports a non-blocking future native-config-loader warning about extensionless TypeScript imports; the current configured build succeeds.
- `node --test tests/contact.test.mjs tests/patient-story.test.mjs tests/patient-story-word-limit.test.mjs tests/consent.test.mjs`: 10 passing tests. Existing provider-error tests intentionally log mocked errors.
- `node --test tests/seo-build.test.mjs`: validates current `dist`. For configured output, set `QA_SITE_URL` to the same origin used during build. Two passing checks for route heads, JSON-LD, sitemap, robots, exclusions and rewrites.
- Browser tests use the already-installed ignored Playwright package at `.cache/cta-check/node_modules/playwright` and system Chrome; no new dependency was added. On another machine supply equivalent local tooling or update the test import/executable path.
- `tests/production-readiness.browser.mjs`: `QA_URL` defaults to local port 5180; optional `QA_GA=1` expects test-only `G-TESTONLY` and configured site URL. Google requests are intercepted. Do not put this synthetic ID/domain into production configuration.
- `tests/analytics-privacy.browser.mjs`: isolated local port 5181 with synthetic configuration, intercepted Google requests; checks pre-consent blocking, sensitive URL exclusion, withdrawal, cookie cleanup, expiry and blocked storage.
- Desktop 1280px, tablet 768px, mobile 375/390/430/480px were checked. Every major route was checked at all four requested mobile widths. Screenshots in `.cache/production-qa/screenshots/` were reviewed for legal/consent/footer appearance.
- Browser forms were mocked to avoid sending emails or creating database records. Public-story request field/filter contracts were verified, including publication consent and approval. A separate live read-only Supabase request returned HTTP 200 and only the four public fields, without logging patient values. Actual deployed delivery, complete live database RLS, moderation administration, Google ingestion and Vercel edge behaviour still require owner-side acceptance checks after an approved deployment. Tests do not claim to verify these external systems.

## Before launch

1. Complete legal review and placeholders.
2. Set `VITE_SITE_URL` in production build variables. Optionally set the real approved `VITE_GA_MEASUREMENT_ID` after the GA account/privacy review above. Rebuild.
3. Preserve existing public Supabase variables and server-only Resend key; verify sender/domain and receiving mailbox.
4. Approve/prepare missing health articles or keep the noindex availability page; review large media delivery and any required video captions/transcript without inventing them.
5. After approving deployment, verify direct URLs, actual API delivery, public-story moderation constraints, social previews and consent/GA behaviour on the real domain. Search Console submission, DNS and deployment remain with OSEC until explicitly authorised.
