import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import RecommendationSection from '@src/app/components/RecommendationSection/RecommendationSection';

import { section } from '../../utils/fixtures';

import '@src/styles.css';

const meta: Meta<typeof RecommendationSection> = {
  title: 'AgentOverview/Components/RecommendationSection',
  component: RecommendationSection,
  parameters: {
    a11y: { test: 'error' },
  },
  args: {
    section,
    onProductClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof RecommendationSection>;

export const Default: Story = {};

export const WithViewMore: Story = {
  args: {
    section: { ...section, viewMoreUrl: 'https://example.com/sneakers' },
  },
};

export const Translated: Story = {
  args: {
    section: { ...section, viewMoreUrl: 'https://example.com/sneakers' },
    translations: {
      'CioAgentOverview.section.aiBadge': 'AI picks',
      'CioAgentOverview.section.viewMore': 'See all',
      'CioAgentOverview.section.carouselLabel': 'Items in {title}',
      'CioAgentOverview.section.opensInNewTab': '(new tab)',
      'CioAgentOverview.carousel.previous': 'Previous picks',
      'CioAgentOverview.carousel.next': 'Next picks',
    },
  },
};
