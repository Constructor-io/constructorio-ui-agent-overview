import translate from '@src/utils/translate';

describe('translate', () => {
  it('returns default translation for known keys', () => {
    expect(translate('CioAgentOverview.section.aiBadge')).toBe(
      'Generated with AI'
    );
    expect(translate('CioAgentOverview.section.viewMore')).toBe('View More');
    expect(translate('CioAgentOverview.skeleton.thinking')).toBe('Thinking');
    expect(translate('CioAgentOverview.error.message')).toBe(
      'Something went wrong. Please try again.'
    );
  });

  it('returns custom translation when override is provided', () => {
    const translations = {
      'CioAgentOverview.section.aiBadge': 'Custom AI Badge',
    } as const;

    expect(translate('CioAgentOverview.section.aiBadge', translations)).toBe(
      'Custom AI Badge'
    );
  });

  it('falls back to default when override does not include the key', () => {
    const translations = {
      'CioAgentOverview.section.aiBadge': 'Custom badge',
    } as const;

    expect(translate('CioAgentOverview.section.viewMore', translations)).toBe(
      'View More'
    );
  });

  it('returns the key itself for unknown keys not in defaults', () => {
    expect(translate('some.unknown.key')).toBe('some.unknown.key');
  });

  it('returns default when translations argument is undefined', () => {
    expect(translate('CioAgentOverview.section.aiBadge', undefined)).toBe(
      'Generated with AI'
    );
  });

  it('prefers custom translation over default', () => {
    const translations = {
      'CioAgentOverview.categories.viewSuggestions': 'Show Suggestions',
    } as const;

    expect(
      translate('CioAgentOverview.categories.viewSuggestions', translations)
    ).toBe('Show Suggestions');
  });
});
