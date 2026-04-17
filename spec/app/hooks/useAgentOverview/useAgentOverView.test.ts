import { act, renderHook } from '@testing-library/react';

import * as factories from '@spec/factory';

import useAgentOverview from '@src/app/hooks/useAgentOverview';
import { createAgentStream } from '@src/app/services/agentOverviewClient';

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

const mockedCreateAgentStream = vi.mocked(createAgentStream);

describe(`${useAgentOverview.name}: client`, () => {
  const props = factories.agentOverviewProps.build();

  beforeEach(() => {
    vi.useFakeTimers();
    mockedCreateAgentStream.mockImplementation(
      (_options: unknown, _intent: string, domain: string) => {
        if (domain === 'searchbar_agent') {
          return createFakeCategoryStream();
        }
        return createFakeProductStream();
      }
    );
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
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

  it('should populate sections with products after selecting a category', async () => {
    const { result } = renderHook(() => useAgentOverview(props));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1100);
    });

    act(() => {
      result.current.selectCategory(result.current.categories[0]);
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(200);
    });

    expect(result.current.sections.length).toBeGreaterThan(0);
    expect(result.current.sections[0].title).toBe('Top Picks');
    expect(result.current.sections[0].products).toHaveLength(1);
    expect(result.current.sections[0].products[0].itemName).toBe('Shoe A');
  });

  describe('error handling', () => {
    it('should set error when category stream fails', async () => {
      mockedCreateAgentStream.mockImplementation(
        (_options: unknown, _intent: string, domain: string) => {
          if (domain === 'searchbar_agent') {
            throw new Error('Category stream failed');
          }
          return createFakeProductStream();
        }
      );

      const { result } = renderHook(() => useAgentOverview(props));

      await act(async () => {
        await vi.advanceTimersByTimeAsync(1100);
      });

      expect(result.current.error).toBe('Category stream failed');
      expect(result.current.categories).toEqual([]);
    });

    it('should set error when product stream fails after category selection', async () => {
      mockedCreateAgentStream.mockImplementation(
        (_options: unknown, _intent: string, domain: string) => {
          if (domain === 'searchbar_agent') {
            return createFakeCategoryStream();
          }
          throw new Error('Product stream failed');
        }
      );

      const { result } = renderHook(() => useAgentOverview(props));

      await act(async () => {
        await vi.advanceTimersByTimeAsync(1100);
      });

      expect(result.current.categories.length).toBeGreaterThan(0);

      act(() => {
        result.current.selectCategory(result.current.categories[0]);
      });

      await act(async () => {
        await vi.advanceTimersByTimeAsync(200);
      });

      expect(result.current.error).toBe('Product stream failed');
    });

    it('should set fallback error message for non-Error exceptions in categories', async () => {
      mockedCreateAgentStream.mockImplementation(
        (_options: unknown, _intent: string, domain: string) => {
          if (domain === 'searchbar_agent') {
            // eslint-disable-next-line @typescript-eslint/only-throw-error
            throw 'string error';
          }
          return createFakeProductStream();
        }
      );

      const { result } = renderHook(() => useAgentOverview(props));

      await act(async () => {
        await vi.advanceTimersByTimeAsync(1100);
      });

      expect(result.current.error).toBe('Failed to load categories');
    });
  });

  describe('cleanup on unmount', () => {
    it('should not update state after unmount', async () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const { unmount } = renderHook(() => useAgentOverview(props));

      // Unmount before streams finish
      unmount();

      // Advance time past the minimum delay
      await act(async () => {
        await vi.advanceTimersByTimeAsync(1500);
      });

      // No React "state update on unmounted component" warnings
      expect(consoleErrorSpy).not.toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });

  describe('null filtering', () => {
    it('should filter out categories with missing imageUrl', async () => {
      mockedCreateAgentStream.mockImplementation(
        (_options: unknown, _intent: string, domain: string) => {
          if (domain === 'searchbar_agent') {
            return new ReadableStream({
              start(controller) {
                controller.enqueue({
                  type: 'search_result',
                  data: {
                    title: 'Valid Category',
                    response: {
                      results: [
                        {
                          value: 'Valid',
                          data: { image_url: 'https://example.com/valid.jpg' },
                        },
                      ],
                    },
                  },
                });
                controller.enqueue({
                  type: 'search_result',
                  data: {
                    title: 'No Image',
                    response: {
                      results: [{ value: 'No Image', data: {} }],
                    },
                  },
                });
                controller.enqueue({
                  type: 'search_result',
                  data: {
                    title: '',
                    response: {
                      results: [
                        {
                          value: 'Missing Title',
                          data: { image_url: 'https://example.com/img.jpg' },
                        },
                      ],
                    },
                  },
                });
                controller.close();
              },
            });
          }
          return createFakeProductStream();
        }
      );

      const { result } = renderHook(() => useAgentOverview(props));

      await act(async () => {
        await vi.advanceTimersByTimeAsync(1100);
      });

      expect(result.current.categories).toHaveLength(1);
      expect(result.current.categories[0].title).toBe('Valid Category');
    });

    it('should filter out products with missing value or imageUrl', async () => {
      mockedCreateAgentStream.mockImplementation(
        (_options: unknown, _intent: string, domain: string) => {
          if (domain === 'searchbar_agent') {
            return createFakeCategoryStream();
          }
          return new ReadableStream({
            start(controller) {
              controller.enqueue({
                type: 'group',
                data: { title: 'Mixed', description: 'Some valid, some not' },
              });
              controller.enqueue({
                type: 'search_result',
                data: {
                  title: '',
                  response: {
                    results: [
                      {
                        value: 'Good Product',
                        data: {
                          image_url: 'https://example.com/good.jpg',
                          url: '/good',
                          price: 50,
                        },
                      },
                      {
                        value: '',
                        data: {
                          image_url: 'https://example.com/no-name.jpg',
                          url: '/no-name',
                          price: 30,
                        },
                      },
                      {
                        value: 'No Image',
                        data: { image_url: '', url: '/no-img', price: 20 },
                      },
                    ],
                  },
                },
              });
              controller.close();
            },
          });
        }
      );

      const { result } = renderHook(() => useAgentOverview(props));

      await act(async () => {
        await vi.advanceTimersByTimeAsync(1100);
      });

      act(() => {
        result.current.selectCategory(result.current.categories[0]);
      });

      await act(async () => {
        await vi.advanceTimersByTimeAsync(200);
      });

      expect(result.current.sections).toHaveLength(1);
      expect(result.current.sections[0].products).toHaveLength(1);
      expect(result.current.sections[0].products[0].itemName).toBe(
        'Good Product'
      );
    });
  });

  describe('skip fetching', () => {
    it('should not fetch when intent is empty', async () => {
      mockedCreateAgentStream.mockClear();
      const emptyProps = factories.agentOverviewProps.build({ intent: '' });
      const { result } = renderHook(() => useAgentOverview(emptyProps));

      await act(async () => {
        await vi.advanceTimersByTimeAsync(1100);
      });

      expect(result.current.categories).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(mockedCreateAgentStream).not.toHaveBeenCalled();
    });
  });
});
