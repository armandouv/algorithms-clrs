function partition(arr, start, end)
{
    const pivot = arr[end];
    let i = start - 1;
    for (let j = start; j <= end - 1; j++)
    {
        if (arr[j] <= pivot)
        {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i+1], arr[end]] = [arr[end], arr[i+1]];
    return i+1;
}

function randomizedPartition(arr, start, end)
{
    const x = Math.floor(Math.random() * (end - start + 1)) + start;
    [arr[x], arr[end]] = [arr[end], arr[x]];
    return partition(arr, start, end);
}

function quickSortHelper(arr, start, end)
{
    if (start < end)
    {
        const pivot = randomizedPartition(arr, start, end);
        quickSortHelper(arr, start, pivot-1);
        quickSortHelper(arr, pivot+1, end);
    }
}

function quickSort(arr)
{
    const copy = [...arr];
    quickSortHelper(copy, 0, copy.length - 1);
    return copy;
}

module.exports = {randomizedPartition, quickSort};