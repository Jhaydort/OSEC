import { AlternativeButton } from '../../ui/AlternativeButton/AlternativeButton';
import './ServicesHero.css';

/** Services page hero from Figma frame 249:6145, excluding shared navigation. */
export function ServicesHero() {
  return (
    <section className="osec-services-hero" aria-labelledby="services-page-heading">
      <div className="osec-services-hero__content">
        <h1 id="services-page-heading">Comprehensive Specialist Care,<br />Tailored to Your Needs</h1>
        <div className="osec-services-hero__support">
          <p>Delivering specialist care through advanced technology, expert diagnosis, and personalised treatment.</p>
          <AlternativeButton href="mailto:info@osecng.com" label="Book a Consultation" />
        </div>
      </div>
    </section>
  );
}
