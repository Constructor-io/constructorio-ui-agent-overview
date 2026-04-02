# Constructor AI Agent Overview UI library

[![NPM Version](https://img.shields.io/npm/v/@constructor-io/constructorio-ui-agent-overview)](https://www.npmjs.com/package/@constructor-io/constructorio-ui-agent-overview)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Constructor-io/constructorio-ui-agent-overview/blob/main/LICENSE)

## Introduction

AI Agent Overview streams AI-generated product recommendation sections in real time, presenting category suggestions followed by detailed product results.

Our [Storybook Docs](https://constructor-io.github.io/constructorio-ui-agent-overview) are the best place to explore the behavior and the available configuration options for this UI library.

## Installation

```bash
npm i @constructor-io/constructorio-ui-agent-overview
```

## Usage

### Using the JavaScript Bundle

This is a framework agnostic method that can be used in any JavaScript project. The `CioAgentOverview` function provides a simple interface to inject the Agent Overview component into the provided `selector`.

```js
import CioAgentOverview from '@constructor-io/constructorio-ui-agent-overview/constructorio-ui-agent-overview-standalone';

CioAgentOverview.init({
  selector: '#agent-overview',
  includeCSS: true, // Include the default CSS styles - defaults to true
  apiKey: 'your-api-key',
  intent: 'I want to buy shoes',
  domains: {
    suggestions: 'searchbar',
    results: 'explorer',
  },
});
```

### Using the React Hook

For full control over rendering, use the `useAgentOverview` hook directly.

```jsx
import { useAgentOverview, RecommendationSection } from '@constructor-io/constructorio-ui-agent-overview';
import '@constructor-io/constructorio-ui-agent-overview/styles.css';

function MyAgentOverview() {
  const {
    phase,
    categories,
    categoryDescription,
    sections,
    selectCategory,
    isLoading,
    error,
  } = useAgentOverview({
    apiKey: 'your-api-key',
    intent: 'I want to buy shoes',
    domains: { suggestions: 'searchbar', results: 'explorer' },
  });

  if (error) return <p>{error}</p>;

  if (phase === 'categories') {
    return (
      <div>
        <p>{categoryDescription}</p>
        {categories.map((category) => (
          <button key={category.title} onClick={() => selectCategory(category)}>
            {category.title}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {sections.map((section) => (
        <RecommendationSection key={section.title} section={section} />
      ))}
    </div>
  );
}
```

## Requirements

- React >=16.12.0
- React DOM >=16.12.0

## License

MIT © Constructor.io
