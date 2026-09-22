import { CONSENT_MAX_AGE, type Consent } from './consent';

type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; [key: `ga-disable-${string}`]: boolean };
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() ?? '';
const validId = /^G-[A-Z0-9]+$/.test(measurementId);
let allowed = false;
let expiresAt = 0;
let initialized = false;
const analyticsWindow = () => window as unknown as AnalyticsWindow;

// Deliberately no arbitrary parameters: never send form values, service choices,
// patient identifiers, query strings, fragments, or referrers to analytics.
export type AnalyticsEvent = 'book_appointment' | 'whatsapp_click' | 'contact_form_submit' | 'patient_story_submit' | 'service_view';
function permitted() { return allowed && validId && Date.now() < expiresAt; }
function safeLocation() { return window.location.origin + '/'; }
function clearAnalyticsCookies() {
  const host = window.location.hostname.split('.');
  const domains = ['', ...host.map((_, i) => host.slice(i).join('.'))];
  for (const entry of document.cookie.split(';')) {
    const name = entry.trim().split('=')[0];
    if (!/^_ga(?:_|$)/.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/;${domain ? ` Domain=${domain};` : ''} SameSite=Lax`;
    }
  }
}
export function setAnalyticsConsent(consent: Consent | null) {
  allowed = consent?.analytics === true && Date.now() - consent.savedAt < CONSENT_MAX_AGE;
  expiresAt = consent ? consent.savedAt + CONSENT_MAX_AGE : 0;
  const w = analyticsWindow();
  if (!allowed) {
    if (validId) w[`ga-disable-${measurementId}`] = true;
    // Do not send a consent ping on withdrawal. Disable first and clear pending
    // commands; a loaded library cannot be unloaded, but collection is disabled.
    if (w.dataLayer) w.dataLayer.length = 0;
    if (initialized) w.gtag?.('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    clearAnalyticsCookies();
    return;
  }
  if (!validId) return;
  w[`ga-disable-${measurementId}`] = false;
  w.dataLayer ??= [];
  w.gtag ??= function () { w.dataLayer!.push(arguments); };
  if (!initialized) {
    w.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    w.gtag('js', new Date());
  }
  w.gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  w.gtag('config', measurementId, {
    send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
    page_location: safeLocation(), page_title: 'OSEC website', page_referrer: '',
    cookie_expires: 180 * 86400, cookie_update: false,
  });
  if (!initialized) {
    initialized = true;
    const script = document.createElement('script');
    script.id = 'osec-ga'; script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.append(script);
  }
}
export function trackEvent(name: AnalyticsEvent) {
  if (!permitted()) return;
  analyticsWindow().gtag?.('event', name, { send_to: measurementId, page_location: safeLocation(), page_title: 'OSEC website', page_referrer: '' });
}
export function trackPageView() {
  if (!permitted()) return;
  // Report aggregate site visits, without health-related page paths/titles.
  analyticsWindow().gtag?.('event', 'page_view', { send_to: measurementId, page_location: safeLocation(), page_title: 'OSEC website', page_referrer: '' });
}
