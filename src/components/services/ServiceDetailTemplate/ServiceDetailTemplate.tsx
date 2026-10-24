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
        <div className={`osec-service-detail__article${service.service.id === 'behavioral-counseling' ? ' osec-service-detail__article--behavioral' : ''}`}>
          <header className="osec-service-detail__hero">
            <a className="osec-service-detail__back" href="/services">
              <img src={assets.icons.arrowLeft} alt="" width={24} height={24} />
              <span>{service.backLabel ?? 'Back to Service'}</span>
            </a>
            <div className="osec-service-detail__hero-copy">
              <h1>{service.title}</h1>
              <p>{service.subtitle}</p>
            </div>
          </header>

          {service.service.image ? <div className={`osec-service-detail__hero-image${service.service.id === 'behavioral-counseling' ? ' osec-service-detail__hero-image--behavioral' : ''}`}>
            <img src={service.service.image} alt={service.imageAlt} width={802} height={435} style={service.imagePosition ? { objectPosition: service.imagePosition } : undefined} />
          </div> : null}

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
              <section className={`osec-service-detail__text-section${service.service.id === 'specialist-consultation' && section.heading === 'Why Might You Need a Consultation?' ? ' osec-service-detail__consultation-reason' : ''}`} key={section.heading}>
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

          {service.counselor ? <section className="osec-service-detail__counselor" aria-labelledby="service-counselor-heading">
            <div className="osec-service-detail__counselor-intro">
              <div className="osec-service-detail__counselor-label">
                <img src={assets.icons.loom} alt="" width={24} height={24} />
                <span>{service.counselor.label}</span>
              </div>
              <h2 id="service-counselor-heading">{service.counselor.heading}</h2>
            </div>
            <div className="osec-service-detail__counselor-profile">
              <img className="osec-service-detail__counselor-image" src={service.counselor.image} alt={service.counselor.imageAlt} width={310} height={370} />
              <div className="osec-service-detail__counselor-copy">
                <div className="osec-service-detail__counselor-identity">
                  <h3>{service.counselor.name}</h3>
                  <p>{service.counselor.role}</p>
                </div>
                <div className="osec-service-detail__counselor-biography">
                  {service.counselor.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>
            </div>
          </section> : null}

          <section className={`osec-service-detail__why${service.counselor ? ' osec-service-detail__why--after-counselor' : ''}`} aria-labelledby="why-osec-heading" style={service.whyChooseImage ? { backgroundImage: `url("${service.whyChooseImage}")` } : undefined}>
            <div className="osec-service-detail__why-copy">
              <h2 id="why-osec-heading">Why Choose OSEC?</h2>
              <p>{service.whyChoose ?? 'At OSEC, we combine specialist expertise with personalised care, giving every patient the attention and confidence they deserve.'}</p>
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
