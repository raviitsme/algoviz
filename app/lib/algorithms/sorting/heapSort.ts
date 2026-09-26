import { AnimationStep } from "@/app/types/visualizer";

export default function generateHeapSortSteps(initialArray: number[]): AnimationStep[] {
    const steps: AnimationStep[] = [];
    const arr = [...initialArray];
    const n = arr.length;

    steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [],
        lineHighlight: 1,
        description: "Initiating heap sort, building max-heap from the initial array."
    });

    function heapify(size: number, i: number, sortedIndices: number[]) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        const compareList: number[] = [i];
        if (left < size) compareList.push(left);
        if (right < size) compareList.push(right);

        steps.push({
            array: [...arr],
            comparing: compareList,
            swapping: [],
            sorted: [...sortedIndices],
            range: [0, size - 1],
            lineHighlight: 5,
            description: `Comparing index ${i} (${arr[i]}) to its left/right children`,
        });

        if (left < size && arr[left] > arr[largest])
            largest = left;

        if (right < size && arr[right] > arr[largest])
            largest = right;

        if (largest !== i) {
            steps.push({
                array: [...arr],
                comparing: [],
                swapping: [i, largest],
                sorted: [...sortedIndices],
                range: [0, size - 1],
                lineHighlight: 0,
                description: `Found max value : Swapping index ${i} (${arr[i]}) and index ${largest} (${arr[largest]}).`
            });

            const temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;

            heapify(size, largest, sortedIndices);
        }
    }

    const sortedIndices: number[] = [];

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i, sortedIndices);
    }

    steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [],
        range: [0, n - 1],
        lineHighlight: 12,
        description: "Max-Heap successfully built! Now we will extract the largest element in the end.",
    });
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        steps.push({
            array: [...arr],
            comparing: [],
            swapping: [0, i],
            sorted: [...sortedIndices],
            range: [0, i],
            lineHighlight: 15,
            description: `Sending root element (Max: ${arr[0]}) to end index ${i}.`,
        });

        const temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        sortedIndices.push(i);

        steps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: [...sortedIndices],
            range: [0, i - 1],
            lineHighlight: 18,
            description: `Element ${temp} has been set at the sorted position [${i}]. We will now heapify the remaining area.`,
        });

        // Call max heapify on the reduced heap
        heapify(i, 0, sortedIndices);
    }

    sortedIndices.push(0);

    steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, idx) => idx),
        lineHighlight: 22,
        description: "Complete heap sorted all values are sorted in the order.",
    });

    return steps;
}