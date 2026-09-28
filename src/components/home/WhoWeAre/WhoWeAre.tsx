import { useEffect, useRef, useState } from 'react';
import { assets } from '../../../data/assets';
import './WhoWeAre.css';

/** Figma Home frame 192:11978, immediately after the Hero. */
export function WhoWeAre() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let sufficientlyVisible = false;
    let disposed = false;
    let pending = false;
    let visibilityVersion = 0;

    // Set the actual media properties before the first play request, including
    // defaultMuted for WebKit. Sound remains under the native controls thereafter.
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    const shouldAutoplay = () =>
      !disposed && sufficientlyVisible && !reducedMotion.matches && !document.hidden;

    const play = async () => {
      if (!shouldAutoplay() || pending || !video.paused) return;
      pending = true;
      const version = visibilityVersion;
      try {
        await video.play();
      } catch (error) {
        // A previously selected sound-on preference can be blocked on re-entry.
        // Audio permission must not prevent otherwise permitted muted playback.
        if (shouldAutoplay() && !video.muted &&
            error instanceof Error && error.name === 'NotAllowedError') {
          video.muted = true;
          try { await video.play(); } catch { /* Keep the manual control available. */ }
        }
      } finally {
        pending = false;
        if (!shouldAutoplay()) {
          video.pause();
        } else if (version !== visibilityVersion) {
          // Finish an interrupted request before resuming after a rapid scroll.
          void play();
        }
      }
    };
    const syncPlayback = () => {
      ++visibilityVersion;
      // Scope native autoplay to the viewport instead of starting it off-screen.
      video.autoplay = shouldAutoplay();
      if (video.autoplay) void play();
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && entry.intersectionRatio >= 0.45;
      if (visible === sufficientlyVisible) return;
      sufficientlyVisible = visible;
      syncPlayback();
    }, { threshold: [0, 0.45], rootMargin: '0px' });
    reducedMotion.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    observer.observe(video);
    return () => {
      disposed = true;
      observer.disconnect();
      reducedMotion.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
      video.autoplay = false;
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
            // The observer enables the native autoplay property only in view.
            autoPlay={false}
            preload="metadata"
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
