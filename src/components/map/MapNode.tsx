'use client';

import type { SimNode } from './useForceLayout';

interface Props {
  node: SimNode & { x: number; y: number };
  isHovered: boolean;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
}

const CHAR_W = 7;
const PILL_H = 36;
const PILL_PAD_X = 22;
const BG = '#f5f0e4'; // canvas background — used as halo stroke for basso nodes

function wrapLabel(label: string, maxCharsPerLine: number): string[] {
  const words = label.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const w of words) {
    const test = current ? `${current} ${w}` : w;
    if (test.length > maxCharsPerLine && current) {
      lines.push(current);
      current = w;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export default function MapNode({ node, isHovered, onMouseEnter, onMouseLeave }: Props) {
  const { id, label, level, isThemeCenter, x, y } = node;
  const navyOrRed = isHovered ? '#e63946' : '#1a2744';

  // ── Alto / theme center ───────────────────────────────────────────────────
  if (level === 'alto' || isThemeCenter) {
    const r = 38;
    const lines = wrapLabel(label, Math.floor((r * 2 - 12) / (CHAR_W * 0.9)));
    const lineH = 15;
    const totalH = lines.length * lineH;

    return (
      <g
        transform={`translate(${x},${y})`}
        onMouseEnter={() => onMouseEnter(id)}
        onMouseLeave={onMouseLeave}
        style={{ cursor: 'default', pointerEvents: 'all' }}
      >
        <circle r={r} fill={navyOrRed} />
        {lines.map((line, i) => (
          <text
            key={i}
            x={0}
            y={-totalH / 2 + i * lineH + lineH * 0.72}
            textAnchor="middle"
            fill="white"
            fontSize={13}
            fontWeight="bold"
            style={{ userSelect: 'none', pointerEvents: 'none' }}
          >
            {line}
          </text>
        ))}
      </g>
    );
  }

  // ── Medio — pill / stadium ────────────────────────────────────────────────
  if (level === 'medio') {
    const pillW = label.length * CHAR_W + PILL_PAD_X * 2;
    const rx = PILL_H / 2; // rx === height/2 produces perfect semicircle ends

    return (
      <g
        transform={`translate(${x},${y})`}
        onMouseEnter={() => onMouseEnter(id)}
        onMouseLeave={onMouseLeave}
        style={{ cursor: 'default', pointerEvents: 'all' }}
      >
        <rect
          x={-pillW / 2}
          y={-PILL_H / 2}
          width={pillW}
          height={PILL_H}
          rx={rx}
          ry={rx}
          fill="white"
          stroke={navyOrRed}
          strokeWidth={1.5}
          style={{ transition: 'stroke 150ms' }}
        />
        <text
          x={0}
          y={0}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={12}
          fill={navyOrRed}
          style={{ transition: 'fill 150ms', userSelect: 'none', pointerEvents: 'none' }}
        >
          {label}
        </text>
      </g>
    );
  }

  // ── Basso — text with white halo ──────────────────────────────────────────
  return (
    <g
      transform={`translate(${x},${y})`}
      onMouseEnter={() => onMouseEnter(id)}
      onMouseLeave={onMouseLeave}
      style={{ cursor: 'default', pointerEvents: 'all' }}
    >
      <rect
        x={-(label.length * CHAR_W) / 2 - 6}
        y={-10}
        width={label.length * CHAR_W + 12}
        height={20}
        fill="transparent"
      />
      <text
        x={0}
        y={0}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={10}
        fill={isHovered ? '#e63946' : '#1a2744'}
        stroke={BG}
        strokeWidth={4}
        paintOrder="stroke"
        style={{ userSelect: 'none', pointerEvents: 'none' }}
      >
        {label}
      </text>
    </g>
  );
}
