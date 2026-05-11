import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { nodes } from '@/data';
import { getNode, getTheme } from '@/lib';

interface NodePageProps {
  params: Promise<{ nodeId: string }>;
}

export async function generateStaticParams() {
  return nodes.map((node) => ({ nodeId: node.id }));
}

export async function generateMetadata({ params }: NodePageProps): Promise<Metadata> {
  const { nodeId } = await params;
  const node = getNode(nodeId);
  if (!node) return { title: 'Nodo non trovato' };
  return { title: `${node.label} — CityMatters Housing` };
}

const levelLabel: Record<string, string> = {
  alto: 'Alto',
  medio: 'Medio',
  basso: 'Basso',
};

const levelClass: Record<string, string> = {
  alto: 'bg-blue-700 text-white px-2 py-0.5 rounded text-xs',
  medio: 'border border-blue-600 text-blue-700 px-2 py-0.5 rounded text-xs',
  basso: 'text-gray-500 text-xs',
};

export default async function NodePage({ params }: NodePageProps) {
  const { nodeId } = await params;
  const node = getNode(nodeId);

  if (!node) notFound();

  const isCrossTheme = node.appearances.length > 1;

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{node.label}</h1>
        {isCrossTheme && (
          <p className="text-orange-600 font-medium">
            ✦ Nodo trasversale — compare in {node.appearances.length} temi diversi
          </p>
        )}
      </header>

      <section aria-labelledby="appearances-heading" className="mb-8">
        <h2 id="appearances-heading" className="text-xl font-semibold mb-4">
          Apparizioni nei temi
        </h2>
        <ul className="space-y-4">
          {node.appearances.map((appearance) => {
            const theme = getTheme(appearance.themeId);
            const parentNode = appearance.parentNodeId ? getNode(appearance.parentNodeId) : null;
            return (
              <li
                key={appearance.themeId}
                className="border border-gray-200 rounded p-4 bg-white"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Link
                    href={`/themes/${appearance.themeId}`}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    Tema {appearance.themeId}: {theme?.title}
                  </Link>
                  <span className={levelClass[appearance.level]}>
                    {levelLabel[appearance.level]}
                  </span>
                </div>
                {parentNode ? (
                  <p className="text-sm text-gray-600">
                    Figlio di:{' '}
                    <Link
                      href={`/nodes/${parentNode.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {parentNode.label}
                    </Link>
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    Collegato direttamente al nodo centrale del tema.
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <nav aria-label="Torna ai temi">
        <p className="text-sm text-gray-500 mb-2">Esplora i temi in cui compare:</p>
        <ul className="flex flex-wrap gap-2">
          {node.appearances.map((appearance) => {
            const theme = getTheme(appearance.themeId);
            return (
              <li key={appearance.themeId}>
                <Link
                  href={`/themes/${appearance.themeId}`}
                  className="text-sm text-blue-600 hover:underline border border-blue-200 rounded px-3 py-1"
                >
                  ← Tema {appearance.themeId}: {theme?.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </article>
  );
}
