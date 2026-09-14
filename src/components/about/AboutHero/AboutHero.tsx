import { useEffect, useRef, useState } from 'react';
import { assets } from '../../../data/assets';
import { AlternativeButton } from '../../ui/AlternativeButton/AlternativeButton';
import './AboutHero.css';

/** First About section, Figma 238:4587, excluding the shared navigation. */
export function AboutHero() {
  const [procedureCount, setProcedureCount] = useState(0);
  const counterRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const counter = counterRef.current;
    if (!counter) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId = 0;
    let started = false;
    let observer: IntersectionObserver | undefined;

    const finish = () => {
      cancelAnimationFrame(frameId);
      observer?.disconnect();
      setProcedureCount(1_800);
    };
    const start = () => {
      if (started) return;
      started = true;
      observer?.disconnect();
      if (reducedMotion.matches) {
        finish();
        return;
      }

      const startedAt = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / 5_000, 1);
        setProcedureCount(Math.round(1_800 * (1 - Math.pow(1 - progress, 2))));
        if (progress < 1) frameId = requestAnimationFrame(tick);
      };
      frameId = requestAnimationFrame(tick);
    };

    const onMotionChange = () => { if (reducedMotion.matches) finish(); };
    reducedMotion.addEventListener('change', onMotionChange);
    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      start();
    } else {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) start();
      }, { threshold: 0.25 });
      observer.observe(counter);
    }

    return () => {
      cancelAnimationFrame(frameId);
      observer?.disconnect();
      reducedMotion.removeEventListener('change', onMotionChange);
    };
  }, []);

  return (
    <section className="osec-about-hero" aria-labelledby="about-heading">
      <div className="osec-about-hero__content">
        <div className="osec-about-hero__intro">
          <h1 id="about-heading">Leading Specialist Care, Driven by Expertise and Compassion.</h1>
          <div className="osec-about-hero__details">
            <div className="osec-about-hero__copy">
              <p>At OSEC, we combine specialist expertise, advanced technology, and compassionate care to help you achieve better health outcomes.</p>
              {/* The specialists section will be added in a later About page step. */}
              <AlternativeButton href="/about#specialists" label="Meet Our Specialists" />
            </div>
            <div className="osec-about-hero__statistics">
              <div className="osec-about-hero__stat">
                <p className="osec-about-hero__number" ref={counterRef} aria-label="1,800 or more">
                  <span aria-hidden="true">{procedureCount.toLocaleString('en-US')}+</span>
                </p>
                <p>Procedures Performed in the last 3years</p>
              </div>
              <div className="osec-about-hero__stat">
                <p className="osec-about-hero__milestone">First in Nigeria</p>
                <p>ESD Procedure</p>
              </div>
            </div>
          </div>
        </div>
        <img className="osec-about-hero__image" src={assets.editorial.image1171283247} alt="OSEC specialist discussing care with a patient" width={1079} height={435} />
      </div>
    </section>
  );
}
