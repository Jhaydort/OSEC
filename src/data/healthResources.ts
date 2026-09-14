import { assets } from './assets';

// Figma Home 226:2582. Figma provides no individual article destinations;
// use the site's existing news route until published article URLs are available.
export const healthResources = [
  {
    id: 'gut-brain-connection',
    title: 'The Gut-Brain Connection: How your digestive health impacts mental well-being and what you can do about it.',
    image: assets.editorial.image1171283320Alt,
    href: '/news-health-articles',
  },
  {
    id: 'acid-reflux',
    title: 'Understanding Acid Reflux: Explore the causes, symptoms, and treatment options to manage this common condition.',
    image: assets.editorial.image1171283320,
    href: '/news-health-articles',
  },
  {
    id: 'digestive-symptoms',
    title: "Signs You Shouldn't Ignore: Learn about common digestive symptoms that may require specialist evaluation.",
    image: assets.editorial.image1171283320,
    href: '/news-health-articles',
  },
] as const;
