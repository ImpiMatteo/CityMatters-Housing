import { nodes } from '@/data';
import type { Node, NodeAppearance, ThemeId } from '@/types';

export interface NodeWithAppearance {
  node: Node;
  appearance: NodeAppearance;
}

export function getNodesByTheme(themeId: ThemeId): NodeWithAppearance[] {
  const result: NodeWithAppearance[] = [];
  for (const node of nodes) {
    const appearance = node.appearances.find((a) => a.themeId === themeId);
    if (appearance) {
      result.push({ node, appearance });
    }
  }
  return result;
}

export function getNodeChildren(
  themeId: ThemeId,
  parentNodeId: string | null
): NodeWithAppearance[] {
  return getNodesByTheme(themeId).filter(
    ({ appearance }) => appearance.parentNodeId === parentNodeId
  );
}

export function getCrossThemeNodes(): Node[] {
  return nodes.filter((n) => n.appearances.length > 1);
}
