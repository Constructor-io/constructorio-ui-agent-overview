import type ConstructorIOClient from '@constructor-io/constructorio-client-javascript';

/** Theme customization for the Agent Overview component. All properties map to CSS custom properties. */
export interface CioAgentOverviewTheme {
  /* Typography */
  fontFamily?: React.CSSProperties['fontFamily'];
  fontSizeXs?: React.CSSProperties['fontSize'];
  fontSizeSm?: React.CSSProperties['fontSize'];
  fontSizeBase?: React.CSSProperties['fontSize'];
  fontSizeLg?: React.CSSProperties['fontSize'];
  lineHeight?: React.CSSProperties['lineHeight'];
  fontWeightNormal?: React.CSSProperties['fontWeight'];
  fontWeightMedium?: React.CSSProperties['fontWeight'];
  fontWeightSemibold?: React.CSSProperties['fontWeight'];
  fontWeightBold?: React.CSSProperties['fontWeight'];

  /* Colors */
  primaryColor?: React.CSSProperties['color'];
  secondaryColor?: React.CSSProperties['color'];
  mutedColor?: React.CSSProperties['color'];
  subtleColor?: React.CSSProperties['color'];
  productNameColor?: React.CSSProperties['color'];
  borderColor?: React.CSSProperties['color'];
  background?: React.CSSProperties['backgroundColor'];
  backgroundMuted?: React.CSSProperties['backgroundColor'];
  hoverAccentColor?: React.CSSProperties['color'];

  /* Carousel arrows */
  arrowSize?: React.CSSProperties['width'];
  arrowBorderRadius?: React.CSSProperties['borderRadius'];
  arrowBorderColor?: React.CSSProperties['color'];
  arrowBorderColorHover?: React.CSSProperties['color'];
  arrowColor?: React.CSSProperties['color'];
  arrowShadow?: React.CSSProperties['boxShadow'];
  arrowShadowHover?: React.CSSProperties['boxShadow'];

  /* Spacing */
  spacingXs?: React.CSSProperties['gap'];
  spacingSm?: React.CSSProperties['gap'];
  spacingMd?: React.CSSProperties['gap'];
  spacingLg?: React.CSSProperties['gap'];
  spacingXl?: React.CSSProperties['gap'];
  spacing2xl?: React.CSSProperties['gap'];
}

/** Callback functions for handling user interactions within the Agent Overview component. */
export interface IAgentOverviewCallbacks {
  /** Called when a user clicks on a product card within a recommendation section. */
  onProductClick?: (
    event: React.MouseEvent,
    product: IProduct,
    section: IRecommendationSection
  ) => void;
  /** Called when a user clicks on a category card. */
  onCategoryClick?: (category: ICategory) => void;
  /** Builds a URL for a product card link. If not provided, the product's default URL is used. */
  getProductUrl?: (product: IProduct) => string;
  /** Builds a "View more" URL from section data (e.g. group title). If not provided, the link is hidden. */
  getViewMoreUrl?: (section: IRecommendationSection) => string;
}

/**
 * Translations type for internationalizing UI strings.
 * All keys are optional — any non-provided translation will fall back to the English default.
 */
export type Translations = {
  'CioAgentOverview.section.aiBadge'?: string;
  'CioAgentOverview.categories.viewSuggestions'?: string;
  'CioAgentOverview.section.viewMore'?: string;
  'CioAgentOverview.skeleton.thinking'?: string;
  'CioAgentOverview.error.message'?: string;
};

/** Agent stream domain identifiers for fetching category suggestions and product results. */
export interface IAgentOverviewDomains {
  /** Domain used to fetch category suggestions. */
  suggestions: string;
  /** Domain used to fetch product results. */
  results: string;
}

/** Props for the CioAgentOverview component and useAgentOverview hook. */
export interface IAgentOverviewProps {
  /** Constructor.io API key. Required if `cioJsClient` is not provided. */
  apiKey?: string;
  /** Pre-configured Constructor.io JS client instance. Takes precedence over `apiKey`. */
  cioJsClient?: ConstructorIOClient;
  /** The user's search intent that drives agent recommendations. */
  intent: string;
  /** Domain identifiers for the agent stream endpoints. */
  domains: IAgentOverviewDomains;
  /** Theme overrides for customizing visual appearance via CSS custom properties. */
  theme?: CioAgentOverviewTheme;
  /** Callback functions for handling user interactions. */
  callbacks?: IAgentOverviewCallbacks;
  /** Translation overrides for internationalizing UI strings. */
  translations?: Translations;
}

/** A category suggestion returned by the agent stream. */
export interface ICategory {
  title: string;
  imageUrl: string;
}

/** A product item within a recommendation section. */
export interface IProduct {
  itemName: string;
  imageUrl: string;
  price: number;
  url: string;
}

/** A group of recommended products with a title and description. */
export interface IRecommendationSection {
  title: string;
  description: string;
  products: IProduct[];
  /** URL for the "View more" link. Populated via the `getViewMoreUrl` callback. */
  viewMoreUrl?: string;
}
