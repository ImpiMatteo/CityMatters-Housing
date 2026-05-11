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
