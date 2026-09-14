import { useId, useState } from 'react';
import { assets } from '../../../data/assets';
import type { FAQItem } from '../../../data/faqs';
import { SectionLabel } from '../../ui/SectionLabel/SectionLabel';
import './FAQSection.css';

export interface FAQSectionProps {
  items: readonly FAQItem[];
}

/** Figma FAQ section 431:14771; reusable FAQ item states from 234:2814. */
export function FAQSection({ items }: FAQSectionProps) {
  const sectionId = useId();
  const [openId, setOpenId] = useState<string | null>(() => items[0]?.id ?? null);

  return (
    <section className="osec-faq" aria-labelledby={`${sectionId}-heading`}>
      <div className="osec-faq__layout">
        <div className="osec-faq__intro">
          <header className="osec-faq__header">
            <div className="osec-faq__eyebrow">
              <img src={assets.patientStories.loom} alt="" />
              <SectionLabel className="osec-faq__label">FAQ</SectionLabel>
            </div>
            <h2 id={`${sectionId}-heading`}>Frequently Asked Questions</h2>
          </header>
          <img className="osec-faq__image" src={assets.editorial.faqConsultation} alt="A clinician consulting with a patient" width={490} height={335} loading="lazy" />
        </div>

        <div className="osec-faq__accordion">
          {items.map((item) => {
            const isOpen = openId === item.id;
            const triggerId = `${sectionId}-${item.id}-trigger`;
            const answerId = `${sectionId}-${item.id}-answer`;

            return (
              <div className="osec-faq__item" key={item.id}>
                <h3>
                  <button
                    className="osec-faq__trigger"
                    type="button"
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenId((current) => current === item.id ? null : item.id)}
                  >
                    <span>{item.question}</span>
                    <span className={`osec-faq__control${isOpen ? ' osec-faq__control--open' : ''}`} aria-hidden="true">
                      <img src={isOpen ? assets.icons.faqMinus : assets.icons.faqPlus} alt="" />
                    </span>
                  </button>
                </h3>
                <div
                  className={`osec-faq__answer${isOpen ? ' osec-faq__answer--open' : ''}`}
                  id={answerId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                >
                  <div className="osec-faq__answer-inner"><p>{item.answer}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
