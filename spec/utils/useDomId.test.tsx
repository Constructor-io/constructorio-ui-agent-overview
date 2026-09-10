import { act, render, screen } from '@testing-library/react';

import useDomId, { useCounterId } from '@src/utils/useDomId';

function Probe({ suffix }: { suffix: string }) {
  const id = useDomId(suffix);
  return <span data-testid={suffix}>{id}</span>;
}

function CounterProbe() {
  return <span data-testid="counter">{useCounterId()}</span>;
}

describe('useDomId', () => {
  it('prefixes the id and appends the suffix', () => {
    render(<Probe suffix="title" />);
    expect(screen.getByTestId('title')).toHaveTextContent(
      /^cio-agent-overview-[a-zA-Z0-9-]+-title$/
    );
  });

  it('differs between two mounted components', () => {
    render(
      <>
        <Probe suffix="a" />
        <Probe suffix="a" />
      </>
    );
    const [first, second] = screen.getAllByTestId('a');
    expect(first.textContent).not.toBe(second.textContent);
  });

  it('is stable across re-renders of the same component', () => {
    const { rerender } = render(<Probe suffix="title" />);
    const before = screen.getByTestId('title').textContent;
    rerender(<Probe suffix="title" />);
    expect(screen.getByTestId('title')).toHaveTextContent(before);
  });

  it('hydrates server markup without an id mismatch on React 18+', async () => {
    const { renderToString } = await import('react-dom/server');
    const { hydrateRoot } = await import('react-dom/client');
    const view = renderToString(<Probe suffix="title" />);
    const container = document.createElement('div');
    container.innerHTML = view;
    document.body.appendChild(container);

    // A mismatched id would be reported to console.error, which fails the test.
    let root: ReturnType<typeof hydrateRoot> | undefined;
    act(() => {
      root = hydrateRoot(container, <Probe suffix="title" />);
    });
    expect(container.innerHTML).toBe(view);

    act(() => root?.unmount());
    container.remove();
  });
});

describe('useCounterId', () => {
  it('hands out a new id per mounted component and keeps it on re-render', () => {
    const { rerender } = render(
      <>
        <CounterProbe />
        <CounterProbe />
      </>
    );
    const [first, second] = screen
      .getAllByTestId('counter')
      .map((el) => el.textContent);
    expect(first).not.toBe(second);
    rerender(
      <>
        <CounterProbe />
        <CounterProbe />
      </>
    );
    expect(
      screen.getAllByTestId('counter').map((el) => el.textContent)
    ).toEqual([first, second]);
  });
});
