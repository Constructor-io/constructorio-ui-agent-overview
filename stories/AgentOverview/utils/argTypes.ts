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
  domain: {
    description: 'Domain for Constructor.io',
    control: 'text',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'example.com' },
    },
  },
  cioJsClient: {
    description: 'Constructor.io client instance',
    table: {
      type: { summary: 'CioClient' },
    },
    control: false,
  },
};

export const storiesControls = {
  expanded: true,
  hideNoControlsWarning: true,
  apiKey: { type: 'text' },
  domain: { type: 'text' },
};
