import { Footer } from '../components/layout/Footer/Footer';
import { Container } from '../components/layout/Container/Container';
import { LEGAL_UPDATED, type LegalDocument } from '../data/legal';
import { openCookiePreferences } from '../lib/consent';
import './LegalPage.css';

export function LegalPage({ document }: { document: LegalDocument }) {
  return <><main id="main-content" tabIndex={-1} className="osec-legal"><Container>
    <header><h1>{document.title}</h1><p>Last updated: {LEGAL_UPDATED}</p>
      <p className="osec-legal__draft">Draft for OSEC review before production launch. Items marked [OSEC TO CONFIRM] require approval or completion.</p></header>
    {document.sections.map(section => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map(text => <p key={text}>{text}</p>)}</section>)}
    <section><h2>Contact information</h2><p>Outpatient Surgery and Endoscopy Clinic (OSEC)<br />CASS Place, 16 Olabisi Villa, Water Corporation Drive Oniru, Victoria Island.</p><p>Email: <a href="mailto:info@osecng.com">info@osecng.com</a><br />Phone: <a href="tel:+2348164353633">+234 816 435 3633</a></p><p>Dedicated legal/privacy contact, if different: [OSEC TO CONFIRM].</p></section>
    <button type="button" className="osec-legal__preferences" onClick={openCookiePreferences}>Cookie Preferences</button>
  </Container></main><Footer /></>;
}

export function UnavailablePage({ news = false }: { news?: boolean }) {
  return <><main id="main-content" tabIndex={-1} className="osec-legal"><Container><h1>{news ? 'News & Health Articles' : 'Page not found'}</h1><p>{news ? 'Full health articles are not available on this website yet. Please contact OSEC for information about our services.' : 'We could not find this page. Please use the navigation or return to the homepage.'}</p><p><a href="/">Return to Home</a> · <a href="/contact">Contact OSEC</a></p></Container></main><Footer /></>;
}
