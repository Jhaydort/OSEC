import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leadingIcon?: ReactNode;
}

/** Shared Figma CTA and outlined service-card button. */
export function Button({
  children,
  className = '',
  leadingIcon,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`osec-button osec-button--${variant} ${className}`.trim()}
      type={type}
      {...props}
    >
      {leadingIcon ? <span className="osec-button__icon">{leadingIcon}</span> : null}
      <span>{children}</span>
    </button>
  );
}
