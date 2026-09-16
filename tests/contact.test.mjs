import { test } from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/contact.ts';

const valid = { firstName: ' Ada ', lastName: 'Visitor', email: 'visitor@example.com', phone: '+234 816 435 3633', natureOfEnquiry: 'Appointment', message: 'Please contact me.', website: '' };
const request = (body) => new Request('http://localhost/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

test('contact validation and Resend delivery contract', async () => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.RESEND_API_KEY;
  let calls = 0;
  let sent;
  process.env.RESEND_API_KEY = 'test-placeholder';
  globalThis.fetch = async (_url, options) => {
    calls++;
    sent = JSON.parse(options.body);
    return Response.json({ id: 'mock-email-id' });
  };
  try {
    assert.equal((await handler.fetch(new Request('http://localhost/api/contact'))).status, 405);
    for (const body of [null, [], {}, { ...valid, website: 'bot' }, { ...valid, email: 'bad' }, { ...valid, phone: 'abc' }, { ...valid, firstName: 12 }, { ...valid, message: ' ' }, { ...valid, message: 'x'.repeat(5001) }, { ...valid, natureOfEnquiry: 'Test\r\nBcc: injected@example.com' }]) {
      assert.equal((await handler.fetch(request(body))).status, 400);
    }
    assert.equal((await handler.fetch(request({ ...valid, message: 'x'.repeat(40000) }))).status, 413);
    assert.equal(calls, 0);
    delete process.env.RESEND_API_KEY;
    assert.equal((await handler.fetch(request(valid))).status, 503);
    process.env.RESEND_API_KEY = 'test-placeholder';
    const response = await handler.fetch(request(valid));
    assert.deepEqual(await response.json(), { success: true });
    assert.equal(sent.from, 'OSEC Website <onboarding@resend.dev>');
    assert.deepEqual(sent.to, ['info@osecng.com']);
    assert.equal(sent.reply_to, valid.email);
    assert.equal(sent.subject, 'New OSEC Website Enquiry ? Appointment');
    assert.match(sent.text, /Name:\nAda Visitor/);
    globalThis.fetch = async () => Response.json({ message: 'Private provider error', name: 'validation_error' }, { status: 403 });
    const failure = await handler.fetch(request(valid));
    assert.equal(failure.status, 502);
    assert.deepEqual(await failure.json(), { error: "We couldn't send your enquiry. Please try again." });
    globalThis.fetch = async () => { throw new Error('Private network error'); };
    assert.equal((await handler.fetch(request(valid))).status, 502);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
  }
});
