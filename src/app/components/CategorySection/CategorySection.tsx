import { useTranslate } from '@src/app/contexts/TranslationsContext';
import type { ICategory } from '@src/types';

import CategoryCarousel from '../CategoryCarousel/CategoryCarousel';
import ChevronRightSVG from '../icons/ChevronRightSVG';
import SparkleSVG from '../icons/SparkleSVG';

import './CategorySection.css';

interface ICategorySectionProps {
  /** AI-generated description text for the category suggestions. */
  description: string;
  /** Array of category suggestions to display. */
  categories: ICategory[];
  /** Called when a category card is clicked. */
  onCategoryClick?: (category: ICategory) => void;
  /** Called when the "View suggestions" button is clicked. */
  onViewSuggestions?: () => void;
}

export default function CategorySection({
  description,
  categories,
  onCategoryClick,
  onViewSuggestions,
}: ICategorySectionProps) {
  const { translate } = useTranslate();

  return (
    <div className="cio-agent-overview-category-section">
      <div className="cio-agent-overview-section-badge">
        <SparkleSVG />
        <span>{translate('CioAgentOverview.section.aiBadge')}</span>
      </div>
      <div className="cio-agent-overview-section-header">
        <div className="cio-agent-overview-section-header-text">
          <p className="cio-agent-overview-section-description">
            {description}
          </p>
        </div>
        {onViewSuggestions && (
          <button
            type="button"
            className="cio-agent-overview-category-section-view-suggestions"
            onClick={onViewSuggestions}
          >
            {translate('CioAgentOverview.categories.viewSuggestions')}
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
