import { renderHookServerSide } from '@spec/__tests__/utils.server';
import * as factories from '@spec/factory';

import useAgentOverview from '@src/app/hooks/useAgentOverview';

describe(`${useAgentOverview.name}: server`, () => {
  const props = factories.agentOverviewProps.build();

  it('should return initial state on server', () => {
    const { result } = renderHookServerSide(() => useAgentOverview(props), {
      initialProps: props,
    });
    expect(result).toEqual({
      phase: 'categories',
      categories: [],
      categoryDescription: '',
      sections: [],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      selectCategory: expect.any(Function),
      isLoading: false,
      error: null,
    });
  });
});
