export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

/** Approved OSEC FAQ copy, kept separate from the shared accordion. */
export const faqs: readonly FAQItem[] = [
  {
    id: 'referral',
    question: 'Do I need a referral to book an appointment?',
    answer: 'You can contact OSEC directly to book a consultation. If you already have a referral, test result, or previous medical report, you can bring it along to your appointment.',
  },
  {
    id: 'recommended-procedure',
    question: 'How do I know if I need an endoscopy or colonoscopy?',
    answer: 'Your specialist will assess your symptoms, medical history, and any previous test results before recommending the most appropriate procedure for you.',
  },
  {
    id: 'comfort',
    question: 'Are endoscopy and colonoscopy procedures painful?',
    answer: 'Patient comfort is a priority. Depending on the procedure, sedation or other comfort measures may be used, and your care team will explain what to expect beforehand.',
  },
  {
    id: 'preparation',
    question: 'How should I prepare for my procedure?',
    answer: 'Preparation depends on the procedure you are having. You will receive clear instructions about eating, drinking, medications, and any bowel preparation required before your appointment.',
  },
  {
    id: 'insurance',
    question: 'Do you accept health insurance?',
    answer: 'Insurance coverage can vary by provider and plan. Contact OSEC before your appointment to confirm whether your insurance is accepted and what your plan covers.',
  },
  {
    id: 'contact',
    question: 'How can I book or contact OSEC?',
    answer: 'You can book through the website or contact the clinic directly by phone or email. The team can help you choose the appropriate consultation or service.',
  },
];
