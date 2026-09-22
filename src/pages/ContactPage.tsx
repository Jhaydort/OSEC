import { trackEvent } from '../lib/analytics';
import { PageMotion } from '../components/motion/PageMotion';
import { useRef, useState, type FormEvent } from 'react';
import { Footer } from '../components/layout/Footer/Footer';
import { AppointmentSection } from '../components/shared/AppointmentSection/AppointmentSection';
import { FAQSection } from '../components/shared/FAQSection/FAQSection';
import { Button } from '../components/ui/Button/Button';
import { faqs } from '../data/faqs';
import './ContactPage.css';

/** Contact OSEC, Figma frame 249:7609; unique hero/form in 249:7464. */
export function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    submitting.current = true;
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error('Submission failed');
      form.reset();
      setStatus('success');
      trackEvent('contact_form_submit');
    } catch {
      setStatus('error');
    } finally {
      submitting.current = false;
    }
  }

  return (
    <>
      <PageMotion page="contact" />
      <main>
        <div className="osec-contact">
          <header className="osec-contact__hero">
            <h1>Contact OSEC</h1>
            <p>Need help or ready to book an appointment? We're here to help: <a href="tel:+2348164353633">+234 816 435 3633</a>. Or complete the form below.</p>
          </header>
          <section className="osec-contact__form-section" aria-labelledby="contact-form-heading">
            <h2 id="contact-form-heading">Tell Us How We Can Help</h2>
            <form className="osec-contact__form" onSubmit={handleSubmit}>
              <div hidden aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="osec-contact__fields">
                <div className="osec-contact__field">
                  <label htmlFor="contact-first-name">First Name</label>
                  <input id="contact-first-name" name="firstName" required maxLength={100} autoComplete="given-name" placeholder="Enter name" />
                </div>
                <div className="osec-contact__field">
                  <label htmlFor="contact-last-name">Last Name</label>
                  <input id="contact-last-name" name="lastName" required maxLength={100} autoComplete="family-name" placeholder="Enter name" />
                </div>
                <div className="osec-contact__field">
                  <label htmlFor="contact-email">Email Address</label>
                  <input id="contact-email" name="email" required maxLength={254} type="email" autoComplete="email" placeholder="Enter email address" />
                </div>
                <div className="osec-contact__field">
                  <label htmlFor="contact-phone">Phone number</label>
                  <input id="contact-phone" name="phone" required maxLength={40} type="tel" autoComplete="tel" placeholder="Enter phone number" />
                </div>
                <div className="osec-contact__field osec-contact__field--full">
                  <label htmlFor="contact-enquiry">Nature of Enquiry</label>
                  <input id="contact-enquiry" name="natureOfEnquiry" required maxLength={200} placeholder="What can we help you with?" />
                </div>
                <div className="osec-contact__field osec-contact__field--full">
                  <label htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" name="message" required maxLength={5000} placeholder="Tell us more about your needs" />
                </div>
              </div>
              <Button className="osec-contact__submit" variant="secondary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send Enquiry'}</Button>
              {status === 'success' ? <p className="osec-contact__status" role="status">Enquiry sent successfully<br />Thank you for contacting OSEC. Our team will get back to you as soon as possible.</p> : null}
              {status === 'error' ? <p className="osec-contact__status" role="alert">We couldn't send your enquiry. Please try again.</p> : null}
            </form>
          </section>
        </div>
        <AppointmentSection />
        <FAQSection items={faqs} />
      </main>
      <Footer />
    </>
  );
}
