function insertionSort(array)
{
    const copy = [...array];

    for (let i = 1; i < copy.length; i++)
    {
        let currentElement = copy[i];
        
        for (let j = i; j > 0; j--)
        {
            if (copy[j-1] > currentElement)
            {
                [copy[j-1], copy[j]] = [currentElement, copy[j-1]];
            }
            else break;
        }
    }

    return copy;
}


function nonIncreasingInsertionSort(array)
{
    const copy = [...array];

    for (let i = 1; i < copy.length; i++)
    {
        let currentElement = copy[i];
        
        for (let j = i; j > 0; j--)
        {
            if (copy[j-1] < currentElement)
            {
                [copy[j-1], copy[j]] = [currentElement, copy[j-1]];
            }
            else break;
        }
    }

    return copy;
}


const arr = [4, 6, 3, 8, 3, 9, 2, 5, 87, 3, 8, 2, 4, 56, 2, 456, 876, 43];
const sortedArr = insertionSort(arr);
const nonIncreasingSortedArr = nonIncreasingInsertionSort(arr);
console.log("Unsorted array: " + arr);
console.log("Sorted array: " + sortedArr);
console.log("Nonincreasing sorted arrey: " + nonIncreasingSortedArr);
