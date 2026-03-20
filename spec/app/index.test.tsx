import { render, waitFor } from '@testing-library/react';

import * as factories from '@spec/factory';

import CioAgentOverview from '@src/app';

describe(`${CioAgentOverview.name}: client`, () => {
  it('renders without crashing', async () => {
    const props = factories.agentOverviewProps.build();
    expect(() => render(<CioAgentOverview {...props} />)).not.toThrow();
    await waitFor(() => {
      // Wait for async state updates to settle
    });
  });
});
