import { act } from '@testing-library/react';

import CioAgentOverview from '@src/standalone';

// Mock the underlying React component so we don't need stream infrastructure
vi.mock('@src/app', () => ({
  default: (props: Record<string, unknown>) => (
    <div data-testid="mock-agent-overview" data-intent={props.intent} />
  ),
}));

describe('CioAgentOverview standalone', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'agent-root';
    document.body.appendChild(container);
  });

  afterEach(() => {
    act(() => {
      CioAgentOverview.destroy();
    });
    document.body.innerHTML = '';
  });

  it('has a VERSION property', () => {
    expect(CioAgentOverview.VERSION).toBeDefined();
    expect(typeof CioAgentOverview.VERSION).toBe('string');
  });

  describe('init', () => {
    it('renders into the selected container and returns the element', () => {
      let result: Element | undefined;
      act(() => {
        result = CioAgentOverview.init({
          selector: '#agent-root',
          apiKey: 'test-key',
          intent: 'buy shoes',
          domains: { suggestions: 'suggest', results: 'results' },
        });
      });

      expect(result).toBe(container);
      // eslint-disable-next-line testing-library/no-node-access
      expect(container.querySelector('[data-testid]')).toBeTruthy();
    });

    it('returns undefined when selector does not match any element', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const result = CioAgentOverview.init({
        selector: '#nonexistent',
        apiKey: 'test-key',
        intent: 'buy shoes',
        domains: { suggestions: 'suggest', results: 'results' },
      });

      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('#nonexistent')
      );

      consoleSpy.mockRestore();
    });

    it('unmounts previous instance when reinitializing same container', () => {
      act(() => {
        CioAgentOverview.init({
          selector: '#agent-root',
          apiKey: 'test-key',
          intent: 'first intent',
          domains: { suggestions: 'suggest', results: 'results' },
        });
      });

      let result: Element | undefined;
      act(() => {
        result = CioAgentOverview.init({
          selector: '#agent-root',
          apiKey: 'test-key',
          intent: 'second intent',
          domains: { suggestions: 'suggest', results: 'results' },
        });
      });

      expect(result).toBe(container);
    });

    it('handles includeCSS option without errors', () => {
      expect(() =>
        act(() => {
          CioAgentOverview.init({
            selector: '#agent-root',
            apiKey: 'test-key',
            intent: 'buy shoes',
            domains: { suggestions: 'suggest', results: 'results' },
            includeCSS: false,
          });
        })
      ).not.toThrow();
    });
  });

  describe('update', () => {
    it('updates an existing instance with new props', () => {
      act(() => {
        CioAgentOverview.init({
          selector: '#agent-root',
          apiKey: 'test-key',
          intent: 'buy shoes',
          domains: { suggestions: 'suggest', results: 'results' },
        });
      });

      expect(() =>
        act(() => {
          CioAgentOverview.update('#agent-root', { intent: 'buy pants' });
        })
      ).not.toThrow();
    });

    it('logs warning when updating non-existent instance', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      CioAgentOverview.update('#agent-root', { intent: 'buy pants' });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('#agent-root')
      );

      consoleSpy.mockRestore();
    });

    it('logs error when selector does not match any element', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      CioAgentOverview.update('#nonexistent', { intent: 'buy pants' });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('#nonexistent')
      );

      consoleSpy.mockRestore();
    });
  });

  describe('destroy', () => {
    it('destroys a specific instance by selector', () => {
      act(() => {
        CioAgentOverview.init({
          selector: '#agent-root',
          apiKey: 'test-key',
          intent: 'buy shoes',
          domains: { suggestions: 'suggest', results: 'results' },
        });
      });

      act(() => {
        CioAgentOverview.destroy('#agent-root');
      });

      // Updating after destroy should warn (no instance)
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      CioAgentOverview.update('#agent-root', { intent: 'buy pants' });
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('destroys all instances when called without selector', () => {
      // Create a second container
      const container2 = document.createElement('div');
      container2.id = 'agent-root-2';
      document.body.appendChild(container2);

      act(() => {
        CioAgentOverview.init({
          selector: '#agent-root',
          apiKey: 'test-key',
          intent: 'buy shoes',
          domains: { suggestions: 'suggest', results: 'results' },
        });
      });

      act(() => {
        CioAgentOverview.init({
          selector: '#agent-root-2',
          apiKey: 'test-key',
          intent: 'buy pants',
          domains: { suggestions: 'suggest', results: 'results' },
        });
      });

      act(() => {
        CioAgentOverview.destroy();
      });

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      CioAgentOverview.update('#agent-root', { intent: 'new' });
      CioAgentOverview.update('#agent-root-2', { intent: 'new' });
      expect(consoleSpy).toHaveBeenCalledTimes(2);

      consoleSpy.mockRestore();
    });

    it('does nothing when destroying non-existent selector', () => {
      expect(() =>
        act(() => {
          CioAgentOverview.destroy('#nonexistent');
        })
      ).not.toThrow();
    });
  });
});
