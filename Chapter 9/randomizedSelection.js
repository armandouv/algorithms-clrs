const {randomizedPartition, quickSort} = require("../Chapter 7/quickSort");

// order is zero-based
function randomizedSelection(arr, start, end, order)
{
    if (start === end) return arr[start];

    const pivot = randomizedPartition(arr, start, end);
    const firstPartElements = pivot - start;

    if (order === firstPartElements)
    {
        return arr[pivot];
    }
    else if (order < firstPartElements)
    {
        return randomizedSelection(arr, start, pivot - 1, order);
    }
    else
    {
        return randomizedSelection(arr, pivot + 1, end, order-firstPartElements+1);
    }
}

const arr = [4, 6, 3, 8, 3, 9, 2, 5, 87, 3, 8, 2, 4, 56, 2, 456, 876, 43];
const sortedArr = quickSort(arr);
const seventhOrder = randomizedSelection([...arr], 0, arr.length-1, 6);
console.log("Unsorted array: " + arr);
console.log("Sorted array: " + sortedArr);
console.log("Seventh order statistic: " + seventhOrder);