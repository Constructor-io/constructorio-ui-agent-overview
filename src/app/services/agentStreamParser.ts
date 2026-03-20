import type {
  AgentStreamEvent,
  AgentStreamResultItem,
} from './agentStreamTypes';

export async function* parseAgentStream(
  stream: ReadableStream<unknown>
): AsyncGenerator<AgentStreamEvent> {
  const reader = stream.getReader();

  try {
    let done = false;
    while (!done) {
      const result = await reader.read();
      done = result.done;
      if (done || !result.value) break;

      const raw: unknown = result.value;
      if (
        typeof raw !== 'object' ||
        raw === null ||
        !('type' in raw) ||
        !('data' in raw)
      ) {
        continue;
      }

      const { type, data } = raw as { type: string; data: unknown };

      if (type === 'message' && isMessageData(data)) {
        yield { type: 'message', data };
      } else if (type === 'group' && isGroupData(data)) {
        yield { type: 'group', data };
      } else if (type === 'search_result' && isSearchResultData(data)) {
        yield {
          type: 'search_result',
          data: {
            title: data.title,
            text: data.text,
            response: {
              results: data.response.results as AgentStreamResultItem[],
            },
          },
        };
      }
    }
  } finally {
    reader.releaseLock();
  }
}

function isMessageData(data: unknown): data is { text: string } {
  return (
    typeof data === 'object' &&
    data !== null &&
    'text' in data &&
    typeof (data as { text: unknown }).text === 'string'
  );
}

function isGroupData(
  data: unknown
): data is { title: string; description: string } {
  return (
    typeof data === 'object' &&
    data !== null &&
    'title' in data &&
    'description' in data &&
    typeof (data as { title: unknown }).title === 'string' &&
    typeof (data as { description: unknown }).description === 'string'
  );
}

interface SearchResultData {
  title?: string;
  text?: string;
  response: { results: unknown[] };
}

function isSearchResultData(data: unknown): data is SearchResultData {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;
  if (
    typeof obj.response !== 'object' ||
    obj.response === null ||
    !('results' in obj.response)
  ) {
    return false;
  }
  const resp = obj.response as { results: unknown };
  return Array.isArray(resp.results);
}
