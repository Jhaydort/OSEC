import { CookieConsent } from '../components/shared/CookieConsent/CookieConsent';
import { SEO } from '../components/shared/SEO';
import { LegalPage, UnavailablePage } from '../pages/LegalPage';
import { legalDocuments } from '../data/legal';
import { HomepageMotion } from '../components/motion/HomepageMotion';
import { Navigation } from '../components/layout/Navigation/Navigation';
import { Footer } from '../components/layout/Footer/Footer';
import { Hero } from '../components/home/Hero/Hero';
import { WhoWeAre } from '../components/home/WhoWeAre/WhoWeAre';
import { Partners } from '../components/home/Partners/Partners';
import { Services } from '../components/home/Services/Services';
import { Reasons } from '../components/home/Reasons/Reasons';
import { Statistics } from '../components/home/Statistics/Statistics';
import { PatientStories } from '../components/home/PatientStories/PatientStories';
import { AppointmentSection } from '../components/shared/AppointmentSection/AppointmentSection';
import { HealthResources } from '../components/home/HealthResources/HealthResources';
import { FAQSection } from '../components/shared/FAQSection/FAQSection';
import { faqs } from '../data/faqs';
import { PatientStoryPage } from '../pages/PatientStoryPage';
import { ContactPage } from '../pages/ContactPage';
import { AboutPage } from '../pages/AboutPage';
import { ServicesPage } from '../pages/ServicesPage';
import { ServiceDetailTemplate } from '../components/services/ServiceDetailTemplate/ServiceDetailTemplate';
import { serviceDetailsBySlug } from '../data/serviceDetails';

/** Native internal anchors navigate in the same tab; render the matching page. */
export default function App() {
  const requestedPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const currentPath = requestedPath === '/terms-of-service' ? '/terms-and-conditions' : requestedPath;
  const legalDocument = legalDocuments[currentPath];
  const isPatientStory = currentPath === '/patient-story';
  const isContact = currentPath === '/contact';
  const isAbout = currentPath === '/about';
  const isServices = currentPath === '/services';
  const serviceSlug = currentPath.startsWith('/services/') ? currentPath.slice('/services/'.length) : '';
  const serviceDetail = Object.prototype.hasOwnProperty.call(serviceDetailsBySlug, serviceSlug) ? serviceDetailsBySlug[serviceSlug] : undefined;

  return (
    <>
      <SEO path={currentPath} />
      <a className="osec-skip-link" href="#main-content">Skip to main content</a>
      <CookieConsent />
      <HomepageMotion enabled={currentPath === '/'} />
      <Navigation activeHref={currentPath} standalone={isPatientStory} />
      {legalDocument ? <LegalPage document={legalDocument} /> : isPatientStory ? <PatientStoryPage /> : isContact ? <ContactPage /> : isAbout ? <AboutPage /> : serviceDetail ? <ServiceDetailTemplate service={serviceDetail} /> : isServices ? <ServicesPage /> : currentPath !== '/' ? <UnavailablePage news={currentPath === '/news-health-articles'} /> : <>
      <main id="main-content" tabIndex={-1}>
      <Hero />
      <WhoWeAre />
      <Partners />
      <Services />
      <Reasons />
      <Statistics />
      <PatientStories />
      <AppointmentSection />
      <HealthResources />
      <FAQSection items={faqs} />
      </main>
      <Footer />
      </>}
    </>
  );
}
