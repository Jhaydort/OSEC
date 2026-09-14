import { assets } from '../../../data/assets';
import { getServiceRecommendations } from '../../../data/services';
import { ServiceCard } from '../../ui/ServiceCard/ServiceCard';
import { SectionLabel } from '../../ui/SectionLabel/SectionLabel';
import './ServiceRecommendations.css';

export interface ServiceRecommendationsProps {
  currentServiceId: string;
}

/** Reusable Service Detail recommendation section from Figma frame 375:3577. */
export function ServiceRecommendations({ currentServiceId }: ServiceRecommendationsProps) {
  const recommendations = getServiceRecommendations(currentServiceId, 4);

  return (
    <section className="osec-service-recommendations" aria-labelledby="more-services-heading">
      <div className="osec-service-recommendations__content">
        <header className="osec-service-recommendations__header">
          <div className="osec-service-recommendations__eyebrow">
            <img src={assets.icons.loom} alt="" width={24} height={24} />
            <SectionLabel className="osec-service-recommendations__label">More Services</SectionLabel>
          </div>
          <h2 id="more-services-heading">Specialist Care Built Around Your Needs</h2>
        </header>

        <div className="osec-service-recommendations__viewport">
          <div className="osec-service-recommendations__track">
            {recommendations.map((service) => (
              <ServiceCard
                variant="recommendation"
                image={service.image}
                imageAlt={service.title}
                imagePosition={service.imagePosition}
                title={service.title}
                description={service.description}
                ctaHref={service.href}
                key={service.id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
