import type ConstructorIOClient from '@constructor-io/constructorio-client-javascript';

export interface CioAgentOverviewTheme {
  primaryColor?: React.CSSProperties['color'];
  secondaryColor?: React.CSSProperties['color'];
  background?: React.CSSProperties['backgroundColor'];
  fontSizeBase?: React.CSSProperties['fontSize'];
}

export interface IAgentOverviewProps {
  apiKey?: string;
  cioJsClient?: ConstructorIOClient;
  domain: string;
  theme?: CioAgentOverviewTheme;
}
