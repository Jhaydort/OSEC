import { openWhatsAppBooking } from '../../../data/links';
import { Button } from '../../ui/Button/Button';
import { assets } from '../../../data/assets';
import './Navigation.css';

export interface NavigationItem {
  label: string;
  href: string;
}

const defaultItems: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About OSEC', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'News & Health Articles', href: '/news-health-articles' },
  { label: 'Contact Us', href: '/contact' },
];

export interface NavigationProps {
  activeHref?: string;
  items?: NavigationItem[];
  onAppointmentClick?: () => void;
}

/**
 * Shared desktop navigation from Figma component 249:6265.
 * The component accepts page navigation data; it does not compose a page.
 */
export function Navigation({
  activeHref,
  items = defaultItems,
  onAppointmentClick = openWhatsAppBooking,
}: NavigationProps) {
  return (
    <header className="osec-navigation">
      <div className="osec-navigation__announcement">
        <p>
          For enquiries and booking, kindly call&nbsp;+234 816 435 3633&nbsp; or send an email to&nbsp;
          <a href="mailto:info@osecng.com">info@osecng.com</a>
        </p>
      </div>

      <div className="osec-navigation__bar">
        <a className="osec-navigation__brand" href="/" aria-label="OSEC home">
          <img src={assets.brand.logo} alt="OSEC — Outpatient Surgery & Endoscopy Clinic" />
        </a>

        <nav className="osec-navigation__links" aria-label="Primary navigation">
          {items.map((item) => {
            const isActive = item.href === activeHref;

            return (
              <a
                aria-current={isActive ? 'page' : undefined}
                className={`osec-navigation__link${isActive ? ' osec-navigation__link--active' : ''}`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <Button
          aria-label="Book Appointment"
          className="osec-navigation__appointment"
          leadingIcon={<img className="osec-navigation__whatsapp" src={assets.icons.whatsapp} alt="" />}
          onClick={onAppointmentClick}
        >
          Book Appointment
        </Button>
      </div>
    </header>
  );
}
