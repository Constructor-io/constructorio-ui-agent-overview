import { useTranslate } from '@src/app/contexts/TranslationsContext';
import type { IProduct, IRecommendationSection } from '@src/types';

import ChevronRightSVG from '../icons/ChevronRightSVG';
import SparkleSVG from '../icons/SparkleSVG';
import ProductCarousel from '../ProductCarousel/ProductCarousel';

import './RecommendationSection.css';

interface IRecommendationSectionProps {
  /** The section data containing title, description, products, and optional viewMoreUrl. */
  section: IRecommendationSection;
  /** Builds a custom URL for each product card link. */
  getProductUrl?: (product: IProduct) => string;
  /** Called when a product card within this section is clicked. */
  onProductClick?: (event: React.MouseEvent, product: IProduct) => void;
}

/** Renders a single recommendation section with AI badge, title, description, and product carousel. */
export default function RecommendationSection({
  section,
  getProductUrl,
  onProductClick,
}: IRecommendationSectionProps) {
  const { translate } = useTranslate();

  return (
    <div className="cio-agent-overview-section">
      <div className="cio-agent-overview-section-badge">
        <SparkleSVG />
        <span>{translate('CioAgentOverview.section.aiBadge')}</span>
      </div>
      <div className="cio-agent-overview-section-header">
        <div className="cio-agent-overview-section-header-text">
          <h2 className="cio-agent-overview-section-title">{section.title}</h2>
          <p className="cio-agent-overview-section-description">
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
            {translate('CioAgentOverview.section.viewMore')}
            <ChevronRightSVG />
          </a>
        )}
      </div>
      <ProductCarousel
        products={section.products}
        label={section.title}
        getProductUrl={getProductUrl}
        onProductClick={onProductClick}
      />
    </div>
  );
}
