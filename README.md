# CityMatters Housing

An interactive concept map exploring urban housing challenges across three themes: **Monitoring** (care and surveillance of elderly people living alone), **Energy class** (energy efficiency, income, and housing adaptation), and **Boundaries** (new family models, co-housing, and social connections). Cross-theme nodes are highlighted to reveal conceptual links between maps.

## Tech stack

- **Next.js 14** — App Router, fully static (SSG)
- **TypeScript** (strict mode)
- **Tailwind CSS v4**
- **React Flow v12** (`@xyflow/react`) — interactive map canvas
- **dagre** (`@dagrejs/dagre`) — automatic hierarchical layout
- **Vercel** — zero-config deploy target

## Local setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build check
npm run lint
npm run format
```

## Project structure

```
src/
├── app/
│   ├── page.tsx                       # Homepage — full-screen interactive map
│   ├── themes/[themeId]/page.tsx      # Theme page with node hierarchy
│   └── nodes/[nodeId]/page.tsx        # Node detail with all appearances
├── components/
│   ├── map/
│   │   ├── InteractiveMap.tsx         # React Flow canvas (client component)
│   │   ├── MapHoverContext.tsx        # Hover state context
│   │   ├── buildMapData.ts            # dagre layout → RF nodes/edges
│   │   ├── nodes/                     # CentralNode, MediumNode, LowNode
│   │   └── edges/ThemeEdge.tsx        # Custom edge with hover highlight
│   ├── Navigation.tsx
│   ├── NodeItem.tsx
│   └── ThemeMap.tsx
├── data/                              # themes.ts, nodes.ts — source of truth
├── lib/                               # getTheme, getNode, getNodeRelations
└── types/                             # Shared TypeScript types
```

## Current status

**Phase 2 — Frontend & interactive map implemented.** Visual design and content refinements ongoing.

The homepage features a full-screen interactive concept map with three theme clusters (dagre TB layout). Hovering a node highlights it in red and highlights its direct edge connections. All 45 nodes and 21 cross-theme nodes are visible and navigable.
