import { OSEC_LINKS } from './links';
import { services, type Service } from './services';
import { assets } from './assets';
import type { FAQItem } from './faqs';

export interface ServiceDetailSection {
  heading: string;
  paragraphs: readonly string[];
  items?: readonly string[];
  concludingParagraphs?: readonly string[];
}

export interface ServiceDetailData {
  service: Service;
  title: string;
  subtitle: string;
  imageAlt: string;
  imagePosition?: string;
  backLabel?: string;
  overview?: readonly string[];
  faqs?: readonly FAQItem[];
  assessment?: {
    heading: string;
    introduction: string;
    items: readonly string[];
    conclusion?: string;
  };
  sections?: readonly ServiceDetailSection[];
  whyChoose?: string;
  whyChooseImage?: string;
  counselor?: {
    label: string;
    heading: string;
    image: string;
    imageAlt: string;
    name: string;
    role: string;
    biography: readonly string[];
  };
  cta?: {
    label: string;
    href: string;
  };
}

const consultationService = services.find((service) => service.id === 'specialist-consultation');
if (!consultationService) throw new Error('The Gastrointestinal Specialist Consultation service is missing.');
const gastroscopyService = services.find((service) => service.id === 'gastroscopy');
if (!gastroscopyService) throw new Error('The Gastroscopy service is missing.');
const colonoscopyService = services.find((service) => service.id === 'colonoscopy');
if (!colonoscopyService) throw new Error('The Colonoscopy service is missing.');
const biopsyService = services.find((service) => service.id === 'biopsy');
if (!biopsyService) throw new Error('The Gastrointestinal Biopsy service is missing.');
const emrService = services.find((service) => service.id === 'emr');
if (!emrService) throw new Error('The Endoscopic Mucosal Resection service is missing.');
const esdService = services.find((service) => service.id === 'esd');
if (!esdService) throw new Error('The Endoscopic Submucosal Dissection service is missing.');
const eftrService = services.find((service) => service.id === 'eftr-advanced');
if (!eftrService) throw new Error('The Endoscopic Full-Thickness Resection service is missing.');
const pegService = services.find((service) => service.id === 'peg-feeding-tube');
if (!pegService) throw new Error('The PEG Feeding Tube Placement service is missing.');

const paediatricColonoscopyService = services.find((service) => service.id === 'paediatric-colonoscopy');
if (!paediatricColonoscopyService) throw new Error('The Paediatric Colonoscopy service is missing.');

const glp1AssessmentService = services.find((service) => service.id === 'glp-1-assessment-obesity-clinic');
if (!glp1AssessmentService) throw new Error('The GLP-1 Assessment & Obesity Clinic service is missing.');

const weightManagementService = services.find((service) => service.id === 'weight-management');
if (!weightManagementService) throw new Error('The Endobariatric Medical Weight Management service is missing.');

const paediatricEndoscopyService = services.find((service) => service.id === 'paediatric-endoscopy');
if (!paediatricEndoscopyService) throw new Error('The Paediatric Endoscopy service is missing.');
const behavioralCounselingService = services.find((service) => service.id === 'behavioral-counseling');
if (!behavioralCounselingService) throw new Error('The Behavioral/Counseling service is missing.');

/** Approved copy from assets/OSEC_Service_Detail_Content_Updated.docx. */
export const gastrointestinalConsultationDetail: ServiceDetailData = {
  service: consultationService,
  title: 'Gastrointestinal Specialist Consultation: Understanding Your Digestive Health',
  subtitle: 'Expert assessment and personalised guidance to understand your symptoms, explore the right next steps, and create a clear plan for your care.',
  imageAlt: 'Doctor speaking with a patient during a digestive health consultation.',
  faqs: [
    { id: 'consult-what-happens', question: 'What happens during a gastrointestinal specialist consultation?', answer: 'The specialist discusses your symptoms, medical history, medications, previous test results and any relevant family history before developing an appropriate care plan.' },
    { id: 'consult-more-tests', question: 'Will I need tests after my consultation?', answer: 'Depending on your assessment, further investigations such as blood tests, gastroscopy, colonoscopy, imaging or biopsy may be recommended.' },
    { id: 'consult-preparation', question: 'Do I need to prepare for my initial consultation?', answer: 'Preparation is generally not required for the initial consultation. If an investigation is recommended, you will receive specific instructions beforehand.' },
  ],
  overview: ['A Gastrointestinal (GI) Specialist Consultation provides expert assessment of symptoms and conditions affecting the digestive system. During your consultation, our specialist takes time to understand your symptoms, medical history, previous investigations and individual health needs before developing an appropriate care plan.'],
  assessment: {
    heading: 'Conditions We Assess',
    introduction: 'A GI consultation may be recommended for symptoms or conditions involving the:',
    items: ['Oesophagus', 'Stomach', 'Small intestine', 'Colon and rectum', 'Liver, gallbladder and pancreas'],
    conclusion: 'It may help assess symptoms such as persistent abdominal pain, indigestion, heartburn, difficulty swallowing, changes in bowel habits, rectal bleeding, unexplained weight loss, chronic diarrhoea or constipation.',
  },
  sections: [
    {
      heading: 'Who Should See a Gastroenterologist?',
      paragraphs: ['A GI specialist consultation may be suitable for anyone experiencing persistent, recurrent or unexplained digestive symptoms, or for individuals who require specialist assessment of a known gastrointestinal condition.'],
    },
    {
      heading: 'Why Might You Need a Consultation?',
      paragraphs: ['A specialist assessment can help identify the possible cause of your symptoms, determine whether further investigations are required and develop an appropriate treatment or monitoring plan.'],
    },
    {
      heading: 'What to Expect During Your Consultation',
      paragraphs: ['Your specialist will discuss your symptoms, medical history, medications, previous test results and any relevant family history. Depending on your assessment, further investigations such as blood tests, gastroscopy, colonoscopy, imaging or biopsy may be recommended.'],
    },
    {
      heading: 'Preparation',
      paragraphs: ['Preparation is generally not required for the initial consultation. If an investigation is recommended, you will receive specific instructions beforehand.'],
    },
    {
      heading: 'After the Consultation',
      paragraphs: ['Your specialist will explain the findings and discuss the next steps, which may include treatment, further investigations, monitoring or referral where appropriate.'],
    },
  ],
  whyChoose: 'At OSEC, we combine specialist gastrointestinal expertise with a patient-centred approach, ensuring that each patient receives personalised advice and a clear plan of care.',
  cta: {
    label: 'Book Appointment',
    href: OSEC_LINKS.whatsappBooking,
  },
};

export const gastroscopyDetail: ServiceDetailData = {
  service: gastroscopyService,
  title: 'Gastroscopy: Accurate Diagnosis for Upper Digestive Symptoms',
  subtitle: 'A minimally invasive examination of the oesophagus, stomach and duodenum to investigate symptoms, take biopsies when needed, and guide the right care.',
  imageAlt: 'Endoscopy equipment set up in a procedure room.',
  faqs: [
    { id: 'gastroscopy-what-is', question: 'What is gastroscopy?', answer: 'Gastroscopy, also known as Upper GI Endoscopy or OGD, uses a thin, flexible camera passed through the mouth to examine the oesophagus, stomach and duodenum.' },
    { id: 'gastroscopy-biopsy', question: 'Can a biopsy be taken during gastroscopy?', answer: 'Small tissue samples may be taken during the procedure when required for further laboratory examination.' },
    { id: 'gastroscopy-sedation', question: 'Is sedation used for gastroscopy?', answer: 'Appropriate sedation or anaesthesia may be used depending on the procedure and your individual needs. OSEC provides specific instructions before your procedure.' },
  ],
  overview: [
    'Gastroscopy, also known as Upper GI Endoscopy or OGD (oesophago-gastro-duodenoscopy), is a minimally invasive procedure that allows a specialist to examine the upper digestive tract using a thin, flexible camera.',
    'The endoscope is passed through the mouth to examine the oesophagus, stomach and duodenum. Small tissue samples can also be taken during the procedure when required.',
  ],
  assessment: {
    heading: 'What Can Gastroscopy Diagnose?',
    introduction: 'Gastroscopy can help investigate conditions such as:',
    items: [
      'Gastritis',
      'Stomach or duodenal ulcers',
      'Gastro-oesophageal reflux disease (GERD)',
      'Difficulty swallowing',
      'Unexplained upper abdominal symptoms',
      'Upper gastrointestinal bleeding',
      'Abnormal growths or lesions',
      'Certain gastrointestinal cancers',
      'Other abnormalities of the upper digestive tract',
    ],
    conclusion: 'Biopsies may be taken when necessary for further laboratory examination.',
  },
  sections: [
    {
      heading: 'Who May Need a Gastroscopy?',
      paragraphs: ['Gastroscopy may be recommended for people experiencing persistent or unexplained upper gastrointestinal symptoms, or when a doctor needs to investigate a suspected digestive condition.'],
    },
    {
      heading: 'Why Might You Need Gastroscopy?',
      paragraphs: ['It allows the specialist to directly visualise the upper digestive tract and, when necessary, obtain tissue samples to help establish an accurate diagnosis.'],
    },
    {
      heading: 'What Happens During the Procedure?',
      paragraphs: [
        'Before the procedure, your medical history and medications will be reviewed.',
        'You will be asked to lie comfortably while the endoscope is gently passed through your mouth and into the upper digestive tract.',
        'The specialist examines the lining of the oesophagus, stomach and duodenum and may take biopsies or perform appropriate treatment where indicated.',
      ],
    },
    {
      heading: 'How to Prepare for Gastroscopy',
      paragraphs: [
        'You will generally need to fast before the procedure.',
        'Your OSEC team will provide specific instructions regarding fasting and any medications you may need to adjust.',
      ],
    },
    {
      heading: 'Sedation & Comfort',
      paragraphs: [
        'Gastroscopy can be performed with appropriate sedation or anaesthesia depending on the procedure and your individual needs.',
        'At OSEC, we prioritise comfort, safety and careful monitoring throughout your procedure.',
      ],
    },
    {
      heading: 'Recovery and Aftercare',
      paragraphs: [
        'You will be monitored in recovery until you are sufficiently awake and stable.',
        'You may experience mild throat discomfort or drowsiness following sedation.',
        'Your specialist will explain the findings and any further treatment or follow-up required.',
      ],
    },
  ],
  whyChoose: 'OSEC combines specialist expertise, modern endoscopic equipment and a comfort-focused approach to provide safe and effective upper GI investigation and treatment.',
  cta: {
    label: 'Book Appointment',
    href: OSEC_LINKS.whatsappBooking,
  },
};

export const colonoscopyDetail: ServiceDetailData = {
  service: colonoscopyService,
  title: 'Colonoscopy: Clear Answers for Bowel Health and Colorectal Cancer Prevention',
  subtitle: 'A detailed examination of the colon and rectum to investigate bowel symptoms, detect abnormalities, and support colorectal cancer prevention.',
  imageAlt: 'Clinician operating an endoscope during a colonoscopy.',
  faqs: [
    { id: 'colonoscopy-examines', question: 'What does a colonoscopy examine?', answer: 'A colonoscopy allows a specialist to examine the lining of the rectum and the entire colon using a flexible camera.' },
    { id: 'colonoscopy-polyps', question: 'Can biopsies or polyps be removed during colonoscopy?', answer: 'Biopsies can be taken and suitable polyps or lesions may sometimes be removed during the same procedure.' },
    { id: 'colonoscopy-preparation', question: 'How do I prepare for colonoscopy?', answer: 'You will receive detailed instructions regarding bowel preparation, diet, fasting and medications before your procedure.' },
  ],
  overview: [
    'Colonoscopy is an endoscopic procedure that allows a specialist to examine the inside of the colon and rectum using a thin, flexible camera called a colonoscope.',
    'It is commonly used to investigate bowel symptoms, detect abnormalities, take biopsies and remove polyps when appropriate.',
  ],
  assessment: {
    heading: 'What Can Colonoscopy Diagnose?',
    introduction: 'Colonoscopy may help identify conditions and abnormalities affecting the large bowel, including:',
    items: [
      'Colorectal polyps',
      'Precancerous lesions',
      'Colorectal cancer',
      'Inflammatory bowel disease',
      'Areas of inflammation',
      'Gastrointestinal bleeding',
      'Other abnormalities of the colon and rectum',
    ],
    conclusion: 'Colonoscopy can also investigate symptoms such as rectal bleeding, changes in bowel habits, persistent diarrhoea or constipation and unexplained abdominal symptoms. Biopsies or suitable polyps may be removed during the procedure when clinically appropriate.',
  },
  sections: [
    {
      heading: 'Who Should Consider a Colonoscopy?',
      paragraphs: ['Colonoscopy may be recommended for people with bowel symptoms, abnormal test results, a family or personal history of colorectal disease, or those requiring colorectal cancer screening or surveillance.'],
    },
    {
      heading: 'Why Might You Need Colonoscopy?',
      paragraphs: ['A colonoscopy provides direct visual assessment of the colon and rectum and can help identify the cause of symptoms, detect early disease, obtain tissue samples and remove certain polyps during the same procedure.'],
    },
    {
      heading: 'What Happens During the Procedure?',
      paragraphs: [
        'Before the procedure, your medical history and medications will be reviewed.',
        'After bowel preparation, the colonoscope is introduced through the anus and advanced through the colon.',
        'The specialist carefully examines the bowel lining and may take biopsies or remove polyps where necessary.',
      ],
    },
    {
      heading: 'How to Prepare for a Colonoscopy',
      paragraphs: ['Proper bowel preparation is essential for a clear and accurate examination. You will receive instructions on:'],
      items: ['Dietary adjustments', 'Bowel-cleansing medication', 'Fasting', 'Medication adjustments where required'],
      concludingParagraphs: ['Follow the preparation instructions carefully.'],
    },
    {
      heading: 'Sedation & Comfort',
      paragraphs: [
        'Colonoscopy is commonly performed with appropriate sedation or anaesthesia depending on your needs and the procedure being performed.',
        'Your comfort, safety and monitoring are prioritised throughout the procedure.',
      ],
    },
    {
      heading: 'Recovery and Aftercare',
      paragraphs: [
        'Afterwards, you will be monitored in recovery until you are sufficiently awake and stable.',
        'If sedation was used, you may be advised not to drive or perform certain activities for a period after the procedure.',
        'Your specialist will discuss the findings and any recommended follow-up.',
      ],
    },
  ],
  whyChoose: 'OSEC provides specialist lower gastrointestinal assessment using modern endoscopic technology, careful monitoring and a patient-focused approach to diagnosis, screening and treatment.',
  cta: {
    label: 'Book Appointment',
    href: OSEC_LINKS.whatsappBooking,
  },
};

export const gastrointestinalBiopsyDetail: ServiceDetailData = {
  service: biopsyService,
  title: 'Gastrointestinal Biopsy: Helping Confirm a Clear Diagnosis',
  subtitle: 'A small tissue sample taken during endoscopy and examined in the laboratory to help identify abnormalities and guide treatment.',
  imageAlt: 'Gloved clinician holding a flexible endoscope.',
  faqs: [
    { id: 'biopsy-cancer', question: 'Does having a gastrointestinal biopsy mean I have cancer?', answer: 'No. A biopsy is a small tissue sample examined to help identify abnormalities and establish or confirm a diagnosis; it does not by itself mean that cancer is present.' },
    { id: 'biopsy-procedure', question: 'How is a gastrointestinal biopsy performed?', answer: 'A biopsy is usually performed during gastroscopy or colonoscopy. The specialist uses instruments passed through the endoscope to take one or more small tissue samples.' },
    { id: 'biopsy-results', question: 'How will I receive my biopsy results?', answer: 'The samples are sent for histopathological examination. Your specialist will explain when and how your results will be communicated.' },
  ],
  overview: ['A gastrointestinal biopsy involves taking a small sample of tissue from the digestive tract during an endoscopic procedure. The sample is examined by a pathologist under a microscope to help identify abnormalities and establish or confirm a diagnosis.'],
  assessment: {
    heading: 'What Can a Gastrointestinal Biopsy Diagnose?',
    introduction: 'Biopsies may help investigate:',
    items: [
      'Inflammation',
      'Gastritis',
      'Inflammatory bowel disease',
      'Coeliac disease',
      'Abnormal or precancerous tissue',
      'Certain infections',
      'Other gastrointestinal conditions',
    ],
  },
  sections: [
    {
      heading: 'When Is a GI Biopsy Recommended?',
      paragraphs: ['A biopsy may be recommended when your specialist identifies an area that requires further examination or when tissue sampling is needed to investigate particular symptoms or conditions.'],
    },
    {
      heading: 'Why Might You Need a Biopsy?',
      paragraphs: ['Looking at tissue under the microscope can provide information that cannot always be obtained from visual examination alone. The results can help guide diagnosis, treatment and follow-up.'],
    },
    {
      heading: 'How Is a GI Biopsy Performed?',
      paragraphs: [
        'A biopsy is usually performed during gastroscopy or colonoscopy. Using specialised instruments passed through the endoscope, the specialist takes one or more small tissue samples.',
        'You generally do not feel the biopsy being taken.',
      ],
    },
    {
      heading: 'Preparation',
      paragraphs: ['Preparation depends on the endoscopic procedure being performed. You will receive specific instructions before your examination.'],
    },
    {
      heading: 'Sedation & Comfort',
      paragraphs: ['Sedation or anaesthesia may be used depending on the endoscopic procedure and your individual needs.'],
    },
    {
      heading: 'What Happens After the Procedure?',
      paragraphs: ['The tissue samples are sent to the laboratory for histopathological examination. Your specialist will explain when and how your results will be communicated.'],
    },
  ],
  whyChoose: 'At OSEC, biopsies are performed when clinically indicated to support accurate diagnosis and appropriate treatment planning.',
  cta: {
    label: 'Book Appointment',
    href: OSEC_LINKS.whatsappBooking,
  },
};

export const emrDetail: ServiceDetailData = {
  service: emrService,
  title: 'Endoscopic Mucosal Resection (EMR): Removing Polyps and Early Lesions Without Surgery',
  subtitle: 'Used to remove selected polyps, precancerous growths and superficial lesions while helping suitable patients avoid conventional surgery.',
  imageAlt: 'Endoscopy team performing a procedure while viewing the endoscope image on a monitor.',
  faqs: [
    { id: 'emr-what-is', question: 'What is endoscopic mucosal resection?', answer: 'EMR is a minimally invasive procedure used to remove selected polyps, abnormal tissue and precancerous growths from the lining of the digestive tract.' },
    { id: 'emr-where', question: 'Where can EMR be performed?', answer: 'Depending on where the lesion is located, EMR can be performed during an upper endoscopy or colonoscopy.' },
    { id: 'emr-suitability', question: 'How is suitability for EMR assessed?', answer: 'Suitability depends on factors such as the size, location, appearance and characteristics of the lesion.' },
  ],
  overview: [
    'Endoscopic Mucosal Resection (EMR) is a minimally invasive procedure used to remove selected polyps, abnormal tissue and precancerous growths from the lining of the digestive tract.',
    'It can be performed during an upper endoscopy or colonoscopy, depending on where the lesion is located.',
  ],
  assessment: {
    heading: 'What Conditions Can EMR Treat?',
    introduction: 'EMR may be used for selected:',
    items: ['Polyps', 'Precancerous growths', 'High-grade dysplasia', 'Superficial abnormal lesions'],
    conclusion: 'The removed tissue is sent for laboratory examination to determine its characteristics and whether further treatment or follow-up is required.',
  },
  sections: [
    {
      heading: 'Who May Need EMR?',
      paragraphs: [
        'EMR may be suitable for patients with appropriately selected lesions where endoscopic removal is considered safe and appropriate.',
        'Suitability depends on factors such as the size, location, appearance and characteristics of the lesion.',
      ],
    },
    {
      heading: 'Why Might You Need EMR?',
      paragraphs: ['For suitable lesions, EMR can provide effective treatment without the need for conventional surgery and may allow a quicker recovery.'],
    },
    {
      heading: 'How the EMR Procedure Works',
      paragraphs: [
        'During EMR, the specialist uses an endoscope to access the lesion. Fluid may be injected beneath a suitable lesion to lift it before removal with a snare.',
        'The specimen is then sent to the laboratory for detailed examination.',
      ],
    },
    {
      heading: 'Preparation',
      paragraphs: ['Preparation depends on the location of the lesion. If EMR is performed during colonoscopy, bowel preparation will be required. If performed during upper endoscopy, fasting instructions will apply.'],
    },
    {
      heading: 'Sedation & Comfort',
      paragraphs: ['Appropriate sedation or anaesthesia is used according to the procedure and individual patient needs.'],
    },
    {
      heading: 'What to Expect During Recovery',
      paragraphs: ['You will be monitored after the procedure and given specific instructions regarding eating, medications, recovery and follow-up.'],
    },
  ],
  whyChoose: 'OSEC performs EMR using modern endoscopy equipment with an experienced specialist team and a strong focus on patient safety, comfort and optimal outcomes.',
  cta: {
    label: 'Book Appointment',
    href: OSEC_LINKS.whatsappBooking,
  },
};

export const esdDetail: ServiceDetailData = {
  service: esdService,
  title: 'Endoscopic Submucosal Dissection (ESD): Advanced Removal of Complex GI Lesions',
  subtitle: 'An advanced minimally invasive procedure for selected large or complex precancerous lesions and early cancers, with organ preservation where appropriate.',
  imageAlt: 'Endoscopist performing a procedure with the endoscope view shown on a monitor.',
  faqs: [
    { id: 'esd-what-is', question: 'What is endoscopic submucosal dissection?', answer: 'ESD is an advanced minimally invasive procedure used to remove selected large or complex precancerous lesions and early cancers of the gastrointestinal tract.' },
    { id: 'esd-enbloc', question: 'What does en bloc removal mean?', answer: 'En bloc means removing a selected lesion in one piece. The specimen can then undergo detailed pathological assessment, including examination of its depth and margins.' },
    { id: 'esd-suitability', question: 'How is suitability for ESD decided?', answer: 'The specialist assesses the lesion’s size, location, appearance and other features before deciding whether ESD is suitable.' },
  ],
  overview: ['Endoscopic Submucosal Dissection (ESD) is an advanced minimally invasive procedure used to remove selected large or complex precancerous lesions and early cancers of the gastrointestinal tract without conventional major surgery.'],
  assessment: {
    heading: 'What Conditions Can ESD Treat?',
    introduction: 'ESD may be used for carefully selected:',
    items: [
      'Large or complex precancerous lesions',
      'High-grade dysplasia',
      'Early gastrointestinal cancers',
      'Selected early rectal cancers',
    ],
  },
  sections: [
    {
      heading: 'Who Is It For?',
      paragraphs: [
        'ESD is considered for patients whose lesions have characteristics that make endoscopic removal appropriate.',
        "The specialist assesses the lesion's size, location, appearance and other features before deciding whether ESD is suitable.",
      ],
    },
    {
      heading: 'Why Might You Need ESD?',
      paragraphs: [
        'One of the important advantages of ESD is the ability to remove selected lesions, often in one piece (en bloc). This allows the entire lesion to undergo detailed pathological assessment, including its depth and margins.',
        'For selected early rectal cancers, ESD may also provide an organ-preserving treatment option, potentially avoiding radical rectal surgery in appropriately selected patients.',
      ],
    },
    {
      heading: 'How the ESD Procedure Works',
      paragraphs: [
        'A flexible endoscope is introduced into the digestive tract. Using specialised instruments, the specialist carefully separates the lesion from the underlying tissue and removes it.',
        'The specimen is sent to pathology for detailed examination.',
      ],
    },
    {
      heading: 'Preparation',
      paragraphs: ['Preparation depends on the location of the lesion. Patients undergoing lower GI ESD will generally require bowel preparation, while upper GI procedures require fasting.'],
    },
    {
      heading: 'Sedation & Comfort',
      paragraphs: ['Appropriate sedation or anaesthesia is used, with close monitoring throughout the procedure.'],
    },
    {
      heading: 'Recovery and Aftercare',
      paragraphs: ['Recovery and observation depend on the extent and location of the treatment. Your specialist will provide specific instructions regarding diet, medications, activity and follow-up.'],
    },
  ],
  whyChoose: 'OSEC was the first team in Nigeria to perform ESD. The lead endoscopist is internationally trained in gastrointestinal endoscopy, with training in Germany and advanced training in Denmark and Belgium. Each patient is assessed to determine whether ESD is appropriate.',
  cta: {
    label: 'Book Appointment',
    href: OSEC_LINKS.whatsappBooking,
  },
};

export const eftrDetail: ServiceDetailData = {
  service: eftrService,
  title: 'Endoscopic Full-Thickness Resection (EFTR): Advanced Treatment for Selected Difficult GI Lesions',
  subtitle: 'A minimally invasive technique for selected small lesions, difficult or non-lifting polyps, neuroendocrine tumours and selected early cancers.',
  imageAlt: 'Endoscopic image of tissue and a resection device displayed on a clinical monitor.',
  faqs: [
    { id: 'eftr-what-is', question: 'What is endoscopic full-thickness resection?', answer: 'EFTR allows the full thickness of the bowel wall containing a selected lesion to be removed endoscopically, providing a specimen for histopathological examination.' },
    { id: 'eftr-device', question: 'How does the full-thickness resection device work?', answer: 'The lesion is drawn into the device, a specialised clip closes the bowel wall, and the lesion is then removed above the clip.' },
    { id: 'eftr-suitability', question: 'How is suitability for EFTR assessed?', answer: 'The specialist assesses the lesion’s size, location and characteristics before deciding whether EFTR is appropriate.' },
  ],
  overview: ['Endoscopic Full-Thickness Resection (EFTR) is an advanced minimally invasive procedure used to remove selected small gastrointestinal lesions, neuroendocrine tumours (NETs), difficult or non-lifting polyps and selected early cancers.'],
  assessment: {
    heading: 'What Conditions Can EFTR Treat?',
    introduction: 'EFTR may be considered for selected:',
    items: [
      'Small gastrointestinal lesions',
      'Neuroendocrine tumours',
      'Difficult polyps',
      'Non-lifting polyps',
      'Early cancers in selected cases',
    ],
  },
  sections: [
    {
      heading: 'Who Is It For?',
      paragraphs: [
        'EFTR is intended for selected patients whose lesion characteristics make full-thickness endoscopic removal appropriate.',
        'Lesion size, location and characteristics are assessed before treatment.',
      ],
    },
    {
      heading: 'Why Might You Need EFTR?',
      paragraphs: [
        'EFTR allows the full thickness of the bowel wall containing the lesion to be removed endoscopically. It can provide an intact specimen for detailed histopathological examination.',
        'For carefully selected early rectal lesions, it may provide an organ-preserving alternative to major surgery.',
      ],
    },
    {
      heading: 'How the EFTR Procedure Works',
      paragraphs: [
        'Using the Full-Thickness Resection Device (FTRD), the lesion is carefully drawn into the device. A specialised clip closes the bowel wall, after which the lesion is removed above the clip.',
        'The complete specimen is then sent for detailed laboratory examination.',
      ],
    },
    {
      heading: 'Preparation',
      paragraphs: ['Preparation depends on the location of the lesion and whether the procedure is being performed in the upper or lower digestive tract.'],
    },
    {
      heading: 'Sedation & Comfort',
      paragraphs: ['Appropriate sedation or anaesthesia is used according to the procedure and individual patient needs.'],
    },
    {
      heading: 'What to Expect After the Procedure',
      paragraphs: ['Patients are monitored following the procedure. Your specialist will provide specific instructions regarding recovery, diet, medications and follow-up.'],
    },
    {
      heading: 'Results & Follow-up',
      paragraphs: ['The removed tissue undergoes histopathological assessment to determine the exact characteristics of the lesion and whether complete removal has been achieved.'],
    },
  ],
  whyChoose: 'At OSEC, each patient is assessed to determine an appropriate treatment approach. The aim is to remove the selected lesion while preserving normal bowel and rectal function whenever possible.',
  cta: {
    label: 'Book Appointment',
    href: OSEC_LINKS.whatsappBooking,
  },
};

export const pegDetail: ServiceDetailData = {
  service: pegService,
  title: 'PEG Feeding Tube Placement: Reliable Long-Term Nutritional Support',
  subtitle: 'A minimally invasive way to place a feeding tube directly into the stomach when eating or drinking safely by mouth is not possible or is not enough.',
  imageAlt: 'Endoscopic view of a feeding tube placed inside the stomach.',
  faqs: [
    { id: 'peg-what-is', question: 'What is PEG feeding tube placement?', answer: 'Percutaneous Endoscopic Gastrostomy (PEG) places a feeding tube directly into the stomach through a small opening in the abdomen.' },
    { id: 'peg-who', question: 'Who may be considered for a PEG tube?', answer: 'PEG may be considered for patients who cannot maintain adequate nutrition or hydration by mouth but have a functioning gastrointestinal tract.' },
    { id: 'peg-care', question: 'Will I receive guidance on caring for a PEG tube?', answer: 'OSEC provides patients and their families with guidance on caring for the tube and using it safely at home.' },
  ],
  overview: [
    'Percutaneous Endoscopic Gastrostomy (PEG) is a procedure used to place a feeding tube directly into the stomach through a small opening in the abdomen.',
    'It may be recommended for people who cannot eat or drink enough safely by mouth but whose digestive system is functioning adequately.',
  ],
  assessment: {
    heading: 'What Is PEG Feeding Tube Placement?',
    introduction: 'A PEG tube provides a reliable way to deliver:',
    items: ['Nutrition', 'Fluids', 'Some medications'],
    conclusion: 'when adequate oral intake is not possible or is insufficient.',
  },
  sections: [
    {
      heading: 'Who Is It For?',
      paragraphs: ['PEG may be considered for patients who cannot maintain adequate nutrition or hydration by mouth but have a functioning gastrointestinal tract.'],
    },
    {
      heading: 'Why Might You Need a PEG?',
      paragraphs: ['A PEG can provide longer-term nutritional support while allowing food, fluids and appropriate medication to be delivered directly into the stomach.'],
    },
    {
      heading: 'What to Expect During the Procedure',
      paragraphs: [
        'A flexible endoscope is passed through the mouth into the stomach. This allows the specialist to identify the appropriate location for the feeding tube.',
        'The tube is then carefully placed through the abdominal wall into the stomach.',
      ],
    },
    {
      heading: 'Preparation',
      paragraphs: ['Your medical team will provide instructions regarding fasting, medications and any investigations required before the procedure.'],
    },
    {
      heading: 'Sedation & Comfort',
      paragraphs: ['PEG placement is usually performed with sedation to help keep the patient comfortable.'],
    },
    {
      heading: 'After the Procedure',
      paragraphs: ['You will receive instructions about recovery, feeding through the tube and caring for the insertion site.'],
    },
    {
      heading: 'Tube Care & Support',
      paragraphs: ['At OSEC, patients and their families receive guidance on caring for the tube and using it safely at home.'],
    },
  ],
  whyChoose: 'OSEC provides PEG placement with a focus on safe tube insertion, patient comfort and continued support for patients and their families.',
  cta: {
    label: 'Book Appointment',
    href: OSEC_LINKS.whatsappBooking,
  },
};

/** Paediatric Colonoscopy copy from assets/OSEC_Service_Detail_Content_Updated.docx. */
export const paediatricColonoscopyDetail: ServiceDetailData = {
  service: paediatricColonoscopyService,
  title: "Paediatric Colonoscopy: Clearer Answers for Your Child's Bowel Health",
  subtitle: 'A careful examination of the colon and rectum to investigate ongoing symptoms, take biopsies when needed, and guide appropriate care.',
  imageAlt: 'Endoscopic view of the lower digestive tract during examination.',
  faqs: [
    { id: 'paed-colon-what-examines', question: 'What does paediatric colonoscopy examine?', answer: 'Paediatric colonoscopy allows a specialist to examine a child’s colon and rectum to investigate gastrointestinal symptoms and identify abnormalities.' },
    { id: 'paed-colon-biopsy', question: 'Can biopsies be taken during a child’s colonoscopy?', answer: 'Small biopsies can be taken and some suitable polyps or lesions may be removed during the procedure.' },
    { id: 'paed-colon-preparation', question: 'How is a child prepared for colonoscopy?', answer: 'Parents or guardians receive detailed instructions regarding bowel preparation, diet, fasting and medications.' },
  ],
  overview: [
    'Paediatric Colonoscopy is a minimally invasive procedure that allows a specialist to examine the colon and rectum to investigate gastrointestinal symptoms and identify abnormalities.',
    'Small biopsies can be taken and some suitable polyps or lesions may be removed during the procedure.',
  ],
  assessment: {
    heading: 'What Can Paediatric Colonoscopy Diagnose?',
    introduction: 'It may help identify:',
    items: [
      'Inflammatory bowel disease',
      'Polyps',
      'Inflammation',
      'Other bowel lesions',
      'Other causes of persistent gastrointestinal symptoms',
    ],
  },
  sections: [
    {
      heading: 'Bowel Symptoms in Children',
      paragraphs: ['It may be recommended for children experiencing:'],
      items: [
        'Persistent abdominal pain',
        'Rectal bleeding',
        'Chronic diarrhoea',
        'Unexplained anaemia',
        'Poor growth',
        'Ongoing constipation',
      ],
    },
    {
      heading: 'How the Procedure Can Help',
      paragraphs: ['Colonoscopy allows the specialist to directly examine the bowel lining and, when necessary, obtain biopsies or remove suitable lesions.'],
    },
    {
      heading: 'What Happens During the Procedure?',
      paragraphs: [
        'After appropriate bowel preparation, the colonoscope is carefully introduced through the anus and the colon and rectum are examined.',
        'Biopsies or treatment of suitable lesions may be performed during the same procedure.',
      ],
    },
    {
      heading: 'Preparing Your Child for the Procedure',
      paragraphs: ['A clear bowel is important for adequate examination. Parents/guardians will receive detailed instructions regarding bowel preparation, diet, fasting and medications.'],
    },
    {
      heading: 'Sedation and Comfort',
      paragraphs: ["Appropriate sedation or anaesthesia is used according to the child's age, procedure and individual needs. OSEC focuses on making the experience as comfortable and stress-free as possible."],
    },
    {
      heading: 'Recovery and Aftercare',
      paragraphs: ['The child will be monitored in recovery and the specialist will discuss the findings and any further investigations or treatment required.'],
    },
  ],
  whyChoose: 'Our paediatric endoscopy approach prioritises safety, reassurance, comfort and individualised care for both children and their parents.',
  cta: {
    label: 'Book Appointment',
    href: OSEC_LINKS.whatsappBooking,
  },
};

/** Consultation copy from assets/OSEC_Service_Detail_Content_Updated.docx. */
export const glp1AssessmentDetail: ServiceDetailData = {
  service: glp1AssessmentService,
  title: 'GLP-1 Assessment & Obesity Clinic: Safe, Personalised Weight Management',
  subtitle: 'A specialist medical assessment to determine whether GLP-1-based treatment is appropriate for you and what monitoring or further care may be needed.',
  imageAlt: 'Doctor discussing a weight-management plan with a patient.',
  faqs: [
    { id: 'glp1-assessment', question: 'What happens during a GLP-1 assessment?', answer: 'The specialist reviews your medical history, current health, gastrointestinal and pancreatic health, medications, symptoms, risk factors and weight-management goals.' },
    { id: 'glp1-eligibility', question: 'Is GLP-1-based treatment suitable for everyone?', answer: 'No. GLP-1-based treatment is not suitable for everyone. A medical assessment helps determine whether it is appropriate and whether further investigations or specialist input are needed.' },
    { id: 'glp1-monitoring', question: 'Will treatment be monitored?', answer: 'If treatment is considered appropriate, your healthcare professional will discuss available options and the monitoring required during treatment.' },
  ],
  overview: [
    'At OSEC, our GLP-1 Obesity Clinic provides a comprehensive medical assessment for individuals considering GLP-1-based treatment for weight management.',
    'Our priority is to ensure that treatment is appropriate, safe and tailored to each individual, with a focus on long-term health rather than weight loss alone.',
  ],
  sections: [
    {
      heading: 'Who May Be Suitable for GLP-1 Assessment?',
      paragraphs: ['The service is for individuals considering medical treatment for weight management, including those exploring GLP-1-based therapies.'],
    },
    {
      heading: 'Initial Medical Assessment',
      paragraphs: ['The specialist will review your:'],
      items: [
        'Medical history',
        'Current health',
        'Gastrointestinal health',
        'Pancreatic health',
        'Current medications',
        'Symptoms',
        'Relevant risk factors',
        'Weight-management goals',
      ],
      concludingParagraphs: ['Particular attention is given to gastrointestinal and pancreatic health that may affect the safety or suitability of treatment.'],
    },
    {
      heading: 'Why Might You Need an Assessment?',
      paragraphs: ['GLP-1-based treatment is not suitable for everyone. A medical assessment helps determine whether treatment is appropriate and whether further investigations or specialist input are required.'],
    },
    {
      heading: 'Assessment and Care Planning',
      paragraphs: [
        'During your consultation, the specialist will review your health history and assess factors relevant to treatment.',
        'Where clinically appropriate, investigations may be recommended. These are guided by your medical history, symptoms and individual risk factors rather than automatically requiring a routine pancreatic function test for every patient.',
      ],
    },
    {
      heading: 'Treatment and Monitoring',
      paragraphs: [
        'If treatment is considered appropriate, your healthcare professional will discuss the available options and the monitoring required during treatment.',
        'GLP-1-based medicines can reduce appetite, increase feelings of fullness and support weight loss in appropriately selected individuals.',
      ],
    },
    {
      heading: 'Important Information',
      paragraphs: ['GLP-1-based medicines are prescription treatments and are not suitable for everyone. They should be prescribed and monitored by an appropriately qualified healthcare professional.'],
    },
    {
      heading: "OSEC's Approach",
      paragraphs: ['Our aim is to help each patient make an informed and safe decision while supporting sustainable improvements in health, wellbeing and quality of life.'],
    },
  ],
};

/** Weight-management copy from assets/OSEC_Service_Detail_Content_Updated.docx. */
export const weightManagementDetail: ServiceDetailData = {
  service: weightManagementService,
  title: 'Endobariatric Medical Weight Management: A Personalised Approach to Sustainable Weight Care',
  subtitle: 'Individualised medical and lifestyle support, treatment and follow-up designed around your health needs and weight-management goals.',
  imageAlt: 'Doctor discussing weight-management options with a patient.',
  faqs: [
    { id: 'weight-options', question: 'What may endobariatric medical weight management include?', answer: 'Depending on individual needs, care may include lifestyle interventions, medical treatment, weight-management support, monitoring and follow-up.' },
    { id: 'weight-approach', question: 'How is the approach to weight management chosen?', answer: 'Your specialist assesses your health needs, goals and clinical circumstances to determine the most appropriate approach.' },
    { id: 'weight-followup', question: 'Is follow-up part of weight management?', answer: 'Follow-up allows your healthcare team to monitor progress, assess response to treatment and make adjustments where necessary.' },
  ],
  overview: ['Our Endobariatric Medical Weight Management service provides individualised support for patients throughout their weight-management journey.'],
  assessment: {
    heading: 'Available Treatment Approaches',
    introduction: 'Depending on your individual needs, your care may include:',
    items: [
      'Lifestyle interventions',
      'Medical treatment',
      'Weight-management support',
      'Monitoring',
      'Follow-up',
    ],
  },
  sections: [
    {
      heading: 'Who May Benefit From Endobariatric Treatment?',
      paragraphs: ['The service is intended for individuals seeking professional support with weight management and those who may benefit from a medically supervised approach.'],
    },
    {
      heading: 'Assessment and Eligibility',
      paragraphs: [
        'Your care is tailored to your individual health needs, weight-management goals and clinical circumstances.',
        'Your specialist will assess your needs and determine the most appropriate approach.',
      ],
    },
    {
      heading: 'Treatment and Monitoring',
      paragraphs: ['Depending on your assessment, management may involve lifestyle interventions and/or medical treatment, with monitoring and follow-up.'],
    },
    {
      heading: 'Nutrition and Long-Term Support',
      paragraphs: ['Weight management is an ongoing process. Follow-up allows your healthcare team to monitor progress, assess response to treatment and make adjustments where necessary.'],
    },
  ],
};

/** Paediatric OGD copy from assets/OSEC_Service_Detail_Content_Updated.docx. */
export const paediatricEndoscopyDetail: ServiceDetailData = {
  service: paediatricEndoscopyService,
  imageAlt: 'Endoscopy team preparing to examine a child using a flexible endoscope.',
  faqs: [
    { id: 'paed-upper-what', question: 'What is paediatric upper GI endoscopy?', answer: 'Paediatric Upper GI Endoscopy (OGD) uses a thin flexible camera passed through the mouth to examine a child’s oesophagus, stomach and duodenum.' },
    { id: 'paed-upper-biopsy', question: 'Can biopsies be taken during a child’s upper GI endoscopy?', answer: 'Small biopsies may be taken during the examination when necessary or clinically indicated.' },
    { id: 'paed-upper-preparation', question: 'How should I prepare my child for the procedure?', answer: 'Parents or guardians receive clear instructions about fasting, medications and other preparation before the procedure.' },
  ],
  "title": "Paediatric Upper GI Endoscopy (OGD): Gentle Investigation for Your Child's Upper Digestive Health",
  "subtitle": "A child-centred procedure to examine the oesophagus, stomach and duodenum, helping investigate persistent symptoms safely and comfortably.",
  "overview": [
    "Paediatric Upper GI Endoscopy (OGD, or oesophago-gastro-duodenoscopy) is a minimally invasive procedure that allows our specialist team to examine a child's oesophagus, stomach and duodenum using a thin flexible camera passed through the mouth.",
    "Small biopsies may be taken during the examination when necessary."
  ],
  "assessment": {
    "heading": "What Conditions Can Paediatric Upper GI Endoscopy Investigate?",
    "introduction": "OGD may help investigate:",
    "items": [
      "Gastritis",
      "Ulcers",
      "Coeliac disease",
      "Eosinophilic oesophagitis",
      "Gastrointestinal bleeding",
      "Other upper GI conditions"
    ]
  },
  "sections": [
    {
      "heading": "Who May Need Paediatric Upper GI Endoscopy?",
      "paragraphs": [
        "It may be recommended for children with:"
      ],
      "items": [
        "Persistent abdominal pain",
        "Vomiting",
        "Difficulty swallowing",
        "Gastrointestinal bleeding",
        "Unexplained anaemia",
        "Chronic diarrhoea",
        "Poor weight gain"
      ],
      "concludingParagraphs": [
        "It may also be recommended when a specific gastrointestinal condition is suspected."
      ]
    },
    {
      "heading": "How Does the Procedure Help?",
      "paragraphs": [
        "The procedure allows the specialist to directly examine the upper digestive tract and obtain tissue samples where required."
      ]
    },
    {
      "heading": "What Happens During the Procedure?",
      "paragraphs": [
        "The child will be appropriately prepared before the procedure. The flexible endoscope is passed through the mouth and the upper digestive tract is carefully examined.",
        "Biopsies may be taken if clinically indicated."
      ]
    },
    {
      "heading": "Preparing Your Child for the Procedure",
      "paragraphs": [
        "Parents or guardians will receive clear instructions about fasting, medications and other preparation before the procedure."
      ]
    },
    {
      "heading": "Sedation and Comfort",
      "paragraphs": [
        "The procedure is carried out with appropriate sedation or anaesthesia to ensure that the child remains comfortable and safe."
      ]
    },
    {
      "heading": "Recovery and Aftercare",
      "paragraphs": [
        "Your child will be monitored until sufficiently recovered. The medical team will explain when normal eating and drinking can resume and discuss any findings."
      ]
    }
  ],
  "whyChoose": "OSEC takes a child-centred approach, focusing on reassurance, comfort and safety throughout the experience.",
  "cta": {
    "label": "Book Appointment",
    "href": OSEC_LINKS.whatsappBooking
  }
};

/** Add future approved detail records here; no page component duplication is needed. */
export const serviceDetailsBySlug: Readonly<Record<string, ServiceDetailData>> = {
  [gastrointestinalConsultationDetail.service.slug]: gastrointestinalConsultationDetail,
  [gastroscopyDetail.service.slug]: gastroscopyDetail,
  [colonoscopyDetail.service.slug]: colonoscopyDetail,
  [gastrointestinalBiopsyDetail.service.slug]: gastrointestinalBiopsyDetail,
  [emrDetail.service.slug]: emrDetail,
  [esdDetail.service.slug]: esdDetail,
  [eftrDetail.service.slug]: eftrDetail,
  [pegDetail.service.slug]: pegDetail,
  [paediatricColonoscopyDetail.service.slug]: paediatricColonoscopyDetail,
  [glp1AssessmentDetail.service.slug]: glp1AssessmentDetail,
  [weightManagementDetail.service.slug]: weightManagementDetail,
  [paediatricEndoscopyDetail.service.slug]: paediatricEndoscopyDetail,
  [behavioralCounselingService.slug]: {
    service: behavioralCounselingService,
    title: 'Behavioural Health & Counselling: Support for Mind and Body',
    subtitle: 'Compassionate mental health support and professional counselling to help you navigate emotional challenges, build resilience and take positive steps towards recovery.',
    imageAlt: 'Counsellor speaking with a client during a consultation.',
    imagePosition: 'center 40%',
    faqs: [
      { id: 'counselling-support', question: 'What support does OSEC provide?', answer: 'OSEC provides personalised assessment, counselling and psychological support, including behavioural counselling and recovery support.' },
      { id: 'counselling-lead', question: 'Who leads OSEC’s counselling service?', answer: 'The service is led by Feyisayo Olubukola Iwayemi, Lead Counsellor for Mental Health and Addiction Services.' },
      { id: 'counselling-plan', question: 'What can I expect from care planning?', answer: 'The service uses assessment and compassionate guidance to help you understand your concerns, explore practical coping strategies and develop a care plan.' },
    ],
    backLabel: 'Back to Services',
    overview: ['Our behavioural health and counselling service supports people experiencing emotional, psychological or behavioural challenges. Through personalised assessment and compassionate guidance, we help you understand your concerns, explore practical coping strategies and develop a care plan for your mental and emotional wellbeing.'],
    sections: [
      {
        heading: 'Assessment and Care Planning',
        paragraphs: ['We use internationally validated screening tools to understand your needs and plan your care.'],
      },
      {
        heading: 'Counselling & Psychological Support',
        paragraphs: ['We provide individualised counselling for adults and adolescents, alongside family psychoeducation to strengthen support systems. We also offer specialist psychotherapy and behavioural counselling for people living with eating disorders, including anorexia and bulimia, helping them understand their triggers and develop practical coping strategies.'],
      },
      {
        heading: 'Addiction Recovery Support',
        paragraphs: ['Our approach combines evidence-based relapse prevention strategies with lifestyle support to build resilience and support recovery.'],
      },
      {
        heading: 'Treatment and Follow-up',
        paragraphs: ['We coordinate your care, follow up regularly and refer you to partner facilities if you need more intensive support.'],
      },
    ],
    counselor: {
      label: 'Meet Your Counsellor',
      heading: 'Meet Your Counsellor',
      image: assets.services.behavioralCounselorPortrait,
      imageAlt: 'Feyisayo Olubukola Iwayemi, OSEC Lead Counsellor for Mental Health and Addiction Services.',
      name: 'Feyisayo Olubukola Iwayemi',
      role: 'Lead Counsellor, Mental Health & Addiction Services',
      biography: [
        'Feyisayo Olubukola Iwayemi holds a Master of Science in Child and Adolescent Mental Well-being from Anglia Ruskin University (UK) and a Diploma in Addiction Science and Behavioural Psychology. She is trained in Universal Treatment Curriculum (UTC) standards.',
        'Mrs Iwayemi leads outpatient counselling, clinical case management and recovery support. Her practice focuses on evidence-based addiction interventions, adolescent psychological support and individualised care planning. She supports patients and families with compassionate counselling and practical pathways to long-term wellbeing.',
      ],
    },
    whyChooseImage: assets.editorial.image1171283239,
  },
};
