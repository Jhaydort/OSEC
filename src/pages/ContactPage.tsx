import { PageMotion } from '../components/motion/PageMotion';
import { useState, type FormEvent } from 'react';
import { Footer } from '../components/layout/Footer/Footer';
import { AppointmentSection } from '../components/shared/AppointmentSection/AppointmentSection';
import { FAQSection } from '../components/shared/FAQSection/FAQSection';
import { Button } from '../components/ui/Button/Button';
import { faqs } from '../data/faqs';
import './ContactPage.css';

/** Contact OSEC, Figma frame 249:7609; unique hero/form in 249:7464. */
export function ContactPage() {
  const [submissionUnavailable, setSubmissionUnavailable] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: Connect the confirmed enquiry service here before enabling delivery.
    // Keep entered values in the form; never claim an enquiry was sent.
    setSubmissionUnavailable(true);
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
              <div className="osec-contact__fields">
                <div className="osec-contact__field">
                  <label htmlFor="contact-first-name">First Name</label>
                  <input id="contact-first-name" name="firstName" autoComplete="given-name" placeholder="Enter name" />
                </div>
                <div className="osec-contact__field">
                  <label htmlFor="contact-last-name">Last Name</label>
                  <input id="contact-last-name" name="lastName" autoComplete="family-name" placeholder="Enter name" />
                </div>
                <div className="osec-contact__field">
                  <label htmlFor="contact-email">Email Address</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="Enter email address" />
                </div>
                <div className="osec-contact__field">
                  <label htmlFor="contact-phone">Phone number</label>
                  <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="Enter phone number" />
                </div>
                <div className="osec-contact__field osec-contact__field--full">
                  <label htmlFor="contact-enquiry">Nature of Enquiry</label>
                  <input id="contact-enquiry" name="enquiry" placeholder="Enter your organisation name" />
                </div>
                <div className="osec-contact__field osec-contact__field--full">
                  <label htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" name="message" placeholder="Tell us more about your needs" />
                </div>
              </div>
              <Button className="osec-contact__submit" variant="secondary" type="submit">Send Enquiry</Button>
              {submissionUnavailable ? <p className="osec-contact__status" role="status">Your enquiry has not been sent. Online enquiries are not available yet. Please call <a href="tel:+2348164353633">+234 816 435 3633</a> or email <a href="mailto:info@osecng.com">info@osecng.com</a>.</p> : null}
            </form>
          </section>
        </div>
        <AppointmentSection bookingHref="mailto:info@osecng.com" />
        <FAQSection items={faqs} />
      </main>
      <Footer />
    </>
  );
}
