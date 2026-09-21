import { useEffect, useId, useRef, useState } from 'react';
import { openWhatsAppBooking } from '../../../data/links';
import { Button } from '../../ui/Button/Button';
import { assets } from '../../../data/assets';
import './Navigation.css';

export interface NavigationItem { label: string; href: string; }
const defaultItems: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About OSEC', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'News & Health Articles', href: '/news-health-articles' },
  { label: 'Contact Us', href: '/contact' },
];
export interface NavigationProps {
  /** Simplified branded header for unlisted standalone forms. */
  standalone?: boolean;
  activeHref?: string;
  items?: NavigationItem[];
  onAppointmentClick?: () => void;
}

/** Shared desktop (249:6265) and mobile (509:2068) Figma navigation. */
export function Navigation({ activeHref, standalone = false, items = defaultItems, onAppointmentClick = openWhatsAppBooking }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const currentPath = (activeHref ?? window.location.pathname).replace(/\/+$/, '') || '/';

  useEffect(() => {
    const media = window.matchMedia('(max-width: 480px)');
    const reset = () => setIsOpen(false);
    media.addEventListener('change', reset);
    return () => media.removeEventListener('change', reset);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true });
    const dismissOutside = (event: Event) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target) && !toggleRef.current?.contains(event.target)) setIsOpen(false);
    };
    const dismissEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener('pointerdown', dismissOutside);
    document.addEventListener('focusin', dismissOutside);
    document.addEventListener('keydown', dismissEscape);
    return () => {
      document.removeEventListener('pointerdown', dismissOutside);
      document.removeEventListener('focusin', dismissOutside);
      document.removeEventListener('keydown', dismissEscape);
    };
  }, [isOpen]);

  return (
    <header className={`osec-navigation${standalone ? ' osec-navigation--standalone' : ''}`}>
      <div className="osec-navigation__announcement">
        <p>
          For enquiries and booking, kindly call&nbsp;+234 816 435 3633&nbsp; or send an email to&nbsp;
          <a href="mailto:info@osecng.com">info@osecng.com</a>
        </p>
      </div>
      <div className="osec-navigation__bar">
        <a className="osec-navigation__brand" href="/" aria-label="OSEC home">
          <picture>
            <img src={assets.brand.logo} alt="OSEC — Outpatient Surgery & Endoscopy Clinic" />
          </picture>
          <span className="osec-navigation__mobile-logo" aria-hidden="true"><span /><img src="/icons/mobile-logo-tagline.svg" alt="" /></span>
        </a>
        {!standalone && <nav ref={menuRef} id={menuId} className={`osec-navigation__links${isOpen ? ' osec-navigation__links--open' : ''}`} aria-label="Primary navigation">
          {items.map((item) => {
            const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(`${item.href}/`));
            return (
              <a aria-current={isActive ? 'page' : undefined}
                className={`osec-navigation__link${isActive ? ' osec-navigation__link--active' : ''}`}
                href={item.href} key={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </a>
            );
          })}
        </nav>}
        <Button aria-label="Book Appointment" className="osec-navigation__appointment"
          leadingIcon={<picture><source media="(max-width: 480px)" srcSet="/icons/mobile-whatsapp.svg" /><img className="osec-navigation__whatsapp" src={assets.icons.whatsapp} alt="" /></picture>}
          onClick={onAppointmentClick}>
          Book Appointment
        </Button>
        {!standalone && <button ref={toggleRef} className="osec-navigation__toggle" type="button"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={isOpen} aria-controls={menuId}
          onClick={() => setIsOpen((open) => !open)}>
          <img src={isOpen ? '/icons/mobile-close.svg' : '/icons/mobile-menu.svg'} alt="" width={24} height={24} />
        </button>}
      </div>
    </header>
  );
}
