import { AnimationStep, TreeNode } from "@/app/types/visualizer";

function cloneTree(node : TreeNode) : TreeNode {
    return {
        id : node.id,
        array : [...node.array],
        status : node.status,
        left : node.left ? cloneTree(node.left) : undefined,
        right : node.right ? cloneTree(node.right) : undefined
    }
}

function updateNodeInTree(
    root : TreeNode,
    targetID : string,
    updateFn : (node : TreeNode) => void
) : TreeNode {
    const newRoot = cloneTree(root);

    function dfs(current : TreeNode) : boolean {
        if(current.id === targetID) {
            updateFn(current);
            return true;
        }
        if(current.left && dfs(current.left))
            return true;
        if(current.right && dfs(current.right))
            return true
        return false;
    }
    dfs(newRoot);
    return newRoot;
}

export default function generateMergeSortSteps(initialArray : number[]) : AnimationStep[] {
    const steps : AnimationStep[] = [];

    let currentTree : TreeNode = {
        id : "root",
        array : [...initialArray],
        status : "idle"
    };

    steps.push({
        treeData : cloneTree(currentTree),
        activeNodeID : "root",
        lineHighlight : 16,
        description : "Start merge sort recursion tree",
    });
    
    function f(nodeID : string, arr : number[]) : number[] {
        if(arr.length <= 1) {
            currentTree = updateNodeInTree(currentTree, nodeID, (node) => {
                node.status = "sorted"
            });
            steps.push({
                treeData : cloneTree(currentTree),
                activeNodeID : nodeID,
                lineHighlight : 17,
                description : `Base case reached for element [${arr.join(", ")}]`
            });
            return arr;
        }

        const mid = Math.floor(arr.length / 2);
        const leftArray = arr.slice(0, mid);
        const rightArray = arr.slice(mid);

        const leftID = `${nodeID}-L`;
        const rightID = `${nodeID}-R`;

        currentTree = updateNodeInTree(currentTree, nodeID, (node) => {
            node.status = "split",
            node.left = {
                id : leftID,
                array : [...leftArray],
                status : "idle",
            }
            node.right = {
                id : rightID,
                array : [...rightArray],
                status : "idle",
            }
        });

        steps.push({
            treeData : cloneTree(currentTree),
            activeNodeID : nodeID,
            lineHighlight : 18,
            description : `Dividing [${arr.join(", ")}] into left [${leftArray.join(", ")}] and right [${rightArray.join(", ")}]]`,
        });

        const leftSorted = f(leftID, leftArray);
        const rightSorted = f(rightID, rightArray);

        currentTree = updateNodeInTree(currentTree, nodeID, (node) => {
            node.status = "merging";
        });

        steps.push({
            treeData : cloneTree(currentTree),
            activeNodeID : nodeID,
            lineHighlight : 21,
            description : `Merging sorted left [${leftSorted.join(", ")}] and right [${rightSorted.join(", ")}]`
        });

        const merged : number[] = [];
        let i = 0;
        let j = 0;

        while(i < leftSorted.length && j < rightSorted.length) {
            if(leftSorted[i] <= rightSorted[j]) {
                merged.push(leftSorted[i]);
                i++;
            } else {
                merged.push(rightSorted[j]);
                j++;
            }
        }

        while(i < leftSorted.length) {
            merged.push(leftSorted[i]);
            i++;
        }

        while(j < rightSorted.length) {
            merged.push(rightSorted[j]);
            j++;
        }

        currentTree = updateNodeInTree(currentTree, nodeID, (node) => {
            node.array = [...merged];
            node.status = "sorted";
        });

        steps.push({
            treeData : cloneTree(currentTree),
            activeNodeID : nodeID,
            lineHighlight : 12,
            description : `Subarray merged & sorted: [${merged.join(", ")}]`
        });
        
        return merged;
    }
    f("root", initialArray);
    return steps;
}