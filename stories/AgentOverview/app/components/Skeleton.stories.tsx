import type { Meta, StoryObj } from '@storybook/react-vite';

import Skeleton from '@src/app/components/Skeleton/Skeleton';

import '@src/styles.css';

const meta: Meta<typeof Skeleton> = {
  title: 'AgentOverview/Components/Skeleton',
  component: Skeleton,
  parameters: {
    a11y: { test: 'error' },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const CategoriesLoading: Story = {
  args: {
    rows: 1,
    showTitle: false,
    cards: 4,
  },
};
