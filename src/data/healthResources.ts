import { assets } from './assets';

export interface Publication {
  id: string;
  slug: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  volumeIssue: string;
  pages: string;
  doi: string;
  externalUrl: string;
  type: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
}

// Client-supplied bibliography, in Figma order (556:2415 / 226:2582).
// Photographs extracted from the corresponding Figma cards and stored locally.
export const publications: readonly Publication[] = [
  {
    id: 'gist-case-study',
    image: assets.publications.gist,
    imageAlt: 'Presenter beside a GIST case study display at conference Station 3.',
    slug: 'gist-case-study-nigeria',
    title: 'Case Study Video of Rare Gastrointestinal Stromal Tumors (GIST) Discovered during a Colonoscopy in a patient in Nigeria',
    authors: 'Onabanjo, T., Adetona, A. and Awosola, A.',
    journal: 'Endoscopy', year: 2026, volumeIssue: '58(S 03)', pages: 'S712\u2013S713',
    doi: '10.1055/s-0046-1822029', externalUrl: 'https://eref.thieme.de/ZA5KZZU',
    type: 'Case Report / Video Article',
  },
  {
    id: 'fit-colonoscopy-screening',
    image: assets.publications.fitScreening,
    imageAlt: 'Presenter in a striped shirt beside a FIT and colonoscopy research display.',
    slug: 'fit-colonoscopy-screening-west-africa',
    title: 'Comparative Analysis of Fecal Immunochemical Test and Colonoscopy in Colorectal Cancer Screening in a Country in West Africa',
    authors: 'Onabanjo, T., Ogundare, J., Oladiran, I., Dawodu, O., Orimoloye, P., Awosola, A. and Oyerinde, K.',
    journal: 'Endoscopy', year: 2024, volumeIssue: '56(S 02)', pages: 'S446',
    doi: '10.1055/s-0044-1783825', externalUrl: 'https://eref.thieme.de/Z9PK5WW',
    type: 'Research Article',
  },
  {
    id: 'histological-gi-lesions',
    image: assets.publications.giLesions,
    imageAlt: 'Presenter in a grey jacket beside a purple conference ePosters display.',
    slug: 'histological-gi-lesions-west-africa',
    title: 'Histological Characteristics of Upper and Lower Gastrointestinal Lesions in A Region in West Africa',
    authors: 'Onabanjo, T., Awosola, A., Ogundare, J., Oyerinde, O. and Ajigbotafe, T.',
    journal: 'Endoscopy', year: 2025, volumeIssue: '57(S 02)', pages: 'S507',
    doi: '10.1055/s-0045-1806315', externalUrl: 'https://eref.thieme.de/Z9X35W1',
    type: 'Research Article',
  },
  {
    id: 'inflammatory-bowel-changes',
    image: assets.publications.inflammatoryBowel,
    imageAlt: 'Two clinicians in green scrubs at a conference.',
    imagePosition: 'center 15.6%',
    slug: 'inflammatory-bowel-changes-nigeria',
    title: 'Prevalence and Histopathological Patterns of Inflammatory Bowel Changes Among Patients Undergoing Colonoscopy in sub-saharan Africa \u2013 Nigeria',
    authors: 'Onabanjo, T. and Awosola, A.',
    journal: 'Endoscopy', year: 2026, volumeIssue: '58(S 03)', pages: 'S874\u2013S875',
    doi: '10.1055/s-0046-1822395', externalUrl: 'https://eref.thieme.de/ZA5KZBL',
    type: 'Research Article',
  },
];

export const healthResources = publications.slice(0, 3);
