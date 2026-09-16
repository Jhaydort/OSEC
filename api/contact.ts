import { Resend } from 'resend';

// Update only after OSEC's sending domain has been verified in Resend.
const EMAIL_CONFIG = {
  from: 'OSEC Website <onboarding@resend.dev>',
  to: ['info@osecng.com'],
};
const limits = { firstName: 100, lastName: 100, email: 254, phone: 40, natureOfEnquiry: 200, message: 5000 } as const;
const failure = (status: number) => Response.json({ error: "We couldn't send your enquiry. Please try again." }, { status });

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') return new Response(null, { status: 405, headers: { Allow: 'POST' } });
    if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return failure(415);
    let body: Record<string, unknown>;
    try {
      // Bound the body while reading, including requests without Content-Length.
      const reader = request.body?.getReader();
      if (!reader) return failure(400);
      const chunks: Uint8Array[] = [];
      let length = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        length += value.byteLength;
        if (length > 32768) { await reader.cancel(); return failure(413); }
        chunks.push(value);
      }
      body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      if (!body || typeof body !== 'object' || Array.isArray(body)) return failure(400);
    } catch { return failure(400); }

    if (body.website !== undefined && (typeof body.website !== 'string' || body.website.trim())) return failure(400);
    const fields = {} as Record<keyof typeof limits, string>;
    for (const key of Object.keys(limits) as (keyof typeof limits)[]) {
      if (typeof body[key] !== 'string') return failure(400);
      const value = body[key].trim();
      if (!value || value.length > limits[key]) return failure(400);
      // Single-line fields cannot inject mail headers; message permits line breaks.
      if (key !== 'message' && /[\r\n\x00-\x1f\x7f]/.test(value)) return failure(400);
      fields[key] = value;
    }
    if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fields.email)) return failure(400);
    if (!/^[+\d().\s-]+$/.test(fields.phone) || fields.phone.replace(/\D/g, '').length < 7) return failure(400);

    // Future shared rate limiting belongs here, before contacting Resend.
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return failure(503);
    try {
      const resend = new Resend(apiKey);
      const { data, error } = await resend.emails.send({
        ...EMAIL_CONFIG,
        replyTo: fields.email,
        subject: fields.natureOfEnquiry ? 'New OSEC Website Enquiry ? ' + fields.natureOfEnquiry : 'New OSEC Website Enquiry',
        text: [
          'NEW WEBSITE ENQUIRY',
          'Name:\n' + fields.firstName + ' ' + fields.lastName,
          'Email:\n' + fields.email,
          'Phone:\n' + fields.phone,
          'Nature of Enquiry:\n' + fields.natureOfEnquiry,
          'Message:\n' + fields.message,
        ].join('\n\n'),
      });
      if (error || !data?.id) return failure(502);
      return Response.json({ success: true });
    } catch { return failure(502); }
  },
};
