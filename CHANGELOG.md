# OSEC copy and content fixes

| # | Status | Change |
|---:|---|---|
| 1 | Done | Replaced the Contact HMO FAQ with the supplied NNPC HMO, NEM Health and Leadway Health answer. |
| 2 | Done | Removed unlinked X and Facebook footer icons; retained linked WhatsApp and Instagram. |
| 3 | Done | Standardised the second phone link to `tel:+2348072417458`. |
| 4 | Done | Rewrote page FAQs in direct first-person clinic voice where needed. |
| 5 | Done | Updated the home specialist-led copy and made About FAQ describe the singular lead physician. |
| 6 | Done | Patient Stories now renders nothing until approved story items are available; no loading message is shown. |
| 7 | Done | The home procedures statistic displays 1,800+ on first paint. |
| 8 | Done | Kept the repeated Research & Publications card because the second instance is an `aria-hidden` loop clone in the carousel. |
| 9 | Done | Updated the ESD service card description on Home and Services. |
| 10 | Done | Matched the EMR card description across Home and Services. |
| 11 | Done | Corrected About copy spacing and punctuation. |
| 12 | Done | Split qualifications and professional memberships into separately labelled lines. |
| 13 | Done | Changed the About ESD milestone to “First in Nigeria” / “Pioneers of Endoscopic Submucosal Dissection (ESD)”. |
| 14 | Done | Lowercased “centre” in the About mission and vision copy. |
| 15 | Done | Changed navigation and footer naming to Research & Insights; retained `/news-health-articles`. |
| 16 | Done | Corrected the physician display name and News image alt text to “Dr Taiwo Onabanjo”. |
| 17 | Done | Standardised the global CTA as “Book an Appointment”; kept “Book a Consultation” for the consultation-specific action. |
| 18 | Done | Service detail booking buttons now generate the supplied WhatsApp message with that service's name. Generic booking links retain the generic message. |
| 19 | Done | Renamed both requested service paths, internal links and prerender routes; added explicit 301 redirects from the old slugs. |
| 20 | Done | Added descriptive alt text to Home hero carousel and statistics images. |
| 21 | Done | Checked for duplicate raw `wa.me` anchors after service buttons; none were present. |
| 22 | Done | Added GP/specialist referral and second-opinion wording; updated Consultation's Why Choose copy. |
| 23 | Done | Updated Colonoscopy copy and confirmed Paediatric Colonoscopy is included in related services. |
| 24 | Done | Moved gastroscopy symptoms into “Who May Need”; omitted the unconfirmed high-definition equipment claim. |
| 25 | Done | Updated EMR suitability and Why Choose copy. |
| 26 | Done | Updated ESD copy, anatomy list and en bloc explanation; added the supplied ESD milestone banner. |
| 27 | Done | Updated biopsy conditions and Why Choose copy without claiming laboratory accreditation. |
| 28 | Done | Added PEG examples and changed comfort wording to second person. |
| 29 | Done | Changed Paediatric Upper GI wording to explain the procedure to the child and caregiver; omitted the unconfirmed parent-stay policy. |
| 30 | Done | Merged the paediatric colonoscopy persistent bowel symptom items. |
| 31 | Done | Updated EFTR procedural wording and used “suitable” in place of repeated “carefully selected”. |
| 32 | Done | Replaced GLP-1 defensive wording, updated specialist references and used the supplied gastroenterology-led Why Choose copy. |
| 33 | Done | Rewrote Endobariatric Why Choose copy. No procedure claims were added. |
| 34 | Done | Added the gut–brain sentence, crisis note and counselling-specific Why Choose copy. |
| 35 | Done | Made Why Choose copy specific to each of the 13 services. |
| 36 | Partial by design | Left unconfirmed high-definition equipment, optional/deeper sedation, general anaesthesia and paediatric sedation-team claims out. Related clinic questions are listed in `CLINIC_INPUT_NEEDED.md`. |
| 37 | Done | Added the grouped `/faq` page, footer link and supplied general questions and answers. The “Are procedures painful?” answer remains omitted pending sedation-practice confirmation. |
| 38 | Done with gated questions omitted | All 13 service pages now have at least four FAQs using existing page facts. Added the requested Colonoscopy and ESD questions. Omitted gastroscopy H. pylori, EMR/polypectomy equivalence, PEG oral intake and paediatric parent-stay questions pending clinic-approved answers. |
| 39 | Done | Added FAQPage JSON-LD from each page's visible FAQ records and MedicalClinic/Physician entities on Home and About. |

## Verification

- `npm run build`: passed; TypeScript checks, Vite production build and prerender completed for 23 published routes plus the 404 page.
- Lint: no lint script or ESLint dependency is configured in `package.json`, so a lint command is not available.
- JSON-LD parsing, per-route initial HTML, hydration/browser checks and old-slug redirect behavior are being checked separately; see final report for results.
- No production deployment or production-setting changes were made.
