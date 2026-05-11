import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { themes } from '@/data';
import { getTheme } from '@/lib';
import ThemeMap from '@/components/ThemeMap';
import type { ThemeId } from '@/types';

interface ThemePageProps {
  params: Promise<{ themeId: string }>;
}

export async function generateStaticParams() {
  return themes.map((theme) => ({ themeId: theme.id }));
}

export async function generateMetadata({ params }: ThemePageProps): Promise<Metadata> {
  const { themeId } = await params;
  const theme = getTheme(themeId as ThemeId);
  if (!theme) return { title: 'Theme not found' };
  return { title: `Theme ${theme.id}: ${theme.title} — CityMatters Housing` };
}

export default async function ThemePage({ params }: ThemePageProps) {
  const { themeId } = await params;

  if (!['1', '2', '3'].includes(themeId)) {
    notFound();
  }

  const theme = getTheme(themeId as ThemeId);
  if (!theme) notFound();

  return (
    <article className="max-w-4xl mx-auto px-6 py-8">
      <header className="mb-8">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Theme {theme.id}</p>
        <h1 className="text-3xl font-bold text-blue-900 mb-2">{theme.title}</h1>
        <p className="text-gray-600">{theme.description}</p>
      </header>

      <ThemeMap themeId={themeId as ThemeId} />
    </article>
  );
}
