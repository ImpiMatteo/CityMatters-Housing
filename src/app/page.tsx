import { themes } from '@/data';
import ThemeCard from '@/components/ThemeCard';
import { getCrossThemeNodes } from '@/lib';

export default function HomePage() {
  const crossThemeNodes = getCrossThemeNodes();

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">CityMatters Housing</h1>
        <p className="text-gray-600 max-w-2xl">
          Tre mappe concettuali che esplorano le problematiche abitative urbane: dalla sorveglianza
          degli anziani all&apos;efficienza energetica, fino ai nuovi modelli di convivenza e ai
          confini sociali della casa.
        </p>
      </header>

      <section aria-labelledby="themes-heading" className="mb-12">
        <h2 id="themes-heading" className="text-xl font-semibold mb-4">
          Scegli un tema
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {themes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </div>
      </section>

      <section aria-labelledby="cross-heading">
        <h2 id="cross-heading" className="text-xl font-semibold mb-2">
          Nodi trasversali ({crossThemeNodes.length})
        </h2>
        <p className="text-sm text-gray-500 mb-3">
          Questi concetti compaiono in più di un tema, evidenziando connessioni tra le mappe.
        </p>
        <ul className="flex flex-wrap gap-2">
          {crossThemeNodes.map((node) => (
            <li key={node.id}>
              <a
                href={`/nodes/${node.id}`}
                className="text-sm border border-orange-300 text-orange-700 rounded px-2 py-1 hover:bg-orange-50"
              >
                {node.label}
                <span className="ml-1 text-xs text-gray-400">
                  (temi: {node.appearances.map((a) => a.themeId).join(', ')})
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
