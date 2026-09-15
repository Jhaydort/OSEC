import { LineRevealHeading } from '../../motion/LineRevealHeading';
import { useEffect, useState } from 'react';
import { assets } from '../../../data/assets';
import { AlternativeButton } from '../../ui/AlternativeButton/AlternativeButton';
import './Hero.css';

const heroSlides = [assets.hero.left, assets.hero.center, assets.hero.right] as const;

interface HeroShapeCarouselProps {
  className: string;
  slides: readonly string[];
  index: number;
  animate: boolean;
  onTransitionEnd?: () => void;
}

function HeroShapeCarousel({ className, slides, index, animate, onTransitionEnd }: HeroShapeCarouselProps) {
  const trackSlides = [...slides, slides[0]];

  return (
    <div className={`osec-hero__shape ${className}`}>
      <div
        className={`osec-hero__track${animate ? ' osec-hero__track--animated' : ''}`}
        onTransitionEnd={onTransitionEnd}
        style={{ transform: `translateX(-${index * 25}%)` }}
      >
        {trackSlides.map((src, slideIndex) => (
          <img className="osec-hero__image" src={src} alt="" key={`${src}-${slideIndex}`} />
        ))}
      </div>
    </div>
  );
}

/** The Home-only three-layer hero media composition from Figma Group 2. */
export function Hero() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const interval = window.setInterval(() => setIndex((current) => current + 1), 4000);
    return () => window.clearInterval(interval);
  }, []);

  function resetLoop() {
    if (index !== heroSlides.length) return;
    setAnimate(false);
    setIndex(0);
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
  }

  return (
    <section className="osec-hero" aria-labelledby="hero-heading">
      <div className="osec-hero__content">
        <div className="osec-hero__copy">
          <LineRevealHeading id="hero-heading">A center of excellence for gastrointestinal services and procedures</LineRevealHeading>
          <p>
            Catching What Matters, Before It Becomes Serious.<br />
            OSEC helps prevent and treat colorectal cancer through early detection, advanced endoscopy,
            and compassionate care.
          </p>
          <div className="osec-hero__actions">
            <AlternativeButton href="/contact" label="Book Appointment" />
          </div>
        </div>

        <div className="osec-hero__media" aria-label="OSEC clinical care gallery">
          <HeroShapeCarousel className="osec-hero__shape--left" slides={heroSlides} index={index} animate={animate} onTransitionEnd={resetLoop} />
          <HeroShapeCarousel className="osec-hero__shape--center" slides={[heroSlides[1], heroSlides[2], heroSlides[0]]} index={index} animate={animate} />
          <HeroShapeCarousel className="osec-hero__shape--right" slides={[heroSlides[2], heroSlides[0], heroSlides[1]]} index={index} animate={animate} />
        </div>
      </div>
    </section>
  );
}
