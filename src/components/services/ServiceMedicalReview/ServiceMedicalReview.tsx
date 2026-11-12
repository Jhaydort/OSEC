export function ServiceMedicalReview({ reviewDate }: { reviewDate?: string }) {
  if (!reviewDate) return null;
  return <p className="osec-service-medical-review">Medically reviewed by Dr Taiwo Onabanjo, {reviewDate}</p>;
}
