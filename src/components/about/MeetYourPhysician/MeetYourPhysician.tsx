import { OSEC_LINKS } from '../../../data/links';
import { assets } from '../../../data/assets';
import { SectionLabel } from '../../ui/SectionLabel/SectionLabel';
import './MeetYourPhysician.css';

/** About page's Figma "Meet Your Physician" section (449:15137). */
export function MeetYourPhysician() {
  return (
    <section className="osec-physician" aria-labelledby="meet-your-physician-heading">
      <div className="osec-physician__content">
        <header className="osec-physician__header">
          <div className="osec-physician__eyebrow">
            <img src={assets.icons.loom} alt="" width={24} height={24} />
            <SectionLabel className="osec-physician__label">Meet Your Physician</SectionLabel>
          </div>
          <h2 id="meet-your-physician-heading">Expert Care, Led by Experience</h2>
        </header>

        <div className="osec-physician__profile">
          <div className="osec-physician__portrait">
            <img
              src={assets.editorial.physicianTaiwo}
              alt="Dr. Onabanjo Taiwo"
              width={310}
              height={370}
              loading="lazy"
            />
          </div>

          <div className="osec-physician__details">
            <div className="osec-physician__copy">
              <div className="osec-physician__identity">
                <h3>Dr. Onabanjo Taiwo</h3>
                <p>Physician Gastroenterologist &amp; Advanced Endoscopist</p>
              </div>
              <div className="osec-physician__biography">
                <p>Dr. Taiwo is an internationally trained Specialist in Gastrointestinal Endoscopy with over 12 years of experience. An ESGE Fellow trained in Germany, with advanced training in Denmark and Belgium, he provides world-class Colonoscopy, Upper GI Endoscopy, Colon Cancer Screening, EMR, ESD, and Endobariatrics in Lagos and across Nigeria.</p>
                <p><strong>Certified member</strong>: WEO | ESGE | ASGE<br />MBBS, PG Diploma in Gastroenterology [UK], MPH [University of Liverpool]</p>
              </div>
            </div>

            <div className="osec-physician__actions">
              <a className="osec-physician__appointment" href={OSEC_LINKS.whatsappBooking} target="_blank" rel="noopener noreferrer">Book Appointment</a>
              <div className="osec-physician__socials" aria-label="Physician contact links">
                <a className="osec-physician__social" href={OSEC_LINKS.physicianLinkedIn} target="_blank" rel="noopener noreferrer" aria-label="Dr. Taiwo Onabanjo on LinkedIn">
                  <img src={assets.icons.physicianLinkedIn} alt="" width={16} height={16} />
                </a>
                <a className="osec-physician__social" href="mailto:info@osecng.com" aria-label="Email Dr. Onabanjo Taiwo">
                  <img src={assets.icons.physicianMail} alt="" width={16} height={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
