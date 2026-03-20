import { Carousel } from '@constructor-io/constructorio-ui-components';

import type { IProduct } from '@src/types';

import ProductCard, { toLibraryProduct } from '../ProductCard/ProductCard';

import './ProductCarousel.css';

interface IProductCarouselProps {
  products: IProduct[];
  onProductClick?: (product: IProduct) => void;
}

export default function ProductCarousel({
  products,
  onProductClick,
}: IProductCarouselProps) {
  const libraryProducts = products.map(toLibraryProduct);

  return (
    <div className="cio-agent-overview__carousel">
      <Carousel
        items={libraryProducts}
        loop={false}
        className="cio-agent-overview__carousel__inner"
      >
        {({ items }) => (
          <>
            <Carousel.Previous />
            <Carousel.Content className="cio-agent-overview__carousel__content">
              {items?.map((item, index) => {
                const product = products[index];
                return (
                  <Carousel.Item key={item.id} item={item} index={index}>
                    <ProductCard
                      product={product}
                      onClick={() => onProductClick?.(product)}
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
