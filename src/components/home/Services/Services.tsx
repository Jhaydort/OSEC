import { assets } from '../../../data/assets';
import { featuredServices } from '../../../data/services';
import { ServiceCard } from '../../ui/ServiceCard/ServiceCard';
import { AlternativeButton } from '../../ui/AlternativeButton/AlternativeButton';
import './Services.css';

/** Figma Home Services frame 295:2183. */
export function Services() {
  return (
    <section className="osec-services" aria-labelledby="services-heading">
      <div className="osec-services__layout">
        <div className="osec-services__intro">
          <div className="osec-services__eyebrow"><img src={assets.icons.loom} alt="" /><span>Our Services</span></div>
          <div className="osec-services__copy">
            <h2 id="services-heading">Specialist Care Built Around Your Needs</h2>
            <p>At OSEC, we combine preventive screening, expert diagnosis, and advanced therapeutic care to help you make informed decisions about your health—with compassion, precision, and confidence.</p>
          </div>
          <AlternativeButton href="/services" label="See all Services" />
        </div>
        <div className="osec-services__cards">
          {featuredServices.map((service, index) => (
            <div className="osec-services__card-wrap" style={{ zIndex: index + 1 }} key={service.title}>
              <ServiceCard image={service.image} imageAlt={service.title} imagePosition={service.imagePosition} title={service.title} description={service.featuredDescription ?? service.description} ctaHref={service.href} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
