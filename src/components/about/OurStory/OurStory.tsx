import { assets } from '../../../data/assets';
import { SectionLabel } from '../../ui/SectionLabel/SectionLabel';
import './OurStory.css';

/** About-only Our story section, Figma frame 241:4757. */
export function OurStory() {
  return (
    <section className="osec-our-story" aria-labelledby="our-story-heading">
      <div className="osec-our-story__layout">
        <img
          className="osec-our-story__image"
          src={assets.editorial.image1171283247Portrait}
          alt="Three members of the OSEC clinical team in blue scrubs"
          width={530}
          height={513}
        />
        <div className="osec-our-story__content">
          <div className="osec-our-story__eyebrow">
            <img src={assets.icons.loom} alt="" />
            <SectionLabel className="osec-our-story__label">Our story</SectionLabel>
          </div>
          <div className="osec-our-story__copy">
            <h2 id="our-story-heading">Built on a Simple Belief: Early Detection Saves Lives.</h2>
            <div className="osec-our-story__paragraphs">
              <p>OSEC was founded with a clear purpose, to transform digestive healthcare through earlier diagnosis, preventive screening, and compassionate specialist care.</p>
              <p>We believe that timely detection can save lives, which is why we've created a centre where patients have access to internationally recognised expertise, advanced endoscopic technology, and treatment tailored to their individual needs.</p>
              <p>Today, OSEC is proud to be one of Nigeria's leading specialist centres for digestive health, colorectal cancer prevention, and advanced therapeutic endoscopy, helping patients receive the right care at the right time with confidence and compassion.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
