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
      '.cio-agent-overview__skeleton__product'
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
      '.cio-agent-overview__skeleton__product'
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
    const title = container.querySelector(
      '.cio-agent-overview__skeleton__title'
    );
    expect(title).toBeNull();
  });

  it('shows title skeleton by default', () => {
    const { container } = render(
      <div>
        <Skeleton rows={1} />
      </div>
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const title = container.querySelector(
      '.cio-agent-overview__skeleton__title'
    );
    expect(title).toBeTruthy();
  });
});
