import { Carousel } from '@constructor-io/constructorio-ui-components';

import type { ICategory, Translations } from '@src/types';
import translate from '@src/utils/translate';

import CategoryCard from '../CategoryCard/CategoryCard';

import './CategoryCarousel.css';

interface ICategoryCarouselProps {
  /** Array of categories to display in the carousel. */
  categories: ICategory[];
  /** Translation overrides for UI strings. */
  translations?: Translations;
  /** Called when a category card is clicked. */
  onCategoryClick?: (category: ICategory) => void;
}

function toCategoryItem(category: ICategory) {
  return {
    id: category.title,
    name: category.title,
    imageUrl: category.imageUrl,
  };
}

export default function CategoryCarousel({
  categories,
  translations,
  onCategoryClick,
}: ICategoryCarouselProps) {
  const items = categories.map(toCategoryItem);

  return (
    <div className="cio-agent-overview-category-carousel">
      <Carousel
        items={items}
        loop={false}
        className="cio-agent-overview-category-carousel-inner"
        aria-label={translate(
          'CioAgentOverview.categories.carouselLabel',
          translations
        )}
      >
        {({ items: carouselItems }) => (
          <>
            <Carousel.Previous
              aria-label={translate(
                'CioAgentOverview.carousel.previous',
                translations
              )}
            />
            <Carousel.Content className="cio-agent-overview-category-carousel-content">
              {carouselItems?.map((item, index) => {
                const category = categories[index];
                return (
                  <Carousel.Item key={item.id} item={item} index={index}>
                    <CategoryCard
                      category={category}
                      onClick={() => onCategoryClick?.(category)}
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel.Content>
            <Carousel.Next
              aria-label={translate(
                'CioAgentOverview.carousel.next',
                translations
              )}
            />
          </>
        )}
      </Carousel>
    </div>
  );
}
