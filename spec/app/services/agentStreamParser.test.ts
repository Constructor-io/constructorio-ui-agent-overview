import { parseAgentStream } from '@src/app/services/agentStreamParser';

function createStream(chunks: unknown[]): ReadableStream<unknown> {
  return new ReadableStream({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(chunk);
      }
      controller.close();
    },
  });
}

async function collectEvents(stream: ReadableStream<unknown>) {
  const events = [];
  for await (const event of parseAgentStream(stream)) {
    events.push(event);
  }
  return events;
}

describe('parseAgentStream', () => {
  it('should yield message events', async () => {
    const stream = createStream([{ type: 'message', data: { text: 'hello' } }]);
    const events = await collectEvents(stream);
    expect(events).toEqual([{ type: 'message', data: { text: 'hello' } }]);
  });

  it('should yield group events', async () => {
    const stream = createStream([
      {
        type: 'group',
        data: { title: 'Group 1', description: 'Description 1' },
      },
    ]);
    const events = await collectEvents(stream);
    expect(events).toEqual([
      {
        type: 'group',
        data: { title: 'Group 1', description: 'Description 1' },
      },
    ]);
  });

  it('should yield search_result events', async () => {
    const stream = createStream([
      {
        type: 'search_result',
        data: {
          title: 'Results',
          response: {
            results: [
              { value: 'Shoe', data: { image_url: 'img.jpg', price: 99 } },
            ],
          },
        },
      },
    ]);
    const events = await collectEvents(stream);
    expect(events).toHaveLength(1);
    expect(events[0].type).toBe('search_result');
  });

  it('should skip chunks without type or data', async () => {
    const stream = createStream([
      { noType: true },
      'string',
      42,
      { type: 'message', data: { text: 'valid' } },
    ]);
    const events = await collectEvents(stream);
    expect(events).toHaveLength(1);
    expect(events[0].type).toBe('message');
  });

  it('should skip unrecognized event types', async () => {
    const stream = createStream([
      { type: 'unknown_type', data: { foo: 'bar' } },
      { type: 'message', data: { text: 'valid' } },
    ]);
    const events = await collectEvents(stream);
    expect(events).toHaveLength(1);
  });

  it('should handle empty stream', async () => {
    const stream = createStream([]);
    const events = await collectEvents(stream);
    expect(events).toEqual([]);
  });

  it('should handle multiple events in sequence', async () => {
    const stream = createStream([
      {
        type: 'group',
        data: { title: 'Group', description: 'Desc' },
      },
      { type: 'message', data: { text: 'hello' } },
      {
        type: 'search_result',
        data: {
          title: 'Results',
          response: { results: [] },
        },
      },
    ]);
    const events = await collectEvents(stream);
    expect(events).toHaveLength(3);
    expect(events.map((e) => e.type)).toEqual([
      'group',
      'message',
      'search_result',
    ]);
  });

  it('should skip message events with non-string text', async () => {
    const stream = createStream([{ type: 'message', data: { text: 123 } }]);
    const events = await collectEvents(stream);
    expect(events).toHaveLength(0);
  });

  it('should skip group events with missing fields', async () => {
    const stream = createStream([
      { type: 'group', data: { title: 'Only title' } },
    ]);
    const events = await collectEvents(stream);
    expect(events).toHaveLength(0);
  });
});
