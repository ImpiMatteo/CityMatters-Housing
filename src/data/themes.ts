import type { Theme } from '@/types';

export const themes: Theme[] = [
  {
    id: '1',
    title: 'Monitoring',
    slug: 'monitoring',
    description:
      'Sorveglianza e cura delle persone anziane che vivono sole, tra tecnologia, assistenza e legami di quartiere.',
    centralNodeId: 'monitoring',
  },
  {
    id: '2',
    title: 'Energy class',
    slug: 'energy-class',
    description:
      "Efficienza energetica, costo della vita e adeguamento abitativo in relazione al reddito e alle abitudini.",
    centralNodeId: 'energy-class',
  },
  {
    id: '3',
    title: 'Boundaries',
    slug: 'boundaries',
    description:
      'Confini fisici e sociali della casa: nuovi modelli familiari, co-housing e reti di connessione urbana.',
    centralNodeId: 'boundaries',
  },
];
