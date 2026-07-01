import type { Meta, StoryObj } from '@storybook/react';

import {
  argTypes,
  storiesControls,
} from '@stories/AgentOverview/utils/argTypes';
import {
  DEMO_API_KEY,
  domains,
  intent,
} from '@stories/AgentOverview/utils/constants';

import HooksTemplate from './HooksTemplate';

import '@src/styles.css';

const meta: Meta<typeof HooksTemplate> = {
  title: 'AgentOverview/useAgentOverview Hooks',
  component: HooksTemplate,
  tags: ['autodocs'],
  parameters: {
    controls: storiesControls,
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  args: {
    apiKey: DEMO_API_KEY,
    intent,
    domains,
  },
  argTypes,
};

export default meta;

type Story = StoryObj<typeof HooksTemplate>;

export const BasicUsage: Story = {};

export const DifferentIntent: Story = {
  args: {
    intent: 'Show me summer dresses',
  },
};

export const WithCallbacks: Story = {
  args: {
    callbacks: {
      onCategoryClick: (category) => console.log('Category clicked:', category),
      onProductClick: (_e, product, section) =>
        console.log('Product clicked:', product, 'in section:', section),
    },
  },
};
