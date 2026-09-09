import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import CategorySection from '@src/app/components/CategorySection/CategorySection';

import { categories, categoryDescription } from '../../utils/fixtures';

import '@src/styles.css';

const meta: Meta<typeof CategorySection> = {
  title: 'AgentOverview/Components/CategorySection',
  component: CategorySection,
  parameters: {
    a11y: { test: 'error' },
  },
  args: {
    description: categoryDescription,
    categories,
    onCategoryClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof CategorySection>;

export const Default: Story = {};

export const WithViewSuggestions: Story = {
  args: {
    onViewSuggestions: fn(),
  },
};

export const Translated: Story = {
  args: {
    onViewSuggestions: fn(),
    translations: {
      'CioAgentOverview.section.aiBadge': 'AI picks',
      'CioAgentOverview.categories.viewSuggestions': 'See suggestions',
      'CioAgentOverview.categories.carouselLabel': 'Suggested picks',
      'CioAgentOverview.carousel.previous': 'Previous picks',
      'CioAgentOverview.carousel.next': 'Next picks',
    },
  },
};
