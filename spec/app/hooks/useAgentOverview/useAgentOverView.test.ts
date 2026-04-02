import { act, renderHook } from '@testing-library/react';

import * as factories from '@spec/factory';

import useAgentOverview from '@src/app/hooks/useAgentOverview';

function createFakeCategoryStream(): ReadableStream<unknown> {
  return new ReadableStream({
    start(controller) {
      controller.enqueue({
        type: 'message',
        data: { text: 'Here are some categories for you.' },
      });
      controller.enqueue({
        type: 'search_result',
        data: {
          title: 'Running Shoes',
          response: {
            results: [
              {
                value: 'Running Shoes',
                data: {
                  image_url: 'https://example.com/run.jpg',
                  url: '',
                  price: 0,
                },
              },
            ],
          },
        },
      });
      controller.close();
    },
  });
}

function createFakeProductStream(): ReadableStream<unknown> {
  return new ReadableStream({
    start(controller) {
      controller.enqueue({
        type: 'group',
        data: { title: 'Top Picks', description: 'Best products' },
      });
      controller.enqueue({
        type: 'search_result',
        data: {
          title: '',
          response: {
            results: [
              {
                value: 'Shoe A',
                data: {
                  image_url: 'https://example.com/a.jpg',
                  url: '/a',
                  price: 100,
                },
              },
            ],
          },
        },
      });
      controller.close();
    },
  });
}

vi.mock('@src/app/services/agentOverviewClient', () => ({
  createAgentStream: vi.fn(
    (_options: unknown, _intent: string, domain: string) => {
      if (domain === 'searchbar_agent') {
        return createFakeCategoryStream();
      }
      return createFakeProductStream();
    }
  ),
}));

describe(`${useAgentOverview.name}: client`, () => {
  const props = factories.agentOverviewProps.build();

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return initial state with categories phase', async () => {
    const { result } = renderHook(() => useAgentOverview(props));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1100);
    });

    expect(result.current.phase).toBe('categories');
    expect(result.current.sections).toEqual([]);
  });

  it('should load categories from stream', async () => {
    const { result } = renderHook(() => useAgentOverview(props));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1100);
    });

    expect(result.current.phase).toBe('categories');
    expect(result.current.categories.length).toBeGreaterThan(0);
    expect(result.current.categoryDescription).toBeTruthy();
    expect(result.current.isLoading).toBe(false);
  });

  it('should show skeleton for at least 1 second', async () => {
    const { result } = renderHook(() => useAgentOverview(props));

    // Before 1s, should still be loading
    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.categories).toEqual([]);

    // After 1s, categories should appear
    await act(async () => {
      await vi.advanceTimersByTimeAsync(600);
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.categories.length).toBeGreaterThan(0);
  });

  it('should transition to products phase on selectCategory', async () => {
    const { result } = renderHook(() => useAgentOverview(props));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1100);
    });

    const category = result.current.categories[0];
    act(() => {
      result.current.selectCategory(category);
    });

    // Advance timers to let the polling interval resolve
    await act(async () => {
      await vi.advanceTimersByTimeAsync(200);
    });

    expect(result.current.phase).toBe('products');
  });
});
