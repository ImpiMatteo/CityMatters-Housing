'use client';

import type { LayoutEdge } from './useForceLayout';

interface Props {
  edge: LayoutEdge;
  isHighlighted: boolean;
}

export default function MapEdge({ edge, isHighlighted }: Props) {
  const { sx, sy, tx, ty, isMainBranch } = edge;

  const mx = (sx + tx) / 2;
  const my = (sy + ty) / 2;
  // Small perpendicular offset for a soft curve
  const dx = tx - sx;
  const dy = ty - sy;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const curv = Math.min(len * 0.12, 25);
  const cpx = mx - (dy / len) * curv;
  const cpy = my + (dx / len) * curv;

  const d = `M ${sx} ${sy} Q ${cpx} ${cpy} ${tx} ${ty}`;

  const strokeWidth = isMainBranch ? 2.5 : 1.5;
  const strokeColor = isHighlighted ? '#e63946' : '#1a2744';
  const opacity = isHighlighted ? 0.9 : isMainBranch ? 0.55 : 0.35;
  const dashArray = isHighlighted ? undefined : '5 4';

  return (
    <path
      d={d}
      fill="none"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeDasharray={dashArray}
      opacity={opacity}
      style={{ transition: 'stroke 150ms ease, opacity 150ms ease' }}
    />
  );
}
