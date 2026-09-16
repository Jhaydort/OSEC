# Contact email delivery

POST /api/contact validates the six contact fields and the hidden website honeypot, then sends a plain-text email through Resend. It returns success only after Resend accepts the email; acceptance does not guarantee inbox delivery.

Server-only configuration lives in api/contact.ts. Current sender: OSEC Website <onboarding@resend.dev>. Sole recipient: info@osecng.com. Reply-To is the validated visitor email. Change EMAIL_CONFIG only after verifying OSEC's sending domain. Never put the API key in src, a VITE_ variable, or committed environment files.

Ensure RESEND_API_KEY is configured in Vercel for the environment being tested (Preview and/or Production). Deploy the reviewed changes before testing the endpoint. No new variable is needed if the existing key is enabled for that environment. No deployment or push was performed as part of this implementation.

The ordinary Vite dev server serves only the frontend. Use Vercel CLI's vercel dev with a server-side Development environment key to exercise the real function locally, or test a Vercel preview deployment. Do not interpret a Vite HTML response as successful email delivery.

Checks: npm run build (includes API TypeScript) and node --test tests/contact.test.mjs (Node 22.18+; mocks Resend and sends no email). The honeypot is basic protection; add shared rate limiting before the Resend call if needed.
