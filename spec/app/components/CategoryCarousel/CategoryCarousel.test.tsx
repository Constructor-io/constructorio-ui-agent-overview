import { fireEvent, render, screen } from '@testing-library/react';

import CategoryCarousel from '@src/app/components/CategoryCarousel/CategoryCarousel';
import type { ICategory } from '@src/types';

const categories: ICategory[] = [
  { title: 'Running Shoes', imageUrl: 'https://example.com/running.jpg' },
  { title: 'Hiking Boots', imageUrl: 'https://example.com/hiking.jpg' },
];

describe('CategoryCarousel', () => {
  it('renders all categories', () => {
    render(<CategoryCarousel categories={categories} />);
    expect(screen.getByText('Running Shoes')).toBeTruthy();
    expect(screen.getByText('Hiking Boots')).toBeTruthy();
  });

  it('names the carousel region and arrows with translated labels', () => {
    render(
      <CategoryCarousel
        categories={categories}
        translations={{
          'CioAgentOverview.categories.carouselLabel': 'Category picks',
          'CioAgentOverview.carousel.previous': 'Go back',
          'CioAgentOverview.carousel.next': 'Go forward',
        }}
      />
    );
    expect(screen.getByRole('region', { name: 'Category picks' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Go back' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Go forward' })).toBeTruthy();
  });

  it('falls back to the default region label when the override is blank', () => {
    render(
      <CategoryCarousel
        categories={categories}
        translations={{ 'CioAgentOverview.categories.carouselLabel': '' }}
      />
    );
    expect(screen.getByRole('region', { name: 'Categories' })).toBeTruthy();
  });

  it('names the carousel region by default', () => {
    render(<CategoryCarousel categories={categories} />);
    expect(screen.getByRole('region', { name: 'Categories' })).toBeTruthy();
  });

  it('renders without crashing when categories is empty', () => {
    expect(() => render(<CategoryCarousel categories={[]} />)).not.toThrow();
  });

  it('calls onCategoryClick with the clicked category', () => {
    const handleClick = vi.fn();
    render(
      <CategoryCarousel categories={categories} onCategoryClick={handleClick} />
    );
    // eslint-disable-next-line testing-library/no-node-access
    const button = screen.getByText('Running Shoes').closest('button')!;
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledExactlyOnceWith(categories[0]);
  });
});
