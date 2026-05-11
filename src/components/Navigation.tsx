import Link from 'next/link';
import { themes } from '@/data';

export default function Navigation() {
  return (
    <nav className="shrink-0 border-b border-gray-200 bg-white">
      <div className="px-6 h-11 flex flex-wrap gap-5 items-center">
        <Link href="/" className="font-semibold text-blue-900 hover:underline text-sm">
          CityMatters Housing
        </Link>
        <span className="text-gray-200">|</span>
        {themes.map((theme) => (
          <Link
            key={theme.id}
            href={`/themes/${theme.id}`}
            className="text-blue-600 hover:underline text-xs"
          >
            Theme {theme.id}: {theme.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}
