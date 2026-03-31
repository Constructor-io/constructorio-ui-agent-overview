import type ConstructorIOClient from '@constructor-io/constructorio-client-javascript';

export interface CioAgentOverviewTheme {
  primaryColor?: React.CSSProperties['color'];
  secondaryColor?: React.CSSProperties['color'];
  background?: React.CSSProperties['backgroundColor'];
  fontSizeBase?: React.CSSProperties['fontSize'];
}

export interface IAgentOverviewCallbacks {
  onProductClick?: (
    event: React.MouseEvent,
    product: IProduct,
    section: IRecommendationSection
  ) => void;
  onCategoryClick?: (category: ICategory) => void;
  onSectionView?: (section: IRecommendationSection) => void;
  getProductUrl?: (product: IProduct) => string;
}

export interface IAgentOverviewProps {
  apiKey?: string;
  cioJsClient?: ConstructorIOClient;
  intent: string;
  categoryDomain: string;
  productDomain: string;
  theme?: CioAgentOverviewTheme;
  callbacks?: IAgentOverviewCallbacks;
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
