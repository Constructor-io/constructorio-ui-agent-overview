import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RecommendationSection from '@src/app/components/RecommendationSection/RecommendationSection';
import type { IProduct, IRecommendationSection } from '@src/types';

const section: IRecommendationSection = {
  title: 'Running Shoes',
  description: 'Best shoes for running',
  products: [
    {
      itemName: 'Shoe A',
      imageUrl: 'https://example.com/a.jpg',
      price: 100,
      url: 'https://example.com/a',
    },
    {
      itemName: 'Shoe B',
      imageUrl: 'https://example.com/b.jpg',
      price: 120,
      url: 'https://example.com/b',
    },
  ],
};

describe('RecommendationSection', () => {
  it('renders section title and description', () => {
    render(<RecommendationSection section={section} />);
    expect(screen.getByRole('heading', { name: 'Running Shoes' })).toBeTruthy();
    expect(screen.getByText('Best shoes for running')).toBeTruthy();
  });

  it('renders the AI badge', () => {
    render(<RecommendationSection section={section} />);
    expect(screen.getByText('Generated with AI')).toBeTruthy();
  });

  it('renders product cards', () => {
    render(<RecommendationSection section={section} />);
    expect(screen.getByText('Shoe A')).toBeTruthy();
    expect(screen.getByText('Shoe B')).toBeTruthy();
  });

  it('renders view more link when viewMoreUrl is provided', () => {
    const sectionWithViewMore = {
      ...section,
      viewMoreUrl: 'https://example.com/more',
    };
    render(<RecommendationSection section={sectionWithViewMore} />);
    const link = screen.getByRole('link', { name: /view more/i });
    expect(link.getAttribute('href')).toBe('https://example.com/more');
  });

  it('does not render view more link when viewMoreUrl is absent', () => {
    render(<RecommendationSection section={section} />);
    expect(screen.queryByText('View More')).toBeNull();
  });

  it('passes getProductUrl through to product cards', () => {
    const getProductUrl = (product: IProduct) =>
      `/custom/${product.itemName}`;
    render(
      <RecommendationSection section={section} getProductUrl={getProductUrl} />
    );
    const links = screen.getAllByRole('link');
    expect(links[0].getAttribute('href')).toBe('/custom/Shoe A');
    expect(links[1].getAttribute('href')).toBe('/custom/Shoe B');
  });

  it('passes onProductClick through to product cards', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <RecommendationSection section={section} onProductClick={handleClick} />
    );
    const links = screen.getAllByRole('link');
    await user.click(links[0]);
    expect(handleClick).toHaveBeenCalledOnce();
    expect(handleClick.mock.calls[0][0].type).toBe('click');
    expect(handleClick.mock.calls[0][1]).toBe(section.products[0]);
  });
});
