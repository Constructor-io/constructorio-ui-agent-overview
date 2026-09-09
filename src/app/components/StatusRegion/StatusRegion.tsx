// Inline so it stays hidden for consumers who do not load the stylesheet.
export const SR_ONLY_STYLE: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

interface IStatusRegionProps {
  message: string;
}

/**
 * Visually hidden `role="status"`. Keep it mounted and change only `message`:
 * a live region created together with its text is announced inconsistently.
 */
export default function StatusRegion({ message }: IStatusRegionProps) {
  return (
    <div
      className="cio-agent-overview-sr-only"
      style={SR_ONLY_STYLE}
      role="status"
    >
      {message}
    </div>
  );
}
