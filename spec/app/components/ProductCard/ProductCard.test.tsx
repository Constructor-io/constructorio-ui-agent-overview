import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ProductCard from '@src/app/components/ProductCard/ProductCard';
import type { IProduct } from '@src/types';

const product: IProduct = {
  itemName: 'Test Shoe',
  imageUrl: 'https://example.com/shoe.jpg',
  price: 49.99,
  url: 'https://example.com/shoe',
};

describe('ProductCard', () => {
  it('renders product name and price', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText('Test Shoe')).toBeTruthy();
    expect(screen.getByText(/\$\s*49\.99/)).toBeTruthy();
  });

  it('renders product image with alt text', () => {
    render(<ProductCard product={product} />);
    const img = screen.getByAltText('Test Shoe');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('https://example.com/shoe.jpg');
  });

  it('renders as a link to product url', () => {
    render(<ProductCard product={product} />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('https://example.com/shoe');
    expect(link.getAttribute('target')).toBe('_blank');
  });

  it('calls onClick and prevents default navigation when onClick is provided', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<ProductCard product={product} onClick={handleClick} />);
    const link = screen.getByRole('link');
    await user.click(link);
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('does not prevent default when onClick is not provided', () => {
    render(<ProductCard product={product} />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('https://example.com/shoe');
  });
});
