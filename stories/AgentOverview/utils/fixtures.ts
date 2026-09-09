import type { ICategory, IRecommendationSection } from '@src/types';

const image = (label: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">` +
      `<rect width="100%" height="100%" fill="#e5e7eb"/>` +
      `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" ` +
      `font-family="sans-serif" font-size="24" fill="#6b7280">${label}</text></svg>`
  )}`;

export const categories: ICategory[] = [
  { title: 'Sneakers', imageUrl: image('sneakers') },
  { title: 'Loafers', imageUrl: image('loafers') },
  { title: 'Sandals', imageUrl: image('sandals') },
  { title: 'Boots', imageUrl: image('boots') },
  { title: 'Slippers', imageUrl: image('slippers') },
  { title: 'Espadrilles', imageUrl: image('espadrilles') },
];

export const categoryDescription =
  'Casual style covers a lot of ground. Pick a direction and I will narrow things down.';

export const section: IRecommendationSection = {
  title: 'Everyday sneakers',
  description: 'Lightweight pairs that work with jeans, chinos and shorts.',
  products: [
    {
      itemName: 'Canvas Low Top',
      imageUrl: image('canvas'),
      price: 59.99,
      url: 'https://example.com/canvas-low-top',
    },
    {
      itemName: 'Leather Court Sneaker',
      imageUrl: image('court'),
      price: 129,
      url: 'https://example.com/leather-court',
    },
    {
      itemName: 'Knit Runner',
      imageUrl: image('runner'),
      price: 89.5,
      url: 'https://example.com/knit-runner',
    },
    {
      itemName: 'Suede Trainer',
      imageUrl: image('suede'),
      price: 110,
      url: 'https://example.com/suede-trainer',
    },
    {
      itemName: 'Slip-On Sneaker',
      imageUrl: image('slip-on'),
      price: 49,
      url: 'https://example.com/slip-on',
    },
  ],
};
