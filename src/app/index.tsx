import type {
  CioAgentOverviewTheme,
  IAgentOverviewProps,
  IProduct,
} from '../types';
import translate from '../utils/translate';

import CategorySection from './components/CategorySection/CategorySection';
import ErrorIconSVG from './components/icons/ErrorIconSVG';
import RecommendationSection from './components/RecommendationSection/RecommendationSection';
import Skeleton from './components/Skeleton/Skeleton';
import useAgentOverview from './hooks/useAgentOverview';

import '../styles.css';
import './index.css';

const themePropToCssVar: Record<keyof CioAgentOverviewTheme, string> = {
  /* Typography */
  fontFamily: '--cio-font-family',
  fontSizeXs: '--cio-font-size-xs',
  fontSizeSm: '--cio-font-size-sm',
  fontSizeBase: '--cio-font-size-base',
  fontSizeLg: '--cio-font-size-lg',
  lineHeight: '--cio-line-height',
  fontWeightNormal: '--cio-font-weight-normal',
  fontWeightMedium: '--cio-font-weight-medium',
  fontWeightSemibold: '--cio-font-weight-semibold',
  fontWeightBold: '--cio-font-weight-bold',

  /* Colors */
  primaryColor: '--cio-color-primary',
  secondaryColor: '--cio-color-secondary',
  mutedColor: '--cio-color-muted',
  subtleColor: '--cio-color-subtle',
  productNameColor: '--cio-color-product-name',
  borderColor: '--cio-color-border',
  background: '--cio-color-background',
  backgroundMuted: '--cio-color-background-muted',
  hoverAccentColor: '--cio-color-hover-accent',

  /* Carousel arrows */
  arrowSize: '--cio-arrow-size',
  arrowBorderRadius: '--cio-arrow-border-radius',
  arrowBorderColor: '--cio-arrow-border-color',
  arrowBorderColorHover: '--cio-arrow-border-color-hover',
  arrowColor: '--cio-arrow-color',
  arrowShadow: '--cio-arrow-shadow',
  arrowShadowHover: '--cio-arrow-shadow-hover',

  /* Spacing */
  spacingXs: '--cio-spacing-xs',
  spacingSm: '--cio-spacing-sm',
  spacingMd: '--cio-spacing-md',
  spacingLg: '--cio-spacing-lg',
  spacingXl: '--cio-spacing-xl',
  spacing2xl: '--cio-spacing-2xl',
};

function sanitizeCssValue(value: string): string {
  return value
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, 'blocked:')
    .trim();
}

function buildThemeStyles(
  theme: CioAgentOverviewTheme | undefined
): React.CSSProperties {
  if (!theme) return {};

  const styles: Record<string, string> = {};
  for (const [key, value] of Object.entries(theme)) {
    if (value !== undefined) {
      const varName = themePropToCssVar[key as keyof CioAgentOverviewTheme];
      if (varName) {
        styles[varName] = sanitizeCssValue(String(value));
      }
    }
  }
  return styles as React.CSSProperties;
}

export default function CioAgentOverview(props: IAgentOverviewProps) {
  const {
    phase,
    categories,
    categoryDescription,
    sections,
    selectCategory,
    isLoading,
    error,
  } = useAgentOverview(props);
  const { callbacks, translations } = props;

  const themeStyles = buildThemeStyles(props.theme);

  return (
    <div className="cio-agent-overview-root" style={themeStyles}>
      {isLoading && categories.length === 0 && sections.length === 0 && (
        <Skeleton
          rows={1}
          showTitle={false}
          cards={4}
          translations={translations}
        />
      )}
      {error && categories.length === 0 && sections.length === 0 && (
        <div className="cio-agent-overview-error">
          <div className="cio-agent-overview-error-icon" aria-hidden="true">
            <ErrorIconSVG />
          </div>
          <p className="cio-agent-overview-error-message">
            {translate('CioAgentOverview.error.message', translations)}
          </p>
        </div>
      )}
      {phase === 'categories' && categories.length > 0 && (
        <CategorySection
          description={categoryDescription}
          categories={categories}
          translations={translations}
          onCategoryClick={(category) => {
            callbacks?.onCategoryClick?.(category);
            selectCategory(category);
          }}
          onViewSuggestions={() => {
            selectCategory(categories[0]);
          }}
        />
      )}
      {phase === 'products' && isLoading && (
        <Skeleton translations={translations} />
      )}
      {phase === 'products' &&
        !isLoading &&
        sections.map((section) => {
          const sectionWithUrl = callbacks?.getViewMoreUrl
            ? { ...section, viewMoreUrl: callbacks.getViewMoreUrl(section) }
            : section;

          return (
            <RecommendationSection
              key={section.title}
              section={sectionWithUrl}
              translations={translations}
              getProductUrl={callbacks?.getProductUrl}
              onProductClick={
                callbacks?.onProductClick
                  ? (event: React.MouseEvent, product: IProduct) =>
                      callbacks.onProductClick!(event, product, section)
                  : undefined
              }
            />
          );
        })}
    </div>
  );
}
