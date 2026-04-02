import type ConstructorIOClient from '@constructor-io/constructorio-client-javascript';

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

export interface IAgentOverviewCallbacks {
  onProductClick?: (
    event: React.MouseEvent,
    product: IProduct,
    section: IRecommendationSection
  ) => void;
  onCategoryClick?: (category: ICategory) => void;
  getProductUrl?: (product: IProduct) => string;
}

export type Translations = {
  'CioAgentOverview.section.aiBadge'?: string;
  'CioAgentOverview.categories.viewSuggestions'?: string;
  'CioAgentOverview.section.viewMore'?: string;
  'CioAgentOverview.skeleton.thinking'?: string;
  'CioAgentOverview.error.message'?: string;
};

export interface IAgentOverviewDomains {
  suggestions: string;
  results: string;
}

export interface IAgentOverviewProps {
  apiKey?: string;
  cioJsClient?: ConstructorIOClient;
  intent: string;
  domains: IAgentOverviewDomains;
  theme?: CioAgentOverviewTheme;
  callbacks?: IAgentOverviewCallbacks;
  translations?: Translations;
}

export interface ICategory {
  title: string;
  imageUrl: string;
}

export interface IProduct {
  itemName: string;
  imageUrl: string;
  price: number;
  url: string;
}

export interface IRecommendationSection {
  title: string;
  description: string;
  products: IProduct[];
  viewMoreUrl?: string;
}
