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

  describe('accessibility', () => {
    it('hides the decorative badge and chevron icons from assistive technology', () => {
      const sectionWithViewMore = {
        ...section,
        viewMoreUrl: 'https://example.com/more',
      };
      const { container } = render(
        <RecommendationSection section={sectionWithViewMore} />
      );
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const icons = container.querySelectorAll(
        '.cio-agent-overview-section-badge svg, .cio-agent-overview-section-view-more svg'
      );
      expect(icons.length).toBe(2);
      icons.forEach((icon) => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
        expect(icon).toHaveAttribute('focusable', 'false');
      });
    });

    it('tells that the view more link opens in a new tab', () => {
      const sectionWithViewMore = {
        ...section,
        viewMoreUrl: 'https://example.com/more',
      };
      render(<RecommendationSection section={sectionWithViewMore} />);
      expect(
        screen.getByRole('link', { name: 'View More (opens in a new tab)' })
      ).toBeTruthy();
    });

    it('translates the new tab hint', () => {
      const sectionWithViewMore = {
        ...section,
        viewMoreUrl: 'https://example.com/more',
      };
      render(
        <RecommendationSection
          section={sectionWithViewMore}
          translations={{
            'CioAgentOverview.section.opensInNewTab': '(new tab)',
          }}
        />
      );
      expect(
        screen.getByRole('link', { name: 'View More (new tab)' })
      ).toBeTruthy();
    });

    it('exposes the section as a region named by its heading and described by its text', () => {
      render(<RecommendationSection section={section} />);
      const region = screen.getByRole('region', { name: 'Running Shoes' });
      expect(region).toHaveAccessibleDescription('Best shoes for running');
      expect(region.tagName).toBe('SECTION');
    });

    it('keeps the new tab hint when its translation is blanked', () => {
      render(
        <RecommendationSection
          section={{ ...section, viewMoreUrl: 'https://example.com/more' }}
          translations={{ 'CioAgentOverview.section.opensInNewTab': '' }}
        />
      );
      expect(
        screen.getByRole('link', { name: 'View More (opens in a new tab)' })
      ).toBeTruthy();
    });

    it('keeps aria references intact when two identical sections are mounted', () => {
      render(
        <>
          <RecommendationSection section={section} />
          <RecommendationSection section={section} />
        </>
      );
      const regions = screen.getAllByRole('region', { name: 'Running Shoes' });
      expect(regions).toHaveLength(2);
      const ids = regions.map((region) =>
        region.getAttribute('aria-labelledby')
      );
      expect(new Set(ids).size).toBe(2);
      regions.forEach((region) =>
        expect(region).toHaveAccessibleDescription('Best shoes for running')
      );
    });

    it('names the product carousel after the section', () => {
      render(<RecommendationSection section={section} />);
      expect(
        screen.getByRole('region', { name: 'Running Shoes products' })
      ).toBeTruthy();
    });

    it('replaces every title placeholder and keeps special characters in the title', () => {
      render(
        <RecommendationSection
          section={{ ...section, title: 'Shoes & More $&' }}
          translations={{
            'CioAgentOverview.section.carouselLabel': '{title}: all {title}',
          }}
        />
      );
      expect(
        screen.getByRole('region', {
          name: 'Shoes & More $&: all Shoes & More $&',
        })
      ).toBeTruthy();
    });

    it('translates the carousel name with the title placeholder', () => {
      render(
        <RecommendationSection
          section={section}
          translations={{
            'CioAgentOverview.section.carouselLabel': 'Items in {title}',
          }}
        />
      );
      expect(
        screen.getByRole('region', { name: 'Items in Running Shoes' })
      ).toBeTruthy();
    });
  });

  it('passes getProductUrl through to product cards', () => {
    const getProductUrl = (product: IProduct) => `/custom/${product.itemName}`;
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
    expect(handleClick).toHaveBeenCalledExactlyOnceWith(
      expect.anything(),
      section.products[0]
    );
  });
});
