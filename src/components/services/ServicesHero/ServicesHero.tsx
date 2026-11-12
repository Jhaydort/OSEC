import { OSEC_LINKS } from '../../../data/links';
import { AlternativeButton } from '../../ui/AlternativeButton/AlternativeButton';
import './ServicesHero.css';

/** Services page hero from Figma frame 249:6145, excluding shared navigation. */
export function ServicesHero() {
  return (
    <section className="osec-services-hero" aria-labelledby="services-page-heading">
      <div className="osec-services-hero__content">
        <h1 id="services-page-heading">Specialist Care Built Around Your Needs</h1>
        <div className="osec-services-hero__support">
          <p>Delivering specialist care through advanced technology, expert diagnosis, and personalised treatment.</p>
          <AlternativeButton href={OSEC_LINKS.whatsappBooking} target="_blank" rel="noopener noreferrer" label="Book an Appointment" />
        </div>
      </div>
    </section>
  );
}
