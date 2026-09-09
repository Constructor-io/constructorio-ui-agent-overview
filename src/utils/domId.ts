/** Deterministic element id from a title, safe for server rendering. */
export default function domId(prefix: string, title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${prefix}-${slug || 'untitled'}`;
}
