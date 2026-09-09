import { render, screen } from '@testing-library/react';

import ErrorMessage from '@src/app/components/ErrorMessage/ErrorMessage';

describe('ErrorMessage', () => {
  it('announces the default message as an alert', () => {
    render(<ErrorMessage />);
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Something went wrong. Please try again.'
    );
  });

  it('translates the message', () => {
    render(
      <ErrorMessage
        translations={{ 'CioAgentOverview.error.message': 'Custom error' }}
      />
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Custom error');
  });

  it('hides the decorative icon from assistive technology', () => {
    const { container } = render(<ErrorMessage />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const icon = container.querySelector('.cio-agent-overview-error-icon');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});
