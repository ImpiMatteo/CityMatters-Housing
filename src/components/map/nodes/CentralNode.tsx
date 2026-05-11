'use client';

import { memo } from 'react';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import { useMapHover } from '../MapHoverContext';
import type { MapNodeData } from '../buildMapData';

export type CentralNodeType = Node<MapNodeData, 'central'>;

function CentralNode({ id, data }: NodeProps<CentralNodeType>) {
  const { hoveredNodeId } = useMapHover();
  const isHovered = hoveredNodeId === id;

  return (
    <div className="relative w-[140px] h-[140px]">
      <Handle
        type="target"
        position={Position.Top}
        style={{ opacity: 0, pointerEvents: 'none' }}
      />
      <div
        aria-label={data.label}
        className={[
          'w-full h-full rounded-full flex items-center justify-center',
          'font-bold text-sm text-center leading-tight px-3',
          'cursor-default transition-colors duration-150',
          isHovered ? 'bg-red-600 text-white' : 'bg-blue-900 text-white',
        ].join(' ')}
      >
        {data.label}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ opacity: 0, pointerEvents: 'none' }}
      />
    </div>
  );
}

export default memo(CentralNode);
