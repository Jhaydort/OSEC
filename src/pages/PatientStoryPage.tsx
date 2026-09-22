import { trackEvent } from '../lib/analytics';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Footer } from '../components/layout/Footer/Footer';
import { AppointmentSection } from '../components/shared/AppointmentSection/AppointmentSection';
import { AlternativeButton } from '../components/ui/AlternativeButton/AlternativeButton';
import { Button } from '../components/ui/Button/Button';
import { StarRating } from '../components/patient-story/StarRating';
import { services } from '../data/services';
import { countStoryWords, PATIENT_STORY_WORD_LIMIT, initialPatientStoryValues, normalizePatientStory, validatePatientStory, type PatientStoryValues, type PatientStoryErrors } from '../data/patientStory';
import './PatientStoryPage.css';

const serviceIds = services.map((service) => service.id);

/** Standalone Patient Story form, Figma 513:1995. Anonymous submissions enter manual moderation. */
export function PatientStoryPage() {
  const [values, setValues] = useState<PatientStoryValues>(initialPatientStoryValues);
  const [errors, setErrors] = useState<PatientStoryErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const wordCount = countStoryWords(values.review);
  const overWordLimit = wordCount > PATIENT_STORY_WORD_LIMIT;
  const submitting = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (status === 'success') {
      successRef.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [status]);

  function update<K extends keyof PatientStoryValues>(field: K, value: PatientStoryValues[K]) {
    if (submitting.current) return;
    const next = { ...values, [field]: value };
    setValues(next);
    setStatus('idle');
    if (errors[field] || field === 'review') setErrors((previous) => ({ ...previous, [field]: validatePatientStory(next, serviceIds)[field] }));
  }
  function validateField(field: keyof PatientStoryValues) {
    if (submitting.current) return;
    setErrors((previous) => ({ ...previous, [field]: validatePatientStory(values, serviceIds)[field] }));
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || status === 'success') return;
    const payload = normalizePatientStory(values);
    const nextErrors = validatePatientStory(payload, serviceIds);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      setStatus('idle');
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    submitting.current = true;
    setStatus('submitting');
    try {
      const { submitPatientStory } = await import('../lib/submitPatientStory');
      await submitPatientStory(payload);
      setValues({ ...initialPatientStoryValues });
      setErrors({});
      setStatus('success');
      trackEvent('patient_story_submit');
    } catch {
      // Keep all entered values for a deliberate retry; never expose raw errors.
      setStatus('error');
    } finally {
      submitting.current = false;
    }
  }
  function errorFor(field: keyof PatientStoryValues) {
    return errors[field] ? <p className="osec-patient-story__error" id={`story-${field}-error`}>{errors[field]}</p> : null;
  }
  function fieldAttributes(field: keyof PatientStoryValues) {
    return { disabled: status === 'submitting', 'aria-invalid': Boolean(errors[field]), 'aria-describedby': errors[field] ? `story-${field}-error` : undefined, onBlur: () => validateField(field) };
  }

  return (
    <>
      <main>
        <section className={`osec-patient-story${status === 'success' ? ' osec-patient-story--success' : ''}`} aria-labelledby={status === 'success' ? 'story-success-heading' : 'patient-story-heading'}>
          {status !== 'success' && <header className="osec-patient-story__intro">
            <h1 id="patient-story-heading">Share Your OSEC Experience</h1>
            <p>Tell us about your experience with OSEC. Your story helps us improve our care and gives others confidence in choosing us.</p>
          </header>}
          {status === 'success' ? (
            <div className="osec-patient-story__success" role="status" aria-labelledby="story-success-heading" tabIndex={-1} ref={successRef}>
              <h1 id="story-success-heading">Thank You for Sharing Your Story</h1>
              <p>Your feedback has been received. We appreciate you taking the time to share your experience with OSEC.</p>
              <AlternativeButton className="osec-patient-story__home" label="Go to Home page" href="/" />
            </div>
          ) : <form aria-busy={status === 'submitting'} className="osec-patient-story__form" aria-label="Share your OSEC experience" noValidate onSubmit={handleSubmit}>
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
              <StarRating disabled={status === 'submitting'} value={values.rating} onChange={(rating) => update('rating', rating)} onBlur={() => validateField('rating')} error={errors.rating} />
              <div className="osec-patient-story__story-consent">
                <div className="osec-patient-story__field">
                  <label htmlFor="story-review">Share Your Story</label>
                  <textarea id="story-review" name="review" required placeholder="Tell us about your experience with OSEC."
                    value={values.review} onChange={(event) => update('review', event.target.value)} {...fieldAttributes('review')}
                    aria-describedby={`story-word-count story-word-help story-privacy${errors.review ? ' story-review-error' : ''}`} />
                  <div className="osec-patient-story__word-help">
                    <p className="osec-patient-story__helper" id="story-word-help">Keep your story to 45 words or less.</p>
                    <p className={overWordLimit ? 'osec-patient-story__error' : 'osec-patient-story__helper'} id="story-word-count">{wordCount} / {PATIENT_STORY_WORD_LIMIT} words</p>
                  </div>
                  <p className="osec-patient-story__helper" id="story-privacy">Please avoid including private medical or sensitive personal information.</p>
                  {errorFor('review')}
                </div>
                <label className="osec-patient-story__consent" htmlFor="story-consent">
                  <input id="story-consent" type="checkbox" name="consentToPublish" disabled={status === 'submitting'} checked={values.consentToPublish}
                    onChange={(event) => update('consentToPublish', event.target.checked)} />
                  <span>I give OSEC permission to publish my story and name on its website.</span>
                </label>
              </div>
            </div>
            <Button type="submit" variant="secondary" className="osec-patient-story__submit" disabled={status === 'submitting' || overWordLimit}>{status === 'submitting' ? 'Submitting...' : 'Submit My Story'}</Button>
            {Object.values(errors).some(Boolean) && <p className="osec-patient-story__status" role="alert">Please correct the highlighted fields above.</p>}
            {status === 'error' && <p className="osec-patient-story__status" role="alert">We couldn't submit your story. Please check your connection and try again.</p>}
          </form>}
        </section>
        <AppointmentSection />
      </main>
      <Footer />
    </>
  );
}
