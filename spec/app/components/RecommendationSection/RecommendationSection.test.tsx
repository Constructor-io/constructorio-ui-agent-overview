import { render, screen } from '@testing-library/react';

import RecommendationSection from '@src/app/components/RecommendationSection/RecommendationSection';
import type { IRecommendationSection } from '@src/types';

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
});
