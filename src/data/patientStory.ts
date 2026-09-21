/** Step 1 values only: moderation and persistence belong to the future backend. */
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
  return errors;
}

/** The future submission boundary can use this payload without changing the UI. */
export function normalizePatientStory(values: PatientStoryValues): PatientStoryValues {
  return { ...values, fullName: values.fullName.trim(), email: values.email.trim(), phoneNumber: values.phoneNumber.trim(), review: values.review.trim() };
}
