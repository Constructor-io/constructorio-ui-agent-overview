import { createAgentStream } from '@src/app/services/agentOverviewClient';

describe('createAgentStream', () => {
  it('should throw if neither apiKey nor cioJsClient is provided', () => {
    expect(() => createAgentStream({}, 'intent', 'domain')).toThrow(
      'Either apiKey or cioJsClient must be provided'
    );
  });

  it('should use cioJsClient when provided', () => {
    const mockStream = new ReadableStream();
    const mockClient = {
      agent: {
        getAgentResultsStream: vi.fn().mockReturnValue(mockStream),
      },
    };

    const result = createAgentStream(
      { cioJsClient: mockClient as never },
      'buy shoes',
      'example.com'
    );

    expect(mockClient.agent.getAgentResultsStream).toHaveBeenCalledWith(
      'buy shoes',
      { domain: 'example.com' }
    );
    expect(result).toBe(mockStream);
  });
});
