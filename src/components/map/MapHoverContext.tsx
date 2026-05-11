'use client';

import { createContext, useContext } from 'react';

interface MapHoverContextValue {
  hoveredNodeId: string | null;
}

const MapHoverContext = createContext<MapHoverContextValue>({ hoveredNodeId: null });

export function useMapHover(): MapHoverContextValue {
  return useContext(MapHoverContext);
}

export { MapHoverContext };
