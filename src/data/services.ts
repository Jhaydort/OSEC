import { assets } from './assets';

export interface Service {
  id: string;
  slug: string;
  image: string;
  imagePosition?: string;
  title: string;
  description: string;
  featuredDescription?: string;
  href: string;
  featured: boolean;
}

/** Service content and ordering from the Figma Our Services page (249:6390). */
export const services: readonly Service[] = [
  {
    id: 'specialist-consultation',
    slug: 'gastrointestinal-specialist-consultation',
    image: assets.services.consultationFigma,
    imagePosition: '49% 27%',
    title: 'Gastrointestinal Specialist Consultation',
    description: 'Get expert evaluation, personalized advice, and a clear care plan tailored to your health needs.',
    href: '/services/gastrointestinal-specialist-consultation',
    featured: true,
  },
  {
    id: 'colonoscopy',
    slug: 'colonoscopy-lower-gi-endoscopy',
    image: assets.services.colonoscopyFigma,
    title: 'Colonoscopy (Lower GI Endoscopy)',
    description: 'Diagnostic & therapeutic procedures detect intestinal abnormalities and support early diagnosis.',
    href: '/services/colonoscopy-lower-gi-endoscopy',
    featured: true,
  },
  {
    id: 'gastroscopy',
    slug: 'gastroscopy-upper-gi-endoscopy',
    image: assets.services.gastroscopyFigma,
    title: 'Gastroscopy (Upper GI Endoscopy)',
    description: 'Examine the oesophagus, stomach, and upper digestive tract to diagnose the cause of persistent symptoms.',
    href: '/services/gastroscopy-upper-gi-endoscopy',
    featured: true,
  },
  {
    id: 'emr',
    slug: 'endoscopic-mucosal-resection-emr',
    image: assets.services.emrFigma,
    title: 'Endoscopic Mucosal Resection (EMR)',
    description: 'A minimally invasive procedure to remove abnormal or pre-cancerous tissue from the digestive tract.',
    featuredDescription: 'A minimally invasive procedure used to remove abnormal tissue or pre-cancerous growths from the digestive tract without major surgery.',
    href: '/services/endoscopic-mucosal-resection-emr',
    featured: true,
  },
  {
    id: 'esd',
    slug: 'endoscopic-submucosal-dissection-esd',
    image: assets.services.esdFigma,
    title: 'Endoscopic Submucosal Dissection (ESD)',
    description: 'Advanced endoscopic treatment for early-stage gastrointestinal lesions, preserving healthy tissue.',
    href: '/services/endoscopic-submucosal-dissection-esd',
    featured: true,
  },
  {
    id: 'biopsy',
    slug: 'gastrointestinal-biopsy',
    image: assets.services.biopsyFigma,
    title: 'Gastrointestinal Biopsy',
    description: 'Collect tissue samples during endoscopy to diagnose digestive conditions accurately and guide treatment.',
    href: '/services/gastrointestinal-biopsy',
    featured: true,
  },
  {
    id: 'peg-feeding-tube',
    slug: 'peg-feeding-tube-placement',
    image: assets.services.pegFigma,
    title: 'PEG Feeding Tube Placement',
    description: 'A minimally invasive procedure that provides long-term nutritional support for patients unable to eat normally.',
    href: '/services/peg-feeding-tube-placement',
    featured: false,
  },
  {
    id: 'paediatric-endoscopy',
    slug: 'paediatric-endoscopy-procedures',
    image: assets.services.paediatricEndoscopyFigma,
    title: 'Paediatric Endoscopy Procedures',
    description: 'A minimally invasive procedure used to examine a child’s upper digestive system.',
    href: '/services/paediatric-endoscopy-procedures',
    featured: false,
  },
  {
    id: 'weight-management',
    slug: 'endobariatric-medical-weight-management',
    image: assets.services.weightManagementFigma,
    title: 'Endobariatric Medical Weight Management',
    description: 'Personalised medical weight-management support throughout your weight-loss journey.',
    href: '/services/endobariatric-medical-weight-management',
    featured: false,
  },
  {
    id: 'eftr-advanced',
    slug: 'endoscopic-full-thickness-resection-eftr',
    image: assets.services.eftrAdvancedFigma,
    title: 'Endoscopic Full-Thickness Resection (EFTR)',
    description: 'An advanced minimally invasive procedure to remove selected gastrointestinal lesions and early cancers.',
    href: '/services/endoscopic-full-thickness-resection-eftr',
    featured: false,
  },
  {
    id: 'paediatric-colonoscopy',
    slug: 'paediatric-colonoscopy',
    image: assets.services.paediatricColonoscopyFigma,
    title: 'Paediatric Colonoscopy',
    description: 'A minimally invasive procedure to examine the colon and rectum, investigate symptoms and identify abnormalities.',
    href: '/services/paediatric-colonoscopy',
    featured: false,
  },
  {
    id: 'eftr',
    slug: 'endoscopic-full-thickness-resection-eftr',
    image: assets.services.eftrFigma,
    title: 'Endoscopic Full-Thickness Resection (EFTR)',
    description: 'Minimally invasive removal of selected gastrointestinal lesions, polyps, tumours and early cancers.',
    href: '/services/endoscopic-full-thickness-resection-eftr',
    featured: false,
  },
] as const;

export const featuredServices = services.filter((service) => service.featured);

/** Stable per-service rotation avoids render instability while varying suggestions. */
export function getServiceRecommendations(currentServiceId: string, count = 4): readonly Service[] {
  const current = services.find((service) => service.id === currentServiceId);
  if (!current) return [];

  const uniqueRoutes = new Set<string>();
  const pool = services.filter((service) => {
    if (service.href === current.href || uniqueRoutes.has(service.href)) return false;
    uniqueRoutes.add(service.href);
    return true;
  });
  const offset = [...currentServiceId].reduce((hash, character) => ((hash * 31) + character.charCodeAt(0)) >>> 0, 0) % pool.length;

  return Array.from({ length: Math.min(count, pool.length) }, (_, index) => pool[(offset + index) % pool.length]);
}
