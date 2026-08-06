import { render, screen } from '@testing-library/react';

import Skeleton from '@src/app/components/Skeleton/Skeleton';

describe('Skeleton', () => {
  it('renders default 3 rows with 5 cards each', () => {
    const { container } = render(
      <div>
        <Skeleton />
      </div>
    );
    expect(screen.getAllByText('Thinking').length).toBe(3);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const products = container.querySelectorAll(
      '.cio-agent-overview-skeleton-product'
    );
    expect(products.length).toBe(15);
  });

  it('renders custom number of rows', () => {
    render(<Skeleton rows={1} />);
    expect(screen.getAllByText('Thinking').length).toBe(1);
  });

  it('renders custom number of cards per row', () => {
    const { container } = render(
      <div>
        <Skeleton rows={1} cards={4} />
      </div>
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const products = container.querySelectorAll(
      '.cio-agent-overview-skeleton-product'
    );
    expect(products.length).toBe(4);
  });

  it('hides title skeleton when showTitle is false', () => {
    const { container } = render(
      <div>
        <Skeleton rows={1} showTitle={false} />
      </div>
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const title = container.querySelector('.cio-agent-overview-skeleton-title');
    expect(title).toBeNull();
  });

  it('shows title skeleton by default', () => {
    const { container } = render(
      <div>
        <Skeleton rows={1} />
      </div>
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const title = container.querySelector('.cio-agent-overview-skeleton-title');
    expect(title).toBeTruthy();
  });

  describe('accessibility', () => {
    it('announces the loading state through a single status region', () => {
      render(<Skeleton />);
      const status = screen.getByRole('status');
      expect(status).toHaveTextContent('Loading recommendations');
      expect(status).toHaveAttribute('aria-busy', 'true');
    });

    it('translates the loading announcement', () => {
      render(
        <Skeleton
          translations={{
            'CioAgentOverview.skeleton.loading': 'Custom loading label',
          }}
        />
      );
      expect(screen.getByRole('status')).toHaveTextContent(
        'Custom loading label'
      );
    });

    it('hides the decorative skeleton bones from assistive technology', () => {
      const { container } = render(
        <div>
          <Skeleton rows={2} />
        </div>
      );
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const sections = container.querySelectorAll(
        '.cio-agent-overview-skeleton-section'
      );
      expect(sections.length).toBe(2);
      sections.forEach((section) =>
        expect(section).toHaveAttribute('aria-hidden', 'true')
      );
    });
  });
});
