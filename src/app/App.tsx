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
import { ContactPage } from '../pages/ContactPage';
import { AboutPage } from '../pages/AboutPage';
import { ServicesPage } from '../pages/ServicesPage';
import { ServiceDetailTemplate } from '../components/services/ServiceDetailTemplate/ServiceDetailTemplate';
import { serviceDetailsBySlug } from '../data/serviceDetails';

/** Native internal anchors navigate in the same tab; render the matching page. */
export default function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const isContact = currentPath === '/contact';
  const isAbout = currentPath === '/about';
  const isServices = currentPath === '/services' || currentPath.startsWith('/services/');
  const serviceSlug = currentPath.startsWith('/services/') ? currentPath.slice('/services/'.length) : '';
  const serviceDetail = serviceSlug ? serviceDetailsBySlug[serviceSlug] : undefined;

  return (
    <>
      <Navigation activeHref={isContact ? '/contact' : isAbout ? '/about' : isServices ? '/services' : '/'} />
      {isContact ? <ContactPage /> : isAbout ? <AboutPage /> : serviceDetail ? <ServiceDetailTemplate service={serviceDetail} /> : isServices ? <ServicesPage /> : <>
      <Hero />
      <WhoWeAre />
      <Partners />
      <Services />
      <Reasons />
      <Statistics />
      <PatientStories />
      <AppointmentSection bookingHref="mailto:info@osecng.com" />
      <HealthResources />
      <FAQSection items={faqs} />
      <Footer />
      </>}
    </>
  );
}
