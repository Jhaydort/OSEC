import type { HTMLAttributes, ReactNode } from 'react';
import './SectionLabel.css';

interface SectionLabelProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

/** Shared compact label treatment used above section headings in Figma. */
export function SectionLabel({ children, className = '', ...props }: SectionLabelProps) {
  return (
    <p className={`osec-section-label ${className}`.trim()} {...props}>
      {children}
    </p>
  );
}
