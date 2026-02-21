import { renderToString } from 'react-dom/server';

import * as factories from '@spec/factory';

import CioAgentOverview from '@src/app';
import type { IAgentOverviewProps } from '@src/types';

describe(`${CioAgentOverview.name}: server`, () => {
  const props: IAgentOverviewProps = factories.agentOverviewProps.build();

  it('renders results', () => {
    const view = renderToString(<CioAgentOverview {...props} />);
    expect(view).toContain('Agent Overview');
  });
});
