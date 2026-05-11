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
          'block px-1 py-0.5 text-[11px] text-center whitespace-nowrap',
          'cursor-default select-none transition-colors duration-150',
          isHovered ? 'text-[#e63946]' : 'text-[#1a2744]',
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
