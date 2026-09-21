/** Patient-editable values only; moderation fields are fixed at the insert boundary. */
export interface PatientStoryValues {
  fullName: string;
  email: string;
  service: string;
  phoneNumber: string;
  rating: number;
  review: string;
  consentToPublish: boolean;
}

export type PatientStoryErrors = Partial<Record<keyof PatientStoryValues, string>>;

export const initialPatientStoryValues: PatientStoryValues = {
  fullName: '', email: '', service: '', phoneNumber: '', rating: 0, review: '', consentToPublish: false,
};

export const PATIENT_STORY_WORD_LIMIT = 45;
export function countStoryWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/u).length : 0;
}

/** Pure validation; the caller supplies the existing service IDs. No storage or network. */
export function validatePatientStory(values: PatientStoryValues, serviceIds: readonly string[]): PatientStoryErrors {
  const errors: PatientStoryErrors = {};
  if (!values.fullName.trim()) errors.fullName = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (!serviceIds.includes(values.service)) errors.service = 'Please select the service you received.';
  const phone = values.phoneNumber.trim();
  const mainNumber = phone.replace(/\s*(?:ext\.?|x|#)\s*\d{1,6}$/i, '');
  const digits = mainNumber.replace(/\D/g, '');
  if (!phone) errors.phoneNumber = 'Please enter your phone number.';
  else if (!/^\+?[\d\s().-]+$/.test(mainNumber) || digits.length < 7 || digits.length > 15) errors.phoneNumber = 'Enter a valid phone number.';
  if (!Number.isInteger(values.rating) || values.rating < 1 || values.rating > 5) errors.rating = 'Please select a rating.';
  if (!values.review.trim()) errors.review = 'Please share your experience.';
  else if (countStoryWords(values.review) > PATIENT_STORY_WORD_LIMIT) errors.review = 'Your story exceeds 45 words. Please shorten it before submitting.';
  return errors;
}

/** Normalize values before validation and submission. */
export function normalizePatientStory(values: PatientStoryValues): PatientStoryValues {
  return { ...values, fullName: values.fullName.trim(), email: values.email.trim(), phoneNumber: values.phoneNumber.trim(), review: values.review.trim() };
}

/** Explicit allowlist: patient input can never set moderation or extra columns. */
export function toPatientReviewInsert(values: PatientStoryValues) {
  const normalized = normalizePatientStory(values);
  return {
    full_name: normalized.fullName,
    email: normalized.email,
    phone_number: normalized.phoneNumber,
    service: normalized.service,
    rating: normalized.rating,
    review: normalized.review,
    consent_to_publish: normalized.consentToPublish,
    status: 'pending' as const,
    approved_at: null,
  };
}
