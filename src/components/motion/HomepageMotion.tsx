import { useScrollReveals, type RevealTarget } from './useScrollReveals';
import './motion.css';

const introductions = [
  ['.osec-who-we-are__eyebrow', '.osec-who-we-are__intro h2', '.osec-who-we-are__link'],
  ['.osec-services__eyebrow', '.osec-services__copy h2', '.osec-services__copy p', '.osec-services__intro > .osec-alternative-button'],
  ['.osec-reasons__eyebrow', '.osec-reasons__copy > h2', '.osec-reasons__copy > p'],
  ['.osec-statistics__eyebrow', '.osec-statistics__intro-copy h2', '.osec-statistics__intro-copy p', '.osec-statistics__intro > .osec-alternative-button'],
  ['.osec-patient-stories__eyebrow', '.osec-patient-stories__header h2'],
  ['.osec-health-resources__eyebrow', '.osec-health-resources__intro h2', '.osec-health-resources__all'],
  ['.osec-faq__eyebrow', '.osec-faq__header h2'],
];
const homepageTargets: readonly RevealTarget[] = [
  { selector: '.osec-navigation', kind: 'fade', immediate: true },
  { selector: '.osec-hero__copy > p', delay: 300, immediate: true },
  { selector: '.osec-hero__actions', delay: 400, immediate: true },
  { selector: '.osec-hero__media', kind: 'fade', delay: 500, immediate: true },
  ...introductions.flatMap((group) => group.map((selector, index) => ({ selector, delay: index * 100 }))),
  { selector: '.osec-partners > p' },
  { selector: '.osec-appointment__grid' },
  { selector: '.osec-faq__image', kind: 'image', delay: 200 },
];

/** Mounted only for the homepage; shared sections on other routes stay static. */
export function HomepageMotion({ enabled }: { enabled: boolean }) {
  useScrollReveals(enabled, homepageTargets);
  return null;
}
