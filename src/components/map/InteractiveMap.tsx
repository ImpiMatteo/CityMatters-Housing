'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import { buildMapGraph } from '@/lib/buildMapGraph';
import { useForceLayout } from './useForceLayout';
import MapNodeComponent from './MapNode';
import MapEdgeComponent from './MapEdge';

const PAN_MARGIN = 200;

export default function InteractiveMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [transform, setTransform] = useState<d3.ZoomTransform>(d3.zoomIdentity);

  // Track container size
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const e = entries[0];
      setDims({ width: e.contentRect.width, height: e.contentRect.height });
    });
    obs.observe(el);
    setDims({ width: el.clientWidth, height: el.clientHeight });
    return () => obs.disconnect();
  }, []);

  // Create zoom behavior once
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.6, 2.5])
      .on('zoom', (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        setTransform(event.transform);
      });
    zoomRef.current = zoom;
    d3.select(svg).call(zoom);
    return () => {
      d3.select(svg).on('.zoom', null);
    };
  }, []);

  // Update translateExtent whenever container size changes
  useEffect(() => {
    const zoom = zoomRef.current;
    const svg = svgRef.current;
    if (!zoom || !svg || dims.width === 0 || dims.height === 0) return;
    zoom.translateExtent([
      [-PAN_MARGIN, -PAN_MARGIN],
      [dims.width + PAN_MARGIN, dims.height + PAN_MARGIN],
    ]);
    d3.select(svg).call(zoom);
  }, [dims]);

  const { nodes: mapNodes, edges: mapEdges } = useMemo(() => buildMapGraph(), []);
  const layout = useForceLayout(mapNodes, mapEdges, dims.width, dims.height);

  const highlightedEdgeIds = useMemo(() => {
    if (!hoveredNodeId || !layout) return new Set<string>();
    return new Set(
      layout.edges
        .filter((e) => e.source === hoveredNodeId || e.target === hoveredNodeId)
        .map((e) => e.id)
    );
  }, [hoveredNodeId, layout]);

  const handleEnter = useCallback((id: string) => setHoveredNodeId(id), []);
  const handleLeave = useCallback(() => setHoveredNodeId(null), []);

  const { width, height } = dims;

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ background: '#f5f0e4', overflow: 'hidden' }}
    >
      <svg
        ref={svgRef}
        width={width || '100%'}
        height={height || '100%'}
        style={{ display: 'block' }}
        aria-label="Interactive concept map: three interconnected urban housing themes"
      >
        <g transform={transform.toString()}>
          <g>
            {layout?.edges.map((edge) => (
              <MapEdgeComponent
                key={edge.id}
                edge={edge}
                isHighlighted={highlightedEdgeIds.has(edge.id)}
              />
            ))}
          </g>
          <g>
            {layout?.nodes.map((node) => (
              <MapNodeComponent
                key={node.id}
                node={node}
                isHovered={hoveredNodeId === node.id}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
