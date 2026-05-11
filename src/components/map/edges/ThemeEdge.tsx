'use client';

import { memo } from 'react';
import { getBezierPath, BaseEdge, type Edge, type EdgeProps } from '@xyflow/react';
import { useMapHover } from '../MapHoverContext';
import type { MapEdgeData } from '../buildMapData';

type ThemeEdgeType = Edge<MapEdgeData, 'theme'>;

function ThemeEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  source,
  target,
  data,
}: EdgeProps<ThemeEdgeType>) {
  const { hoveredNodeId } = useMapHover();
  const isHighlighted =
    hoveredNodeId !== null && (hoveredNodeId === source || hoveredNodeId === target);
  const isMainBranch = data?.isMainBranch ?? false;

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      style={{
        stroke: isHighlighted ? '#dc2626' : '#1e3a8a',
        strokeWidth: isMainBranch ? 3 : 1.5,
        transition: 'stroke 150ms ease',
      }}
    />
  );
}

export default memo(ThemeEdge);
