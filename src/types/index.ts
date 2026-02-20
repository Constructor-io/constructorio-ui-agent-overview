import type ConstructorIOClient from '@constructor-io/constructorio-client-javascript';

export interface IAgentOverviewProps {
  apiKey?: string;
  cioJsClient?: ConstructorIOClient;
  domain: string;
  primaryColor?: string;
  enableHydration?: boolean;
}
