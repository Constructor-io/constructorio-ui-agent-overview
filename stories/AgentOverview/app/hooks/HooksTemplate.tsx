import useAgentOverview from '@src/app/hooks/useAgentOverview';
import type { IAgentOverviewProps } from '@src/types';

export default function HooksTemplate(args: IAgentOverviewProps) {
  const hook = useAgentOverview(args);

  return <div>{hook.text}</div>;
}
