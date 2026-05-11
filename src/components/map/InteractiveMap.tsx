'use client';

import '@xyflow/react/dist/style.css';
import { useMemo, useState } from 'react';
import {
  ReactFlow,
  Background,
  type NodeTypes,
  type EdgeTypes,
} from '@xyflow/react';
import { buildMapData } from './buildMapData';
import { MapHoverContext } from './MapHoverContext';
import CentralNode from './nodes/CentralNode';
import MediumNode from './nodes/MediumNode';
import LowNode from './nodes/LowNode';
import ThemeEdge from './edges/ThemeEdge';

// Defined at module level so React Flow doesn't re-register on every render
const nodeTypes: NodeTypes = {
  central: CentralNode,
  medium: MediumNode,
  low: LowNode,
};

const edgeTypes: EdgeTypes = {
  theme: ThemeEdge,
};

export default function InteractiveMap() {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const { nodes, edges } = useMemo(() => buildMapData(), []);

  return (
    <MapHoverContext.Provider value={{ hoveredNodeId }}>
      <div
        className="w-full h-full"
        role="img"
        aria-label="Interactive concept map showing three urban housing themes: Monitoring, Energy class, and Boundaries"
      >
        <ReactFlow
          defaultNodes={nodes}
          defaultEdges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={{ padding: 0.08 }}
          panOnDrag
          zoomOnScroll
          zoomOnPinch
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          onNodeMouseEnter={(_, node) => setHoveredNodeId(node.id)}
          onNodeMouseLeave={() => setHoveredNodeId(null)}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#e2e8f0" gap={32} size={1} />
        </ReactFlow>
      </div>
    </MapHoverContext.Provider>
  );
}
