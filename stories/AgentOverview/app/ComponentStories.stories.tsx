import type { Meta, StoryObj } from '@storybook/react-vite';

import CioAgentOverview from '@src/app';
import type { IAgentOverviewProps } from '@src/types';

import { argTypes, storiesControls } from '../utils/argTypes';
import { DEMO_API_KEY, domains, intent } from '../utils/constants';

const meta: Meta<typeof CioAgentOverview> = {
  title: 'AgentOverview/CioAgentOverview',
  component: CioAgentOverview,
  tags: ['autodocs'],
  parameters: {
    controls: storiesControls,
  },
  argTypes,
};

export default meta;

type Story = StoryObj<typeof CioAgentOverview>;

export const BasicUsage: Story = {
  args: {
    apiKey: DEMO_API_KEY,
    intent,
    domains,
    callbacks: {
      getViewMoreUrl: (section) =>
        `/search?q=${encodeURIComponent(section.title)}`,
    },
  },
};

function RenderInASmallContainerTemplate(args: IAgentOverviewProps) {
  return (
    <div className="small-container-example-wrapper">
      <div className="small-container-example">
        <CioAgentOverview {...args} />
      </div>
    </div>
  );
}

export const RenderInASmallContainer: Story = {
  args: {
    apiKey: DEMO_API_KEY,
    intent,
    domains,
    callbacks: {
      getViewMoreUrl: (section) =>
        `/search?q=${encodeURIComponent(section.title)}`,
    },
  },
  render: (args) => <RenderInASmallContainerTemplate {...args} />,
};
