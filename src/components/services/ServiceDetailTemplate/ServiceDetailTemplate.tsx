import { PageMotion } from '../../motion/PageMotion';
import { assets } from '../../../data/assets';
import { OSEC_LINKS } from '../../../data/links';
import type { ServiceDetailData } from '../../../data/serviceDetails';
import { Footer } from '../../layout/Footer/Footer';
import { AlternativeButton } from '../../ui/AlternativeButton/AlternativeButton';
import { FAQSection } from '../../shared/FAQSection/FAQSection';
import { faqs } from '../../../data/faqs';
import { ServiceRecommendations } from '../ServiceRecommendations/ServiceRecommendations';
import './ServiceDetailTemplate.css';

export interface ServiceDetailTemplateProps {
  service: ServiceDetailData;
}

/** Reusable OSEC Service Detail layout based on Figma frame 347:2726. */
export function ServiceDetailTemplate({ service }: ServiceDetailTemplateProps) {
  return (
    <>
      <PageMotion page="detail" />
      <main className="osec-service-detail">
        <div className="osec-service-detail__article">
          <header className="osec-service-detail__hero">
            <a className="osec-service-detail__back" href="/services">
              <img src={assets.icons.arrowLeft} alt="" width={24} height={24} />
              <span>Back to Service</span>
            </a>
            <div className="osec-service-detail__hero-copy">
              <h1>{service.title}</h1>
              <p>{service.subtitle}</p>
            </div>
          </header>

          <div className="osec-service-detail__hero-image">
            <img src={service.service.image} alt={service.imageAlt} width={802} height={435} />
          </div>

          {service.overview ? <section className="osec-service-detail__text-section" aria-labelledby="service-overview-heading">
            <h2 id="service-overview-heading">Overview</h2>
            {service.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section> : null}

          {service.assessment ? <section className="osec-service-detail__assessment" aria-labelledby="service-assessment-heading">
            <div className="osec-service-detail__text-section">
              <h2 id="service-assessment-heading">{service.assessment.heading}</h2>
              <p>{service.assessment.introduction}</p>
            </div>
            <ul className="osec-service-detail__assessment-list">
              {service.assessment.items.map((item) => (
                <li key={item}>
                  <img src={assets.icons.loom} alt="" width={24} height={24} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {service.assessment.conclusion ? <p className="osec-service-detail__assessment-conclusion">{service.assessment.conclusion}</p> : null}
          </section> : null}

          {service.sections?.length ? <div className="osec-service-detail__sections">
            {service.sections.map((section) => (
              <section className="osec-service-detail__text-section" key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.items?.length ? (
                  <ul className="osec-service-detail__section-list">
                    {section.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                ) : null}
                {section.concludingParagraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
          </div> : null}

          <section className="osec-service-detail__why" aria-labelledby="why-osec-heading">
            <div className="osec-service-detail__why-copy">
              <h2 id="why-osec-heading">Why Choose OSEC?</h2>
              <p>At OSEC, we combine specialist expertise with personalised care, giving every patient the attention and confidence they deserve.</p>
            </div>
            <AlternativeButton href={OSEC_LINKS.whatsappBooking} target="_blank" rel="noopener noreferrer" label="Book Appointment" />
          </section>
        </div>

        <ServiceRecommendations currentServiceId={service.service.id} />
        <FAQSection items={faqs} />
      </main>
      <Footer />
    </>
  );
}
