import { AnimationStep, TreeNode } from "@/app/types/visualizer";

export default function generateQuickSortSteps(initialArray: number[]): {
  steps: AnimationStep[];
  treeData: TreeNode;
} {
  const steps: AnimationStep[] = [];
  const arr = [...initialArray];
  const sortedIndices = new Set<number>();

  const cloneTree = (node: TreeNode): TreeNode => ({
    ...node,
    array: [...node.array],
    left: node.left ? cloneTree(node.left) : undefined,
    right: node.right ? cloneTree(node.right) : undefined,
  });

  const treeRoot: TreeNode = {
    id: "node-0-" + (arr.length - 1),
    array: [...arr],
    status: "idle",
  };

  const treeNodeMap = new Map<string, TreeNode>();
  treeNodeMap.set(`0-${arr.length - 1}`, treeRoot);

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;
    const nodeKey = `${low}-${high}`;
    const currentNode = treeNodeMap.get(nodeKey);

    if (currentNode) currentNode.status = "partitioning";

    // Step: Show Pivot Selection
    steps.push({
      array: [...arr],
      pivotIndex: high,
      pointers: { i, j: low },
      range: [low, high],
      sortedIndices: Array.from(sortedIndices),
      lineHighlight: 4,
      description: `Chosen pivot: ${pivot} at index ${high}`,
      treeData: cloneTree(treeRoot),
      activeNodeID: currentNode?.id,
    });

    for (let j = low; j < high; j++) {
      // Step: Compare current element with pivot
      steps.push({
        array: [...arr],
        comparing: [j, high],
        pivotIndex: high,
        pointers: { i, j },
        range: [low, high],
        sortedIndices: Array.from(sortedIndices),
        description: `Comparing ${arr[j]} with pivot ${pivot}`,
        treeData: cloneTree(treeRoot),
        activeNodeID: currentNode?.id,
      });

      if (arr[j] < pivot) {
        i++;
        const val1 = arr[i];
        const val2 = arr[j];

        // Swap elements
        [arr[i], arr[j]] = [arr[j], arr[i]];

        // Step: Swap execution
        steps.push({
          array: [...arr],
          swapping: [i, j],
          pivotIndex: high,
          pointers: { i, j },
          range: [low, high],
          sortedIndices: Array.from(sortedIndices),
          lineHighlight: 10,
          description: `Swapped ${val1} and ${val2} (element smaller than pivot)`,
          treeData: cloneTree(treeRoot),
          activeNodeID: currentNode?.id,
        });
      }
    }

    // Place pivot in correct position
    const valToSwap1 = arr[i + 1];
    const valToSwap2 = arr[high];
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    const pivotPos = i + 1;
    sortedIndices.add(pivotPos);

    if (currentNode) {
      currentNode.status = "pivot-placed";
      currentNode.pivotIndex = pivotPos;
    }

    // Step: Pivot placement
    steps.push({
      array: [...arr],
      swapping: [pivotPos, high],
      pivotIndex: pivotPos,
      sortedIndices: Array.from(sortedIndices),
      range: [low, high],
      lineHighlight: 13,
      description: `Placed pivot ${pivot} in its final position at index ${pivotPos}`,
      treeData: cloneTree(treeRoot),
      activeNodeID: currentNode?.id,
    });

    return pivotPos;
  }

  function solve(low: number, high: number) {
    if (low < high) {
      const parentKey = `${low}-${high}`;
      const parentNode = treeNodeMap.get(parentKey);

      const pi = partition(low, high);

      // Create Left and Right subtree references in the execution map
      if (pi - 1 >= low && parentNode) {
        parentNode.left = {
          id: `node-${low}-${pi - 1}`,
          array: arr.slice(low, pi),
          status: "idle",
        };
        treeNodeMap.set(`${low}-${pi - 1}`, parentNode.left);
      }

      if (pi + 1 <= high && parentNode) {
        parentNode.right = {
          id: `node-${pi + 1}-${high}`,
          array: arr.slice(pi + 1, high + 1),
          status: "idle",
        };
        treeNodeMap.set(`${pi + 1}-${high}`, parentNode.right);
      }

      solve(low, pi - 1);
      solve(pi + 1, high);
    } else if (low === high) {
      sortedIndices.add(low);
      const singleNodeKey = `${low}-${high}`;
      const singleNode = treeNodeMap.get(singleNodeKey);
      if (singleNode) singleNode.status = "sorted";
    }
  }

  solve(0, arr.length - 1);

  // Final Step: Completely sorted
  steps.push({
    array: [...arr],
    sortedIndices: Array.from({ length: arr.length }, (_, k) => k),
    lineHighlight: 1,
    description: "Array is completely sorted!",
    treeData: cloneTree(treeRoot),
  });

  return { steps, treeData: treeRoot };
}
