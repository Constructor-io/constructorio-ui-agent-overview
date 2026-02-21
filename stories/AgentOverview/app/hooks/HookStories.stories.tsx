import type { Meta } from '@storybook/react';

import {
  argTypes,
  storiesControls,
} from '@stories/AgentOverview/utils/argTypes';
import { apiKey, domain } from '@stories/AgentOverview/utils/constants';

import HooksTemplate from './HooksTemplate';

import '@src/styles.css';

const meta: Meta<typeof HooksTemplate> = {
  title: 'Quiz/useCioQuiz',
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
    domain,
    apiKey,
  },
  argTypes,
};

export default meta;

export const BasicUsage = HooksTemplate.bind({});
