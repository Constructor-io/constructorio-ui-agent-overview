import type {
  IProduct,
  IRecommendationSection,
  Translations,
} from '@src/types';
import domId from '@src/utils/domId';
import translate, { translateLabel } from '@src/utils/translate';

import ChevronRightSVG from '../icons/ChevronRightSVG';
import SparkleSVG from '../icons/SparkleSVG';
import ProductCarousel from '../ProductCarousel/ProductCarousel';
import { SR_ONLY_STYLE } from '../StatusRegion/StatusRegion';

import './RecommendationSection.css';

interface IRecommendationSectionProps {
  /** The section data containing title, description, products, and optional viewMoreUrl. */
  section: IRecommendationSection;
  /** Translation overrides for UI strings. */
  translations?: Translations;
  /** Builds a custom URL for each product card link. */
  getProductUrl?: (product: IProduct) => string;
  /** Called when a product card within this section is clicked. */
  onProductClick?: (event: React.MouseEvent, product: IProduct) => void;
}

/** Renders a single recommendation section with AI badge, title, description, and product carousel. */
export default function RecommendationSection({
  section,
  translations,
  getProductUrl,
  onProductClick,
}: IRecommendationSectionProps) {
  const titleId = domId('cio-agent-overview-section-title', section.title);
  const descriptionId = domId(
    'cio-agent-overview-section-description',
    section.title
  );
  const carouselLabel = translateLabel(
    'CioAgentOverview.section.carouselLabel',
    translations
  ).replace('{title}', section.title);

  return (
    <section
      className="cio-agent-overview-section"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <div className="cio-agent-overview-section-badge">
        <SparkleSVG />
        <span>
          {translate('CioAgentOverview.section.aiBadge', translations)}
        </span>
      </div>
      <div className="cio-agent-overview-section-header">
        <div className="cio-agent-overview-section-header-text">
          <h2 className="cio-agent-overview-section-title" id={titleId}>
            {section.title}
          </h2>
          <p
            className="cio-agent-overview-section-description"
            id={descriptionId}
          >
            {section.description}
          </p>
        </div>
        {section.viewMoreUrl && (
          <a
            className="cio-agent-overview-section-view-more"
            href={section.viewMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {translate('CioAgentOverview.section.viewMore', translations)}{' '}
            <span className="cio-agent-overview-sr-only" style={SR_ONLY_STYLE}>
              {translateLabel(
                'CioAgentOverview.section.opensInNewTab',
                translations
              )}
            </span>
            <ChevronRightSVG />
          </a>
        )}
      </div>
      <ProductCarousel
        products={section.products}
        label={carouselLabel}
        translations={translations}
        getProductUrl={getProductUrl}
        onProductClick={onProductClick}
      />
    </section>
  );
}
