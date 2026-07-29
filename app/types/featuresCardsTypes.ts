export interface TreeNode {
    id: string;
    val: number;
    name: string;
    x: number;
    y: number;
    status: "active" | "completed" | "pending";
    children: TreeNode[];
}

export interface ExecutionStep {
    line: number;
    activeNodeId: string | null;
    treeState: TreeNode | null;
    variables: { n: number; result?: number };
}