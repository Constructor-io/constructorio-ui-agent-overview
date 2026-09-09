# constructorio-ui-agent-overview

Embeddable React widget: streams AI-generated category suggestions and product
recommendation sections for a shopping intent. It is published to npm and runs
inside a customer's site, so it is a guest on a page it does not own.

## Accessibility

**Read `.claude/a11y.md` before reviewing or writing any JSX/TSX or CSS**, whether
the request says "accessibility" or not. Most regressions here arrive inside
changes made for some other reason.

Two automated layers are the merge gate, and both already run in CI:

- `npm run lint` — `eslint-plugin-jsx-a11y`, static issues in the source
- `npm test -- --run` — `axe-core` in real Chromium against every story (the
  `storybook` vitest project; `npm run test-storybook` runs it alone)

Every story sets `a11y: { test: 'error' }`. The deterministic component stories
under `stories/AgentOverview/app/components/` exist so axe sees every state
(loading, error, categories, products) without the live API.

Colour is out of scope: `color-contrast` is disabled in the axe run because the
palette is the consumer's to restyle through `theme`. State conveyed *only* by
colour still needs a non-visual equivalent.

## Constraints that shape the code

- **The DOM structure is public API.** `cio-agent-overview-*` class names are
  what customers style against. Adding, removing or reordering elements can break
  their CSS even when our own rendering looks unchanged.
- **The stylesheet is optional.** `styles.css` is a separate import. Anything that
  must never be visible needs an inline style, not only a class.
- **`translate()` returns an explicitly provided string as-is.** Add every
  user-facing string, including accessible names and live-region text, to
  `defaultTranslations` (`src/utils/translate.ts`), the `Translations` type
  (`src/types/index.ts`), the README and the `translations` argType.
- **Only `src/index.ts` is public.** Components and hooks outside it can change
  shape freely.

## Commands

- `npm run storybook` — Storybook on 6006
- `npm run test:unit` — jsdom unit tests
- `npm run test-storybook` — axe against stories in Chromium
- `npm run lint`, `npm run check-types`
