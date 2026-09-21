/** Only the four fields permitted in the public Patient Stories response. */
export interface PatientStory {
  full_name: string;
  service: string;
  rating: number;
  review: string;
}
