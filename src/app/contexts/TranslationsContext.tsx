import { createContext, useContext, useMemo } from 'react';

import type { Translations } from '@src/types';
import translate, { translateLabel } from '@src/utils/translate';

const TranslationsContext = createContext<Translations | undefined>(undefined);

interface ITranslationsProviderProps {
  translations?: Translations;
  children: React.ReactNode;
}

/** Makes `translations` available to every component below it via `useTranslate()`. */
export function TranslationsProvider({
  translations,
  children,
}: ITranslationsProviderProps) {
  return (
    <TranslationsContext.Provider value={translations}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslate() {
  const translations = useContext(TranslationsContext);

  return useMemo(
    () => ({
      translate: (key: keyof Translations) => translate(key, translations),
      translateLabel: (key: keyof Translations) =>
        translateLabel(key, translations),
    }),
    [translations]
  );
}
