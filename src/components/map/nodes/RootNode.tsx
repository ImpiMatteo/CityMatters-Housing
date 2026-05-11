'use client';

import { memo } from 'react';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import { useMapHover } from '../MapHoverContext';
import type { RootNodeData } from '../buildMapData';

export type RootNodeType = Node<RootNodeData, 'root'>;

function RootNode({ id, data }: NodeProps<RootNodeType>) {
  const { hoveredNodeId } = useMapHover();
  const isHovered = hoveredNodeId === id;

  return (
    <div className="relative w-[76px] h-[76px]">
      <Handle
        type="target"
        position={Position.Top}
        style={{ opacity: 0, pointerEvents: 'none' }}
      />
      <div
        aria-label={`Theme ${data.number}`}
        className={[
          'w-full h-full rounded-full flex items-center justify-center',
          'text-3xl font-bold text-white cursor-default select-none',
          'transition-colors duration-150',
          isHovered ? 'bg-[#e63946]' : 'bg-[#1a2744]',
        ].join(' ')}
      >
        {data.number}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ opacity: 0, pointerEvents: 'none' }}
      />
    </div>
  );
}

export default memo(RootNode);
