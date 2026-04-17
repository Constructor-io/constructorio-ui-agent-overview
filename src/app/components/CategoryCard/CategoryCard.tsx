import type { Product } from '@constructor-io/constructorio-ui-components';
import { ProductCard as CioProductCard } from '@constructor-io/constructorio-ui-components';

import type { ICategory } from '@src/types';

import './CategoryCard.css';

interface ICategoryCardProps {
  category: ICategory;
  onClick?: () => void;
}

function toLibraryProduct(category: ICategory): Product {
  return {
    id: category.title,
    name: category.title,
    imageUrl: category.imageUrl,
  };
}

export default function CategoryCard({
  category,
  onClick,
}: ICategoryCardProps) {
  const libraryProduct = toLibraryProduct(category);

  return (
    <button
      type="button"
      className="cio-agent-overview-category-card"
      onClick={onClick}
    >
      <CioProductCard product={libraryProduct}>
        <CioProductCard.ImageSection />
        <CioProductCard.Content>
          <CioProductCard.TitleSection />
        </CioProductCard.Content>
      </CioProductCard>
    </button>
  );
}
