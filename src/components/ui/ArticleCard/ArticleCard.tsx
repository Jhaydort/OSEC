import { useId } from 'react';
import { ArticleLink } from '../ArticleLink/ArticleLink';
import './ArticleCard.css';

export interface ArticleCardProps {
  title: string;
  image?: string;
  external?: boolean;
  headingLevel?: 2 | 3;
  href: string;
  imageAlt?: string;
  imagePosition?: string;
  linkLabel?: string;
}

/** Reusable article card from Figma Home 226:2599. */
export function ArticleCard({ title, image, href, imageAlt = '', imagePosition, linkLabel = 'Read More', external = false, headingLevel = 3 }: ArticleCardProps) {
  const headingId = useId();
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <article className="osec-article-card" aria-labelledby={headingId}>
      {image ? <img className="osec-article-card__image" src={image} alt={imageAlt} style={imagePosition ? { objectPosition: imagePosition } : undefined} loading="lazy" width={348} height={256} /> : <div className="osec-article-card__image osec-article-card__image--pending" aria-hidden="true" />}
      <div className="osec-article-card__copy">
        <Heading id={headingId}>{title}</Heading>
        <ArticleLink tone="dark" href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} aria-label={`${linkLabel}: ${title}${external ? ' (opens in a new tab)' : ''}`}>{linkLabel}</ArticleLink>
      </div>
    </article>
  );
}
