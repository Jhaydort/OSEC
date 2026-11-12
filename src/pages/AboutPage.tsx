import { PageMotion } from '../components/motion/PageMotion';
import { AboutHero } from '../components/about/AboutHero/AboutHero';
import { OurStory } from '../components/about/OurStory/OurStory';
import { Purpose } from '../components/about/Purpose/Purpose';
import { MeetYourPhysician } from '../components/about/MeetYourPhysician/MeetYourPhysician';
import { Footer } from '../components/layout/Footer/Footer';
import { FAQSection } from '../components/shared/FAQSection/FAQSection';
import { aboutFAQs } from '../data/faqs';

export function AboutPage() {
  return (
    <>
      <PageMotion page="about" />
      <main id="main-content" tabIndex={-1}>
        <AboutHero />
        <OurStory />
        <Purpose />
        <MeetYourPhysician />
        <FAQSection items={aboutFAQs} />
      </main>
      <Footer />
    </>
  );
}
