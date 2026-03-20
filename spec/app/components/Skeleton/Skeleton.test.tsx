import { render, screen } from '@testing-library/react';

import Skeleton from '@src/app/components/Skeleton/Skeleton';

describe('Skeleton', () => {
  it('renders without crashing', () => {
    expect(() => render(<Skeleton />)).not.toThrow();
  });

  it('renders Thinking text while loading', () => {
    render(<Skeleton />);
    const thinkingElements = screen.getAllByText('Thinking');
    expect(thinkingElements.length).toBe(3);
  });

  it('renders multiple skeleton sections', () => {
    const { container } = render(
      <div>
        <Skeleton />
      </div>
    );
    // Skeleton renders 3 sections x 5 products = 15 product placeholders
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const products = container.querySelectorAll(
      '.cio-agent-overview__skeleton__product'
    );
    expect(products.length).toBe(15);
  });
});
