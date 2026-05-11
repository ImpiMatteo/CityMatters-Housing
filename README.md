# CityMatters Housing

Sito web interattivo che presenta tre mappe concettuali su tematiche abitative urbane: **Monitoring** (sorveglianza e cura degli anziani), **Energy class** (efficienza energetica e reddito), **Boundaries** (nuovi modelli familiari e confini sociali). I nodi trasversali tra le mappe evidenziano le connessioni concettuali tra i temi.

## Stack tecnologico

- **Next.js 14** — App Router, Static Site Generation
- **TypeScript** (strict mode)
- **Tailwind CSS v4**
- **Node.js 22 LTS**

## Comandi

```bash
npm install       # installa le dipendenze
npm run dev       # avvia il server di sviluppo su http://localhost:3000
npm run build     # build di produzione
npm run lint      # linting ESLint
npm run format    # formattazione Prettier
```

## Struttura cartelle (breve)

```
src/
├── app/
│   ├── page.tsx                  # Homepage — scelta dei tre temi
│   ├── themes/[themeId]/page.tsx # Pagina del tema con gerarchia nodi
│   └── nodes/[nodeId]/page.tsx   # Dettaglio di un singolo nodo
├── components/
│   ├── Navigation.tsx
│   ├── ThemeCard.tsx
│   ├── NodeItem.tsx              # Rendering ricorsivo con figli
│   └── ThemeMap.tsx
├── data/
│   ├── themes.ts                 # Definizione dei 3 temi
│   └── nodes.ts                  # Tutti i nodi con apparizioni e gerarchie
├── lib/                          # Helper: getTheme, getNode, getNodeRelations
└── types/                        # Tipi TypeScript condivisi
```

## Stato attuale

**Fase 1 — struttura funzionale, design da definire.**

Tutte le pagine sono navigabili e i dati sono completamente modellati da `mappe_temi.md`. Il visual design (colori, tipografia, layout avanzato) sarà definito nella fase successiva.
