import type { Product } from '@constructor-io/constructorio-ui-components';
import { ProductCard as CioProductCard } from '@constructor-io/constructorio-ui-components';

import type { IProduct } from '@src/types';

import './ProductCard.css';

interface IProductCardProps {
  product: IProduct;
  href?: string;
  onClick?: (event: React.MouseEvent) => void;
}

export function toLibraryProduct(product: IProduct): Product {
  return {
    id: product.url,
    name: product.itemName,
    imageUrl: product.imageUrl,
    price: product.price.toFixed(2),
  };
}

export default function ProductCard({
  product,
  href,
  onClick,
}: IProductCardProps) {
  const libraryProduct = toLibraryProduct(product);
  const resolvedHref = href ?? product.url;

  return (
    <a
      className="cio-agent-overview-product-card"
      href={resolvedHref || undefined}
      onClick={onClick}
    >
      <CioProductCard product={libraryProduct}>
        <CioProductCard.ImageSection />
        <CioProductCard.Content>
          <CioProductCard.PriceSection />
          <CioProductCard.TitleSection />
        </CioProductCard.Content>
      </CioProductCard>
    </a>
  );
}
