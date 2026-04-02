import type { ArgTypes } from '@storybook/react-vite';

import type { IAgentOverviewProps } from '@src/types';

export const argTypes: Partial<ArgTypes<IAgentOverviewProps>> = {
  apiKey: {
    description: 'API key for Constructor.io',
    control: { type: 'text' },
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'demo' },
    },
  },
  intent: {
    description: 'Intent query for agent recommendations',
    control: 'text',
    table: {
      type: { summary: 'string' },
    },
  },
  domains: {
    description: 'Domains for suggestions and results',
    control: 'object',
    table: {
      type: { summary: '{ suggestions: string; results: string }' },
    },
  },
};

export const storiesControls = {
  expanded: true,
  hideNoControlsWarning: true,
  apiKey: { type: 'text' },
  intent: { type: 'text' },
  domains: { type: 'object' },
};
