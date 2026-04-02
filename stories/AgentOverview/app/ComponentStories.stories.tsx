import type { Meta, StoryObj } from '@storybook/react-vite';

import CioAgentOverview from '@src/app';
import type { IAgentOverviewProps } from '@src/types';

import { argTypes, storiesControls } from '../utils/argTypes';
import { apiKey, domains, intent } from '../utils/constants';

const meta: Meta<typeof CioAgentOverview> = {
  title: 'AgentOverview/CioAgentOverview',
  component: CioAgentOverview,
  parameters: {
    controls: storiesControls,
  },
  argTypes,
};

export default meta;

type Story = StoryObj<typeof CioAgentOverview>;

export const BasicUsage: Story = {
  args: { apiKey, intent, domains },
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
  args: { apiKey, intent, domains },
  render: (args) => <RenderInASmallContainerTemplate {...args} />,
};
