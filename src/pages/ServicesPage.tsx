import { ServicesHero } from '../components/services/ServicesHero/ServicesHero';
import { ServicesListing } from '../components/services/ServicesListing/ServicesListing';
import { Footer } from '../components/layout/Footer/Footer';
import { FAQSection } from '../components/shared/FAQSection/FAQSection';
import { faqs } from '../data/faqs';

export function ServicesPage() {
  return (
    <>
      <main>
        <ServicesHero />
        <ServicesListing />
        <FAQSection items={faqs} />
      </main>
      <Footer />
    </>
  );
}
