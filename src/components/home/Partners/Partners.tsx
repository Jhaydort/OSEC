import { assets } from '../../../data/assets';
import './Partners.css';

const logos = [
  { src: assets.partners.nnpcHmo, className: 'osec-partners__logo--nnpc', alt: 'NNPC Health Maintenance Organisation' },
  { src: assets.partners.nemHealth, className: 'osec-partners__logo--nem', alt: 'NEM Health Limited' },
  { src: assets.partners.leadwayHealth, className: 'osec-partners__logo--100', alt: 'Leadway Health' },
] as const;
// Repeat the complete ordered list so each animation half fills the viewport.
const trackLogos = [...logos, ...logos];

function LogoGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="osec-partners__logo-group">
      {trackLogos.map((logo, index) => <img className={`osec-partners__logo ${logo.className}`} src={logo.src} alt={hidden || index >= logos.length ? '' : logo.alt} aria-hidden={hidden || index >= logos.length || undefined} key={`${logo.src}-${index}`} />)}
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
