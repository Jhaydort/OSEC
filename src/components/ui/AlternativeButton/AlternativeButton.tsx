import type { AnchorHTMLAttributes } from 'react';
import './AlternativeButton.css';

export interface AlternativeButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
}

/** Figma paired CTA button: 396:14288 default and 396:14290 hover. */
export function AlternativeButton({ label, className = '', href = '#', ...props }: AlternativeButtonProps) {
  return (
    <div className={`osec-alternative-button ${className}`.trim()}>
      <a className="osec-alternative-button__label" href={href} {...props}>{label}</a>
      <a className="osec-alternative-button__arrow" href={href} aria-label={label}>
        <span aria-hidden="true" />
      </a>
    </div>
  );
}
