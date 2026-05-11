import Link from 'next/link';
import type { Theme } from '@/types';

interface ThemeCardProps {
  theme: Theme;
}

export default function ThemeCard({ theme }: ThemeCardProps) {
  return (
    <Link href={`/themes/${theme.id}`} className="block border border-gray-300 rounded p-6 hover:border-blue-500 hover:shadow-sm transition-all">
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Tema {theme.id}</p>
      <h2 className="text-xl font-bold text-gray-900 mb-2">{theme.title}</h2>
      <p className="text-gray-600 text-sm">{theme.description}</p>
    </Link>
  );
}
