import Link from 'next/link';
import { themes } from '@/data';
import InteractiveMap from '@/components/map/InteractiveMap';

export default function HomePage() {
  return (
    <div className="h-full flex flex-col">
      <header className="shrink-0 px-6 py-3 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-blue-900 leading-tight">CityMatters Housing</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Three concept maps on urban housing challenges — hover a node to highlight its connections
          </p>
        </div>
        <nav className="hidden sm:flex items-center gap-4">
          {themes.map((theme) => (
            <Link
              key={theme.id}
              href={`/themes/${theme.id}`}
              className="text-xs text-blue-600 hover:underline"
            >
              {theme.title} →
            </Link>
          ))}
        </nav>
      </header>

      <div className="flex-1 min-h-0 relative">
        <InteractiveMap />
        <p className="absolute bottom-3 right-3 text-xs text-gray-400 pointer-events-none select-none">
          Scroll to zoom · Drag to pan
        </p>
      </div>
    </div>
  );
}
