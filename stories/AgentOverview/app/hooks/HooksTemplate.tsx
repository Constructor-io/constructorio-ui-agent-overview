import useAgentOverview from '@src/app/hooks/useAgentOverview';
import type { IAgentOverviewProps } from '@src/types';
import { translateLabel } from '@src/utils/translate';

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

  const status = isLoading
    ? translateLabel('CioAgentOverview.status.loading', args.translations)
    : '';

  let content: React.ReactNode = null;
  if (error) {
    content = (
      <div role="alert" style={{ color: 'red' }}>
        Error: {error}
      </div>
    );
  } else if (phase === 'categories' && !isLoading) {
    content = (
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
  } else if (phase === 'products' && !isLoading) {
    content = (
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

  return (
    <div>
      <div role="status">{status}</div>
      {content}
    </div>
  );
}
