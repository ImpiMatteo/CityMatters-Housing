'use client';

import { memo } from 'react';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import { useMapHover } from '../MapHoverContext';
import type { MapNodeData } from '../buildMapData';

export type LowNodeType = Node<MapNodeData, 'low'>;

function LowNode({ id, data }: NodeProps<LowNodeType>) {
  const { hoveredNodeId } = useMapHover();
  const isHovered = hoveredNodeId === id;

  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Top}
        style={{ opacity: 0, pointerEvents: 'none' }}
      />
      <span
        aria-label={data.label}
        className={[
          'px-1 py-0.5 text-xs text-center block',
          'cursor-default transition-colors duration-150 whitespace-nowrap',
          isHovered ? 'text-red-600' : 'text-blue-900',
        ].join(' ')}
      >
        {data.label}
      </span>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ opacity: 0, pointerEvents: 'none' }}
      />
    </div>
  );
}

export default memo(LowNode);
