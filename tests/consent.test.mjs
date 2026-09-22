import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CONSENT_VERSION, CONSENT_MAX_AGE, parseConsent } from '../src/lib/consent.ts';
const now = Date.now();
const valid = { version: CONSENT_VERSION, essential: true, analytics: false, savedAt: now };
test('valid grants and rejections survive parsing without default opt-in', () => {
  assert.deepEqual(parseConsent(JSON.stringify(valid), now), valid);
  assert.equal(parseConsent(JSON.stringify({ ...valid, analytics: true }), now).analytics, true);
});
test('missing, corrupt, expired, future and outdated preferences require a new choice', () => {
  for (const raw of [null, '', '{', 'null', '{}', JSON.stringify({ ...valid, analytics: 'true' }), JSON.stringify({ ...valid, essential: false }), JSON.stringify({ ...valid, version: 0 }), JSON.stringify({ ...valid, savedAt: now + 1 }), JSON.stringify({ ...valid, savedAt: now - CONSENT_MAX_AGE })]) assert.equal(parseConsent(raw, now), null);
});
