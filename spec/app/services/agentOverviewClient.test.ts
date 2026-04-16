import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';

import { createAgentStream } from '@src/app/services/agentOverviewClient';

vi.mock('@constructor-io/constructorio-client-javascript', () => ({
  default: vi.fn(),
}));

const MockedClient = vi.mocked(ConstructorIOClient);

describe('createAgentStream', () => {
  afterEach(() => {
    MockedClient.mockReset();
  });

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
    // Constructor should NOT be called when cioJsClient is provided
    expect(MockedClient).not.toHaveBeenCalled();
  });

  it('should create a new client when apiKey is provided', () => {
    const mockStream = new ReadableStream();
    const mockGetStream = vi.fn().mockReturnValue(mockStream);

    MockedClient.mockImplementation(function (this: unknown) {
      (this as Record<string, unknown>).agent = {
        getAgentResultsStream: mockGetStream,
      };
      return this as never;
    } as never);

    const result = createAgentStream(
      { apiKey: 'test-key' },
      'buy shoes',
      'my-domain'
    );

    expect(MockedClient).toHaveBeenCalledWith(
      expect.objectContaining({
        apiKey: 'test-key',
        sendTrackingEvents: true,
      })
    );
    expect(mockGetStream).toHaveBeenCalledWith('buy shoes', {
      domain: 'my-domain',
    });
    expect(result).toBe(mockStream);
  });

  it('should prefer cioJsClient over apiKey when both are provided', () => {
    const mockStream = new ReadableStream();
    const mockClient = {
      agent: {
        getAgentResultsStream: vi.fn().mockReturnValue(mockStream),
      },
    };

    const result = createAgentStream(
      { apiKey: 'test-key', cioJsClient: mockClient as never },
      'buy shoes',
      'example.com'
    );

    expect(mockClient.agent.getAgentResultsStream).toHaveBeenCalledWith(
      'buy shoes',
      { domain: 'example.com' }
    );
    expect(result).toBe(mockStream);
    expect(MockedClient).not.toHaveBeenCalled();
  });
});
