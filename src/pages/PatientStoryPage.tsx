import { useState, type FormEvent } from 'react';
import { Footer } from '../components/layout/Footer/Footer';
import { AppointmentSection } from '../components/shared/AppointmentSection/AppointmentSection';
import { Button } from '../components/ui/Button/Button';
import { StarRating } from '../components/patient-story/StarRating';
import { services } from '../data/services';
import { initialPatientStoryValues, normalizePatientStory, validatePatientStory, type PatientStoryValues, type PatientStoryErrors } from '../data/patientStory';
import './PatientStoryPage.css';

const serviceIds = services.map((service) => service.id);

/** Standalone Patient Story form, Figma 513:1995. Step 1: UI and validation only. */
export function PatientStoryPage() {
  const [values, setValues] = useState<PatientStoryValues>(initialPatientStoryValues);
  const [errors, setErrors] = useState<PatientStoryErrors>({});
  const [validated, setValidated] = useState(false);

  function update<K extends keyof PatientStoryValues>(field: K, value: PatientStoryValues[K]) {
    const next = { ...values, [field]: value };
    setValues(next);
    setValidated(false);
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: validatePatientStory(next, serviceIds)[field] }));
  }
  function validateField(field: keyof PatientStoryValues) {
    setErrors((previous) => ({ ...previous, [field]: validatePatientStory(values, serviceIds)[field] }));
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = normalizePatientStory(values);
    const nextErrors = validatePatientStory(payload, serviceIds);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      setValidated(false);
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    // Step 2 will submit this validated payload. Do not persist or claim delivery now.
    setValues(payload);
    setValidated(true);
  }
  function errorFor(field: keyof PatientStoryValues) {
    return errors[field] ? <p className="osec-patient-story__error" id={`story-${field}-error`}>{errors[field]}</p> : null;
  }
  function fieldAttributes(field: keyof PatientStoryValues) {
    return { 'aria-invalid': Boolean(errors[field]), 'aria-describedby': errors[field] ? `story-${field}-error` : undefined, onBlur: () => validateField(field) };
  }

  return (
    <>
      <main>
        <section className="osec-patient-story" aria-labelledby="patient-story-heading">
          <header className="osec-patient-story__intro">
            <h1 id="patient-story-heading">Share Your OSEC Experience</h1>
            <p>Tell us about your experience with OSEC. Your story helps us improve our care and gives others confidence in choosing us.</p>
          </header>
          <form className="osec-patient-story__form" aria-label="Share your OSEC experience" noValidate onSubmit={handleSubmit}>
            <div className="osec-patient-story__fields">
              <div className="osec-patient-story__field">
                <label htmlFor="story-fullName">Your Name</label>
                <input id="story-fullName" name="fullName" autoComplete="name" required placeholder="Enter your full name"
                  value={values.fullName} onChange={(event) => update('fullName', event.target.value)} {...fieldAttributes('fullName')} />
                {errorFor('fullName')}
              </div>
              <div className="osec-patient-story__field">
                <label htmlFor="story-email">Email Address</label>
                <input id="story-email" name="email" type="email" autoComplete="email" required placeholder="Enter your email address"
                  value={values.email} onChange={(event) => update('email', event.target.value)} {...fieldAttributes('email')} />
                {errorFor('email')}
              </div>
              <div className="osec-patient-story__field">
                <label htmlFor="story-service">Service Received</label>
                <select id="story-service" name="service" required value={values.service} onChange={(event) => update('service', event.target.value)} {...fieldAttributes('service')}>
                  <option value="" disabled>Select the service you received</option>
                  {services.map((service) => <option key={service.id} value={service.id}>{service.title}</option>)}
                </select>
                {errorFor('service')}
              </div>
              <div className="osec-patient-story__field">
                <label htmlFor="story-phoneNumber">Phone number</label>
                <input id="story-phoneNumber" name="phoneNumber" type="tel" autoComplete="tel" required placeholder="Enter phone number"
                  value={values.phoneNumber} onChange={(event) => update('phoneNumber', event.target.value)} {...fieldAttributes('phoneNumber')} />
                {errorFor('phoneNumber')}
              </div>
              <StarRating value={values.rating} onChange={(rating) => update('rating', rating)} onBlur={() => validateField('rating')} error={errors.rating} />
              <div className="osec-patient-story__story-consent">
                <div className="osec-patient-story__field">
                  <label htmlFor="story-review">Share Your Story</label>
                  <textarea id="story-review" name="review" required placeholder="Tell us about your experience with OSEC."
                    value={values.review} onChange={(event) => update('review', event.target.value)} {...fieldAttributes('review')}
                    aria-describedby={`story-privacy${errors.review ? ' story-review-error' : ''}`} />
                  <p className="osec-patient-story__helper" id="story-privacy">Please avoid including private medical or sensitive personal information.</p>
                  {errorFor('review')}
                </div>
                <label className="osec-patient-story__consent" htmlFor="story-consent">
                  <input id="story-consent" type="checkbox" name="consentToPublish" checked={values.consentToPublish}
                    onChange={(event) => update('consentToPublish', event.target.checked)} />
                  <span>I give OSEC permission to publish my story on its website.</span>
                </label>
              </div>
            </div>
            <Button type="submit" variant="secondary" className="osec-patient-story__submit">Submit My Story</Button>
            {Object.values(errors).some(Boolean) && <p className="osec-patient-story__status" role="alert">Please correct the highlighted fields above.</p>}
            {validated && <p className="osec-patient-story__status" role="status">Your form is complete. Submissions are not available yet, so your story has not been sent or saved.</p>}
          </form>
        </section>
        <AppointmentSection />
      </main>
      <Footer />
    </>
  );
}
