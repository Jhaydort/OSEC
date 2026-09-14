import { useId } from 'react';
import { ArticleLink } from '../ArticleLink/ArticleLink';
import './ArticleCard.css';

export interface ArticleCardProps {
  title: string;
  image: string;
  href: string;
  imageAlt?: string;
  linkLabel?: string;
}

/** Reusable article card from Figma Home 226:2599. */
export function ArticleCard({ title, image, href, imageAlt = '', linkLabel = 'Read More' }: ArticleCardProps) {
  const headingId = useId();

  return (
    <article className="osec-article-card" aria-labelledby={headingId}>
      <img className="osec-article-card__image" src={image} alt={imageAlt} loading="lazy" width={348} height={256} />
      <div className="osec-article-card__copy">
        <h3 id={headingId}>{title}</h3>
        <ArticleLink tone="dark" href={href} aria-label={`${linkLabel}: ${title}`}>{linkLabel}</ArticleLink>
      </div>
    </article>
  );
}
