import InteractiveMap from '@/components/map/InteractiveMap';

export default function HomePage() {
  return (
    <div className="h-full relative">
      <InteractiveMap />
      <h1
        className="absolute top-6 left-6 text-2xl font-bold text-blue-900 pointer-events-none select-none z-10"
        style={{ textShadow: '0 1px 3px rgba(245,240,228,0.8)' }}
      >
        Housing and urban models
      </h1>
      <p className="absolute bottom-3 right-3 text-xs text-gray-400 pointer-events-none select-none z-10">
        Scroll to zoom · Drag to pan
      </p>
    </div>
  );
}
