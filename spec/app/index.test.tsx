import { render } from '@testing-library/react';

import * as factories from '@spec/factory';

import CioAgentOverview from '@src/app';

describe(`${CioAgentOverview.name}: client`, () => {
  it('renders without crashing', () => {
    const props = factories.agentOverviewProps.build();
    const { container } = render(<CioAgentOverview {...props} />);
    expect(container).toHaveTextContent('Constructor.io Agent Overview');
  });
});
