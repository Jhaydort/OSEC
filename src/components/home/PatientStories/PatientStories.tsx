import { useCallback, useEffect, useRef, useState } from 'react';
import { assets } from '../../../data/assets';
import type { PatientStory } from '../../../data/patientStories';
import { SectionLabel } from '../../ui/SectionLabel/SectionLabel';
import { services } from '../../../data/services';
import './PatientStories.css';

/** Existing Figma carousel, populated only by the approved public query. */
export function PatientStories() {
  const [items, setItems] = useState<PatientStory[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    import('../../../lib/fetchPatientStories')
      .then(({ fetchPatientStories }) => fetchPatientStories(controller.signal))
      .then((stories) => { if (!controller.signal.aborted) setItems(stories); })
      .catch(() => { /* Keep the surrounding page intact; never expose database errors. */ })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [timerVersion, setTimerVersion] = useState(0);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReducedMotion(media.matches);
    const visibility = () => setHidden(document.hidden);
    media.addEventListener('change', change);
    document.addEventListener('visibilitychange', visibility);
    return () => { media.removeEventListener('change', change); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  const selectStory = useCallback((index: number, slideDirection = 1) => {
    setTimerVersion((value) => value + 1);
    if (index === activeIndex || previousIndex !== null) return;
    setDirection(slideDirection);
    setPreviousIndex(reducedMotion ? null : activeIndex);
    setActiveIndex(index);
  }, [activeIndex, previousIndex, reducedMotion]);
  const advance = (direction: number) => selectStory((activeIndex + direction + items.length) % items.length, direction);
  useEffect(() => {
    if (previousIndex === null) return;
    if (reducedMotion) { setPreviousIndex(null); return; }
    const timer = window.setTimeout(() => setPreviousIndex(null), 700);
    return () => window.clearTimeout(timer);
  }, [previousIndex, reducedMotion]);
  useEffect(() => {
    if (items.length < 2 || paused || focused || hidden || reducedMotion || previousIndex !== null) return;
    const timer = window.setTimeout(() => selectStory((activeIndex + 1) % items.length), 4500);
    return () => window.clearTimeout(timer);
  }, [items.length, activeIndex, paused, focused, hidden, reducedMotion, previousIndex, timerVersion, selectStory]);

  return (
    <section className="osec-patient-stories" aria-labelledby="patient-stories-heading" aria-busy={loading} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <img className="osec-patient-stories__background" src={assets.editorial.operatingTheatre} alt="" loading="lazy" />

      <div className="osec-patient-stories__panel">
        <header className="osec-patient-stories__header">
          <div className="osec-patient-stories__eyebrow">
            <img src={assets.patientStories.loom} alt="" />
            <SectionLabel className="osec-patient-stories__label">Patient Stories</SectionLabel>
          </div>
          <h2 id="patient-stories-heading">Trusted by Patients. Driven by Compassion.</h2>
        </header>

        {items.length ? <div className="osec-patient-stories__viewport" data-direction={direction}
          onPointerEnter={(event) => { if (event.pointerType === 'mouse') setPaused(true); }}
          onPointerLeave={() => setPaused(false)}
          onTouchStartCapture={() => setPaused(true)} onTouchEndCapture={() => setPaused(false)} onTouchCancelCapture={() => setPaused(false)}
        >{items.map((story, index) => <figure key={index}
          aria-hidden={index !== activeIndex}
          className={`osec-patient-stories__card osec-patient-stories__slide ${index === activeIndex ? 'is-active' : ''} ${index === previousIndex ? 'is-outgoing' : ''} ${previousIndex !== null ? 'is-moving' : ''}`}
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
              <span>{story.rating} Review</span>
            </div>
          </div>
          <div className="osec-patient-stories__story" >
            <blockquote>
              {story.review}
            </blockquote>
            <figcaption>{story.full_name} &mdash; {services.find((service) => service.id === story.service)?.title ?? story.service}</figcaption>
          </div>
        </figure>)}</div> : <div className="osec-patient-stories__card osec-patient-stories__placeholder" role="status">
          {loading ? 'Loading patient stories...' : 'Patient stories will appear here when available.'}
        </div>}

        <div className="osec-patient-stories__pagination" aria-label="Patient story navigation">
          {items.map((_, index) => <button key={index} type="button" aria-label={`Show patient story ${index + 1}`} aria-current={index === activeIndex ? 'true' : undefined} onClick={() => selectStory(index, index < activeIndex ? -1 : 1)} />)}
        </div>
      </div>

      {/* Manual carousel: left goes to the previous story; right goes to the next.
          Horizontal touch swipes do the same, wrapping at either end.
          Controls are disabled only when fewer than two approved stories are available. */}
      <button className="osec-patient-stories__arrow osec-patient-stories__arrow--previous" type="button" aria-label="Previous patient story" disabled={items.length < 2} onClick={() => advance(-1)}>
        <img src={assets.patientStories.arrow} alt="" />
      </button>
      <button className="osec-patient-stories__arrow osec-patient-stories__arrow--next" type="button" aria-label="Next patient story" disabled={items.length < 2} onClick={() => advance(1)}>
        <img src={assets.patientStories.arrow} alt="" />
      </button>
    </section>
  );
}
