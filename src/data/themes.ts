import type { Theme } from '@/types';

export const themes: Theme[] = [
  {
    id: '1',
    title: 'Monitoring',
    slug: 'monitoring',
    description:
      'Monitoring and care of elderly people living alone, between technology, assistance, and neighbourhood ties.',
    centralNodeId: 'monitoring',
  },
  {
    id: '2',
    title: 'Energy class',
    slug: 'energy-class',
    description:
      'Energy efficiency, cost of living, and housing adaptation in relation to income and changing habits.',
    centralNodeId: 'energy-class',
  },
  {
    id: '3',
    title: 'Boundaries',
    slug: 'boundaries',
    description:
      'Physical and social boundaries of housing: new family models, co-housing, and urban connection networks.',
    centralNodeId: 'boundaries',
  },
];
