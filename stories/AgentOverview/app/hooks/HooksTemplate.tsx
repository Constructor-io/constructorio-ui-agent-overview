import useAgentOverview from '@src/app/hooks/useAgentOverview';
import type { IAgentOverviewProps } from '@src/types';

export default function HooksTemplate(args: IAgentOverviewProps) {
  const { phase, categories, sections } = useAgentOverview(args);

  return (
    <div>
      <div>Phase: {phase}</div>
      <div>Categories: {categories.length}</div>
      <div>Sections: {sections.length}</div>
    </div>
  );
}
