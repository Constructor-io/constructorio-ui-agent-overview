import type { ICategory, Translations } from '@src/types';
import translate from '@src/utils/translate';

import CategoryCarousel from '../CategoryCarousel/CategoryCarousel';
import ChevronRightSVG from '../icons/ChevronRightSVG';
import SparkleSVG from '../icons/SparkleSVG';

import './CategorySection.css';

interface ICategorySectionProps {
  /** AI-generated description text for the category suggestions. */
  description: string;
  /** Array of category suggestions to display. */
  categories: ICategory[];
  /** Translation overrides for UI strings. */
  translations?: Translations;
  /** Called when a category card is clicked. */
  onCategoryClick?: (category: ICategory) => void;
  /** Called when the "View suggestions" button is clicked. */
  onViewSuggestions?: () => void;
}

export default function CategorySection({
  description,
  categories,
  translations,
  onCategoryClick,
  onViewSuggestions,
}: ICategorySectionProps) {
  return (
    <div className="cio-agent-overview-category-section">
      <div className="cio-agent-overview-section-badge">
        <SparkleSVG />
        <span>
          {translate('CioAgentOverview.section.aiBadge', translations)}
        </span>
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
            {translate(
              'CioAgentOverview.categories.viewSuggestions',
              translations
            )}
            <ChevronRightSVG />
          </button>
        )}
      </div>
      <CategoryCarousel
        categories={categories}
        translations={translations}
        onCategoryClick={onCategoryClick}
      />
    </div>
  );
}
