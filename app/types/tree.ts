export type TreeNodeStatus = "idle" | "active" | "partioning" | "comparing" | "swapping" | "sorted" | "pivot-placed";

export interface ReusableTreeNode {
    id : string;
    array : number[];
    status? : TreeNodeStatus;
    pivotIndex? : number;
    left? : ReusableTreeNode;
    right? : ReusableTreeNode;
}

export interface TreeStep {
    root : ReusableTreeNode;
    activeNodeId? : string;
    description : string;
}