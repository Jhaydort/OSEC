import type { HTMLAttributes, ReactNode } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Keeps the Figma desktop content width at 1080px inside the 1280px canvas. */
export function Container({ children, className = '', ...props }: ContainerProps) {
  return (
    <div className={`osec-container ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
