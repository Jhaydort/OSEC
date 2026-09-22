export const CONSENT_KEY = 'osec-cookie-consent';
export const CONSENT_VERSION = 1;
export const CONSENT_DAYS = 180;
export const CONSENT_MAX_AGE = CONSENT_DAYS * 86400000;
export interface Consent { version: number; essential: true; analytics: boolean; savedAt: number }

export function parseConsent(raw: string | null, now = Date.now()): Consent | null {
  try {
    const value = JSON.parse(raw ?? 'null');
    return value?.version === CONSENT_VERSION && value.essential === true &&
      typeof value.analytics === 'boolean' && Number.isFinite(value.savedAt) &&
      value.savedAt <= now && now - value.savedAt < CONSENT_MAX_AGE ? value : null;
  } catch { return null; }
}
export function readConsent(): Consent | null {
  try { return parseConsent(localStorage.getItem(CONSENT_KEY)); } catch { return null; }
}
export function saveConsent(analytics: boolean): { consent: Consent; persisted: boolean } {
  const consent: Consent = { version: CONSENT_VERSION, essential: true, analytics, savedAt: Date.now() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    return { consent, persisted: true };
  } catch { return { consent, persisted: false }; }
}
export function openCookiePreferences() {
  window.dispatchEvent(new Event('osec:cookie-preferences'));
}
