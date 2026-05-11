'use client';

import { memo } from 'react';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import { useMapHover } from '../MapHoverContext';
import type { MapNodeData } from '../buildMapData';

export type MediumNodeType = Node<MapNodeData, 'medium'>;

function MediumNode({ id, data }: NodeProps<MediumNodeType>) {
  const { hoveredNodeId } = useMapHover();
  const isHovered = hoveredNodeId === id;

  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Top}
        style={{ opacity: 0, pointerEvents: 'none' }}
      />
      <div
        aria-label={data.label}
        className={[
          'px-3 py-1.5 rounded-full border-2 text-xs text-center',
          'cursor-default transition-colors duration-150 whitespace-nowrap',
          isHovered
            ? 'border-red-600 text-red-600 bg-white'
            : 'border-blue-900 text-blue-900 bg-white',
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

export default memo(MediumNode);
