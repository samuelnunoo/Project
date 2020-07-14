export interface parseDOM {
  tag?: string;
  namespace?: string;
  style?: string;
  priority?: number;
  context?: string;
  node?: string;
  mark?: string;
}
export interface NodeSpec {
  content: string;
  draggable?: boolean;
  parseDOM: Array<parseDOM>;
  toDOM: () => Array<any>;
}
