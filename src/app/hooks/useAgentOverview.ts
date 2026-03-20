import { useEffect, useRef, useState } from 'react';

import type {
  IAgentOverviewProps,
  ICategory,
  IProduct,
  IRecommendationSection,
} from '@src/types';

import { createAgentStream } from '../services/agentOverviewClient';
import { parseAgentStream } from '../services/agentStreamParser';
import type {
  AgentStreamResultItem,
  AgentStreamSearchResultEvent,
} from '../services/agentStreamTypes';
import { createMockCategoryStream } from '../services/mockCategoryStream';

type Phase = 'categories' | 'products';

function toProducts(event: AgentStreamSearchResultEvent): IProduct[] {
  const results = event.data.response?.results ?? [];
  const products: IProduct[] = [];
  for (const item of results) {
    const parsed = toProduct(item);
    if (parsed) {
      products.push(parsed);
    }
  }
  return products;
}

function toProduct(item: AgentStreamResultItem): IProduct | null {
  const itemName = item.value ?? '';
  const imageUrl = item.data?.image_url ?? '';
  if (!itemName || !imageUrl) return null;
  return {
    itemName,
    imageUrl,
    price: item.data?.price ?? 0,
    url: item.data?.url ?? '',
  };
}

function toCategory(event: AgentStreamSearchResultEvent): ICategory | null {
  const title = event.data.title ?? '';
  const firstResult = event.data.response?.results?.[0];
  const imageUrl = firstResult?.data?.image_url ?? '';
  if (!title || !imageUrl) return null;
  return { title, imageUrl };
}

export default function useAgentOverview(props: IAgentOverviewProps): {
  phase: Phase;
  categories: ICategory[];
  categoryDescription: string;
  sections: IRecommendationSection[];
  selectCategory: (category: ICategory) => void;
  isLoading: boolean;
  error: string | null;
} {
  const { apiKey, cioJsClient, intent, categoryDomain, productDomain } = props;
  const [phase, setPhase] = useState<Phase>('categories');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoryDescription, setCategoryDescription] = useState('');
  const [sections, setSections] = useState<IRecommendationSection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sectionsRef = useRef<IRecommendationSection[]>([]);
  const sectionsLoadedRef = useRef(false);
  const sectionsErrorRef = useRef<string | null>(null);
  const abortRef = useRef(false);

  useEffect(() => {
    if (!intent || !categoryDomain || !productDomain) return;

    abortRef.current = false;
    setPhase('categories');
    setIsLoading(true);
    setError(null);
    setCategories([]);
    setCategoryDescription('');
    setSections([]);
    sectionsRef.current = [];
    sectionsLoadedRef.current = false;
    sectionsErrorRef.current = null;

    async function consumeCategories() {
      const minDelay = new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        // TODO: Remove mock once searchbar_agent returns categories
        const rawStream = createMockCategoryStream();
        const events = parseAgentStream(rawStream);
        const collectedCategories: ICategory[] = [];
        let description = '';

        for await (const event of events) {
          if (abortRef.current) break;

          switch (event.type) {
            case 'message':
              description = event.data.text;
              break;
            case 'search_result': {
              const category = toCategory(event);
              if (category) {
                collectedCategories.push(category);
              }
              break;
            }
            default:
              break;
          }
        }

        await minDelay;
        if (abortRef.current) return;

        setCategoryDescription(description);
        setCategories(collectedCategories);
      } catch (err) {
        if (!abortRef.current) {
          setError(
            err instanceof Error ? err.message : 'Failed to load categories'
          );
        }
      } finally {
        setIsLoading(false);
      }
    }

    async function consumeProducts() {
      try {
        const rawStream = createAgentStream(
          { apiKey, cioJsClient },
          intent,
          productDomain
        );
        const events = parseAgentStream(rawStream);
        const collected: IRecommendationSection[] = [];

        let currentTitle = '';
        let currentDescription = '';
        let currentProducts: IProduct[] = [];

        function flushSection() {
          if (currentProducts.length > 0) {
            collected.push({
              title: currentTitle,
              description: currentDescription,
              products: [...currentProducts],
            });
          }
          currentTitle = '';
          currentProducts = [];
        }

        for await (const event of events) {
          if (abortRef.current) break;

          switch (event.type) {
            case 'message':
              currentDescription = event.data.text;
              break;
            case 'group':
              flushSection();
              currentTitle = event.data.title;
              currentDescription = event.data.description;
              break;
            case 'search_result': {
              const products = toProducts(event);
              if (event.data.title) {
                flushSection();
                currentTitle = event.data.title;
              }
              currentProducts.push(...products);
              break;
            }
            default:
              break;
          }
        }
        flushSection();
        sectionsRef.current = collected;
      } catch (err) {
        sectionsErrorRef.current =
          err instanceof Error ? err.message : 'Failed to load results';
      } finally {
        sectionsLoadedRef.current = true;
      }
    }

    // Fire both streams in parallel
    void consumeCategories();
    void consumeProducts();

    return () => {
      abortRef.current = true;
    };
  }, [apiKey, cioJsClient, intent, categoryDomain, productDomain]);

  function selectCategory(_category: ICategory) {
    if (sectionsLoadedRef.current) {
      if (sectionsErrorRef.current) {
        setError(sectionsErrorRef.current);
      } else {
        setSections(sectionsRef.current);
      }
      setPhase('products');
      setIsLoading(false);
    } else {
      // Products still loading — show skeleton
      setPhase('products');
      setIsLoading(true);

      const interval = setInterval(() => {
        if (sectionsLoadedRef.current) {
          clearInterval(interval);
          if (sectionsErrorRef.current) {
            setError(sectionsErrorRef.current);
          } else {
            setSections(sectionsRef.current);
          }
          setIsLoading(false);
        }
      }, 100);
    }
  }

  return {
    phase,
    categories,
    categoryDescription,
    sections,
    selectCategory,
    isLoading,
    error,
  };
}
