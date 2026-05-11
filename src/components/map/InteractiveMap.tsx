'use client';

import '@xyflow/react/dist/style.css';
import { useMemo, useState } from 'react';
import { ReactFlow, type NodeTypes, type EdgeTypes } from '@xyflow/react';
import { buildMapData } from './buildMapData';
import { MapHoverContext } from './MapHoverContext';
import RootNode from './nodes/RootNode';
import CentralNode from './nodes/CentralNode';
import MediumNode from './nodes/MediumNode';
import LowNode from './nodes/LowNode';
import ThemeEdge from './edges/ThemeEdge';

const nodeTypes: NodeTypes = {
  root: RootNode,
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
        style={{ background: '#f5f0e4' }}
        role="img"
        aria-label="Interactive concept map: three interconnected urban housing themes"
      >
        <ReactFlow
          defaultNodes={nodes}
          defaultEdges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={{ padding: 0.06 }}
          panOnDrag
          zoomOnScroll
          zoomOnPinch
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          onNodeMouseEnter={(_, node) => setHoveredNodeId(node.id)}
          onNodeMouseLeave={() => setHoveredNodeId(null)}
          proOptions={{ hideAttribution: true }}
          style={{ background: '#f5f0e4' }}
        />
      </div>
    </MapHoverContext.Provider>
  );
}
