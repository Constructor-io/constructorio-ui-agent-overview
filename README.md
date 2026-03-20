# Constructor.io Agent Overview UI Library

[![npm](https://img.shields.io/npm/v/@constructor-io/constructorio-ui-agent-overview)](https://www.npmjs.com/package/@constructor-io/constructorio-ui-agent-overview)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Constructor-io/constructorio-ui-agent-overview/blob/main/LICENSE)

A UI Library that provides React components to manage the fetching and rendering logic for [Constructor.io's Agent Overview](https://constructor.io/).

## Introduction

Constructor.io's Agent Overview streams AI-generated product recommendation sections in real time. This UI library simplifies integration by providing React components and hooks that handle streaming, state management, and rendering. TypeScript support is available.

## Installation

```bash
npm i @constructor-io/constructorio-ui-agent-overview
```

## Usage

### Using the React Component

The `CioAgentOverview` component handles streaming, state management, and rendering for the entire agent overview experience.

```jsx
import CioAgentOverview from '@constructor-io/constructorio-ui-agent-overview';
import '@constructor-io/constructorio-ui-agent-overview/styles.css';

function YourComponent() {
  return (
    <CioAgentOverview
      apiKey='your-api-key'
      intent='your-intent'
      domain='your-domain'
    />
  );
}
```

### Using the Hook

For custom rendering, use the `useAgentOverview` hook directly:

```jsx
import { useAgentOverview } from '@constructor-io/constructorio-ui-agent-overview';

function YourComponent() {
  const { sections, isLoading, error } = useAgentOverview({
    apiKey: 'your-api-key',
    intent: 'your-intent',
    domain: 'your-domain',
  });

  if (error) return <div>Error: {error}</div>;
  if (isLoading && sections.length === 0) return <div>Loading...</div>;

  return (
    <div>
      {sections.map((section) => (
        <div key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          {section.products.map((product) => (
            <div key={product.url}>{product.itemName}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

### Using the Standalone Bundle

This is a framework-agnostic method that can be used in any JavaScript project.

```js
import CioAgentOverview from '@constructor-io/constructorio-ui-agent-overview/constructorio-ui-agent-overview-standalone';

CioAgentOverview.init({
  selector: '#agent-overview',
  apiKey: 'your-api-key',
  intent: 'your-intent',
  domain: 'your-domain',
  includeCSS: true, // Include the default CSS styles. Defaults to true.
});

// Update an existing instance
CioAgentOverview.update('#agent-overview', { domain: 'new-domain' });

// Destroy an instance
CioAgentOverview.destroy('#agent-overview');
```

## Custom Styling

### Library defaults

By default, importing React components from this library does not pull any CSS into your project.

If you wish to use the starter styles from this library, add an import statement:

```js
import '@constructor-io/constructorio-ui-agent-overview/styles.css';
```

- These starter styles can be used as a foundation to build on top of, or as a reference for you to replace completely.
- To opt out of all default styling, do not import the `styles.css` stylesheet.
- All starter styles in this library are scoped within the `.cio-agent-overview-root` CSS selector.
- These starter styles are intended to be extended by layering in your own CSS rules.

### Theme customization

You can customize the appearance by passing a `theme` prop to the component:

```jsx
<CioAgentOverview
  apiKey='your-api-key'
  intent='your-intent'
  domain='your-domain'
  theme={{
    primaryColor: '#1a73e8',
    secondaryColor: '#666',
    background: '#fff',
    fontSizeBase: '14px',
  }}
/>
```

## Local Development

### Development scripts

```bash
npm ci                  # install dependencies for local dev
npm run storybook       # start a local dev server for Storybook
npm run lint            # run linter
npm run test            # run tests
```

## Supporting Docs

- [Storybook 10 for React with Vite](https://storybook.js.org/docs/get-started/frameworks/react-vite/?renderer=react)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
