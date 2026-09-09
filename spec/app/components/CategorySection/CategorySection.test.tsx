import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CategorySection from '@src/app/components/CategorySection/CategorySection';
import type { ICategory } from '@src/types';

const categories: ICategory[] = [
  { title: 'Running Shoes', imageUrl: 'https://example.com/running.jpg' },
  { title: 'Hiking Boots', imageUrl: 'https://example.com/hiking.jpg' },
];

describe('CategorySection', () => {
  it('renders the AI badge', () => {
    render(
      <CategorySection
        description="Here are some categories"
        categories={categories}
      />
    );
    expect(screen.getByText('Generated with AI')).toBeTruthy();
  });

  it('renders the description', () => {
    render(
      <CategorySection
        description="Here are some categories"
        categories={categories}
      />
    );
    expect(screen.getByText('Here are some categories')).toBeTruthy();
  });

  it('renders category cards', () => {
    render(
      <CategorySection
        description="Here are some categories"
        categories={categories}
      />
    );
    expect(screen.getByText('Running Shoes')).toBeTruthy();
    expect(screen.getByText('Hiking Boots')).toBeTruthy();
  });

  it('renders view suggestions button when onViewSuggestions is provided', () => {
    const handleViewSuggestions = vi.fn();
    render(
      <CategorySection
        description="Here are some categories"
        categories={categories}
        onViewSuggestions={handleViewSuggestions}
      />
    );
    expect(screen.getByText('View suggestions')).toBeTruthy();
  });

  it('does not render view suggestions button when onViewSuggestions is absent', () => {
    render(
      <CategorySection
        description="Here are some categories"
        categories={categories}
      />
    );
    expect(screen.queryByText('View suggestions')).toBeNull();
  });

  it('calls onViewSuggestions when view suggestions is clicked', async () => {
    const user = userEvent.setup();
    const handleViewSuggestions = vi.fn();
    render(
      <CategorySection
        description="Here are some categories"
        categories={categories}
        onViewSuggestions={handleViewSuggestions}
      />
    );
    await user.click(screen.getByText('View suggestions'));
    expect(handleViewSuggestions).toHaveBeenCalledOnce();
  });

  describe('accessibility', () => {
    it('hides the decorative badge and chevron icons from assistive technology', () => {
      const { container } = render(
        <CategorySection
          description="Here are some categories"
          categories={categories}
          onViewSuggestions={vi.fn()}
        />
      );
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const icons = container.querySelectorAll(
        '.cio-agent-overview-section-badge svg, .cio-agent-overview-category-section-view-suggestions svg'
      );
      expect(icons.length).toBe(2);
      icons.forEach((icon) => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
        expect(icon).toHaveAttribute('focusable', 'false');
      });
    });

    it('exposes the section as a named region described by its text', () => {
      render(
        <CategorySection
          description="Here are some categories"
          categories={categories}
        />
      );
      const region = screen.getByRole('region', {
        name: 'Category suggestions',
      });
      expect(region).toHaveAccessibleDescription('Here are some categories');
      expect(region.tagName).toBe('SECTION');
    });

    it('exposes category cards as buttons named after the category', () => {
      render(
        <CategorySection
          description="Here are some categories"
          categories={categories}
        />
      );
      expect(
        screen.getByRole('button', { name: /Running Shoes/i })
      ).toBeTruthy();
      expect(
        screen.getByRole('button', { name: /Hiking Boots/i })
      ).toBeTruthy();
    });
  });

  it('calls onCategoryClick when a category is clicked', () => {
    const handleCategoryClick = vi.fn();
    render(
      <CategorySection
        description="Here are some categories"
        categories={categories}
        onCategoryClick={handleCategoryClick}
      />
    );
    // eslint-disable-next-line testing-library/no-node-access
    const button = screen.getByText('Running Shoes').closest('button')!;
    fireEvent.click(button);
    expect(handleCategoryClick).toHaveBeenCalledExactlyOnceWith(categories[0]);
  });
});
