// Snapshot of a single animation frame
export interface AnimationStep {
    array? : number[];               // Current state of array values
    comparing? : number[];           // Indices being compared (e.g. [j], [j + 1])
    highlights? : number[]           // Active comparing indices 
    swapping? : number[];            // Indices being swapped
    sortedIndices? : number[];      // Already Sorted bounds
    range? : [number, number];      // Active sub array range [left, right]
    sorted? : number[];              // Indices in their sorted order
    lineHighlight? : number;        // Code editor line number to highlight
    description? : string           // Text explanation of the current step    
    treeData? : TreeNode,
    activeNodeID? : string,
}

export interface TreeNode {
    id : string,
    array : number[],
    status : "idle" | "split" | "merging" | "sorted",
    left? : TreeNode | undefined,
    right? : TreeNode | undefined,
}

// Controls for the animation player
export type PlaybackStatus = "idle" | "playing" | "paused" | "completed";

export interface VisualizerState {
    array : number[];
    steps : AnimationStep[];
    currentStep : number;
    status : PlaybackStatus;
    speed : number;                 // Delay in ms between steps
}

export type AlgorithmCategory = "sorting" | "searching" | "graph" | "dp";

export interface AlgorithmItem {
    id : string;
    name : string;
    category : AlgorithmCategory;
}