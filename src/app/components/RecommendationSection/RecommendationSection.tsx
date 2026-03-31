import type { IProduct, IRecommendationSection } from '@src/types';

import ProductCarousel from '../ProductCarousel/ProductCarousel';

import ChevronRightSVG from './ChevronRightSVG';
import SparkleSVG from './SparkleSVG';

import './RecommendationSection.css';

interface IRecommendationSectionProps {
  section: IRecommendationSection;
  getProductUrl?: (product: IProduct) => string;
  onProductClick?: (event: React.MouseEvent, product: IProduct) => void;
}

export default function RecommendationSection({
  section,
  getProductUrl,
  onProductClick,
}: IRecommendationSectionProps) {
  return (
    <div className="cio-agent-overview__section">
      <div className="cio-agent-overview__section__badge">
        <SparkleSVG />
        <span>Generated with AI</span>
      </div>
      <div className="cio-agent-overview__section__header">
        <div className="cio-agent-overview__section__header__text">
          <h2 className="cio-agent-overview__section__title">
            {section.title}
          </h2>
          <p className="cio-agent-overview__section__description">
            {section.description}
          </p>
        </div>
        {section.viewMoreUrl && (
          <a
            className="cio-agent-overview__section__view-more"
            href={section.viewMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View More
            <ChevronRightSVG />
          </a>
        )}
      </div>
      <ProductCarousel
        products={section.products}
        getProductUrl={getProductUrl}
        onProductClick={onProductClick}
      />
    </div>
  );
}
