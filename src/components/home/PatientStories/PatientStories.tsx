import { useRef, useState } from 'react';
import { assets } from '../../../data/assets';
import { patientStories, type PatientStory } from '../../../data/patientStories';
import { SectionLabel } from '../../ui/SectionLabel/SectionLabel';
import './PatientStories.css';

interface PatientStoriesProps {
  items?: readonly PatientStory[];
}

/** Home frame 226:2087. Temporary local content; see the data-source TODO in patientStories.ts. */
export function PatientStories({ items = patientStories }: PatientStoriesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const story = items[activeIndex % items.length];
  if (!story) return null;

  const advance = (direction: number) => {
    setActiveIndex((index) => (index + direction + items.length) % items.length);
  };

  return (
    <section className="osec-patient-stories" aria-labelledby="patient-stories-heading">
      <img className="osec-patient-stories__background" src={assets.editorial.operatingTheatre} alt="" loading="lazy" />

      <div className="osec-patient-stories__panel">
        <header className="osec-patient-stories__header">
          <div className="osec-patient-stories__eyebrow">
            <img src={assets.patientStories.loom} alt="" />
            <SectionLabel className="osec-patient-stories__label">Patient Stories</SectionLabel>
          </div>
          <h2 id="patient-stories-heading">Trusted by Patients. Driven by Compassion.</h2>
        </header>

        <figure
          className="osec-patient-stories__card"
          onTouchStart={(event) => {
            const touch = event.touches[0];
            touchStart.current = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
          }}
          onTouchCancel={() => { touchStart.current = null; }}
          onTouchEnd={(event) => {
            const start = touchStart.current;
            touchStart.current = null;
            if (!start || items.length < 2) return;
            const touch = event.changedTouches[0];
            const dx = touch.clientX - start.x;
            const dy = touch.clientY - start.y;
            if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy)) {
              advance(dx < 0 ? 1 : -1);
            }
          }}
        >
          <div className="osec-patient-stories__card-header">
            <img className="osec-patient-stories__quotes" src={assets.patientStories.quotes} alt="" />
            <div className="osec-patient-stories__rating">
              <img src={assets.patientStories.star} alt="" />
              <span>{story.ratingLabel}</span>
            </div>
          </div>
          <div className="osec-patient-stories__story" aria-live="polite" aria-atomic="true">
            <blockquote>
              {story.quote}
            </blockquote>
            <figcaption>{story.attribution}</figcaption>
          </div>
        </figure>

        <img className="osec-patient-stories__pagination" src={assets.patientStories.pagination} alt="" />
      </div>

      {/* Manual carousel: left goes to the previous story; right goes to the next.
          Horizontal touch swipes do the same, wrapping at either end.
          Controls are disabled only while the local data contains a single story. */}
      <button className="osec-patient-stories__arrow osec-patient-stories__arrow--previous" type="button" aria-label="Previous patient story" disabled={items.length < 2} onClick={() => advance(-1)}>
        <img src={assets.patientStories.arrow} alt="" />
      </button>
      <button className="osec-patient-stories__arrow osec-patient-stories__arrow--next" type="button" aria-label="Next patient story" disabled={items.length < 2} onClick={() => advance(1)}>
        <img src={assets.patientStories.arrow} alt="" />
      </button>
    </section>
  );
}
