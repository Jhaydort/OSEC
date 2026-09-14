import { useEffect, useRef, useState } from 'react';
import { assets } from '../../../data/assets';
import { AlternativeButton } from '../../ui/AlternativeButton/AlternativeButton';
import './Statistics.css';

const PROCEDURES_TOTAL = 1_800;
const COUNTER_DURATION = 5_000;

// Figma Statistics component set 224:1962, variants 1, 2, and 3.
// Variants 2 and 3 intentionally have solid fills instead of image fills.
const STATISTICS_CARDS = [
  {
    heading: 'International Expertise',
    description: 'Continuous international training ensures our team stays at the forefront of modern endoscopy.',
    image: assets.editorial.statsInternationalExpertise,
  },
  {
    heading: 'Medical Innovation',
    description: 'Pioneering advanced therapeutic procedures that improve patient outcomes.',
    image: null,
  },
  {
    heading: 'Community Impact',
    description: 'Bringing specialist digestive healthcare closer to communities across Nigeria.',
    image: null,
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
              {card.image && <img src={card.image} alt="" />}
            </div>
            <div className="osec-statistics__expertise-copy">
              <h3>{card.heading}</h3>
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

/** Animates one time after the section first becomes visible. */
function useCountUp(target: number, sectionRef: React.RefObject<HTMLElement | null>) {
  const [value, setValue] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    let frameId = 0;
    const start = () => {
      if (hasStarted.current) return;
      hasStarted.current = true;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setValue(target);
        return;
      }

      const startedAt = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / COUNTER_DURATION, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 2);
        setValue(Math.round(target * easedProgress));

        if (progress < 1) frameId = requestAnimationFrame(tick);
      };

      frameId = requestAnimationFrame(tick);
    };

    if (!('IntersectionObserver' in window)) {
      start();
      return () => cancelAnimationFrame(frameId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.unobserve(section);
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [sectionRef, target]);

  return value;
}

/** Figma Home frame 224:1971. */
export function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const proceduresCount = useCountUp(PROCEDURES_TOTAL, sectionRef);

  return (
    <section className="osec-statistics" ref={sectionRef} aria-labelledby="statistics-heading">
      <div className="osec-statistics__intro">
        <div className="osec-statistics__eyebrow">
          <img src={assets.icons.loom} alt="" />
          <span>Clinical Excellence</span>
        </div>
        <div className="osec-statistics__intro-copy">
          <h2 id="statistics-heading">Leading the Way in Specialist Gastrointestinal Care</h2>
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
            {formatNumber(proceduresCount)}+
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
