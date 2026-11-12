import { PageMotion } from '../components/motion/PageMotion';
import { ServicesHero } from '../components/services/ServicesHero/ServicesHero';
import { ServicesListing } from '../components/services/ServicesListing/ServicesListing';
import { Footer } from '../components/layout/Footer/Footer';
import { FAQSection } from '../components/shared/FAQSection/FAQSection';
import { servicesFAQs } from '../data/faqs';

export function ServicesPage() {
  return (
    <>
      <PageMotion page="services" />
      <main id="main-content" tabIndex={-1}>
        <ServicesHero />
        <ServicesListing />
        <FAQSection items={servicesFAQs} />
      </main>
      <Footer />
    </>
  );
}
