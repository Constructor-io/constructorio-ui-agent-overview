import { Carousel } from '@constructor-io/constructorio-ui-components';

import type { ICategory } from '@src/types';

import CategoryCard from '../CategoryCard/CategoryCard';

import './CategoryCarousel.css';

interface ICategoryCarouselProps {
  categories: ICategory[];
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
  const items = categories.map(toCategoryItem);

  return (
    <div className="cio-agent-overview__category-carousel">
      <Carousel
        items={items}
        loop={false}
        className="cio-agent-overview__category-carousel__inner"
      >
        {({ items: carouselItems }) => (
          <>
            <Carousel.Previous />
            <Carousel.Content className="cio-agent-overview__category-carousel__content">
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
            <Carousel.Next />
          </>
        )}
      </Carousel>
    </div>
  );
}
