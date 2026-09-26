import { assets } from '../../../data/assets';
import { healthResources } from '../../../data/healthResources';
import { ArticleCard } from '../../ui/ArticleCard/ArticleCard';
import { SectionLabel } from '../../ui/SectionLabel/SectionLabel';
import './HealthResources.css';

/** Home-only Health Resources section, Figma 226:2582. */
export function HealthResources() {
  return (
    <section className="osec-health-resources" aria-labelledby="health-resources-heading">
      <div className="osec-health-resources__content">
        <header className="osec-health-resources__header">
          <div className="osec-health-resources__intro">
            <div className="osec-health-resources__eyebrow">
              <img src={assets.icons.loom} alt="" />
              <SectionLabel className="osec-health-resources__label">Health Resources</SectionLabel>
            </div>
            <h2 id="health-resources-heading">Expert Insights for Better Health</h2>
          </div>
          <a className="osec-health-resources__all" href="/news-health-articles">See All Blog</a>
        </header>

        <div className="osec-health-resources__grid">
          {healthResources.map((article) => (
            <ArticleCard key={article.id} title={article.title} image={article.image} href={article.externalUrl} imageAlt={article.imageAlt} imagePosition={article.imagePosition} external />
          ))}
        </div>
      </div>
    </section>
  );
}
