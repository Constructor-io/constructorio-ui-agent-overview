import type { CioAgentOverviewTheme, IAgentOverviewProps } from '../types';

import CategorySection from './components/CategorySection/CategorySection';
import RecommendationSection from './components/RecommendationSection/RecommendationSection';
import Skeleton from './components/Skeleton/Skeleton';
import useAgentOverview from './hooks/useAgentOverview';
import ErrorIconSVG from './ErrorIconSVG';

import '../styles.css';
import './index.css';

const themePropToCssVar: Record<keyof CioAgentOverviewTheme, string> = {
  primaryColor: '--cio-color-primary',
  secondaryColor: '--cio-color-secondary',
  background: '--cio-color-background',
  fontSizeBase: '--cio-font-size-base',
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
  const { callbacks } = props;

  const themeStyles = buildThemeStyles(props.theme);

  return (
    <div className="cio-agent-overview-root" style={themeStyles}>
      {isLoading && categories.length === 0 && sections.length === 0 && (
        <Skeleton />
      )}
      {error && categories.length === 0 && sections.length === 0 && (
        <div className="cio-agent-overview__error">
          <div className="cio-agent-overview__error__icon" aria-hidden="true">
            <ErrorIconSVG />
          </div>
          <p className="cio-agent-overview__error__message">
            Something went wrong. Please try again.
          </p>
        </div>
      )}
      {phase === 'categories' && categories.length > 0 && (
        <CategorySection
          description={categoryDescription}
          categories={categories}
          onCategoryClick={(category) => {
            callbacks?.onCategoryClick?.(category);
            selectCategory(category);
          }}
          onViewSuggestions={() => {
            selectCategory(categories[0]);
          }}
        />
      )}
      {phase === 'products' && isLoading && <Skeleton />}
      {phase === 'products' &&
        sections.map((section) => (
          <RecommendationSection
            key={section.title}
            section={section}
            onProductClick={
              callbacks?.onProductClick
                ? (product) => callbacks.onProductClick?.(product, section)
                : undefined
            }
          />
        ))}
    </div>
  );
}
