import type { ThemeId } from '@/types';
import { getTheme, getNodeChildren, getNode } from '@/lib';
import NodeItem from './NodeItem';

interface ThemeMapProps {
  themeId: ThemeId;
}

export default function ThemeMap({ themeId }: ThemeMapProps) {
  const theme = getTheme(themeId);
  if (!theme) return null;

  const centralNode = getNode(theme.centralNodeId);
  if (!centralNode) return null;

  const centralAppearance = centralNode.appearances.find((a) => a.themeId === themeId);
  if (!centralAppearance) return null;

  const topLevelChildren = getNodeChildren(themeId, centralNode.id);

  return (
    <section aria-label={`Mappa del tema ${theme.title}`}>
      <div className="mb-4 p-4 bg-blue-700 text-white rounded inline-block">
        <span className="text-xs uppercase tracking-wide opacity-75">Nodo centrale</span>
        <h2 className="text-2xl font-bold">{centralNode.label}</h2>
        <span className="text-xs opacity-75">[Alto]</span>
      </div>

      {topLevelChildren.length > 0 && (
        <ul className="mt-4 space-y-0.5">
          {topLevelChildren.map(({ node, appearance }) => (
            <NodeItem
              key={node.id}
              node={node}
              appearance={appearance}
              themeId={themeId}
              depth={0}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
