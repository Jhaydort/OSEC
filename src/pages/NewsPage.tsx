import { Container } from '../components/layout/Container/Container';
import { Footer } from '../components/layout/Footer/Footer';
import { FAQSection } from '../components/shared/FAQSection/FAQSection';
import { ArticleCard } from '../components/ui/ArticleCard/ArticleCard';
import { faqs } from '../data/faqs';
import { publications } from '../data/healthResources';
import './NewsPage.css';

/** Figma News & Health Articles frame 556:2415. */
export function NewsPage() {
  return <>
    <main id="main-content" tabIndex={-1} className="osec-news">
      <header className="osec-news__hero">
        <h1>News, Insights &amp; Updates</h1>
        <p>Stay informed with expert perspectives, helpful resources, healthcare insights, and the latest news and updates from OSEC.</p>
      </header>
      <section className="osec-news__publications" aria-label="Published articles">
        <Container className="osec-news__grid">
          {publications.map(publication => <ArticleCard key={publication.id} title={publication.title} image={publication.image} imageAlt={publication.imageAlt} imagePosition={publication.imagePosition} href={publication.externalUrl} external headingLevel={2} />)}
        </Container>
      </section>
      <FAQSection items={faqs} />
    </main>
    <Footer />
  </>;
}
