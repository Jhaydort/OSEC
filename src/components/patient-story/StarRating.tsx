import { useState } from 'react';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  onBlur: () => void;
  error?: string;
}

/** Native radios provide Tab, arrow-key and Space selection without custom key traps. */
export function StarRating({ value, onChange, onBlur, error }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const highlighted = hovered ?? value;
  return (
    <fieldset className="osec-patient-story__rating" aria-describedby={error ? 'story-rating-error' : undefined} aria-invalid={Boolean(error)}>
      <legend>How would you rate your experience?</legend>
      <div className="osec-patient-story__stars" onPointerLeave={() => setHovered(null)}
        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) { setHovered(null); onBlur(); } }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <label className="osec-patient-story__star" key={star}
            onPointerEnter={(event) => { if (event.pointerType === 'mouse' || event.pointerType === 'pen') setHovered(star); }}>
            <input type="radio" name="rating" value={star} checked={value === star} required
              aria-label={`${star} ${star === 1 ? 'star' : 'stars'}`}
              aria-invalid={Boolean(error)} aria-describedby={error ? 'story-rating-error' : undefined}
              onChange={() => { setHovered(null); onChange(star); }} />
            <img src={star <= highlighted ? '/icons/patient-stories-star.svg' : '/icons/patient-story-star.svg'} alt="" width={32} height={32} />
          </label>
        ))}
      </div>
      {error && <p className="osec-patient-story__error" id="story-rating-error">{error}</p>}
    </fieldset>
  );
}
