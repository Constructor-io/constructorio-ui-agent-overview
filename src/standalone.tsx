export {};

import React from 'react';

import ReactDOM from 'react-dom/client';

import CioAgentOverviewComponent from './app';
import type { IAgentOverviewProps } from './types';
import version from './version';

import './styles.css';

const instances = new Map<Element, ReactDOM.Root>();

/**
 * Options for initializing the standalone Agent Overview
 * Extends component props with initialization-specific options
 */
interface CioAgentOverviewOptions extends IAgentOverviewProps {
  /** CSS selector for the container element (required) */
  selector: string;
  /** Whether to include the injected CSS (default: true) */
  includeCSS?: boolean;
}

/**
 * Constructor.io Agent Overview - Standalone entry point

 * This object is exposed globally as `window.CioAgentOverview` when using the
 * standalone script via `<script>` tag.
 *
 * @example
 * ```html
 * <div id="agent"></div>
 * <script src="constructorio-ui-agent-overview.standalone.js"></script>
 * <script>
 *   CioAgentOverview.init({
 *     selector: '#agent',
 *     apiKey: 'your-api-key',
 *     domain: 'agent-123',
 *     includeCSS: true
 *   });
 * </script>
 * ```
 */
const CioAgentOverview = {
  /**
   * Version of the library (injected from package.json at build time)
   */
  VERSION: version || '0.1.0',

  /**
   * Initialize the Agent Overview component
   *
   * @param options - Configuration options
   * @param options.selector - CSS selector for the container element (required)
   * @param options.includeCSS - Whether to include the injected CSS (default: true)
   * @param options.apiKey - Your Constructor.io API key
   * @param options.domain - Domain of the agent to query
   * @returns The container element if successful, undefined otherwise
   *
   * @example
   * ```js
   * const container = CioAgentOverview.init({
   *   selector: '#agent',
   *   apiKey: 'abc123',
   *   domain: 'agent-456',
   *   includeCSS: true
   * });
   * ```
   */
  init({
    selector,
    includeCSS = true,
    ...componentProps
  }: CioAgentOverviewOptions): Element | undefined {
    if (typeof document === 'undefined') {
      console.error(
        'CioAgentOverview.init() can only be called in browser environments'
      );
      return undefined;
    }

    const container = document.querySelector<HTMLElement>(selector);
    if (!container) {
      console.error(
        `CioAgentOverview.init(): No element found for selector "${selector}"`
      );
      return undefined;
    }

    this._handleStylesheet(includeCSS);

    const existingRoot = instances.get(container);
    if (existingRoot) {
      existingRoot.unmount();
      instances.delete(container);
    }

    try {
      const root = ReactDOM.createRoot(container);
      instances.set(container, root);

      root.render(
        <React.StrictMode>
          <CioAgentOverviewComponent {...componentProps} />
        </React.StrictMode>
      );

      return container;
    } catch (error) {
      console.error('CioAgentOverview.init(): Failed to render', error);
      return undefined;
    }
  },

  /**
   * Update an existing instance with new props
   *
   * @param options - Configuration options
   * @param options.selector - CSS selector of the container (required)
   * @param options.includeCSS - Whether to include the injected CSS
   * @param options.apiKey - Your Constructor.io API key
   * @param options.domain - Domain of the agent to query
   *
   * @example
   * ```js
   * CioAgentOverview.update({
   *   selector: '#agent',
   * });
   * ```
   */
  update({
    selector,
    includeCSS,
    ...componentProps
  }: CioAgentOverviewOptions): void {
    if (typeof document === 'undefined') return;

    const container = document.querySelector<HTMLElement>(selector);
    if (!container) {
      console.error(
        `CioAgentOverview.update(): No element found for selector "${selector}"`
      );
      return;
    }

    if (includeCSS !== undefined) {
      this._handleStylesheet(includeCSS);
    }

    const root = instances.get(container);
    if (!root) {
      console.warn(
        `CioAgentOverview.update(): No instance found for selector "${selector}". Call init() first.`
      );
      return;
    }

    root.render(
      <React.StrictMode>
        <CioAgentOverviewComponent {...componentProps} />
      </React.StrictMode>
    );
  },

  /**
   * Destroy an instance
   *
   * @param selector - CSS selector of the container to destroy.
   *                   If not provided, destroys all instances.
   *
   * @example
   * ```js
   * // Destroy specific instance
   * CioAgentOverview.destroy('#agent');
   *
   * // Destroy all instances
   * CioAgentOverview.destroy();
   * ```
   */
  destroy(selector?: string): void {
    if (typeof document === 'undefined') return;

    if (selector) {
      const container = document.querySelector<HTMLElement>(selector);
      if (container) {
        const root = instances.get(container);
        if (root) {
          root.unmount();
          instances.delete(container);
        }
      }
    } else {
      instances.forEach((root) => {
        root.unmount();
      });
      instances.clear();
    }
  },

  /**
   * Internal: Handle stylesheet injection/removal
   *
   * @param includeCSS - Whether the CSS should be enabled
   * @internal
   */
  _handleStylesheet(includeCSS: boolean): void {
    const styleId = 'cio-agent-overview-styles';
    const stylesheet = document.getElementById(
      styleId
    ) as HTMLStyleElement | null;

    if (includeCSS) {
      if (stylesheet) {
        stylesheet.disabled = false;
      }
    } else {
      if (stylesheet) {
        stylesheet.disabled = true;
      }
    }
  },
};

export default CioAgentOverview;
