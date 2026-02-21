import { renderHookServerSide } from '@spec/__tests__/utils.server';
import * as factories from '@spec/factory';

import useAgentOverview from '@src/app/hooks/useAgentOverview';

describe(`${useAgentOverview.name}: server`, () => {
  const props = factories.agentOverviewProps.build();

  it('should return the correct data', () => {
    const { result } = renderHookServerSide(() => useAgentOverview(props), {
      initialProps: props,
    });
    expect(result).toEqual({});
  });
});
