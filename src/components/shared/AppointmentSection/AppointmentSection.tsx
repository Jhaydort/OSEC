import { OSEC_LINKS } from '../../../data/links';
import { assets } from '../../../data/assets';
import './AppointmentSection.css';

export interface AppointmentSectionProps {
  /** Defaults both booking CTAs to the shared WhatsApp booking destination. */
  bookingHref?: string;
}

/** Shared Figma “Appoinmet card” (334:2534), used unchanged on Home and Contact. */
export function AppointmentSection({ bookingHref = OSEC_LINKS.whatsappBooking }: AppointmentSectionProps) {
  return (
    <section className="osec-appointment" aria-label="Consultation, contact information and clinic hours">
      <div className="osec-appointment__grid">
        <div className="osec-appointment__column">
          <h2>Consultation</h2>
          <p>
            Take the next step with expert care. Book a consultation with our specialists today..{' '}
            <a className="osec-appointment__consultation-link" href={bookingHref} target="_blank" rel="noopener noreferrer">Click Here</a>
          </p>
        </div>

        <div className="osec-appointment__column">
          <h2>Contact Info</h2>
          <address className="osec-appointment__contact">
            <div className="osec-appointment__contact-row osec-appointment__contact-row--phone">
              <span className="osec-appointment__phone-icon"><img src={assets.icons.phone} alt="" /></span>
              <a href="tel:+2348164353633">+234 816 435 3633</a>
            </div>
            <div className="osec-appointment__contact-row">
              <img src={assets.icons.mail} alt="" />
              <div className="osec-appointment__emails">
                <a href="mailto:info@osecng.com">info@osecng.com</a>
                <a href="mailto:osecmedicals@gmail.com">osecmedicals@gmail.com</a>
              </div>
            </div>
            <div className="osec-appointment__contact-row">
              <img src={assets.icons.location} alt="" />
              <p className="osec-appointment__address">CASS Place, 16 Olabisi Villa, Water Corporation Drive Oniru, Victoria Island.</p>
            </div>
          </address>
        </div>

        <div className="osec-appointment__column">
          <h2>Clinic Hours</h2>
          <div className="osec-appointment__hours">
            <div className="osec-appointment__schedule">
              <img src={assets.icons.clinicHours} alt="" />
              <div className="osec-appointment__times">
                <span>Mon- Fri</span>
                <span>8:00 AM – 5:00 PM</span>
              </div>
            </div>
            <p>By appointment only. <a className="osec-appointment__booking-link" href={bookingHref} target="_blank" rel="noopener noreferrer">Click here to book</a></p>
          </div>
        </div>
      </div>
    </section>
  );
}
