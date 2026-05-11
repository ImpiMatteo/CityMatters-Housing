import Dagre from '@dagrejs/dagre';
import type { Node as RFNode, Edge as RFEdge } from '@xyflow/react';
import { nodes as dataNodes, themes } from '@/data';
import type { ImportanceLevel, ThemeId, NodeAppearance } from '@/types';

// ── Types ────────────────────────────────────────────────────────────────────

export interface RootNodeData extends Record<string, unknown> {
  number: ThemeId;
  themeId: ThemeId;
}

export interface MapNodeData extends Record<string, unknown> {
  label: string;
  themeId: ThemeId;
  nodeId: string;
  level: ImportanceLevel;
}

export interface MapEdgeData extends Record<string, unknown> {
  strokeLevel: 1 | 2 | 3;  // 1 = root→central (thickest), 2 = central→child, 3 = rest
  isSecondary: boolean;     // cross-theme edge rendered lighter
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const levelPriority: Record<ImportanceLevel, number> = { alto: 3, medio: 2, basso: 1 };

function getPrimaryAppearance(appearances: NodeAppearance[]): NodeAppearance {
  return appearances.reduce((best, curr) =>
    levelPriority[curr.level] > levelPriority[best.level] ? curr : best
  );
}

const levelToType: Record<ImportanceLevel, string> = {
  alto: 'central',
  medio: 'medium',
  basso: 'low',
};

// Dimensions passed to dagre (used for spacing calculations)
const dagreDims = {
  root:    { width: 90,  height: 90  },
  alto:    { width: 155, height: 58  },
  medio:   { width: 150, height: 48  },
  basso:   { width: 135, height: 36  },
};

// React Flow visual dimensions (for edge anchor calculation)
const rfDims = {
  root:    { width: 76,  height: 76  },
  alto:    { width: 130, height: 48  },
  medio:   { width: 130, height: 36  },
  basso:   { width: 115, height: 24  },
};

// ── Main build function ───────────────────────────────────────────────────────

export function buildMapData(): {
  nodes: RFNode<Record<string, unknown>>[];
  edges: RFEdge<MapEdgeData>[];
} {
  const g = new Dagre.graphlib.Graph()
    .setGraph({ rankdir: 'TB', nodesep: 55, ranksep: 95, marginx: 50, marginy: 50 })
    .setDefaultEdgeLabel(() => ({}));

  const rfNodes: RFNode<Record<string, unknown>>[] = [];
  const rfEdges: RFEdge<MapEdgeData>[] = [];
  const centralNodeIds = new Set(themes.map((t) => t.centralNodeId));

  // ── 1. Root nodes (numbered circles 1 / 2 / 3) ───────────────────────────
  for (const theme of themes) {
    const rootId = `root-${theme.id}`;
    g.setNode(rootId, dagreDims.root);

    rfNodes.push({
      id: rootId,
      type: 'root',
      position: { x: 0, y: 0 },
      data: { number: theme.id as ThemeId, themeId: theme.id as ThemeId } satisfies RootNodeData,
      width: rfDims.root.width,
      height: rfDims.root.height,
    });

    // Thick trunk edge: root → central theme node
    g.setEdge(rootId, theme.centralNodeId);
    rfEdges.push({
      id: `${rootId}→${theme.centralNodeId}`,
      source: rootId,
      target: theme.centralNodeId,
      type: 'theme',
      data: { strokeLevel: 1, isSecondary: false },
    });
  }

  // ── 2. All unique content nodes ───────────────────────────────────────────
  for (const node of dataNodes) {
    const primary = getPrimaryAppearance(node.appearances);
    const dims = dagreDims[primary.level];
    const vDims = rfDims[primary.level];

    g.setNode(node.id, dims);

    rfNodes.push({
      id: node.id,
      type: levelToType[primary.level],
      position: { x: 0, y: 0 },
      data: {
        label: node.label,
        themeId: primary.themeId,
        nodeId: node.id,
        level: primary.level,
      } satisfies MapNodeData,
      width: vDims.width,
      height: vDims.height,
    });

    // Primary parent edge (included in dagre layout)
    if (primary.parentNodeId) {
      const isMainBranch = centralNodeIds.has(primary.parentNodeId);
      g.setEdge(primary.parentNodeId, node.id);
      rfEdges.push({
        id: `${primary.parentNodeId}→${node.id}`,
        source: primary.parentNodeId,
        target: node.id,
        type: 'theme',
        data: { strokeLevel: isMainBranch ? 2 : 3, isSecondary: false },
      });
    }
    // Central nodes (parentNodeId: null) are already connected via root→central

    // Secondary edges: cross-theme connections, displayed but not used by dagre
    for (const app of node.appearances) {
      if (app === primary) continue;
      if (!app.parentNodeId) continue;
      rfEdges.push({
        id: `${app.parentNodeId}→${node.id}:x`,
        source: app.parentNodeId,
        target: node.id,
        type: 'theme',
        data: { strokeLevel: 3, isSecondary: true },
      });
    }
  }

  // ── 3. Run dagre layout ───────────────────────────────────────────────────
  Dagre.layout(g);

  for (const rfNode of rfNodes) {
    const pos = g.node(rfNode.id);
    if (!pos) continue;
    const w = (rfNode.width ?? 100) as number;
    const h = (rfNode.height ?? 40) as number;
    rfNode.position = {
      x: (pos.x ?? 0) - w / 2,
      y: (pos.y ?? 0) - h / 2,
    };
  }

  return { nodes: rfNodes, edges: rfEdges };
}
