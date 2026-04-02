import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CategoryCard from '@src/app/components/CategoryCard/CategoryCard';
import type { ICategory } from '@src/types';

const category: ICategory = {
  title: 'Running Shoes',
  imageUrl: 'https://example.com/running.jpg',
};

describe('CategoryCard', () => {
  it('renders category title', () => {
    render(<CategoryCard category={category} />);
    expect(screen.getByText('Running Shoes')).toBeTruthy();
  });

  it('renders category image', () => {
    render(<CategoryCard category={category} />);
    const img = screen.getByAltText('Running Shoes');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('https://example.com/running.jpg');
  });

  it('renders as a button', () => {
    render(<CategoryCard category={category} />);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<CategoryCard category={category} onClick={handleClick} />);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('renders without onClick', () => {
    expect(() => render(<CategoryCard category={category} />)).not.toThrow();
  });
});
