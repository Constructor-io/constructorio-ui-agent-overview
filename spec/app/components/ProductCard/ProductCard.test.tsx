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

  it('renders as a link using product.url by default', () => {
    render(<ProductCard product={product} />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('https://example.com/shoe');
  });

  it('uses href prop over product.url when provided', () => {
    render(<ProductCard product={product} href="/custom/shoe" />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/custom/shoe');
  });

  it('does not set href when product.url is empty and no href prop', () => {
    const noUrlProduct = { ...product, url: '' };
    render(<ProductCard product={noUrlProduct} />);
    const card = screen.getByText('Test Shoe').closest('a');
    expect(card?.getAttribute('href')).toBeNull();
  });

  it('calls onClick with the event when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<ProductCard product={product} onClick={handleClick} />);
    const link = screen.getByRole('link');
    await user.click(link);
    expect(handleClick).toHaveBeenCalledOnce();
    expect(handleClick.mock.calls[0][0].type).toBe('click');
  });

  it('does not prevent default navigation — consumer controls that via onClick', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn((e: React.MouseEvent) => e.preventDefault());
    render(<ProductCard product={product} onClick={handleClick} />);
    const link = screen.getByRole('link');
    await user.click(link);
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('does not render target="_blank"', () => {
    render(<ProductCard product={product} />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('target')).toBeNull();
  });
});
