import { nodes as dataNodes, themes } from '@/data';
import type { ImportanceLevel, MapNode, MapEdge, ThemeId } from '@/types';

const levelPriority: Record<ImportanceLevel, number> = { alto: 3, medio: 2, basso: 1 };

export function buildMapGraph(): { nodes: MapNode[]; edges: MapEdge[] } {
  const centralNodeIds = new Set(themes.map((t) => t.centralNodeId));
  // Maps nodeId → themeId that owns it as its central node
  const centralNodeTheme = new Map<string, ThemeId>(
    themes.map((t) => [t.centralNodeId, t.id as ThemeId])
  );

  const mapNodes: MapNode[] = [];
  const mapEdges: MapEdge[] = [];

  for (const node of dataNodes) {
    const maxLevel = node.appearances.reduce<ImportanceLevel>((best, app) =>
      levelPriority[app.level] > levelPriority[best] ? app.level : best,
      'basso'
    );
    const isThemeCenter = centralNodeIds.has(node.id);
    mapNodes.push({
      id: node.id,
      label: node.label,
      level: maxLevel,
      themeIds: [...new Set(node.appearances.map((a) => a.themeId))],
      isThemeCenter,
      centerThemeId: isThemeCenter ? centralNodeTheme.get(node.id) : undefined,
    });

    for (const app of node.appearances) {
      if (!app.parentNodeId) continue;
      mapEdges.push({
        id: `${app.parentNodeId}--${node.id}--${app.themeId}`,
        source: app.parentNodeId,
        target: node.id,
        themeId: app.themeId,
        isMainBranch: centralNodeIds.has(app.parentNodeId),
      });
    }
  }

  return { nodes: mapNodes, edges: mapEdges };
}
