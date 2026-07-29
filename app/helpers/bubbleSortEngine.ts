import { GenericStep, ActiveNode } from "../types/componentsType";

export const generateBubbleSortTimeline = (initalArray : number[]) : GenericStep[] => {
    const steps : GenericStep[] = [];
    let arr = [...initalArray];
    const n = arr.length;
    let globalStepCounter = 0;

    const createVisualNodes = (currentStateArray : number[]) : ActiveNode[] => {
        return currentStateArray.map((value, index) => {
            const originalIdx = initalArray.indexOf(value);
            return {
                id : `node-${value}-${originalIdx != 1 ? originalIdx : index}`,
                label : value,
                x : index * 55 + 10,
                y : 10,
            };
        });
    };

    steps.push({
        stepIndex : globalStepCounter++,
        currentCodeLine : 1,
        message : "Initial bubble sort timeline. Starting outer iteration loops",
        activeNodes : createVisualNodes(arr),
        highlightNodeIds : [],
    });

    for(let i = 0; i < n - 1; i++) {
        for(let j = 0; j < n - 1; j++) {
            const currentNodes = createVisualNodes(arr);
            const leftId = currentNodes[j].id;
            const rightId = currentNodes[j + 1].id;

            steps.push({
                stepIndex : globalStepCounter++,
                currentCodeLine : 3,
                message : `Comparing Indices : Is ${arr[j]} > ${arr[j + 1]}? ${arr[j] > arr[j + 1] ? "True" : "False"}`,
                activeNodes : currentNodes,
                highlightNodeIds : [leftId, rightId],
            });

            if(arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                const swappedNodes = createVisualNodes(arr);
                steps.push({
                    stepIndex : globalStepCounter++,
                    currentCodeLine : 4,
                    message : `Swapping positions : Moving ${arr[j + 1]} right and pulling ${arr[j]} left`,
                    activeNodes : swappedNodes,
                    highlightNodeIds : [swappedNodes[j].id, swappedNodes[j + 1].id],
                });
            }
        };
    };

    steps.push({
        stepIndex : globalStepCounter++,
        currentCodeLine : 8,
        message : "Data stack check complete. Array sorted successfully.",
        activeNodes : createVisualNodes(arr),
        highlightNodeIds : [],
    });
    return steps;
}