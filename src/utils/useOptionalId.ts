import * as React from 'react';

const noId = () => undefined;

/**
 * React 18 `useId`: unique per mounted instance and identical on server and client.
 * React 16/17 have no hydration-safe equivalent, so the id is omitted there and the
 * attribute that would reference it is simply not rendered.
 */
const useOptionalId: () => string | undefined =
  (React as { useId?: () => string }).useId ?? noId;

export default useOptionalId;
