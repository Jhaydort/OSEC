import { useEffect, useRef, useState } from 'react';
import { assets } from '../../../data/assets';
import './WhoWeAre.css';

/** Figma Home frame 192:11978, immediately after the Hero. */
export function WhoWeAre() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !('IntersectionObserver' in window)) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let sufficientlyVisible = false;
    let disposed = false;
    let shouldPlay = false;

    const autoplay = async () => {
      if (reducedMotion.matches || !sufficientlyVisible) return;
      shouldPlay = true;
      video.muted = true;
      try {
        await video.play();
        // A pending play request can resolve after scrolling away or cleanup.
        if (disposed || !shouldPlay || reducedMotion.matches) video.pause();
      } catch {
        // The existing manual play button remains available if autoplay is blocked.
      }
    };
    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      video.preload = 'metadata';
      preloadObserver.disconnect();
    }, { rootMargin: '200px' });
    const playbackObserver = new IntersectionObserver(([entry]) => {
      sufficientlyVisible = entry.isIntersecting && entry.intersectionRatio >= 0.45;
      if (!entry.isIntersecting) {
        shouldPlay = false;
        video.pause();
      } else if (sufficientlyVisible) {
        void autoplay();
      }
    }, { threshold: [0, 0.45] });
    const onMotionChange = () => {
      if (reducedMotion.matches) {
        shouldPlay = false;
        video.pause();
      } else {
        void autoplay();
      }
    };
    reducedMotion.addEventListener('change', onMotionChange);
    preloadObserver.observe(video);
    playbackObserver.observe(video);
    return () => {
      disposed = true;
      shouldPlay = false;
      preloadObserver.disconnect();
      playbackObserver.disconnect();
      reducedMotion.removeEventListener('change', onMotionChange);
      video.pause();
    };
  }, []);

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
            muted
            playsInline
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
