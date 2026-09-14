import { services } from '../../../data/services';
import { ServiceCard } from '../../ui/ServiceCard/ServiceCard';
import './ServicesListing.css';

/** Complete Services grid from Figma frame 249:6388. */
export function ServicesListing() {
  return (
    <section className="osec-services-listing" aria-label="Our services">
      <div className="osec-services-listing__grid">
        {services.map((service) => (
          <ServiceCard
            className="osec-services-listing__card"
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
    </section>
  );
}
