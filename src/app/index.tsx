import type { IAgentOverviewProps } from '../types';

import useAgentOverview from './hooks/useAgentOverview';

import '../styles.css';
import './index.css';

export default function CioAgentOverview(props: IAgentOverviewProps) {
  useAgentOverview(props);

  return (
    <div className="cio-agent-overview-root">
      <div className=".cio-agent-overview__header">
        <h1>Constructor.io Agent Overview</h1>
      </div>
    </div>
  );
}
