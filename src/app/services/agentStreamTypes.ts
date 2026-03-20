export interface AgentStreamGroupEvent {
  type: 'group';
  data: {
    title: string;
    description: string;
  };
}

export interface AgentStreamResultItem {
  value?: string;
  data?: {
    image_url?: string;
    url?: string;
    price?: number;
  };
}

export interface AgentStreamSearchResultEvent {
  type: 'search_result';
  data: {
    title?: string;
    text?: string;
    response?: {
      results: AgentStreamResultItem[];
    };
  };
}

export interface AgentStreamMessageEvent {
  type: 'message';
  data: {
    text: string;
  };
}

export type AgentStreamEvent =
  | AgentStreamGroupEvent
  | AgentStreamSearchResultEvent
  | AgentStreamMessageEvent;
