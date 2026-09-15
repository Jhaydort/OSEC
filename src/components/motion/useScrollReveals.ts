import { useLayoutEffect } from 'react';

type RevealKind = 'rise' | 'fade' | 'image';
export interface RevealTarget { selector: string; delay?: number; kind?: RevealKind; immediate?: boolean }

/** Progressive enhancement: no hidden content without JS/observer support.
 * A single observer reveals static targets once, without scroll listeners or wrappers.
 */
export function useScrollReveals(enabled: boolean, targets: readonly RevealTarget[]) {
  useLayoutEffect(() => {
    if (!enabled) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const marked: HTMLElement[] = [];
    let observer: IntersectionObserver | undefined;
    const clear = () => {
      observer?.disconnect();
      marked.splice(0).forEach((element) => {
        delete element.dataset.osecReveal;
        delete element.dataset.osecRevealState;
        element.style.removeProperty('--osec-reveal-delay');
      });
    };
    const setup = () => {
      clear();
      if (preference.matches || !('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.osecRevealState = 'visible';
          observer?.unobserve(entry.target);
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
      targets.forEach(({ selector, delay = 0, kind = 'rise', immediate }) => {
        document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
          // Restored scroll positions should never hide content already passed.
          if (element.getBoundingClientRect().bottom < 0) return;
          element.dataset.osecReveal = kind;
          element.dataset.osecRevealState = immediate ? 'visible' : 'pending';
          element.style.setProperty('--osec-reveal-delay', `${delay}ms`);
          marked.push(element);
          if (!immediate) observer?.observe(element);
        });
      });
    };
    setup();
    // Once reduced motion is requested, keep content visible for this visit.
    const onPreferenceChange = () => { if (preference.matches) clear(); };
    preference.addEventListener('change', onPreferenceChange);
    return () => { clear(); preference.removeEventListener('change', onPreferenceChange); };
  }, [enabled, targets]);
}

