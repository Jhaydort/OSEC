import { supabase } from './supabaseClient';
import type { PatientStory } from '../data/patientStories';

/** RLS remains authoritative; explicit filters also constrain every public request. */
export async function fetchPatientStories(signal: AbortSignal): Promise<PatientStory[]> {
  if (!supabase) throw new Error('Patient Stories unavailable.');
  const stories: PatientStory[] = [];
  const pageSize = 100;
  for (let offset = 0; ; offset += pageSize) {
    const { data, error, count } = await supabase
      .from('patient_reviews')
      .select('full_name, service, rating, review', { count: 'exact' })
      .eq('status', 'approved')
      .eq('consent_to_publish', true)
      .order('approved_at', { ascending: false, nullsFirst: false })
      .order('id', { ascending: false })
      .range(offset, offset + pageSize - 1)
      .abortSignal(signal);
    if (error) throw new Error('Patient Stories unavailable.');
    stories.push(...(data ?? []));
    if (!data?.length || (count !== null && stories.length >= count) || (count === null && data.length < pageSize)) break;
  }
  return stories;
}
