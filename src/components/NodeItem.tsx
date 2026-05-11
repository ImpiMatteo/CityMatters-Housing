import Link from 'next/link';
import type { Node, NodeAppearance, ThemeId } from '@/types';
import { getNodeChildren } from '@/lib';

const levelLabel: Record<string, string> = {
  alto: 'High',
  medio: 'Medium',
  basso: 'Low',
};

const levelClass: Record<string, string> = {
  alto: 'bg-blue-700 text-white',
  medio: 'border border-blue-600 text-blue-700',
  basso: 'text-gray-500',
};

interface NodeItemProps {
  node: Node;
  appearance: NodeAppearance;
  themeId: ThemeId;
  depth?: number;
}

export default function NodeItem({ node, appearance, themeId, depth = 0 }: NodeItemProps) {
  const children = getNodeChildren(themeId, node.id);
  const isCrossTheme = node.appearances.length > 1;

  return (
    <li className="mt-2">
      <div className="flex items-center gap-2">
        <Link
          href={`/nodes/${node.id}`}
          className="text-blue-600 hover:underline"
        >
          {node.label}
        </Link>
        <span
          className={`text-xs px-1.5 py-0.5 rounded ${levelClass[appearance.level]}`}
        >
          {levelLabel[appearance.level]}
        </span>
        {isCrossTheme && (
          <span className="text-xs text-orange-600 font-medium" title="Cross-theme node">
            ✦ cross-theme
          </span>
        )}
      </div>
      {children.length > 0 && (
        <ul className={`mt-1 ${depth < 4 ? 'ml-5 border-l border-gray-200 pl-3' : 'ml-3'}`}>
          {children.map(({ node: childNode, appearance: childAppearance }) => (
            <NodeItem
              key={childNode.id}
              node={childNode}
              appearance={childAppearance}
              themeId={themeId}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
