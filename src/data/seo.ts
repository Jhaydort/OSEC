import { services } from './services';
import { assets } from './assets';

export interface PageMetadata { path: string; title: string; description: string; noindex?: boolean }
const descriptions: Record<string, string> = {
  'specialist-consultation': 'Learn about gastrointestinal specialist consultation at OSEC, including symptoms assessed, what to expect and next steps for digestive care.',
  gastroscopy: 'Read about gastroscopy at OSEC, an examination of the upper digestive tract, including preparation, sedation and care after the procedure.',
  colonoscopy: 'Learn about colonoscopy at OSEC, including assessment of the lower digestive tract, preparation and what to expect before and after the procedure.',
  biopsy: 'Learn how gastrointestinal biopsy at OSEC collects tissue samples during endoscopy to help investigate digestive conditions and guide further care.',
  emr: 'Read about endoscopic mucosal resection at OSEC, including assessment, preparation and endoscopic removal of suitable abnormal digestive tract tissue.',
  esd: 'Learn about endoscopic submucosal dissection at OSEC, including specialist assessment and treatment of suitable gastrointestinal lesions.',
  'eftr-advanced': 'Read about endoscopic full-thickness resection at OSEC, specialist assessment, preparation and care for selected gastrointestinal lesions.',
  'peg-feeding-tube': 'Learn about PEG feeding tube placement at OSEC, including assessment for nutritional support, preparation and care after the procedure.',
  'paediatric-endoscopy': 'Read about paediatric upper gastrointestinal endoscopy at OSEC, including assessment, preparation and support for children and their families.',
  'paediatric-colonoscopy': 'Learn about paediatric colonoscopy at OSEC, including assessment of digestive symptoms, preparation and care for children.',
  'glp-1-assessment-obesity-clinic': 'Read about GLP-1 assessment and obesity care at OSEC, including clinical evaluation, suitability and ongoing medical support.',
  'weight-management': 'Explore endobariatric and medical weight management at OSEC, including individual assessment, available approaches and follow-up care.',
};
export const seoPages: PageMetadata[] = [
  { path: '/', title: 'OSEC | Outpatient Surgery and Endoscopy Clinic', description: 'Explore gastrointestinal consultations, endoscopy and outpatient care at OSEC in Victoria Island. Learn about our services and contact the clinic.' },
  { path: '/about', title: 'About OSEC | Outpatient Surgery and Endoscopy Clinic', description: 'Learn about OSEC, our approach to specialist care, our story and the physician behind our outpatient surgery and endoscopy clinic.' },
  { path: '/services', title: 'Our Services | OSEC', description: 'Explore OSEC’s gastrointestinal consultations, diagnostic and therapeutic endoscopy, paediatric procedures and medical weight-management services.' },
  { path: '/contact', title: 'Contact OSEC | Enquiries and Appointment Requests', description: 'Contact OSEC in Victoria Island by phone, email or enquiry form. Ask about our services or request help arranging an appointment.' },
  { path: '/patient-story', title: 'Share Your Experience | OSEC', description: 'Send feedback about your OSEC experience and choose whether to give permission for publication of your story.', noindex: true },
  { path: '/news-health-articles', title: 'News & Health Articles | OSEC', description: 'Explore four Endoscopy publications by OSEC clinicians on gastrointestinal lesions, colorectal cancer screening and inflammatory bowel changes, with links to Thieme.' },
  { path: '/privacy-policy', title: 'Privacy Policy | OSEC', description: 'How OSEC handles website enquiries, Patient Stories, publication consent, personal information and optional analytics.' },
  { path: '/terms-and-conditions', title: 'Terms & Conditions | OSEC', description: 'Terms for using the OSEC website, including general medical information, appointment requests, enquiries and Patient Stories.' },
  { path: '/cookie-policy', title: 'Cookie Policy | OSEC', description: 'Learn about essential preference storage, optional analytics and how to change or withdraw your cookie choices on the OSEC website.' },
  ...services.filter((service, index) => services.findIndex(other => other.href === service.href) === index).map(service => ({ path: service.href, title: `${service.title} | OSEC`, description: descriptions[service.id] ?? `Read about ${service.title} at OSEC, including assessment, preparation and what to expect.` })),
];
export function normalizeSiteUrl(value?: string): string {
  if (!value?.trim()) return '';
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' || url.username || url.password || url.port || url.pathname !== '/' || url.search || url.hash || /(^|\.)(localhost|vercel\.app)$/.test(url.hostname) || !url.hostname.includes('.')) return '';
    return url.origin;
  } catch { return ''; }
}
export function metadataFor(path: string): PageMetadata {
  const normalized = path.replace(/\/+$/, '') || '/';
  return seoPages.find(page => page.path === normalized) ?? { path: normalized, title: 'Page not found | OSEC', description: 'This page is not available. Explore OSEC services or contact the clinic.', noindex: true };
}
export function structuredData(page: PageMetadata, siteUrl: string) {
  if (!siteUrl || page.noindex) return [];
  return [{ '@context': 'https://schema.org', '@graph': [
    { '@type': 'MedicalOrganization', '@id': `${siteUrl}/#organization`, name: 'Outpatient Surgery and Endoscopy Clinic (OSEC)', url: `${siteUrl}/`, logo: siteUrl + assets.brand.logo, telephone: '+2348164353633', email: 'info@osecng.com', address: { '@type': 'PostalAddress', streetAddress: 'CASS Place, 16 Olabisi Villa, Water Corporation Drive Oniru, Victoria Island.' } },
    { '@type': 'WebSite', '@id': `${siteUrl}/#website`, name: 'OSEC', url: `${siteUrl}/`, publisher: { '@id': `${siteUrl}/#organization` } },
  ] }];
}
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
export function renderSeoHead(page: PageMetadata, siteUrl: string): string {
  const meta = (name: string, content: string, property = false) => `<meta data-osec-seo ${property ? 'property' : 'name'}="${name}" content="${escapeHtml(content)}">`;
  return [
    `<title data-osec-seo>${escapeHtml(page.title)}</title>`, meta('description', page.description),
    meta('robots', page.noindex ? 'noindex, follow' : 'index, follow'),
    meta('og:type', 'website', true), meta('og:site_name', 'OSEC', true),
    meta('og:title', page.title, true), meta('og:description', page.description, true),
    meta('twitter:card', 'summary'), meta('twitter:title', page.title), meta('twitter:description', page.description),
    ...(siteUrl ? [
      ...(!page.noindex ? [`<link data-osec-seo rel="canonical" href="${escapeHtml(siteUrl + page.path)}">`] : []),
      meta('og:url', siteUrl + page.path, true), meta('og:image', siteUrl + assets.brand.logo, true),
      meta('og:image:alt', 'OSEC — Outpatient Surgery and Endoscopy Clinic', true),
      meta('twitter:image', siteUrl + assets.brand.logo), meta('twitter:image:alt', 'OSEC clinic logo'),
    ] : []),
    ...structuredData(page, siteUrl).map(data => `<script data-osec-seo type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`),
  ].join('\n');
}
