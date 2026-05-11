export type ImportanceLevel = 'alto' | 'medio' | 'basso';

export type ThemeId = '1' | '2' | '3';

export interface Theme {
  id: ThemeId;
  title: string;
  slug: string;
  description: string;
  centralNodeId: string;
}

export interface NodeAppearance {
  themeId: ThemeId;
  level: ImportanceLevel;
  parentNodeId: string | null;
}

export interface Node {
  id: string;
  label: string;
  appearances: NodeAppearance[];
}

export interface MapNode {
  id: string;
  label: string;
  level: ImportanceLevel;
  themeIds: ThemeId[];
  isThemeCenter: boolean;
  centerThemeId?: ThemeId;
}

export interface MapEdge {
  id: string;
  source: string;
  target: string;
  themeId: ThemeId;
  isMainBranch: boolean;
}
