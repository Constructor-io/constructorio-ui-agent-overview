import type { Translations } from '../types';

const defaultTranslations: Translations = {
  'CioAgentOverview.section.aiBadge': 'Generated with AI',
  'CioAgentOverview.categories.viewSuggestions': 'View suggestions',
  'CioAgentOverview.section.viewMore': 'View More',
  'CioAgentOverview.skeleton.thinking': 'Thinking',
  'CioAgentOverview.skeleton.loading': 'Loading recommendations',
  'CioAgentOverview.error.message': 'Something went wrong. Please try again.',
};

export default function translate(
  word: string,
  translations?: Translations
): string {
  if (translations?.[word as keyof Translations] !== undefined) {
    return translations[word as keyof Translations] as string;
  }

  return (defaultTranslations[word as keyof Translations] as string) || word;
}
