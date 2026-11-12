import { assets } from './assets';

export interface Service {
  id: string;
  slug: string;
  image?: string;
  detailImageAlt?: string;
  imagePosition?: string;
  title: string;
  description: string;
  featuredDescription?: string;
  href: string;
  featured: boolean;
  /** Exclude from the full Services listing while preserving the service record and route. */
  visibleInListing?: boolean;
}

/** Service content and ordering from the Figma Our Services page (249:6390). */
export const services: readonly Service[] = [
  {
    id: 'specialist-consultation',
    slug: 'gastrointestinal-specialist-consultation',
    image: assets.services.consultationFigma,
    detailImageAlt: 'Doctor speaking with a patient during a digestive health consultation.',
    imagePosition: '49% 27%',
    title: 'Gastrointestinal Specialist Consultation',
    description: 'Get expert evaluation, personalised advice and a clear care plan tailored to your health needs.',
    href: '/services/gastrointestinal-specialist-consultation',
    featured: true,
  },
  {
    id: 'colonoscopy',
    slug: 'colonoscopy-lower-gi-endoscopy',
    image: assets.services.colonoscopyFigma,
    detailImageAlt: 'Clinician operating an endoscope during a colonoscopy.',
    title: 'Colonoscopy (Lower GI Endoscopy)',
    description: 'A detailed examination of the colon and rectum to detect abnormalities, remove polyps and support colorectal cancer prevention.',
    href: '/services/colonoscopy-lower-gi-endoscopy',
    featured: true,
  },
  {
    id: 'gastroscopy',
    slug: 'gastroscopy-upper-gi-endoscopy',
    image: assets.services.gastroscopySuite,
    detailImageAlt: 'Endoscopy equipment set up in a procedure room.',
    title: 'Gastroscopy (Upper GI Endoscopy)',
    description: 'A camera examination of the oesophagus, stomach and duodenum to investigate persistent symptoms.',
    href: '/services/gastroscopy-upper-gi-endoscopy',
    featured: true,
  },
  {
    id: 'emr',
    slug: 'endoscopic-mucosal-resection-emr',
    image: assets.services.pegFigma,
    detailImageAlt: 'Endoscopy team performing a procedure while viewing the endoscope image on a monitor.',
    title: 'Endoscopic Mucosal Resection (EMR)',
    description: 'A minimally invasive procedure to remove abnormal or precancerous tissue from the digestive tract.',
    featuredDescription: 'A minimally invasive procedure used to remove abnormal tissue or precancerous growths from the digestive tract without major surgery.',
    href: '/services/endoscopic-mucosal-resection-emr',
    featured: true,
  },
  {
    id: 'esd',
    slug: 'endoscopic-submucosal-dissection-esd',
    image: assets.services.emrFigma,
    detailImageAlt: 'Endoscopist performing a procedure with the endoscope view shown on a monitor.',
    title: 'Endoscopic Submucosal Dissection (ESD)',
    description: 'Advanced endoscopic treatment for early-stage gastrointestinal lesions, preserving healthy tissue.',
    href: '/services/endoscopic-submucosal-dissection-esd',
    featured: true,
  },
  {
    id: 'biopsy',
    slug: 'gastrointestinal-biopsy',
    image: assets.services.biopsyFigma,
    detailImageAlt: 'Gloved clinician holding a flexible endoscope.',
    title: 'Gastrointestinal Biopsy',
    description: 'Tissue sampling during endoscopy to support diagnosis and guide treatment.',
    href: '/services/gastrointestinal-biopsy',
    featured: true,
  },
  {
    id: 'peg-feeding-tube',
    slug: 'peg-feeding-tube-placement',
    image: assets.services.pegFeedingTube,
    detailImageAlt: 'Endoscopic view of a feeding tube placed inside the stomach.',
    title: 'PEG Feeding Tube Placement',
    description: 'A minimally invasive procedure that provides long-term nutritional support for patients unable to eat normally.',
    href: '/services/peg-feeding-tube-placement',
    featured: false,
  },
  {
    id: 'paediatric-endoscopy',
    slug: 'paediatric-endoscopy-procedures',
    image: assets.services.paediatricEndoscopyFigma,
    detailImageAlt: 'Endoscopy team preparing to examine a child using a flexible endoscope.',
    title: 'Paediatric Upper GI Endoscopy',
    description: 'A minimally invasive procedure used to examine a child’s upper digestive system.',
    href: '/services/paediatric-endoscopy-procedures',
    featured: false,
  },
  {
    id: 'weight-management',
    slug: 'endobariatric-medical-weight-management',
    image: assets.services.weightManagementFigma,
    detailImageAlt: 'Doctor discussing weight-management options with a patient.',
    title: 'Endobariatric Medical Weight Management',
    description: 'Personalised medical weight-management support throughout your weight-loss journey.',
    href: '/services/endobariatric-medical-weight-management',
    featured: false,
  },
  {
    id: 'eftr-advanced',
    slug: 'endoscopic-full-thickness-resection-eftr',
    image: assets.services.eftrSupplied,
    detailImageAlt: 'Endoscopic image of tissue and a resection device displayed on a clinical monitor.',
    title: 'Endoscopic Full-Thickness Resection (EFTR)',
    description: 'An advanced minimally invasive procedure to remove selected gastrointestinal lesions and early cancers.',
    href: '/services/endoscopic-full-thickness-resection-eftr',
    featured: false,
  },
  {
    id: 'paediatric-colonoscopy',
    slug: 'paediatric-colonoscopy',
    image: assets.services.paediatricColonoscopyFigma,
    detailImageAlt: 'Endoscopic view of the lower digestive tract during examination.',
    title: 'Paediatric Colonoscopy',
    description: 'A minimally invasive procedure to examine the colon and rectum, investigate symptoms and identify abnormalities.',
    href: '/services/paediatric-colonoscopy',
    featured: false,
  },
  {
    id: 'glp-1-assessment-obesity-clinic',
    slug: 'glp-1-assessment-obesity-clinic',
    image: assets.services.weightManagementFigma,
    detailImageAlt: 'Doctor discussing a weight-management plan with a patient.',
    title: 'GLP-1 Assessment & Obesity Clinic',
    description: 'A specialist medical assessment to determine whether GLP-1-based treatment is appropriate for you and what monitoring or further care may be needed.',
    href: '/services/glp-1-assessment-obesity-clinic',
    featured: false,
  },
  {
    id: 'behavioral-counseling',
    slug: 'behavioral-counseling',
    image: assets.services.behavioralCounselingHero,
    detailImageAlt: 'Counsellor speaking with a client during a consultation.',
    title: 'Behavioural Health & Counselling',
    description: 'Professional counselling and psychological support for emotional wellbeing and recovery.',
    href: '/services/behavioral-counseling',
    featured: false,
  },
] as const;

export const featuredServices = services.filter((service) => service.featured);
export const listedServices = services.filter((service) => service.visibleInListing !== false);

/** Clinically related service links follow the approved Batch 2 cross-link guidance. */
const relatedServiceIds: Readonly<Record<string, readonly string[]>> = {
  'specialist-consultation': ['colonoscopy', 'gastroscopy', 'biopsy'],
  colonoscopy: ['emr', 'esd', 'eftr-advanced', 'biopsy', 'paediatric-colonoscopy'],
  gastroscopy: ['specialist-consultation', 'biopsy', 'emr'],
  emr: ['colonoscopy', 'esd', 'eftr-advanced', 'biopsy'],
  esd: ['emr', 'eftr-advanced', 'colonoscopy'],
  biopsy: ['gastroscopy', 'colonoscopy', 'specialist-consultation'],
  'peg-feeding-tube': ['specialist-consultation', 'gastroscopy', 'biopsy'],
  'paediatric-endoscopy': ['paediatric-colonoscopy', 'specialist-consultation'],
  'weight-management': ['glp-1-assessment-obesity-clinic', 'behavioral-counseling', 'specialist-consultation'],
  'eftr-advanced': ['emr', 'esd', 'colonoscopy'],
  'paediatric-colonoscopy': ['paediatric-endoscopy', 'colonoscopy', 'specialist-consultation'],
  'glp-1-assessment-obesity-clinic': ['weight-management', 'behavioral-counseling'],
  'behavioral-counseling': ['glp-1-assessment-obesity-clinic', 'weight-management', 'specialist-consultation'],
};

export function getServiceRecommendations(currentServiceId: string, count = 4): readonly Service[] {
  const ids = relatedServiceIds[currentServiceId] ?? [];
  return ids
    .map((id) => services.find((service) => service.id === id))
    .filter((service): service is Service => !!service)
    .slice(0, count);
}
