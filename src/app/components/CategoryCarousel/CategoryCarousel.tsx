import { Carousel } from '@constructor-io/constructorio-ui-components';

import { useTranslate } from '@src/app/contexts/TranslationsContext';
import type { ICategory } from '@src/types';

import CategoryCard from '../CategoryCard/CategoryCard';

import './CategoryCarousel.css';

interface ICategoryCarouselProps {
  /** Array of categories to display in the carousel. */
  categories: ICategory[];
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
  onCategoryClick,
}: ICategoryCarouselProps) {
  const { translateLabel } = useTranslate();
  const items = categories.map(toCategoryItem);

  return (
    <div className="cio-agent-overview-category-carousel">
      <Carousel
        items={items}
        loop={false}
        className="cio-agent-overview-category-carousel-inner"
        aria-label={translateLabel('CioAgentOverview.categories.carouselLabel')}
      >
        {({ items: carouselItems }) => (
          <>
            <Carousel.Previous
              aria-label={translateLabel('CioAgentOverview.carousel.previous')}
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
              aria-label={translateLabel('CioAgentOverview.carousel.next')}
            />
          </>
        )}
      </Carousel>
    </div>
  );
}
