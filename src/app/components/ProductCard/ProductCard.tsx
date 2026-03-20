import type { Product } from '@constructor-io/constructorio-ui-components';
import { ProductCard as CioProductCard } from '@constructor-io/constructorio-ui-components';

import type { IProduct } from '@src/types';

import './ProductCard.css';

interface IProductCardProps {
  product: IProduct;
  onClick?: () => void;
}

export function toLibraryProduct(product: IProduct): Product {
  return {
    id: product.url,
    name: product.itemName,
    imageUrl: product.imageUrl,
    price: product.price.toFixed(2),
  };
}

export default function ProductCard({ product, onClick }: IProductCardProps) {
  const libraryProduct = toLibraryProduct(product);

  return (
    <a
      className="cio-agent-overview__product-card"
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <CioProductCard
        product={libraryProduct}
        className="cio-agent-overview__product-card__inner"
      >
        <CioProductCard.ImageSection className="cio-agent-overview__product-card__image" />
        <CioProductCard.Content className="cio-agent-overview__product-card__content">
          <CioProductCard.PriceSection />
          <CioProductCard.TitleSection />
        </CioProductCard.Content>
      </CioProductCard>
    </a>
  );
}
