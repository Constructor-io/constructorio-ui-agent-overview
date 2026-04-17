import type { Translations } from '@src/types';
import translate from '@src/utils/translate';

import SparkleSVG from '../icons/SparkleSVG';

import './Skeleton.css';

const DEFAULT_ROWS = 3;
const DEFAULT_CARDS = 5;

function SkeletonProduct() {
  return (
    <div className="cio-agent-overview-skeleton-product">
      <div className="cio-agent-overview-skeleton-bone cio-agent-overview-skeleton-product-image" />
      <div className="cio-agent-overview-skeleton-bone cio-agent-overview-skeleton-product-price" />
      <div className="cio-agent-overview-skeleton-bone cio-agent-overview-skeleton-product-name" />
    </div>
  );
}

function SkeletonSection({
  showTitle = true,
  cards = DEFAULT_CARDS,
  translations,
}: {
  showTitle?: boolean;
  cards?: number;
  translations?: Translations;
}) {
  return (
    <div className="cio-agent-overview-skeleton-section">
      <div className="cio-agent-overview-skeleton-badge">
        <SparkleSVG />
        <span>
          {translate('CioAgentOverview.skeleton.thinking', translations)}
          <span className="cio-agent-overview-skeleton-thinking-dots" />
        </span>
      </div>
      {showTitle && (
        <div className="cio-agent-overview-skeleton-bone cio-agent-overview-skeleton-title" />
      )}
      <div className="cio-agent-overview-skeleton-bone cio-agent-overview-skeleton-description" />
      <div className="cio-agent-overview-skeleton-products">
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
  translations?: Translations;
}

export default function Skeleton({
  rows = DEFAULT_ROWS,
  showTitle = true,
  cards = DEFAULT_CARDS,
  translations,
}: SkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }, (_, i) => (
        <SkeletonSection
          key={i}
          showTitle={showTitle}
          cards={cards}
          translations={translations}
        />
      ))}
    </>
  );
}
