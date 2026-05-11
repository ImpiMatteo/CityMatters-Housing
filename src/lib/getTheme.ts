import { themes } from '@/data';
import type { Theme, ThemeId } from '@/types';

export function getTheme(themeId: ThemeId): Theme | undefined {
  return themes.find((t) => t.id === themeId);
}
