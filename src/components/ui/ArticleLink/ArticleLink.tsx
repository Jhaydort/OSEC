import type { AnchorHTMLAttributes } from 'react';
import { assets } from '../../../data/assets';
import './ArticleLink.css';

interface ArticleLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  tone?: 'light' | 'dark';
}

/** Figma SAT Button (226:2359). Both supplied variants have the same visual styling. */
export function ArticleLink({ children = 'Read Article', tone = 'light', className = '', ...props }: ArticleLinkProps) {
  return (
    <a className={`osec-article-link osec-article-link--${tone} ${className}`.trim()} {...props}>
      <span className="osec-article-link__label">{children}</span>
      <span className="osec-article-link__circle" aria-hidden="true">
        <img src={assets.icons.articleArrow} alt="" />
      </span>
    </a>
  );
}
