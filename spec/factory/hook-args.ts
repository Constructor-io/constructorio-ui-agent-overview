import { Factory } from 'fishery';

import type { IAgentOverviewProps } from '../../src/types';

export const agentOverviewProps = Factory.define<IAgentOverviewProps>(() => ({
  apiKey: 'DEMO_API_KEY',
  intent: 'I want to buy shoes',
  categoryDomain: 'searchbar_agent',
  productDomain: 'explorer',
}));
