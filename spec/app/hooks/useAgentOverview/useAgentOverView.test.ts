import { renderHook } from '@testing-library/react';

import * as factories from '@spec/factory';

import useAgentOverview from '@src/app/hooks/useAgentOverview';

describe(`${useAgentOverview.name}: client`, () => {
  const props = factories.agentOverviewProps.build();
  it('should return the correct data', () => {
    const { result } = renderHook(() => useAgentOverview(props));
    expect(result.current).toEqual({
      text: 'This is the useAgentOverview hook.',
    });
  });
});
