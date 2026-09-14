import { assets } from '../../../data/assets';
import { Button } from '../../ui/Button/Button';
import './Footer.css';

const solutionLinks = [
  { label: 'Home', href: '/' },
  { label: 'About us', href: '/about' },
  { label: 'Parttners', href: '/partners' },
  { label: 'Contact', href: '/contact' },
  { label: 'Inspection Reports', href: '/inspection-reports' },
] as const;

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
] as const;

interface SocialLink {
  label: string;
  asset: string;
  href?: string;
}

// TODO: Add the approved OSEC social page URLs when supplied.
// Icons remain non-interactive until their real destination is available.
const socialLinks: readonly SocialLink[] = [
  { label: 'X', asset: assets.icons.socialX },
  { label: 'WhatsApp', asset: assets.icons.socialWhatsapp },
  { label: 'Instagram', asset: assets.icons.socialInstagram },
  { label: 'Facebook', asset: assets.icons.socialFacebook },
];

export interface FooterProps {
  onAppointmentClick?: () => void;
}

/** Shared Figma footer component (234:3393). */
export function Footer({ onAppointmentClick }: FooterProps) {
  return (
    <footer className="osec-footer">
      <div className="osec-footer__canvas">
        <div className="osec-footer__main">
          <a className="osec-footer__logo" href="/" aria-label="OSEC home">
            <span className="osec-footer__logo-mark" aria-hidden="true" />
            <img className="osec-footer__logo-tagline" src={assets.footer.logoTagline} alt="" />
          </a>

          <div className="osec-footer__columns">
            <section className="osec-footer__solutions" aria-labelledby="footer-solutions">
              <h2 id="footer-solutions" className="osec-footer__label">Solutions</h2>
              <nav className="osec-footer__solution-links" aria-label="Footer solutions">
                {solutionLinks.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
              </nav>
            </section>

            <section className="osec-footer__centre" aria-label="OSEC appointment">
              <p className="osec-footer__statement">&quot;Your health our priority. Excellent in care every step of the way.&quot;</p>
              <div className="osec-footer__actions">
                <div className="osec-footer__appointment-row">
                  <Button variant="secondary" onClick={onAppointmentClick}>Book Appointment</Button>
                  <button className="osec-footer__arrow-button" type="button" onClick={onAppointmentClick} aria-label="Book Appointment">
                    <img src={assets.icons.arrowUpRight} alt="" />
                  </button>
                </div>
                <div className="osec-footer__socials" aria-label="OSEC social media">
                  {socialLinks.map((social) => (
                    social.href ? (
                      <a className="osec-footer__social" href={social.href} aria-label={social.label} key={social.label}>
                        <img src={social.asset} alt="" />
                      </a>
                    ) : (
                      <span className="osec-footer__social" key={social.label}>
                        <img src={social.asset} alt={social.label} />
                      </span>
                    )
                  ))}
                </div>
              </div>
            </section>

            <address className="osec-footer__contact" aria-labelledby="footer-contact">
              <h2 id="footer-contact" className="osec-footer__label">Contact</h2>
              <div className="osec-footer__contact-list">
                <a className="osec-footer__contact-row osec-footer__contact-row--phone" href="tel:+2348164353633">
                  <img src={assets.icons.phone} alt="" />
                  <span>+234 816 435 3633</span>
                </a>
                <div className="osec-footer__contact-row osec-footer__contact-row--emails">
                  <img src={assets.icons.mail} alt="" />
                  <span>
                    <a href="mailto:info@osecng.com">info@osecng.com</a>
                    <a href="mailto:osecmedicals@gmail.com">osecmedicals@gmail.com</a>
                  </span>
                </div>
                <div className="osec-footer__contact-row osec-footer__contact-row--address">
                  <img src={assets.icons.location} alt="" />
                  <span>CASS Place, 16 Olabisi Villa, Water Corporation Drive Oniru beside MFM church, Victoria Island.</span>
                </div>
              </div>
            </address>
          </div>
        </div>

        <div className="osec-footer__legal">
          <p>© 2026 OSEC </p>
          <nav aria-label="Legal">
            {legalLinks.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
          </nav>
        </div>
      </div>
    </footer>
  );
}
