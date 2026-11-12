import { useState } from 'react';
import { assets } from '../../../data/assets';
import './Reasons.css';

type Reason = {
  title: string;
  description: string;
  image: string;
};

/**
 * Figma Component 1 (221:1629), used by Home instance 221:1751.
 * Its five Figma variants are represented by the active reason state below.
 */
const reasons: readonly Reason[] = [
  {
    title: 'Specialist-Led Care',
    description:
      'Our specialist-led team provides expert diagnosis and personalised treatment plans tailored to your needs.',
    image: assets.editorial.rectangle18249,
  },
  {
    title: 'Internationally Trained Team',
    description:
      'Our clinicians and endoscopy professionals stay at the forefront of modern techniques through continuous international training.',
    image: assets.editorial.whyOsecInternationalTeam,
  },
  {
    title: 'Advanced Medical Technology',
    description:
      'OSEC provides diagnostic and therapeutic endoscopy, including advanced procedures such as EMR, ESD and EFTR.',
    image: assets.editorial.whyOsecAdvancedTechnology,
  },
  {
    title: 'Compassionate Patient Care',
    description:
      'From consultation to recovery, we focus on making every visit comfortable, respectful, and reassuring.',
    image: assets.editorial.whyOsecCompassionateCare,
  },
  {
    title: 'Early Detection & Prevention',
    description:
      'With accepted insurance plans and outreach programmes, we make expert care more accessible to patients across Nigeria.',
    image: assets.editorial.whyOsecEarlyDetection,
  },
];

export function Reasons() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeReason = reasons[activeIndex];

  return (
    <section className="osec-reasons" aria-labelledby="reasons-heading">
      <div className="osec-reasons__content">
        <div className="osec-reasons__copy">
          <div className="osec-reasons__eyebrow">
            <img src={assets.icons.loom} alt="" />
            <span>Why Choose OSEC</span>
          </div>
          <h2 id="reasons-heading">Why Patients and Physicians Choose OSEC</h2>
          <p>
            At OSEC, we combine expert care, advanced technology, and compassion to help you
            achieve better health outcomes.
          </p>

          <div className="osec-reasons__list" aria-label="Reasons to choose OSEC">
            {reasons.map((reason, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  className="osec-reasons__item"
                  type="button"
                  key={reason.title}
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="osec-reasons__item-title">
                    <img src={assets.icons.loom} alt="" />
                    {reason.title}
                  </span>
                  {isActive ? <span className="osec-reasons__item-description">{reason.description}</span> : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="osec-reasons__image-wrap">
          <img className="osec-reasons__image" src={activeReason.image} alt={activeReason.title} />
        </div>
      </div>
    </section>
  );
}
