import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';

import version from '@src/version';

interface AgentClientOptions {
  apiKey?: string;
  cioJsClient?: ConstructorIOClient;
}

export function createAgentStream(
  options: AgentClientOptions,
  intent: string,
  domain: string
): ReadableStream<unknown> {
  const { apiKey, cioJsClient } = options;

  let client: ConstructorIOClient;
  if (cioJsClient) {
    client = cioJsClient;
  } else if (apiKey) {
    client = new ConstructorIOClient({
      apiKey,
      sendTrackingEvents: true,
      version: `cio-ui-agent-overview-${version}`,
    });
  } else {
    throw new Error('Either apiKey or cioJsClient must be provided');
  }

  return client.agent.getAgentResultsStream(intent, {
    domain,
  }) as ReadableStream<unknown>;
}
