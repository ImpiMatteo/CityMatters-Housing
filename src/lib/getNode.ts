import { nodes } from '@/data';
import type { Node } from '@/types';

export function getNode(nodeId: string): Node | undefined {
  return nodes.find((n) => n.id === nodeId);
}
