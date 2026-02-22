import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import type { IAgentParameters } from '@constructor-io/constructorio-client-javascript/lib/types/agent';

import version from '@src/version';

type AgentOverviewClientOptions = {
  apiKey?: string;
  cioJsClient?: ConstructorIOClient;
};

export class AgentOverviewClient {
  private readonly client: ConstructorIOClient;

  /**
   * Creates a new AgentOverviewClient.
   * @param options - Options for initializing the client
   */
  constructor(options: AgentOverviewClientOptions) {
    const { apiKey, cioJsClient } = options;

    if (!apiKey && !cioJsClient) {
      throw new Error('Either apiKey or cioJsClient must be provided');
    }

    if (cioJsClient) {
      this.client = cioJsClient;
    } else {
      this.client = new ConstructorIOClient({
        apiKey: apiKey!,
        sendTrackingEvents: true,
        version: `cio-ui-agent-overview-${version}`,
      });
    }

    this.agent = new AgentNamespace(this.client);
    // this.tracking = new TrackingNamespace(this.client);
  }

  public readonly agent: AgentNamespace;
  // public readonly tracking: TrackingNamespace;

  /**
   * Exposes the raw ConstructorIO client for advanced use cases.
   * Use with caution.
   */
  public get rawClient(): ConstructorIOClient {
    return this.client;
  }
}

class AgentNamespace {
  constructor(private readonly client: ConstructorIOClient) {}

  /**
   * Retrieves an agent results stream for a given intent.
   * @param intent - The intent identifier
   * @param parameters - Parameters for the agent request
   * @returns A readable stream of agent results
   */
  getAgentResultsStream(
    intent: string,
    parameters: IAgentParameters
  ): ReadableStream {
    try {
      return this.client.agent.getAgentResultsStream(intent, parameters);
    } catch (error) {
      throw new Error(
        `Failed to get agent results stream: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}

// class TrackingNamespace {
// constructor(private readonly client: ConstructorIOClient) {
//   // Tracking methods for agent overview will be added here
//   // For example:
//   // trackAgentEvent(event: AgentTrackingEvent) { ... }
// }
// }
