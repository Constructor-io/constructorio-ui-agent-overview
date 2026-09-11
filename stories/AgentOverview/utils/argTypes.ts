import type { ArgTypes } from '@storybook/react-vite';

import type { IAgentOverviewProps } from '@src/types';

export const argTypes: Partial<ArgTypes<IAgentOverviewProps>> = {
  apiKey: {
    description:
      'Your Constructor.io API key. Required if `cioJsClient` is not provided.',
    control: { type: 'text' },
    table: {
      type: { summary: 'string' },
    },
  },
  cioJsClient: {
    description:
      'Pre-configured Constructor.io JS client instance. Takes precedence over `apiKey`. Useful when you already have a client instance configured with custom options.',
    control: false,
    table: {
      type: { summary: 'ConstructorIOClient' },
    },
  },
  intent: {
    description:
      'The user\'s search intent that drives agent recommendations (e.g. "I want to buy casual shoes").',
    control: 'text',
    table: {
      type: { summary: 'string' },
    },
  },
  domains: {
    description:
      'Domain identifiers for the agent stream endpoints.\n\n- `suggestions`: domain used to fetch category suggestions\n- `results`: domain used to fetch product results',
    control: 'object',
    table: {
      type: { summary: '{ suggestions: string; results: string }' },
    },
  },
  theme: {
    description:
      'Theme overrides for customizing visual appearance via CSS custom properties. Supports typography, colors, carousel arrows, and spacing tokens. See the Theme documentation for the full list of available properties.',
    control: 'object',
    table: {
      type: { summary: 'CioAgentOverviewTheme' },
    },
  },
  callbacks: {
    description:
      'Callback functions for handling user interactions.\n\n- `onProductClick(event, product, section)`: called when a product card is clicked\n- `onCategoryClick(category)`: called when a category card is clicked\n- `getProductUrl(product)`: builds a URL for a product card link\n- `getViewMoreUrl(section)`: builds a "View more" URL from section data',
    control: false,
    table: {
      type: { summary: 'IAgentOverviewCallbacks' },
    },
  },
  translations: {
    description:
      'Translation overrides for internationalizing UI strings. All keys are optional.\n\n- `CioAgentOverview.section.aiBadge`\n- `CioAgentOverview.categories.viewSuggestions`\n- `CioAgentOverview.section.viewMore`\n- `CioAgentOverview.skeleton.thinking`\n- `CioAgentOverview.status.loading`\n- `CioAgentOverview.status.ready`\n- `CioAgentOverview.carousel.previous`\n- `CioAgentOverview.carousel.next`\n- `CioAgentOverview.carousel.label`\n- `CioAgentOverview.categories.sectionLabel`\n- `CioAgentOverview.categories.carouselLabel`\n- `CioAgentOverview.section.carouselLabel`\n- `CioAgentOverview.section.fallbackTitle`\n- `CioAgentOverview.error.message`',
    control: 'object',
    table: {
      type: { summary: 'Translations' },
    },
  },
};

export const storiesControls = {
  expanded: true,
  hideNoControlsWarning: true,
};
