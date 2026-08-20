// Snapshot of a single animation frame
export interface AnimationStep {
    array : number[];               // Current state of array values
    comparing : number[];           // Indices being compared (e.g. [j], [j + 1])
    swapping : number[];            // Indices being swapped
    sorted : number[];              // Indices in their sorted order
    lineHighlight? : number;        // Code editor line number to highlight
    description? : string           // Text explanation of the current step    
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