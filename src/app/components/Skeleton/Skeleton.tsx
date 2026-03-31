import SparkleSVG from '../RecommendationSection/SparkleSVG';

import './Skeleton.css';

const DEFAULT_ROWS = 3;
const DEFAULT_CARDS = 5;

function SkeletonProduct() {
  return (
    <div className="cio-agent-overview__skeleton__product">
      <div className="cio-agent-overview__skeleton-bone cio-agent-overview__skeleton__product-image" />
      <div className="cio-agent-overview__skeleton-bone cio-agent-overview__skeleton__product-price" />
      <div className="cio-agent-overview__skeleton-bone cio-agent-overview__skeleton__product-name" />
    </div>
  );
}

function SkeletonSection({ showTitle = true, cards = DEFAULT_CARDS }: { showTitle?: boolean; cards?: number }) {
  return (
    <div className="cio-agent-overview__skeleton__section">
      <div className="cio-agent-overview__skeleton__badge">
        <SparkleSVG />
        <span>
          Thinking
          <span className="cio-agent-overview__skeleton__thinking-dots" />
        </span>
      </div>
      {showTitle && (
        <div className="cio-agent-overview__skeleton-bone cio-agent-overview__skeleton__title" />
      )}
      <div className="cio-agent-overview__skeleton-bone cio-agent-overview__skeleton__description" />
      <div className="cio-agent-overview__skeleton__products">
        {Array.from({ length: cards }, (_, i) => (
          <SkeletonProduct key={i} />
        ))}
      </div>
    </div>
  );
}

interface SkeletonProps {
  rows?: number;
  showTitle?: boolean;
  cards?: number;
}

export default function Skeleton({ rows = DEFAULT_ROWS, showTitle = true, cards = DEFAULT_CARDS }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }, (_, i) => (
        <SkeletonSection key={i} showTitle={showTitle} cards={cards} />
      ))}
    </>
  );
}
