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

  const strokeLevel = data?.strokeLevel ?? 3;
  const isSecondary = data?.isSecondary === true;

  const strokeWidth = strokeLevel === 1 ? 4.5 : strokeLevel === 2 ? 2.5 : 1.5;
  const stroke = isHighlighted ? '#e63946' : '#1a2744';
  const opacity = isHighlighted ? 1 : isSecondary ? 0.3 : strokeLevel === 1 ? 0.9 : 0.7;

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
        stroke,
        strokeWidth,
        opacity,
        transition: 'stroke 150ms ease, opacity 150ms ease',
        strokeDasharray: isSecondary && !isHighlighted ? '5 4' : undefined,
      }}
    />
  );
}

export default memo(ThemeEdge);
