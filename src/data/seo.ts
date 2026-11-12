import { services } from './services';
import { assets } from './assets';
import { publications } from './healthResources';
import { aboutFAQs, contactFAQs, generalFAQGroups, homepageFAQs, researchFAQs, servicesFAQs } from './faqs';
import { serviceDetailsBySlug, serviceFaqsFor } from './serviceDetails';

export interface PageMetadata { path: string; title: string; description: string; noindex?: boolean }
const serviceMetadata: Record<string, { title: string; description: string }> = {
  'specialist-consultation': {
    title: 'Gastroenterologist Consultation in Lagos | OSEC',
    description: 'Book a gastrointestinal specialist consultation at OSEC in Lagos. Get expert assessment, personalised advice and a clear plan for your digestive health.',
  },
  colonoscopy: {
    title: 'Colonoscopy in Lagos | Lower GI Endoscopy | OSEC',
    description: 'Learn about colonoscopy at OSEC in Lagos. Our specialist team examines the colon to investigate bowel symptoms, detect abnormalities and support colorectal cancer screening.',
  },
  gastroscopy: {
    title: 'Gastroscopy in Lagos | Upper GI Endoscopy | OSEC',
    description: 'Explore gastroscopy at OSEC in Lagos. Upper GI endoscopy helps investigate swallowing difficulties, reflux, ulcers, bleeding and other digestive symptoms.',
  },
  emr: {
    title: 'Endoscopic Mucosal Resection (EMR) in Lagos | OSEC',
    description: 'Learn about EMR at OSEC in Lagos, a minimally invasive endoscopic procedure used to remove suitable abnormal tissue and selected precancerous lesions.',
  },
  esd: {
    title: 'Endoscopic Submucosal Dissection (ESD) | OSEC Nigeria',
    description: 'Discover advanced ESD treatment at OSEC in Nigeria. Our specialist team offers endoscopic removal of selected gastrointestinal lesions without open surgery.',
  },
  biopsy: {
    title: 'Gastrointestinal Biopsy in Lagos | GI Biopsy | OSEC',
    description: 'Learn about gastrointestinal biopsy at OSEC in Lagos. Endoscopic tissue sampling helps investigate inflammation, infections and other digestive conditions.',
  },
  'peg-feeding-tube': {
    title: 'PEG Feeding Tube Placement in Lagos | OSEC',
    description: 'Explore PEG feeding tube placement at OSEC. Learn how endoscopic gastrostomy can support long-term nutrition when eating or swallowing is difficult.',
  },
  'paediatric-endoscopy': {
    title: 'Paediatric Upper GI Endoscopy in Lagos | OSEC',
    description: 'Learn about paediatric upper GI endoscopy at OSEC. Specialist assessment and endoscopic investigation help evaluate digestive symptoms in children.',
  },
  'weight-management': {
    title: 'Endobariatric Weight Management in Lagos | OSEC',
    description: 'Explore endobariatric weight management at OSEC in Lagos. Learn about specialist assessment and suitable endoscopic approaches to weight management.',
  },
  'eftr-advanced': {
    title: 'Endoscopic Full-Thickness Resection (EFTR) | OSEC',
    description: 'Discover EFTR at OSEC in Nigeria, an advanced endoscopic technique used to remove selected difficult gastrointestinal lesions through a minimally invasive approach.',
  },
  'paediatric-colonoscopy': {
    title: "Paediatric Colonoscopy in Lagos | Children's Bowel Care | OSEC",
    description: 'Learn about paediatric colonoscopy at OSEC. Specialist lower GI endoscopy helps investigate persistent bowel symptoms and gastrointestinal conditions in children.',
  },
  'glp-1-assessment-obesity-clinic': {
    title: 'GLP-1 Assessment & Obesity Clinic in Lagos | OSEC',
    description: 'Explore GLP-1 assessment and specialist weight management at OSEC in Lagos, with personalised evaluation, treatment guidance and clinical monitoring.',
  },
  'behavioral-counseling': {
    title: 'Behavioural Health & Counselling in Lagos | OSEC',
    description: 'Explore behavioural health and counselling at OSEC in Lagos, with psychological support, specialist assessment and personalised care for emotional wellbeing.',
  },
};
export const seoPages: PageMetadata[] = [
  { path: '/', title: 'Digestive Health & Endoscopy Clinic in Lagos | OSEC', description: 'OSEC provides specialist digestive health care, colorectal cancer screening and advanced diagnostic and therapeutic endoscopy in Lagos, Nigeria.' },
  { path: '/about', title: 'About OSEC | Digestive Health & Endoscopy Specialists', description: 'Learn about OSEC, a Lagos specialist centre for digestive health, colorectal cancer prevention and advanced therapeutic endoscopy.' },
  { path: '/services', title: 'Endoscopy & Gastroenterology Services in Lagos | OSEC', description: "Explore OSEC's gastroenterology and endoscopy services in Lagos, including colonoscopy, gastroscopy, biopsies and advanced therapeutic procedures." },
  { path: '/contact', title: 'Contact OSEC | Endoscopy Clinic in Lagos', description: 'Contact OSEC in Victoria Island, Lagos, to enquire about digestive health consultations, endoscopy services or booking an appointment.' },
  { path: '/faq', title: 'Frequently Asked Questions | OSEC', description: 'Answers to common questions about appointments, digestive health procedures, results, referrals and care at OSEC.' },
  { path: '/patient-story', title: 'Share Your Experience | OSEC', description: 'Send feedback about your OSEC experience and choose whether to give permission for publication of your story.', noindex: true },
  { path: '/news-health-articles', title: 'Research & Insights | Digestive Health | OSEC', description: "Explore OSEC's research publications and insights on digestive health, colorectal cancer prevention and gastrointestinal endoscopy." },
  { path: '/privacy-policy', title: 'Privacy Policy | OSEC', description: 'How OSEC handles website enquiries, Patient Stories, publication consent, personal information and optional analytics.' },
  { path: '/terms-and-conditions', title: 'Terms & Conditions | OSEC', description: 'Terms for using the OSEC website, including general medical information, appointment requests, enquiries and Patient Stories.' },
  { path: '/cookie-policy', title: 'Cookie Policy | OSEC', description: 'Learn about essential preference storage, optional analytics and how to change or withdraw your cookie choices on the OSEC website.' },
  ...services.filter((service, index) => services.findIndex(other => other.href === service.href) === index).map(service => {
    const metadata = serviceMetadata[service.id];
    if (!metadata) throw new Error(`Missing approved SEO metadata for service: ${service.id}`);
    return { path: service.href, ...metadata };
  }),
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
function faqItemsFor(page: PageMetadata) {
  if (page.path === '/') return homepageFAQs;
  if (page.path === '/about') return aboutFAQs;
  if (page.path === '/services') return servicesFAQs;
  if (page.path === '/contact') return contactFAQs;
  if (page.path === '/news-health-articles') return researchFAQs;
  if (page.path === '/faq') return generalFAQGroups.flatMap(group => group.items);
  const slug = page.path.startsWith('/services/') ? page.path.slice('/services/'.length) : '';
  const detail = serviceDetailsBySlug[slug];
  return detail ? serviceFaqsFor(detail) : [];
}
export function structuredData(page: PageMetadata, siteUrl: string) {
  if (!siteUrl || page.noindex) return [];
  const service = services.find(item => item.href === page.path);
  const serviceUrl = service ? `${siteUrl}${service.href}` : '';
  const clinic = { '@type': page.path === '/' || page.path === '/about' ? 'MedicalClinic' : 'MedicalOrganization', '@id': `${siteUrl}/#organization`, name: 'Outpatient Surgery and Endoscopy Clinic (OSEC)', url: `${siteUrl}/`, logo: siteUrl + assets.brand.logo, telephone: '+2348164353633', email: 'info@osecng.com', address: { '@type': 'PostalAddress', streetAddress: 'CASS Place, 16 Olabisi Villa, Water Corporation Drive Oniru', addressLocality: 'Lagos', addressRegion: 'Lagos', addressCountry: 'NG' } };
  const pageFaqs = faqItemsFor(page);
  return [{ '@context': 'https://schema.org', '@graph': [
    clinic,
    ...(page.path === '/' || page.path === '/about' ? [{ '@type': 'Physician', '@id': `${siteUrl}/about#physician`, name: 'Dr Taiwo Onabanjo', medicalSpecialty: 'Gastroenterology', worksFor: { '@id': `${siteUrl}/#organization` }, url: `${siteUrl}/about` }] : []),
    { '@type': 'WebSite', '@id': `${siteUrl}/#website`, name: 'OSEC', url: `${siteUrl}/`, publisher: { '@id': `${siteUrl}/#organization` } },
    ...(page.path === '/about' ? [
      { '@type': 'AboutPage', '@id': `${siteUrl}/about#webpage`, url: `${siteUrl}/about`, name: page.title, about: { '@id': `${siteUrl}/#organization` }, isPartOf: { '@id': `${siteUrl}/#website` } },
    ] : []),
    ...(page.path === '/services' ? [
      { '@type': 'CollectionPage', '@id': `${siteUrl}/services#webpage`, url: `${siteUrl}/services`, name: page.title, isPartOf: { '@id': `${siteUrl}/#website` }, mainEntity: { '@type': 'ItemList', itemListElement: services.map((item, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@type': 'Service', name: item.title, description: item.description, url: `${siteUrl}${item.href}`, provider: { '@id': `${siteUrl}/#organization` } } })) } },
    ] : []),
    ...(page.path === '/news-health-articles' ? [
      { '@type': 'CollectionPage', '@id': `${siteUrl}${page.path}#webpage`, url: `${siteUrl}${page.path}`, name: page.title, isPartOf: { '@id': `${siteUrl}/#website` }, mainEntity: { '@type': 'ItemList', itemListElement: publications.map((publication, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@type': 'ScholarlyArticle', headline: publication.title, url: publication.externalUrl, datePublished: String(publication.year) } })) } },
    ] : []),
    ...(pageFaqs.length ? [{ '@type': 'FAQPage', '@id': `${siteUrl}${page.path}#faq`, url: `${siteUrl}${page.path}`, mainEntity: pageFaqs.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: `${item.answer}${item.link ? ` ${item.link.label}.` : ''}` } })) }] : []),
    ...(service ? [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/services` },
        { '@type': 'ListItem', position: 3, name: service.title, item: serviceUrl },
      ] },
      { '@type': 'MedicalWebPage', '@id': `${serviceUrl}#webpage`, url: serviceUrl, name: page.title, mainEntity: { '@id': `${serviceUrl}#service` } },
      { '@type': 'Service', '@id': `${serviceUrl}#service`, name: service.title, serviceType: service.title, description: service.description, url: serviceUrl, provider: { '@id': `${siteUrl}/#organization` } },
    ] : []),
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
