import { assets } from '../../../data/assets';
import { AlternativeButton } from '../../ui/AlternativeButton/AlternativeButton';
import './Statistics.css';

const PROCEDURES_TOTAL = 1_800;

// Figma Statistics component set 224:1962, including the added training card.
const STATISTICS_CARDS = [
  {
    heading: 'Research & Publications',
    description: 'Explore clinical research and publications from the OSEC team.',
    image: assets.editorial.statsInternationalExpertise,
    imageAlt: 'Two clinicians standing together in a hospital office.',
    href: '/news-health-articles',
  },
  {
    heading: 'Medical Innovation',
    description: 'Pioneering advanced therapeutic procedures that improve patient outcomes.',
    image: assets.editorial.statsMedicalInnovation,
    imageAlt: 'Clinician holding an endoscope in a procedure room.',
    imageClassName: 'osec-statistics__image--medical-innovation',
  },
  {
    heading: 'Community Impact',
    description: 'Bringing specialist digestive healthcare closer to communities across Nigeria.',
    image: assets.editorial.statsCommunityImpact,
    imageAlt: 'Three healthcare professionals standing together in a hospital corridor.',
    imageClassName: 'osec-statistics__image--community-impact',
  },
  {
    heading: 'Advanced Endoscopy Training',
    description: 'Training the next generation of Nigerian endoscopists in advanced techniques.',
    image: assets.editorial.statsAdvancedEndoscopyTraining,
    imageAlt: 'Endoscopy equipment and a monitor in a procedure room.',
    imageClassName: 'osec-statistics__image--advanced-training',
  },
] as const;

function StatisticsCarousel() {
  return (
    <div className="osec-statistics__carousel" role="region" aria-label="Clinical highlights" aria-roledescription="carousel">
      <div className="osec-statistics__track">
        {[...STATISTICS_CARDS, STATISTICS_CARDS[0]].map((card, index) => (
          <article
            className="osec-statistics__expertise-card"
            key={`${card.heading}-${index}`}
            aria-hidden={index === STATISTICS_CARDS.length ? true : undefined}
            aria-label={`${index + 1} of ${STATISTICS_CARDS.length}`}
            aria-roledescription="slide"
          >
            <div className="osec-statistics__expertise-image-wrap">
              {card.image && <img src={card.image} alt={card.imageAlt} className={'imageClassName' in card ? card.imageClassName : undefined} />}
            </div>
            <div className="osec-statistics__expertise-copy">
              <h3>{'href' in card ? <a href={card.href}>{card.heading}</a> : card.heading}</h3>
              <p>{card.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

/** Figma Home frame 224:1971. */
export function Statistics() {
  return (
    <section className="osec-statistics" aria-labelledby="statistics-heading">
      <div className="osec-statistics__intro">
        <div className="osec-statistics__eyebrow">
          <img src={assets.icons.loom} alt="" />
          <span>Clinical Excellence</span>
        </div>
        <div className="osec-statistics__intro-copy">
          <h2 id="statistics-heading">Advancing Digestive Healthcare in Nigeria</h2>
          <p>
            Our commitment to clinical excellence is reflected in the lives we've impacted, the
            milestones we've achieved, and our continued investment in innovation, research, and
            patient care.
          </p>
        </div>
        <AlternativeButton href="/about" label="Meet Our Specialists" />
      </div>

      <div className="osec-statistics__panel">
        <div className="osec-statistics__metric">
          <span className="osec-statistics__number" aria-label="1,800 or more procedures in the last 3 years">
            {formatNumber(PROCEDURES_TOTAL)}+
          </span>
          <div className="osec-statistics__metric-copy">
            <h3>Procedures in the last 3 years</h3>
            <p>Delivering safe, accurate, and patient-centred care through extensive clinical experience.</p>
          </div>
        </div>

        <StatisticsCarousel />
      </div>
    </section>
  );
}
