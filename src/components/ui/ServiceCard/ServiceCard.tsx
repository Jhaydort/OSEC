import type { CSSProperties, ReactNode } from 'react';
import './ServiceCard.css';

export interface ServiceCardProps {
  image: string;
  imageAlt: string;
  imagePosition?: CSSProperties['objectPosition'];
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaIcon?: ReactNode;
  className?: string;
  variant?: 'default' | 'recommendation';
}

/** Reusable OSEC service card matching Figma component 212:12976. */
export function ServiceCard({
  image,
  imageAlt,
  imagePosition = 'center',
  title,
  description,
  ctaLabel = 'View Details',
  ctaHref,
  ctaIcon,
  className = '',
  variant = 'default',
}: ServiceCardProps) {
  const cta = <><span>{ctaLabel}</span>{ctaIcon ? <span className="osec-service-card__cta-icon">{ctaIcon}</span> : null}</>;

  return (
    <article className={`osec-service-card osec-service-card--${variant} ${className}`.trim()}>
      <div className="osec-service-card__image-container">
        <img className="osec-service-card__image" src={image} alt={imageAlt} style={{ objectPosition: imagePosition }} />
      </div>
      <div className="osec-service-card__content">
        <div className="osec-service-card__copy">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        {ctaHref ? <a className="osec-service-card__cta" href={ctaHref}>{cta}</a> : <span className="osec-service-card__cta">{cta}</span>}
      </div>
    </article>
  );
}
