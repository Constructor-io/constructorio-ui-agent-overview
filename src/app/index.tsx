import type { IAgentOverviewProps } from '../types';

import useAgentOverview from './hooks/useAgentOverview';
import { AgentOverviewClient } from './services/agentOverviewClient';

import '../styles.css';
import './index.css';

export default function CioAgentOverview(props: IAgentOverviewProps) {
  useAgentOverview(props);

  new AgentOverviewClient({
    apiKey: props.apiKey,
    cioJsClient: props.cioJsClient,
  });

  const themeStyles = Object.entries(props.theme || {}).reduce(
    (acc, [key, value]) => {
      if (value !== undefined) {
        const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        return { ...acc, [cssVarName]: value as string };
      }
      return acc;
    },
    {} as React.CSSProperties
  );

  return (
    <div className="cio-agent-overview-root" style={themeStyles}>
      <div className="cio-agent-overview__header">
        <h1>Constructor.io Agent Overview</h1>
      </div>
    </div>
  );
}
