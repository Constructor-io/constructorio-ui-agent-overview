import { render, screen } from '@testing-library/react';

import StatusRegion from '@src/app/components/StatusRegion/StatusRegion';

describe('StatusRegion', () => {
  it('renders a status region with the message as text', () => {
    render(<StatusRegion message="Loading" />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading');
  });

  it('stays mounted when the message is empty', () => {
    render(<StatusRegion message="" />);
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('is hidden visually even without the stylesheet', () => {
    render(<StatusRegion message="Loading" />);
    expect(screen.getByRole('status')).toHaveStyle({
      position: 'absolute',
      width: '1px',
      height: '1px',
    });
  });

  it('keeps the same node when the message changes', () => {
    const { rerender } = render(<StatusRegion message="Loading" />);
    const node = screen.getByRole('status');
    rerender(<StatusRegion message="Ready" />);
    expect(screen.getByRole('status')).toBe(node);
    expect(node).toHaveTextContent('Ready');
  });
});
