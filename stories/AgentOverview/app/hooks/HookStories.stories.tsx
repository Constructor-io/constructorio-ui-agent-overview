import type { Meta, StoryObj } from '@storybook/react';

import {
  argTypes,
  storiesControls,
} from '@stories/AgentOverview/utils/argTypes';
import {
  apiKey,
  categoryDomain,
  intent,
  productDomain,
} from '@stories/AgentOverview/utils/constants';

import HooksTemplate from './HooksTemplate';

import '@src/styles.css';

const meta: Meta<typeof HooksTemplate> = {
  title: 'AgentOverview/useAgentOverview Hooks',
  component: HooksTemplate,
  parameters: {
    controls: storiesControls,
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  args: {
    apiKey,
    intent,
    categoryDomain,
    productDomain,
  },
  argTypes,
};

export default meta;

type Story = StoryObj<typeof HooksTemplate>;

export const BasicUsage: Story = {};
