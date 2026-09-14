import { assets } from '../../../data/assets';
import './Partners.css';

const logos = [
  { src: assets.partners.image101, className: 'osec-partners__logo--101', alt: 'NEM Insurance' },
  { src: assets.partners.image99, className: 'osec-partners__logo--99', alt: 'Insurance partner' },
  { src: assets.partners.image100, className: 'osec-partners__logo--100', alt: 'Leadway Health' },
  { src: assets.partners.image102, className: 'osec-partners__logo--102', alt: 'Bupa' },
] as const;

function LogoGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="osec-partners__logo-group">
      {logos.map((logo) => <img className={`osec-partners__logo ${logo.className}`} src={logo.src} alt={hidden ? '' : logo.alt} key={logo.src} />)}
    </div>
  );
}

/** Figma frame 208:12045, immediately below the Who We Are video section. */
export function Partners() {
  return (
    <section className="osec-partners" aria-label="Insurance Partners">
      <p>Insurance Partners:</p>
      <div className="osec-partners__viewport">
        <div className="osec-partners__track">
          <LogoGroup />
          <LogoGroup hidden />
        </div>
      </div>
    </section>
  );
}
