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
    let requestId = 0;
    let hasAttemptedAutoplay = false;
    let manualSoundPreference = false;
    let interactionAttempted = false;
    let expectedMuted = video.muted;
    let expectedVolume = video.volume;

    const setMuted = (muted: boolean) => {
      expectedMuted = muted;
      video.muted = muted;
    };
    const interactionEvents = ['pointerup', 'click', 'keydown'] as const;
    const removeInteractionListeners = () => {
      interactionEvents.forEach(event => document.removeEventListener(event, onInteraction, true));
    };
    const onVolumeChange = () => {
      // Distinguish native sound control changes from our own volumechange events.
      if (video.muted !== expectedMuted || video.volume !== expectedVolume) {
        manualSoundPreference = true;
        expectedMuted = video.muted;
        expectedVolume = video.volume;
        removeInteractionListeners();
      }
    };
    const canPlay = (id: number) =>
      !disposed && id === requestId && sufficientlyVisible && !reducedMotion.matches;
    const playWithFallback = async () => {
      const id = ++requestId;
      try {
        await video.play();
      } catch (error) {
        if (!canPlay(id)) return;
        // Retry policy rejections muted, but do not reinterpret source errors
        // or interrupted playback as an autoplay permission failure.
        if (!(error instanceof DOMException) || error.name !== 'NotAllowedError' || video.muted) return;
        setMuted(true);
        if (!manualSoundPreference && !interactionAttempted) {
          interactionEvents.forEach(event => document.addEventListener(event, onInteraction, true));
        }
        try { await video.play(); } catch { /* Manual playback remains available. */ }
      }
      // A pending request must not restart playback after scrolling away.
      if (disposed || !sufficientlyVisible || reducedMotion.matches) video.pause();
    };
    const onInteraction = (event: Event) => {
      if (!event.isTrusted || manualSoundPreference || interactionAttempted ||
          !sufficientlyVisible || video.paused || !video.muted || reducedMotion.matches) return;
      // Native media controls must handle their own clicks and key presses.
      if (event.composedPath().includes(video)) return;
      interactionAttempted = true;
      removeInteractionListeners();
      setMuted(false);
      void playWithFallback();
    };
    const autoplay = () => {
      if (disposed || reducedMotion.matches || !sufficientlyVisible) return;
      if (!hasAttemptedAutoplay && !manualSoundPreference) setMuted(false);
      hasAttemptedAutoplay = true;
      void playWithFallback();
    };
    video.addEventListener('volumechange', onVolumeChange);
    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      video.preload = 'metadata';
      preloadObserver.disconnect();
    }, { rootMargin: '200px' });
    const playbackObserver = new IntersectionObserver(([entry]) => {
      sufficientlyVisible = entry.isIntersecting && entry.intersectionRatio >= 0.45;
      if (!sufficientlyVisible) {
        ++requestId;
        video.pause();
      } else if (sufficientlyVisible) {
        void autoplay();
      }
    }, { threshold: [0, 0.45] });
    const onMotionChange = () => {
      if (reducedMotion.matches) {
        ++requestId;
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
      ++requestId;
      removeInteractionListeners();
      video.removeEventListener('volumechange', onVolumeChange);
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
