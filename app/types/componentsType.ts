export interface ActiveNode {
  id: string;
  label: number;
  x: number;
  y: number;
}

export interface CodeLine {
  text: string;
  token?: string;
  end?: string;
}

export interface GenericStep {
  stepIndex: number;
  currentCodeLine: number;
  message: string;
  activeNodes: ActiveNode[];
  highlightNodeIds: string[];
}