import { useEffect, useRef, useState } from 'react';
import { CONSENT_KEY, CONSENT_MAX_AGE, readConsent, saveConsent, type Consent } from '../../../lib/consent';
import { setAnalyticsConsent, trackPageView, trackEvent } from '../../../lib/analytics';
import './CookieConsent.css';

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(readConsent);
  const [analytics, setAnalytics] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const viewed = useRef(false);

  useEffect(() => {
    setAnalyticsConsent(consent);
    if (consent?.analytics && !viewed.current) { trackPageView(); if (window.location.pathname.startsWith('/services/')) trackEvent('service_view'); viewed.current = true; }
    if (!consent?.analytics) viewed.current = false;
    if (!consent) return;
    // Recheck in short intervals because browser timers have a 32-bit limit.
    const timer = window.setInterval(() => {
      if (Date.now() - consent.savedAt >= CONSENT_MAX_AGE) setConsent(null);
    }, 30000);
    return () => clearInterval(timer);
  }, [consent]);

  useEffect(() => {
    const open = () => {
      opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setAnalytics(consent?.analytics ?? false);
      dialog.current?.showModal();
    };
    const sync = (event: StorageEvent) => { if (event.key === CONSENT_KEY || event.key === null) setConsent(readConsent()); };
    const checkExpiry = () => { if (consent && Date.now() - consent.savedAt >= CONSENT_MAX_AGE) setConsent(null); };
    const trackLink = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const url = new URL(anchor.href);
      if (url.hostname === 'wa.me') { trackEvent('whatsapp_click'); if (url.searchParams.has('text')) trackEvent('book_appointment'); }
    };
    document.addEventListener('click', trackLink);
    window.addEventListener('osec:cookie-preferences', open);
    window.addEventListener('storage', sync);
    window.addEventListener('focus', checkExpiry);
    return () => {
      document.removeEventListener('click', trackLink);
      window.removeEventListener('osec:cookie-preferences', open);
      window.removeEventListener('storage', sync);
      window.removeEventListener('focus', checkExpiry);
    };
  }, [consent]);

  function choose(value: boolean) {
    const result = saveConsent(value);
    setAnalyticsConsent(result.consent); // Disable immediately, before React renders.
    setConsent(result.consent);
    setStorageError(!result.persisted);
    dialog.current?.close();
  }

  return <>
    {!consent && <section className="osec-cookies osec-cookies--banner" aria-labelledby="cookie-banner-title">
      <h2 id="cookie-banner-title">Your cookie choices</h2>
      <p>Essential storage keeps this website working and remembers your choice. Optional analytics helps us understand website use and stays off unless you agree. <a href="/cookie-policy">Read our Cookie Policy</a>.</p>
      <div className="osec-cookies__actions">
        <button type="button" onClick={() => choose(true)}>Accept All</button>
        <button type="button" onClick={() => choose(false)}>Reject Non-Essential</button>
        <button type="button" onClick={() => window.dispatchEvent(new Event('osec:cookie-preferences'))}>Manage Preferences</button>
      </div>
    </section>}
    {storageError && <p className="osec-cookies__notice" role="status">Your choice applies to this page, but your browser could not save it. You may be asked again after navigation. <button type="button" onClick={() => setStorageError(false)}>Dismiss</button></p>}
    <dialog className="osec-cookies osec-cookies--dialog" ref={dialog} aria-labelledby="cookie-preferences-title" aria-describedby="cookie-preferences-description" onKeyDown={event => {
      if (event.key !== 'Tab') return;
      const controls = dialog.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled])');
      if (!controls?.length) return;
      const first = controls[0]; const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }} onClose={() => { if (opener.current?.isConnected) opener.current.focus({ preventScroll: true }); }}>
      <h2 id="cookie-preferences-title">Cookie Preferences</h2>
      <p id="cookie-preferences-description">Choose whether to allow optional analytics. You can change your choice here at any time.</p>
      <label className="osec-cookies__category"><input type="checkbox" checked disabled /> <span><strong>Essential — always enabled</strong><br />Remembers your privacy preferences for 180 days. Necessary website requests still operate.</span></label>
      <label className="osec-cookies__category"><input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} /> <span><strong>Analytics — optional</strong><br />Allows Google Analytics if OSEC has configured it. No analytics loads before permission.</span></label>
      <p><a href="/cookie-policy">Cookie Policy</a> · <a href="/privacy-policy">Privacy Policy</a></p>
      <div className="osec-cookies__actions">
        <button type="button" onClick={() => choose(analytics)}>Save Preferences</button>
        <button type="button" onClick={() => choose(true)}>Accept All</button>
        <button type="button" onClick={() => choose(false)}>Reject Non-Essential</button>
        <button type="button" onClick={() => dialog.current?.close()}>Close without saving</button>
      </div>
    </dialog>
  </>;
}
