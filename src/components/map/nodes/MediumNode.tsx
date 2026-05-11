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
          'px-3.5 py-1.5 rounded-full border whitespace-nowrap',
          'text-xs cursor-default select-none text-center',
          'transition-colors duration-150',
          isHovered
            ? 'border-[#e63946] text-[#e63946] bg-[#f5f0e4]'
            : 'border-[#1a2744] text-[#1a2744] bg-[#f5f0e4]',
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
