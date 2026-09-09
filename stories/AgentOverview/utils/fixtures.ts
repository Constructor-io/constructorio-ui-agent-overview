import type { ICategory, IRecommendationSection } from '@src/types';

const image = (seed: string) => `https://picsum.photos/seed/${seed}/300/300`;

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
