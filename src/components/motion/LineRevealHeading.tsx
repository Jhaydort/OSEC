import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import './motion.css';

/** Measure natural word wrapping using the real heading font and available width.
 * Wrappers preserve line height; resize/font changes remeasure without replaying.
 */
export function LineRevealHeading({ id, children }: { id: string; children: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const measured = useRef(false);
  const [layout, setLayout] = useState<{ lines: string[]; animate: boolean } | null>(null);
  useLayoutEffect(() => {
    const heading = ref.current;
    if (!heading) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cancelled = false;
    let lastWidth = -1;
    const measure = () => {
      if (cancelled || preference.matches) { setLayout(null); return; }
      const clone = heading.cloneNode(false) as HTMLHeadingElement;
      clone.removeAttribute('id');
      clone.removeAttribute('aria-label');
      clone.setAttribute('aria-hidden', 'true');
      clone.textContent = children;
      Object.assign(clone.style, { position: 'fixed', visibility: 'hidden', pointerEvents: 'none', width: `${heading.getBoundingClientRect().width}px`, top: '0', left: '0', margin: '0' });
      heading.parentElement?.appendChild(clone);
      const node = clone.firstChild!;
      const range = document.createRange();
      const lines: string[] = [];
      let previousTop = -Infinity;
      for (const word of children.matchAll(/\S+/g)) {
        range.setStart(node, word.index!);
        range.setEnd(node, word.index! + word[0].length);
        const top = range.getBoundingClientRect().top;
        if (Math.abs(top - previousTop) > 1) lines.push(word[0]);
        else lines[lines.length - 1] += ` ${word[0]}`;
        previousTop = top;
      }
      clone.remove();
      const animate = !measured.current;
      measured.current = true;
      setLayout((current) => current?.lines.join(' ') === lines.join(' ') && current.lines.length === lines.length && current.lines.every((line, index) => line === lines[index]) ? current : { lines, animate });
    };
    measure();
    const resize = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      if (lastWidth < 0) { lastWidth = width; return; }
      if (Math.abs(width - lastWidth) > 0.5) { lastWidth = width; measure(); }
    });
    resize.observe(heading);
    // Font swaps must preserve natural wrapping, without a second entrance.
    document.fonts.ready.then(() => { if (!cancelled) measure(); });
    const reduce = () => { if (preference.matches) setLayout(null); };
    preference.addEventListener('change', reduce);
    return () => { cancelled = true; resize.disconnect(); preference.removeEventListener('change', reduce); };
  }, [children]);

  return <h1 id={id} ref={ref} aria-label={layout ? children : undefined}>
    {layout ? layout.lines.map((line, index) => <span className="osec-line-reveal" aria-hidden="true" key={index}>
      <span className={layout.animate ? 'osec-line-reveal__text osec-line-reveal__text--enter' : 'osec-line-reveal__text'} style={{ '--osec-reveal-delay': `${100 + index * 90}ms` } as CSSProperties}>{line}{index < layout.lines.length - 1 ? ' ' : ''}</span>
    </span>) : children}
  </h1>;
}
