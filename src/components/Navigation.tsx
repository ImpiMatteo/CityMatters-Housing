import Link from 'next/link';
import { themes } from '@/data';

export default function Navigation() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-6 py-3 flex flex-wrap gap-4 items-center">
        <Link href="/" className="font-semibold text-gray-900 hover:underline">
          CityMatters Housing
        </Link>
        <span className="text-gray-300">|</span>
        {themes.map((theme) => (
          <Link
            key={theme.id}
            href={`/themes/${theme.id}`}
            className="text-blue-600 hover:underline text-sm"
          >
            Tema {theme.id}: {theme.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}
