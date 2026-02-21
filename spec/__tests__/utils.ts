import ConstructorIO from '@constructor-io/constructorio-client-javascript';

import { DEMO_API_KEY } from './constants';

class MockConstructorIO extends ConstructorIO {
  agent: ConstructorIO.Agent = {
    getAgentResultsStream: vi.fn(),
    options: {
      apiKey: DEMO_API_KEY,
    },
  };
}

export const mockConstructorIOClient =
  typeof window !== 'undefined'
    ? new MockConstructorIO({ apiKey: DEMO_API_KEY })
    : (undefined as unknown as ConstructorIO);
