function mergeSort(arr)
{
    if (arr.length <= 1) return arr;
    else if (arr.length === 2) return (arr[1] < arr[0] ? [arr[1], arr[0]] : arr);

    const half = Math.floor(arr.length / 2);
    const firstHalf = mergeSort(arr.slice(0, half));
    const secondHalf = mergeSort(arr.slice(half));
    const sortedArr = merge(firstHalf, secondHalf);

    return sortedArr;
}

function merge(arr1, arr2)
{
    const mergedArr = [];
    let secondIdx = 0;

    for (const el of arr1)
    {
        while (secondIdx < arr2.length && arr2[secondIdx] < el)
        {
            mergedArr.push(arr2[secondIdx]);
            secondIdx++;
        }

        mergedArr.push(el);
    }

    // Add the remaining elements if necessary
    if (secondIdx < arr2.length)
    {
        for (let i = secondIdx; i < arr2.length; i++)
        {
            mergedArr.push(arr2[i]);
        }
    }

    return mergedArr;
}



exports.mergeSort = mergeSort;