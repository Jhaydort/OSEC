import { Footer } from '../components/layout/Footer/Footer';
import { FAQSection } from '../components/shared/FAQSection/FAQSection';
import { generalFAQGroups } from '../data/faqs';

export function FAQPage() {
  return <>
    <main id="main-content" tabIndex={-1}>
      <header className="osec-news__hero"><h1>Frequently Asked Questions</h1><p>Answers about appointments, procedures, results and care at OSEC.</p></header>
      <FAQSection groups={generalFAQGroups} />
    </main>
    <Footer />
  </>;
}
