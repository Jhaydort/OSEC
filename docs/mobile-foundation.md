# Mobile navigation and responsive foundation

## Existing architecture

Before this change, `global.css` and `layout.css` both declared the shared container. The effective layout already used a 1280px canvas, 1080px content width, 100px desktop gutters, 24px below 1280px, and 16px at/below 600px. Images/video already had `max-width: 100%`; component image crops and carousel overflow were intentional. Footer columns, forms, services, FAQ, appointment panels, About sections and cards already reflowed through component media queries. Common vertical spacing was 45px/64px. Typography used Outfit, Inter and DM Sans with fixed mobile overrides, not viewport-based font shrinking. Buttons were generally 48px tall.

The old navigation below 1280px was a horizontally scrolling desktop row, with booking offscreen. Existing breakpoints were 1279, 1150, 1100, 1000, 900, 860, 800, 760, 700, 600, 520, 480 and 420px. These component layout breakpoints remain. The Figma Mobile Nav uses the requested 480px boundary.

## Changes

- Reused the single shared Navigation and Button components. The same links become the floating mobile panel, with same-tab anchors, route-aware active state, close-on-link/outside pointer/Escape, focus handling, `aria-expanded`, `aria-controls` and `aria-current`.
- Replaced the scrolling header only at 480px and below. At 481�1279px, the original scrollable navigation row is preserved; 1280px and above retains the desktop navigation. CSS, responsive icon sources and the menu resize listener use the same 480px boundary. Opening the absolutely positioned panel does not move page content.
- Downloaded exact Figma menu, close, WhatsApp, logo-mask and logo-tagline assets. The logo uses its original mask and vector tagline, avoiding an opaque exported background.
- Consolidated effective container rules in `layout.css`. Extended the existing typography file and tokens with mobile categories at 600px. Existing component layout rules remain in place.
- Made mobile service-card height respond to its text so longer titles and paragraphs are not clipped by a desktop aspect ratio. Kept images, overlays and links. Shared mobile page gutters remain 16px, while the Figma header explicitly uses 24px.
- Preserved the existing booking callback, number, prefilled message and external links. Contact/API/Resend logic and Vercel SPA rewrites were not changed.

## Typography

| Category | Mobile size / line height |
| --- | --- |
| Display / hero | 32 / 36px |
| Section headings | 28 / 34px |
| Main cards / FAQ questions | 20 / 28px |
| General body / form input | 16 / 24px |
| Supporting text | 14 / 21px |
| Navigation links | Figma 16 / 24px |
| Header announcement | Figma 12 / 16px |
| Header booking | Figma 12 / 24px |

These are fixed mobile values, so text does not keep shrinking on narrower screens. Existing specialized styles (e.g. long-form body at 16/26px, labels and captions) retain their roles. Desktop rules remain unchanged. Exact Figma exceptions override general categories: node 513:1989, the consultation's “Why Might You Need a Consultation?” text, uses Outfit medium 18/32px and Inter medium 12/18px. This exception applies only to that section, not all service detail copy.

## Figma reference and exact navigation measurements

[Mobile nav component 509:2068](https://www.figma.com/design/8XJioMsKyhjQOEsS9E7tuB/OSEC?node-id=509-2068): inspected with design context and node metadata.

- Closed variant: `509:2067`, Property 1 = Mobile close nav, 402 x 91px.
- Open variant: `509:2066`, Property 1 = Mobile open nav, 402 x 369px including the floating panel.
- Inspected the 402 x 874px mobile frame `502:1909`, containing instance `509:2069`.
- Announcement: 54px at the reference width, 24px horizontal / 11px vertical padding, #430f5c; grows if text wraps further.
- Header row: 4px below announcement, 33px tall, 24px horizontal inset.
- Logo: 78.58034 x 33px.
- Booking CTA `509:2031` / `509:2055`: **144 x 32px**, padding 4px vertical / 12px horizontal, radius 24px, #501f68, 16px icon box, 4px icon/text gap, Outfit regular 400 at 12/24px, centered alignment, zero letter spacing.
- CTA starts at x=198 at 402px, leaving 95.41966px after the logo. Its gap to the 24px hamburger/close icon is 12px. Space between logo and controls flexes with viewport width.
- Invisible pointer extensions provide larger targets while preserving the exact visible control dimensions.
- Panel `507:1991`: 214 x 254px, right-aligned at x=188 and y=115 at the 402px reference width; 24px below the row, 12px radius, #fafbf4 fill, 1px #e0e0e0 border, drop shadow 0 4px 2px rgba(0,0,0,.25), 12px vertical / 6px horizontal padding, 12px item gap. Links have 6px vertical / 12px horizontal padding and a full-width active pill.

The existing News & Health Articles destination `/news-health-articles` is preserved and receives its own active state. The repository does not yet implement a dedicated news page: that path already falls through to homepage content. This task does not invent a news page.

## Local development

The initial connection refusal was caused by no Vite listener on 5173, not by a missing Contact route. Starting Vite exposed two additional local issues: PowerShell blocks npm.ps1 (use npm.cmd), and the native watcher crashed with EBUSY on assets in the OneDrive workspace. The Vite config now enables 300ms polling only on Windows OneDrive paths, excluding tooling/cache files. Scripts explicitly select vite.config.ts to avoid a stale generated vite.config.js taking precedence.

Start with `npm.cmd run dev` on PowerShell. Use the URL Vite prints if its preferred port is occupied. The verified running preview is **http://localhost:5173/**, including **http://localhost:5173/contact**.

## Verification

- Playwright checks at 320, 375, 390, 402 (Figma reference), 430, 480, 481, 768, 1279, 1280 and 1440px. The final breakpoint update specifically verifies 375/390/430/480px and the 480?481?480px transition.
- Direct routes: `/`, `/about`, `/services`, `/contact`, and service detail; all 12 service detail routes checked separately.
- Exact CTA and panel bounds, open/close/outside/Escape, focus return, active states, same-tab navigation, resize reset and unchanged content position.
- No page-wide horizontal overflow at tested stable layouts or throughout mobile/tablet service-image entrance animations. The zoom now runs on the image within its crop; service recommendation tracks intentionally retain their local scrolling.
- Desktop geometry, computed font and padding matched the pre-change baseline at both 1280 and 1440px across all five principal route samples.
- Hero carousel, Partners marquee, Why OSEC selection, statistics counter, FAQ toggling and desktop sticky Services behavior passed browser checks. Adding/removing a temporary asset left the polling dev server responsive.
- Header WhatsApp URL tested with an intercepted local response, without sending a message.
- Existing contact validation/Resend contract test passed with mocked delivery; no live email sent.
- Production build passed. No GitHub push.

Local screenshots and verification scripts are retained under `.cache/cta-check/` (gitignored), including `mobile-verify.mjs`, `mobile-regressions.mjs`, `closed-402.png`, and `open-402.png`.
