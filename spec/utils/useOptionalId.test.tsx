import { act, render, screen } from '@testing-library/react';

import useOptionalId from '@src/utils/useOptionalId';

function Probe() {
  const id = useOptionalId();
  return <span data-testid="probe">{id}</span>;
}

describe('useOptionalId', () => {
  it('returns a distinct id per mounted component on React 18+', () => {
    render(
      <>
        <Probe />
        <Probe />
      </>
    );
    const [first, second] = screen
      .getAllByTestId('probe')
      .map((el) => el.textContent);
    expect(first).toBeTruthy();
    expect(first).not.toBe(second);
  });

  it('hydrates server markup without an id mismatch', async () => {
    const { renderToString } = await import('react-dom/server');
    const { hydrateRoot } = await import('react-dom/client');
    const view = renderToString(<Probe />);
    const container = document.createElement('div');
    container.innerHTML = view;
    document.body.appendChild(container);

    // A mismatched id is reported to console.error, which fails the test.
    let root: ReturnType<typeof hydrateRoot> | undefined;
    act(() => {
      root = hydrateRoot(container, <Probe />);
    });
    expect(container.innerHTML).toBe(view);

    act(() => root?.unmount());
    container.remove();
  });
});
