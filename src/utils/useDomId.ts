import * as React from 'react';

let counter = 0;

/** Fallback for React 16/17, which have no `useId`. Ids differ between server and client there. */
export function useCounterId(): string {
  const [id] = React.useState(() => {
    counter += 1;
    return `${counter}`;
  });
  return id;
}

const useReactId: () => string =
  (React as { useId?: () => string }).useId ?? useCounterId;

/**
 * Per-instance DOM id for `aria-labelledby` / `aria-describedby`. Unique across
 * mounted widgets, unlike an id derived from content such as a section title.
 */
export default function useDomId(suffix: string): string {
  const base = useReactId().replace(/[^a-zA-Z0-9-]/g, '');
  return `cio-agent-overview-${base}-${suffix}`;
}
