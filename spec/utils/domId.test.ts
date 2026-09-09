import domId from '@src/utils/domId';

describe('domId', () => {
  it('turns the title into a slug under the prefix', () => {
    expect(domId('cio-x', 'Relaxed Bottoms (Men)')).toBe(
      'cio-x-relaxed-bottoms-men'
    );
  });

  it('is stable across calls', () => {
    expect(domId('cio-x', 'Weekend Shorts')).toBe(
      domId('cio-x', 'Weekend Shorts')
    );
  });

  it('falls back when the title has no usable characters', () => {
    expect(domId('cio-x', '***')).toBe('cio-x-untitled');
  });
});
