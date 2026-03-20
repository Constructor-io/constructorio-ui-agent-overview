import type { ICategory } from '@src/types';

import CategoryCarousel from '../CategoryCarousel/CategoryCarousel';
import ChevronRightSVG from '../RecommendationSection/ChevronRightSVG';
import SparkleSVG from '../RecommendationSection/SparkleSVG';

import './CategorySection.css';

interface ICategorySectionProps {
  description: string;
  categories: ICategory[];
  onCategoryClick?: (category: ICategory) => void;
  onViewSuggestions?: () => void;
}

export default function CategorySection({
  description,
  categories,
  onCategoryClick,
  onViewSuggestions,
}: ICategorySectionProps) {
  return (
    <div className="cio-agent-overview__category-section">
      <div className="cio-agent-overview__section__badge">
        <SparkleSVG />
        <span>Generated with AI</span>
      </div>
      <div className="cio-agent-overview__section__header">
        <div className="cio-agent-overview__section__header__text">
          <p className="cio-agent-overview__section__description">
            {description}
          </p>
        </div>
        {onViewSuggestions && (
          <button
            type="button"
            className="cio-agent-overview__category-section__view-suggestions"
            onClick={onViewSuggestions}
          >
            View suggestions
            <ChevronRightSVG />
          </button>
        )}
      </div>
      <CategoryCarousel
        categories={categories}
        onCategoryClick={onCategoryClick}
      />
    </div>
  );
}
