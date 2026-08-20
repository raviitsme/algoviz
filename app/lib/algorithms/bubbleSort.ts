import { AnimationStep } from "@/app/types/visualizer";

function swap(a : number, b : number) {
    const temp = a;
    a = b;
    b = temp;
}

export default function generateBubbleSortSteps(initalArray : number[]) : AnimationStep[] {
    const steps : AnimationStep[] = [];
    const arr = [...initalArray];
    const n = arr.length;
    const sortedIndices : number[] = [];

    steps.push({
        array : [...arr],
        comparing : [],
        swapping : [],
        sorted : [],
        lineHighlight : 1,
        description : "Starting bubble sort, on inital array."
    });

    for(let i = 0; i < n - 1; i++) {
        for(let j = 0; j = n - i - 1; j++) {
            steps.push({   
                array : [...arr],
                comparing : [j, j + 1],
                swapping : [],
                sorted : [...sortedIndices],
                lineHighlight : 4,
                description : `Comparing index ${j} (${arr[j]}) and index ${j + 1} (${arr[j + 1]})`,
            });

            if(arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                
                steps.push({
                    array : [...arr],
                    comparing : [],
                    swapping : [j, j + 1],
                    sorted : [...sortedIndices],
                    lineHighlight : 6,
                    description : `Swapped ${arr[j + 1]} and ${arr[j]} because ${arr[j + 1]} > ${arr[j]}`,
                });
            }
        }
        sortedIndices.push(n - 1 - i);
    }

    sortedIndices.push(0);

    steps.push({
        array : [...arr],
        comparing : [],
        swapping : [],
        sorted : Array.from({ length : n }, (_, idx) => idx),
        lineHighlight : 10,
        description : "Bubble sort completed all elements are in sorted order."
    })

    return steps;
}