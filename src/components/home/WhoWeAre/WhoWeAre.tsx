import { useRef, useState } from 'react';
import { assets } from '../../../data/assets';
import './WhoWeAre.css';

/** Figma Home frame 192:11978, immediately after the Hero. */
export function WhoWeAre() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function playVideo() {
    try { await videoRef.current?.play(); } catch { setIsPlaying(false); }
  }

  return (
    <section className="osec-who-we-are" aria-labelledby="who-we-are-heading">
      <div className="osec-who-we-are__content">
        <div className="osec-who-we-are__intro">
          <div className="osec-who-we-are__eyebrow">
            <img src={assets.icons.loom} alt="" />
            <span>Who are we</span>
          </div>
          <h2 id="who-we-are-heading">
            We combine specialist expertise with compassionate care to help you feel informed,
            comfortable, and confident every step of your health care journey
          </h2>
          <a className="osec-who-we-are__link" href="/about">Learn More About OSEC</a>
        </div>

        <div className="osec-who-we-are__video-wrap">
          <video
            className="osec-who-we-are__video"
            aria-label="OSEC clinic video"
            controls={isPlaying}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            poster={assets.editorial.consultation}
            preload="none"
            ref={videoRef}
          >
            <source src={assets.media.colonoscopyVideo} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
          {!isPlaying ? (
            <button className="osec-who-we-are__play" type="button" onClick={playVideo} aria-label="Play OSEC video">
              <img src={assets.icons.playCircle} alt="" />
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
