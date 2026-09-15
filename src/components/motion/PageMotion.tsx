import { useScrollReveals, type RevealTarget } from './useScrollReveals';
import './motion.css';

const sharedTargets: readonly RevealTarget[] = [
  { selector: '.osec-navigation', kind: 'fade', immediate: true },
  { selector: '.osec-faq__eyebrow' },
  { selector: '.osec-faq__header h2', delay: 100 },
  { selector: '.osec-faq__image', kind: 'image', delay: 200 },
  { selector: '.osec-appointment__grid' },
];

const pageTargets = {
  about: [
    ...sharedTargets,
    // AboutHero and OurStory already have approved motion: no extra targets.
    { selector: '.osec-purpose__header h2' },
    { selector: '.osec-purpose__header p', delay: 100 },
    { selector: '.osec-purpose__card:first-child' },
    { selector: '.osec-purpose__card:nth-child(2)', delay: 100 },
    { selector: '.osec-physician__eyebrow' },
    { selector: '.osec-physician__header h2', delay: 100 },
    { selector: '.osec-physician__portrait', kind: 'image' },
    { selector: '.osec-physician__identity' },
    { selector: '.osec-physician__biography', delay: 100 },
    { selector: '.osec-physician__actions', delay: 200 },
  ],
  services: [
    ...sharedTargets,
    { selector: '.osec-services-hero h1', delay: 100, immediate: true },
    { selector: '.osec-services-hero__support > p', delay: 200, immediate: true },
    { selector: '.osec-services-hero__support > .osec-alternative-button', delay: 300, immediate: true },
    // Only listing cards enter; Home's sticky cards retain their own experience.
    { selector: '.osec-services-listing__card:nth-child(odd)' },
    { selector: '.osec-services-listing__card:nth-child(even)', delay: 100 },
  ],
  detail: [
    ...sharedTargets,
    { selector: '.osec-service-detail__back', immediate: true },
    { selector: '.osec-service-detail__hero h1', delay: 100, immediate: true },
    { selector: '.osec-service-detail__hero p', delay: 200, immediate: true },
    // Keep the hero image's existing service-detail-image-enter animation.
    // Medical copy enters in whole logical sections, never paragraph-by-paragraph.
    { selector: '.osec-service-detail__article > .osec-service-detail__text-section' },
    { selector: '.osec-service-detail__assessment' },
    { selector: '.osec-service-detail__sections > .osec-service-detail__text-section' },
    { selector: '.osec-service-detail__why' },
    { selector: '.osec-service-recommendations__eyebrow' },
    { selector: '.osec-service-recommendations h2', delay: 100 },
    { selector: '.osec-service-recommendations__track > .osec-service-card:nth-child(odd)' },
    { selector: '.osec-service-recommendations__track > .osec-service-card:nth-child(even)', delay: 100 },
  ],
  contact: [
    ...sharedTargets,
    { selector: '.osec-contact__hero h1', delay: 100, immediate: true },
    { selector: '.osec-contact__hero p', delay: 200, immediate: true },
    { selector: '.osec-contact__form-section > h2' },
    { selector: '.osec-contact__form', delay: 100 },
  ],
} as const satisfies Record<string, readonly RevealTarget[]>;

/** One observer per page. Shared templates opt in without layout wrappers. */
export function PageMotion({ page }: { page: keyof typeof pageTargets }) {
  useScrollReveals(true, pageTargets[page]);
  return null;
}
