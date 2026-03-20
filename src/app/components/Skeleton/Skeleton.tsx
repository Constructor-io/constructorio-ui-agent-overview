import SparkleSVG from '../RecommendationSection/SparkleSVG';

import './Skeleton.css';

const SKELETON_SECTIONS = 3;
const SKELETON_PRODUCTS = 5;

function SkeletonProduct() {
  return (
    <div className="cio-agent-overview__skeleton__product">
      <div className="cio-agent-overview__skeleton-bone cio-agent-overview__skeleton__product-image" />
      <div className="cio-agent-overview__skeleton-bone cio-agent-overview__skeleton__product-price" />
      <div className="cio-agent-overview__skeleton-bone cio-agent-overview__skeleton__product-name" />
    </div>
  );
}

function SkeletonSection() {
  return (
    <div className="cio-agent-overview__skeleton__section">
      <div className="cio-agent-overview__skeleton__badge">
        <SparkleSVG />
        <span>
          Thinking
          <span className="cio-agent-overview__skeleton__thinking-dots" />
        </span>
      </div>
      <div className="cio-agent-overview__skeleton-bone cio-agent-overview__skeleton__title" />
      <div className="cio-agent-overview__skeleton-bone cio-agent-overview__skeleton__description" />
      <div className="cio-agent-overview__skeleton__products">
        {Array.from({ length: SKELETON_PRODUCTS }, (_, i) => (
          <SkeletonProduct key={i} />
        ))}
      </div>
    </div>
  );
}

export default function Skeleton() {
  return (
    <>
      {Array.from({ length: SKELETON_SECTIONS }, (_, i) => (
        <SkeletonSection key={i} />
      ))}
    </>
  );
}
