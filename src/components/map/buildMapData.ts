import Dagre from '@dagrejs/dagre';
import type { Node as RFNode, Edge as RFEdge } from '@xyflow/react';
import { nodes as dataNodes, themes } from '@/data';
import type { ImportanceLevel, ThemeId } from '@/types';

type NodeType = 'central' | 'medium' | 'low';

const levelToType: Record<ImportanceLevel, NodeType> = {
  alto: 'central',
  medio: 'medium',
  basso: 'low',
};

// Dagre spacing dimensions (slightly larger than visual for breathing room)
const dagreDims: Record<ImportanceLevel, { width: number; height: number }> = {
  alto: { width: 160, height: 160 },
  medio: { width: 170, height: 50 },
  basso: { width: 150, height: 40 },
};

// React Flow visual dimensions
const rfDims: Record<ImportanceLevel, { width: number; height: number }> = {
  alto: { width: 140, height: 140 },
  medio: { width: 150, height: 36 },
  basso: { width: 130, height: 24 },
};

export interface MapNodeData extends Record<string, unknown> {
  label: string;
  themeId: ThemeId;
  nodeId: string;
  level: ImportanceLevel;
}

export interface MapEdgeData extends Record<string, unknown> {
  isMainBranch: boolean;
}

export type MapRFNode = RFNode<MapNodeData, NodeType>;
export type MapRFEdge = RFEdge<MapEdgeData, 'theme'>;

interface PositionedNode {
  rfId: string;
  nodeId: string;
  label: string;
  level: ImportanceLevel;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface EdgeEntry {
  source: string;
  target: string;
  isMainBranch: boolean;
}

function layoutCluster(themeId: ThemeId, centralNodeId: string) {
  const g = new Dagre.graphlib.Graph()
    .setGraph({ rankdir: 'TB', nodesep: 60, ranksep: 80, marginx: 20, marginy: 20 })
    .setDefaultEdgeLabel(() => ({}));

  type AppEntry = {
    rfId: string;
    nodeId: string;
    label: string;
    level: ImportanceLevel;
    parentNodeId: string | null;
  };

  const appearances: AppEntry[] = [];

  for (const node of dataNodes) {
    const app = node.appearances.find((a) => a.themeId === themeId);
    if (!app) continue;
    const rfId = `${themeId}-${node.id}`;
    appearances.push({ rfId, nodeId: node.id, label: node.label, level: app.level, parentNodeId: app.parentNodeId });
    const d = dagreDims[app.level];
    g.setNode(rfId, { width: d.width, height: d.height });
  }

  const rfIdSet = new Set(appearances.map((a) => a.rfId));
  const centralRfId = `${themeId}-${centralNodeId}`;
  const edges: EdgeEntry[] = [];

  for (const app of appearances) {
    if (!app.parentNodeId) continue;
    const srcRfId = `${themeId}-${app.parentNodeId}`;
    if (!rfIdSet.has(srcRfId)) continue;
    g.setEdge(srcRfId, app.rfId);
    edges.push({ source: srcRfId, target: app.rfId, isMainBranch: srcRfId === centralRfId });
  }

  Dagre.layout(g);

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;

  const positioned: PositionedNode[] = appearances.map((app) => {
    const pos = g.node(app.rfId);
    const d = rfDims[app.level];
    const x = (pos?.x ?? 0) - d.width / 2;
    const y = (pos?.y ?? 0) - d.height / 2;
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x + d.width);
    minY = Math.min(minY, y);
    return { rfId: app.rfId, nodeId: app.nodeId, label: app.label, level: app.level, x, y, width: d.width, height: d.height };
  });

  return { positioned, edges, clusterWidth: maxX - minX, minX, minY };
}

export function buildMapData(): { nodes: MapRFNode[]; edges: MapRFEdge[] } {
  const rfNodes: MapRFNode[] = [];
  const rfEdges: MapRFEdge[] = [];
  const CLUSTER_GAP = 250;
  let offsetX = 0;

  for (const theme of themes) {
    const { positioned, edges, clusterWidth, minX, minY } = layoutCluster(
      theme.id as ThemeId,
      theme.centralNodeId
    );

    for (const n of positioned) {
      rfNodes.push({
        id: n.rfId,
        type: levelToType[n.level],
        position: { x: n.x - minX + offsetX, y: n.y - minY },
        data: { label: n.label, themeId: theme.id as ThemeId, nodeId: n.nodeId, level: n.level },
        width: n.width,
        height: n.height,
      } as MapRFNode);
    }

    for (const e of edges) {
      rfEdges.push({
        id: `${e.source}→${e.target}`,
        source: e.source,
        target: e.target,
        type: 'theme',
        data: { isMainBranch: e.isMainBranch },
      });
    }

    offsetX += clusterWidth + CLUSTER_GAP;
  }

  return { nodes: rfNodes, edges: rfEdges };
}
