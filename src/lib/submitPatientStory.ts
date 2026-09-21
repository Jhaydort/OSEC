import { supabase } from './supabaseClient';
import { toPatientReviewInsert, type PatientStoryValues } from '../data/patientStory';

/** Anonymous INSERT only. No SELECT, automatic retries, or public carousel update. */
export async function submitPatientStory(values: PatientStoryValues): Promise<void> {
  if (!supabase) throw new Error('Patient Story submission is not configured.');
  const { error } = await supabase
    .from('patient_reviews')
    .insert(toPatientReviewInsert(values), { count: 'exact' })
    .retry(false);
  if (error) throw new Error('Patient Story submission failed.');
}
