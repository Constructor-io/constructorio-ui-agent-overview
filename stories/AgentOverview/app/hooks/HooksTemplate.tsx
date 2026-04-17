import useAgentOverview from '@src/app/hooks/useAgentOverview';
import type { IAgentOverviewProps } from '@src/types';

export default function HooksTemplate(args: IAgentOverviewProps) {
  const {
    phase,
    categories,
    categoryDescription,
    sections,
    selectCategory,
    isLoading,
    error,
  } = useAgentOverview(args);

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  if (isLoading && categories.length === 0 && sections.length === 0) {
    return <div>Loading...</div>;
  }

  if (phase === 'categories') {
    return (
      <div>
        <h3>{categoryDescription}</h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          {categories.map((category) => (
            <button
              key={category.title}
              type="button"
              onClick={() => selectCategory(category)}
              style={{ padding: '8px 16px', cursor: 'pointer' }}
            >
              <img src={category.imageUrl} alt={category.title} width={100} />
              <div>{category.title}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // phase === 'products'
  if (isLoading) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      {sections.map((section) => (
        <div key={section.title} style={{ marginBottom: '24px' }}>
          <h3>{section.title}</h3>
          <p>{section.description}</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {section.products.map((product) => (
              <div key={product.url} style={{ width: '150px' }}>
                <img
                  src={product.imageUrl}
                  alt={product.itemName}
                  width={150}
                />
                <div>{product.itemName}</div>
                <div>${product.price}</div>
              </div>
            ))}
          </div>
          {section.viewMoreUrl && <a href={section.viewMoreUrl}>View more</a>}
        </div>
      ))}
    </div>
  );
}
