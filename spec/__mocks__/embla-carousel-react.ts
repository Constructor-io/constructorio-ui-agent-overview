const useEmblaCarousel: unknown = vi.fn(() => [
  vi.fn(),
  {
    canScrollPrev: vi.fn(() => true),
    canScrollNext: vi.fn(() => true),
    scrollPrev: vi.fn(),
    scrollNext: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
    rootNode: vi.fn(() => null),
    slideNodes: vi.fn(() => []),
  },
]);

export default useEmblaCarousel;
