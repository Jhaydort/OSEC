export interface PatientStory {
  id: string;
  quote: string;
  attribution: string;
  ratingLabel: string;
}

// TODO: Connect Patient Stories / Testimonials to the approved testimonial data
// source once the final data pipeline is confirmed. Current testimonial content
// is temporary/static and must not be treated as the final production data source.
export const patientStories: readonly PatientStory[] = [
  {
    id: 'figma-patient-lagos',
    quote: 'Professional, compassionate, and reassuring. OSEC made my procedure far more comfortable than I expected.',
    attribution: '—Verified Patient, Lagos',
    ratingLabel: '4.6 Review',
  },
];
