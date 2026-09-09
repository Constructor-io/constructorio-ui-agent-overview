import type { Meta, StoryObj } from '@storybook/react-vite';

import ErrorMessage from '@src/app/components/ErrorMessage/ErrorMessage';

import '@src/styles.css';

const meta: Meta<typeof ErrorMessage> = {
  title: 'AgentOverview/Components/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    a11y: { test: 'error' },
  },
};

export default meta;

type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {};

export const Translated: Story = {
  args: {
    translations: {
      'CioAgentOverview.error.message': 'We could not load recommendations.',
    },
  },
};
