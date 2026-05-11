import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'CityMatters Housing',
  description: 'Mappe concettuali su tematiche abitative urbane: Monitoring, Energy class, Boundaries.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="bg-gray-50 text-gray-900">
        <Navigation />
        <main className="max-w-4xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
