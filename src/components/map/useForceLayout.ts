'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { MapNode, MapEdge } from '@/types';

export interface SimNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  level: 'alto' | 'medio' | 'basso';
  themeIds: string[];
  isThemeCenter: boolean;
  centerThemeId?: string;
  targetX: number;
  targetY: number;
}

export interface SimLink extends d3.SimulationLinkDatum<SimNode> {
  id: string;
  themeId: string;
  isMainBranch: boolean;
}

export interface LayoutEdge {
  id: string;
  source: string;
  target: string;
  themeId: string;
  isMainBranch: boolean;
  sx: number;
  sy: number;
  tx: number;
  ty: number;
}

export interface LayoutResult {
  nodes: (SimNode & { x: number; y: number })[];
  edges: LayoutEdge[];
}

const PAD = 16; // minimum gap between node boundaries

function collisionRadius(node: SimNode): number {
  if (node.isThemeCenter || node.level === 'alto') {
    return 38 + PAD;
  }
  if (node.level === 'medio') {
    // Match pill geometry from MapNode.tsx: pillW = label.length * 7 + 44
    const pillW = node.label.length * 7 + 44;
    return pillW / 2 + PAD;
  }
  // basso — text-only
  return (node.label.length * 6) / 2 + PAD;
}

export function useForceLayout(
  mapNodes: MapNode[],
  mapEdges: MapEdge[],
  width: number,
  height: number
): LayoutResult | null {
  const [result, setResult] = useState<LayoutResult | null>(null);
  const simRef = useRef<d3.Simulation<SimNode, SimLink> | null>(null);

  useEffect(() => {
    if (width === 0 || height === 0) return;

    const cx = width / 2;
    const cy = height / 2;
    // Slightly tighter triangle so clusters don't escape viewport
    const radius = Math.min(width, height) * 0.28;

    const themeAnchors: Record<string, { x: number; y: number }> = {
      '1': { x: cx - radius * 0.866, y: cy + radius * 0.45 },  // Monitoring  — bottom-left
      '2': { x: cx,                  y: cy - radius * 0.85 },  // Energy class — top-center
      '3': { x: cx + radius * 0.866, y: cy + radius * 0.45 },  // Boundaries  — bottom-right
    };

    function centerOfMass(themeIds: string[]): { x: number; y: number } {
      const xs = themeIds.map((t) => themeAnchors[t]?.x ?? cx);
      const ys = themeIds.map((t) => themeAnchors[t]?.y ?? cy);
      return {
        x: xs.reduce((a, b) => a + b, 0) / xs.length,
        y: ys.reduce((a, b) => a + b, 0) / ys.length,
      };
    }

    const simNodes: SimNode[] = mapNodes.map((n) => {
      const cm = centerOfMass(n.themeIds);
      const startPos =
        n.isThemeCenter && n.centerThemeId ? themeAnchors[n.centerThemeId] : cm;
      return {
        ...n,
        targetX: cm.x,
        targetY: cm.y,
        x: startPos.x + (Math.random() - 0.5) * 4,
        y: startPos.y + (Math.random() - 0.5) * 4,
      };
    });

    const nodeById = new Map(simNodes.map((n) => [n.id, n]));

    const simLinks: SimLink[] = mapEdges
      .map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        themeId: e.themeId,
        isMainBranch: e.isMainBranch,
      }))
      .filter((e) => nodeById.has(e.source) && nodeById.has(e.target));

    // Hard-pin the three theme centers
    for (const n of simNodes) {
      if (n.isThemeCenter && n.centerThemeId) {
        const anchor = themeAnchors[n.centerThemeId];
        if (anchor) {
          n.fx = anchor.x;
          n.fy = anchor.y;
        }
      }
    }

    const sim = d3
      .forceSimulation<SimNode>(simNodes)
      .force(
        'link',
        d3
          .forceLink<SimNode, SimLink>(simLinks)
          .id((d) => d.id)
          .distance(170)
          .strength(0.38)
      )
      .force('charge', d3.forceManyBody<SimNode>().strength(-700))
      .force(
        'collide',
        d3
          .forceCollide<SimNode>()
          .radius((d) => collisionRadius(d))
          .strength(1)
          .iterations(4)
      )
      .force('x', d3.forceX<SimNode>((d) => d.targetX).strength(0.20))
      .force('y', d3.forceY<SimNode>((d) => d.targetY).strength(0.20))
      .alphaDecay(0.018)
      .on('end', flush);

    simRef.current = sim;

    let rafId: number;
    sim.on('tick', () => {
      rafId = requestAnimationFrame(flush);
    });

    function flush() {
      const frozen = simNodes.map((n) => ({ ...n, x: n.x ?? 0, y: n.y ?? 0 }));
      const linkForce = sim.force<d3.ForceLink<SimNode, SimLink>>('link');
      const resolvedLinks = linkForce ? (linkForce.links() as SimLink[]) : simLinks;

      const edges: LayoutEdge[] = resolvedLinks.map((l) => {
        const s = l.source as SimNode;
        const t = l.target as SimNode;
        return {
          id: l.id,
          themeId: l.themeId,
          isMainBranch: l.isMainBranch,
          source: s.id,
          target: t.id,
          sx: s.x ?? 0,
          sy: s.y ?? 0,
          tx: t.x ?? 0,
          ty: t.y ?? 0,
        };
      });

      setResult({ nodes: frozen as (SimNode & { x: number; y: number })[], edges });
    }

    return () => {
      cancelAnimationFrame(rafId);
      sim.stop();
    };
  }, [mapNodes, mapEdges, width, height]);

  return result;
}
