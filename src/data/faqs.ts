export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  link?: { label: string; href: string };
}

export interface FAQGroup {
  heading: string;
  items: readonly FAQItem[];
}

/** Homepage FAQs: first visit, scope and access. */
export const homepageFAQs: readonly FAQItem[] = [
  { id: 'home-speciality', question: 'What does OSEC specialise in?', answer: 'We are a specialist centre for digestive health, colorectal cancer prevention and diagnostic and therapeutic gastrointestinal endoscopy. Our team assesses digestive symptoms and provides appropriate endoscopic investigation and treatment.' },
  { id: 'home-conditions', question: 'What digestive health conditions can OSEC assess?', answer: 'We assess concerns affecting the upper and lower digestive tract, including persistent abdominal symptoms, reflux, swallowing difficulty, bowel habit changes, bleeding, inflammatory conditions, polyps and suspected lesions. A specialist consultation helps determine what assessment is appropriate.' },
  { id: 'home-services', question: 'Which endoscopy and specialist services are available?', answer: 'We offer gastroscopy, colonoscopy, gastrointestinal biopsy, EMR, ESD, EFTR, PEG tube placement and paediatric endoscopy. We also offer specialist consultations, weight management, and behavioural health and counselling. Visit Services to read about each offering.' },
  { id: 'home-screening', question: 'Who may benefit from colorectal cancer screening?', answer: 'Screening may be considered based on your age, risk factors and doctor?s recommendation. If you have bowel symptoms or a personal or family history, our specialist can assess whether screening or diagnostic colonoscopy is appropriate.' },
  { id: 'home-outreach', question: 'Can OSEC provide specialist endoscopy outside Lagos?', answer: 'We provide mobile endoscopy and outreach services beyond Lagos. Contact our team to confirm current locations, available services and arrangements for your city.' },
  { id: 'home-booking', question: 'How can I book an appointment with OSEC?', answer: 'Call +234 816 435 3633 or use the Contact page enquiry form. You can also use our Book an Appointment link to start an enquiry with us.' },
];

/** About FAQs focus on expertise and institutional distinction. */
export const aboutFAQs: readonly FAQItem[] = [
  { id: 'about-speciality', question: 'What does OSEC specialise in?', answer: 'We focus on digestive health, colorectal cancer prevention, and advanced diagnostic and therapeutic endoscopy. Our approach combines specialist assessment with care tailored to you.' },
  { id: 'about-team', question: 'Who leads OSEC?s digestive health team?', answer: 'Our lead physician is Dr Taiwo Onabanjo, Consultant Gastroenterologist and Advanced Therapeutic Endoscopist. He is supported by our endoscopy nursing team, theatre technicians and other healthcare professionals.' },
  { id: 'about-services', question: 'What diagnostic and therapeutic care do you provide?', answer: 'We provide upper and lower gastrointestinal endoscopy, biopsy, polyp and lesion removal techniques such as EMR, ESD and EFTR, PEG feeding tube placement, specialist consultation and paediatric endoscopy.' },
  { id: 'about-difference', question: 'What distinguishes OSEC?s endoscopy services?', answer: 'We combine diagnostic and therapeutic endoscopy with a focus on earlier diagnosis, colorectal screening and patient-centred care. We have performed more than 1,800 procedures in the last three years and offer advanced lesion removal, with treatment decisions based on individual specialist assessment.' },
  { id: 'about-esd', question: 'What is OSEC?s experience with endoscopic submucosal dissection (ESD)?', answer: 'Our team was the first in Nigeria to perform ESD. The technique can remove selected complex precancerous lesions and early cancers endoscopically; suitability depends on specialist review of the lesion.' },
  { id: 'about-outreach', question: 'Does OSEC provide specialist care outside Lagos?', answer: 'We provide mobile endoscopy and corporate screening programmes across Nigeria, with outreach locations including Abuja, Asaba, Port Harcourt and Kano. Contact us to confirm current dates and which services are available at a specific site.' },
];

export const servicesFAQs: readonly FAQItem[] = [
  { id: 'services-procedures', question: 'Which endoscopic procedures can I access through OSEC?', answer: 'We offer gastroscopy, colonoscopy, biopsy, EMR, ESD, EFTR, PEG placement and paediatric upper and lower GI endoscopy. Each procedure has a separate page describing its purpose and what it may help investigate or treat.' },
  { id: 'services-diagnostic-therapeutic', question: 'What is the difference between diagnostic and therapeutic endoscopy?', answer: 'Diagnostic endoscopy examines the digestive tract to investigate symptoms or identify abnormalities, and may include taking biopsies. Therapeutic endoscopy treats selected findings during a procedure, for example removing suitable polyps or lesions. The appropriate approach depends on specialist assessment.' },
  { id: 'services-upper-lower', question: 'How do gastroscopy and colonoscopy differ?', answer: 'Gastroscopy examines the oesophagus, stomach and duodenum using an endoscope passed through the mouth. Colonoscopy examines the rectum and colon using a scope passed through the anus. They investigate different symptoms and parts of the digestive tract.' },
  { id: 'services-lesions', question: 'Which OSEC services can assess or remove gastrointestinal polyps and lesions?', answer: 'Colonoscopy can identify abnormalities and remove some suitable polyps. EMR, ESD and EFTR are endoscopic removal techniques for selected lesions, with the choice depending on the lesion?s size, location and characteristics. A specialist determines the suitable option.' },
  { id: 'services-children', question: 'Does OSEC provide gastrointestinal endoscopy for children?', answer: 'We offer paediatric upper GI endoscopy and paediatric colonoscopy. These procedures investigate symptoms affecting your child?s upper or lower digestive tract, with preparation and care planned for them individually.' },
  { id: 'services-advice', question: 'Can I speak with a specialist before choosing a procedure?', answer: 'Yes. A gastrointestinal specialist consultation reviews your symptoms, medical history and previous investigations. The specialist can explain whether further tests may be useful and discuss an appropriate next step. Contact us to arrange an assessment.' },
];

export const contactFAQs: readonly FAQItem[] = [
  { id: 'contact-book', question: 'How do I book a consultation or procedure?', answer: 'Call +234 816 435 3633 or submit the Contact page enquiry form with your details and the nature of your enquiry. Our team can advise on the next step for a consultation or procedure.' },
  { id: 'contact-location', question: 'Where is OSEC located?', answer: 'OSEC is at CASS Place, 16 Olabisi Villa, Water Corporation Drive, Oniru, Victoria Island, Lagos.' },
  { id: 'contact-insurance', question: 'Which health insurance providers does OSEC work with?', answer: 'We work with NNPC Health Maintenance Organisation, NEM Health and Leadway Health. If your provider is not listed, please contact us and we will confirm whether your plan is accepted. We can also provide an itemised invoice for reimbursement.' },
  { id: 'contact-enquiry', question: 'What information should I include when asking about a procedure?', answer: 'Include the service you are enquiring about, a brief description of your concern and your preferred contact details. You may also mention any referral or previous investigation; avoid sending sensitive medical records through an unsecured channel.' },
  { id: 'contact-travel', question: 'Can patients travelling from outside Lagos access OSEC?', answer: 'You can contact us to discuss travel and the service you need. Our team can confirm current arrangements and whether an outreach service is available in your location.' },
];

export const researchFAQs: readonly FAQItem[] = [
  { id: 'research-type', question: 'What research does OSEC contribute to?', answer: 'Our listed publications include clinical research and case reports presented in Endoscopy, covering gastrointestinal findings and digestive health in Nigeria and West Africa.' },
  { id: 'research-topics', question: 'Which topics are covered in OSEC?s published research?', answer: 'Our published topics include colorectal cancer screening using faecal immunochemical testing and colonoscopy, histological patterns of upper and lower GI lesions, inflammatory bowel changes, and a gastrointestinal stromal tumour case identified during colonoscopy.' },
  { id: 'research-access', question: 'Where can I read OSEC?s published research?', answer: 'Our publication cards link to the corresponding article or conference record at its publisher.' },
  { id: 'research-care', question: 'How can research inform gastrointestinal care?', answer: 'Research can describe local disease patterns and evaluate diagnostic approaches. Clinicians can consider this evidence alongside your individual needs. Our publications address screening, tissue findings and clinical cases.' },
];

export const generalFAQGroups: readonly FAQGroup[] = [
  { heading: 'Booking & access', items: [
    { id: 'faq-referral', question: 'Do I need a referral?', answer: 'A referral is not required, but a letter from your doctor helps us understand your history. We are also happy to accept referrals directly from GPs and specialists.' },
    { id: 'faq-location', question: 'Where are you located, and when are you open?', answer: 'We are at CASS Place, 16 Olabisi Villa, Water Corporation Drive, Oniru, Victoria Island, Lagos. We are open Monday to Friday, 9:00 AM to 3:00 PM, by appointment only.' },
    { id: 'faq-book', question: 'How can I book?', answer: 'Book by WhatsApp on +234 816 435 3633, by phone, by email at info@osecng.com, or through our online form.' },
    { id: 'faq-referring-doctor', question: 'Can GPs and specialists refer patients to OSEC?', answer: 'Yes. We accept referrals directly from GPs and specialists. A referral letter helps us understand your medical history.' },
  ] },
  { heading: 'Cost & payment', items: [
    { id: 'faq-cost', question: 'How can I find out the cost of a consultation or procedure?', answer: 'Please contact us for current fees and payment information. We can also provide an itemised invoice for reimbursement.' },
  ] },
  { heading: 'Before your procedure', items: [
    { id: 'faq-procedure-needed', question: 'How do I know if I need an endoscopy or colonoscopy?', answer: 'You should speak to a specialist if you have rectal bleeding, difficulty swallowing, persistent heartburn, unexplained weight loss, anaemia, or a change in bowel habit lasting more than a few weeks.' },
    { id: 'faq-medications', question: 'Should I stop my medications before the procedure?', answer: 'Do not stop any medication without advice. Tell us if you take blood thinners (e.g. aspirin, clopidogrel, warfarin), diabetes medication, iron tablets or GLP-1 injections, as these may need adjusting.' },
    { id: 'faq-bring', question: 'What should I bring?', answer: 'Photo ID, your referral letter (if any), previous results, a list of your medications, and your insurance details.' },
  ] },
  { heading: 'On the day & afterwards', items: [
    { id: 'faq-accompaniment', question: 'Do I need someone to accompany me?', answer: 'Yes, if you receive sedation. You must not drive, operate machinery or sign legal documents for 24 hours, so an adult must take you home.' },
    { id: 'faq-after-symptoms', question: 'What symptoms after a procedure should I report?', answer: 'Contact us or go to the nearest emergency department if you have severe abdominal pain, fever, vomiting blood, black stools or heavy bleeding.' },
  ] },
  { heading: 'Results', items: [
    { id: 'faq-written-report', question: 'Will I receive a written report?', answer: 'Yes. You will receive a written report with images, which you can share with your doctor.' },
    { id: 'faq-send-results', question: 'Can you send my results to my doctor?', answer: 'Yes, with your consent.' },
  ] },
  { heading: 'Safety, quality & privacy', items: [
    { id: 'faq-risks', question: 'What are the risks of endoscopy?', answer: 'Endoscopy is very safe. Serious complications such as bleeding or perforation are uncommon. Your specialist will explain the risks specific to your procedure before you consent.' },
    { id: 'faq-privacy', question: 'Is my information confidential?', answer: 'Yes. Your records are handled in line with the Nigeria Data Protection Act 2023 and shared only with your consent. See our Privacy Policy.' },
    { id: 'faq-who-performs', question: 'Who will perform my procedure?', answer: 'Procedures are performed by Dr Taiwo Onabanjo, an internationally trained gastroenterologist and advanced endoscopist, supported by a trained nursing and sedation team.' },
  ] },
  { heading: 'Screening & prevention', items: [
    { id: 'faq-no-symptoms', question: 'I have no symptoms. Should I still be screened?', answer: 'Yes. Most early bowel cancers and precancerous polyps cause no symptoms, which is why screening saves lives.' },
    { id: 'faq-fit', question: 'Is a stool test (FIT) enough?', answer: 'A stool test can detect hidden blood, but a colonoscopy can both find and remove polyps. Your specialist will advise which is right for you.', link: { label: 'Read our FIT and colonoscopy research', href: '/news-health-articles' } },
  ] },
  { heading: 'For referring doctors', items: [
    { id: 'faq-referral-doctor', question: 'How can I refer a patient?', answer: 'GPs and specialists can refer patients directly to OSEC. Please contact us by phone or email to discuss a referral.' },
  ] },
];

/** Kept as the homepage alias for legacy consumers; page components use explicit sets. */
export const faqs = homepageFAQs;
