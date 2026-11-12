export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

/** Homepage FAQs: first visit, scope and access. */
export const homepageFAQs: readonly FAQItem[] = [
  {
    id: 'home-speciality',
    question: 'What does OSEC specialise in?',
    answer: 'OSEC is a specialist centre for digestive health, colorectal cancer prevention and diagnostic and therapeutic gastrointestinal endoscopy. Its team assesses digestive symptoms and provides appropriate endoscopic investigation and treatment.',
  },
  {
    id: 'home-conditions',
    question: 'What digestive health conditions can OSEC assess?',
    answer: 'OSEC assesses concerns affecting the upper and lower digestive tract, including persistent abdominal symptoms, reflux, swallowing difficulty, bowel habit changes, bleeding, inflammatory conditions, polyps and suspected lesions. A specialist consultation helps determine what assessment is appropriate.',
  },
  {
    id: 'home-services',
    question: 'Which endoscopy and specialist services are available?',
    answer: 'Services include gastroscopy, colonoscopy, gastrointestinal biopsy, EMR, ESD, EFTR, PEG tube placement and paediatric endoscopy. OSEC also lists specialist consultations, weight management and behavioural health and counselling. Visit Services to read about each offering.',
  },
  {
    id: 'home-screening',
    question: 'Who may benefit from colorectal cancer screening?',
    answer: 'Screening may be considered based on a person’s age, risk factors and doctor’s recommendation. People with bowel symptoms or a personal or family history may need an individual assessment. An OSEC specialist can discuss whether screening or diagnostic colonoscopy is appropriate.',
  },
  {
    id: 'home-outreach',
    question: 'Can OSEC provide specialist endoscopy outside Lagos?',
    answer: 'OSEC’s website describes mobile endoscopy and outreach services beyond Lagos. Contact the team to confirm current locations, available services and arrangements for a particular city.',
  },
  {
    id: 'home-booking',
    question: 'How can I book an appointment with OSEC?',
    answer: 'Call +234 816 435 3633 or use the Contact page enquiry form. You can also use the website’s Book Appointment link to start an enquiry with OSEC.',
  },
];

/** About FAQs focus on expertise and institutional distinction. */
export const aboutFAQs: readonly FAQItem[] = [
  { id: 'about-speciality', question: 'What does OSEC specialise in?', answer: 'OSEC focuses on digestive health, colorectal cancer prevention and advanced diagnostic and therapeutic endoscopy. The centre’s approach combines specialist assessment with care tailored to the patient.' },
  { id: 'about-team', question: 'Which professionals make up the OSEC care team?', answer: 'OSEC’s team includes consultant gastroenterologists, internationally trained endoscopy nurses, theatre technicians and other healthcare professionals supporting specialist digestive care. The Meet Your Physician section introduces the clinicians featured on this page.' },
  { id: 'about-services', question: 'What diagnostic and therapeutic care does OSEC provide?', answer: 'The service range includes upper and lower gastrointestinal endoscopy, biopsy, polyp and lesion removal techniques such as EMR, ESD and EFTR, and PEG feeding tube placement. OSEC also provides specialist consultation and paediatric endoscopy.' },
  { id: 'about-difference', question: 'What distinguishes OSEC’s endoscopy services?', answer: 'OSEC combines diagnostic and therapeutic endoscopy with a focus on earlier diagnosis, colorectal screening and patient-centred care. The website reports more than 1,800 procedures in the last three years and describes advanced lesion removal, with treatment decisions based on individual specialist assessment.' },
  { id: 'about-esd', question: 'What is OSEC’s experience with endoscopic submucosal dissection (ESD)?', answer: 'OSEC states that its team was the first in Nigeria to perform ESD. The technique can remove selected complex precancerous lesions and early cancers endoscopically; suitability depends on specialist review of the lesion.' },
  { id: 'about-outreach', question: 'Does OSEC provide specialist care outside Lagos?', answer: 'OSEC describes mobile endoscopy and corporate screening programmes across Nigeria, with outreach locations including Abuja, Asaba, Port Harcourt and Kano. Contact the team to confirm current dates and which services are available at a specific site.' },
];

export const servicesFAQs: readonly FAQItem[] = [
  { id: 'services-procedures', question: 'Which endoscopic procedures can I access through OSEC?', answer: 'OSEC lists gastroscopy, colonoscopy, biopsy, EMR, ESD, EFTR, PEG placement and paediatric upper and lower GI endoscopy. Each procedure has a separate page describing its purpose and what it may help investigate or treat.' },
  { id: 'services-diagnostic-therapeutic', question: 'What is the difference between diagnostic and therapeutic endoscopy?', answer: 'Diagnostic endoscopy examines the digestive tract to investigate symptoms or identify abnormalities, and may include taking biopsies. Therapeutic endoscopy treats selected findings during a procedure, for example removing suitable polyps or lesions. The appropriate approach depends on specialist assessment.' },
  { id: 'services-upper-lower', question: 'How do gastroscopy and colonoscopy differ?', answer: 'Gastroscopy examines the oesophagus, stomach and duodenum using an endoscope passed through the mouth. Colonoscopy examines the rectum and colon using a scope passed through the anus. They investigate different symptoms and parts of the digestive tract.' },
  { id: 'services-lesions', question: 'Which OSEC services can assess or remove gastrointestinal polyps and lesions?', answer: 'Colonoscopy can identify abnormalities and remove some suitable polyps. EMR, ESD and EFTR are endoscopic removal techniques for selected lesions, with the choice depending on the lesion’s size, location and characteristics. A specialist determines the suitable option.' },
  { id: 'services-children', question: 'Does OSEC provide gastrointestinal endoscopy for children?', answer: 'OSEC lists paediatric upper GI endoscopy and paediatric colonoscopy. These procedures investigate symptoms affecting a child’s upper or lower digestive tract, with preparation and care planned for the individual child.' },
  { id: 'services-advice', question: 'Can I speak with a specialist before choosing a procedure?', answer: 'Yes. A gastrointestinal specialist consultation reviews symptoms, medical history and previous investigations. The specialist can explain whether further tests may be useful and discuss the appropriate next step. Contact OSEC to arrange an assessment.' },
];

export const contactFAQs: readonly FAQItem[] = [
  { id: 'contact-book', question: 'How do I book a consultation or procedure?', answer: 'Call +234 816 435 3633 or submit the Contact page enquiry form with your details and the nature of your enquiry. OSEC’s team can advise on the next step for a consultation or procedure.' },
  { id: 'contact-location', question: 'Where is OSEC located?', answer: 'OSEC is at CASS Place, 16 Olabisi Villa, Water Corporation Drive, Oniru, Victoria Island, Lagos.' },
  { id: 'contact-insurance', question: 'Which health insurance providers does OSEC work with?', answer: 'The available approved copy in this repository does not confirm OSEC’s current insurance partners or plan coverage. Please contact the team before your appointment to confirm whether your provider and specific plan are accepted.' },
  { id: 'contact-enquiry', question: 'What information should I include when asking about a procedure?', answer: 'Include the service you are enquiring about, a brief description of your concern and your preferred contact details. You may also mention any referral or previous investigation; avoid sending sensitive medical records through an unsecured channel.' },
  { id: 'contact-travel', question: 'Can patients travelling from outside Lagos access OSEC?', answer: 'Patients can contact OSEC to discuss travel and the service they need. The team can confirm current arrangements and whether an outreach service is available in their location.' },
];

export const researchFAQs: readonly FAQItem[] = [
  { id: 'research-type', question: 'What research does OSEC contribute to?', answer: 'The publications listed on this page include clinical research and case reports presented in Endoscopy, covering gastrointestinal findings and digestive health in Nigeria and West Africa.' },
  { id: 'research-topics', question: 'Which topics are covered in OSEC’s published research?', answer: 'Displayed topics include colorectal cancer screening using faecal immunochemical testing and colonoscopy, histological patterns of upper and lower GI lesions, inflammatory bowel changes, and a gastrointestinal stromal tumour case identified during colonoscopy.' },
  { id: 'research-access', question: 'Where can I read OSEC’s published research?', answer: 'Use the publication cards on this page to open the corresponding article or conference publication. Each card links to its listed publisher record.' },
  { id: 'research-care', question: 'How can research inform gastrointestinal care?', answer: 'Research can describe local disease patterns and evaluate diagnostic approaches, adding evidence that clinicians can consider alongside an individual patient’s needs. The publications shown here address screening, tissue findings and clinical cases.' },
];

/** Kept as the homepage alias for legacy consumers; page components use explicit sets. */
export const faqs = homepageFAQs;
