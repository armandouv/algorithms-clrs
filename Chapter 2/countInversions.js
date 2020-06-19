function countInversions(arr)
{
    const copy = [...arr];
    return countInversionsAux(copy, 0, copy.length - 1);
}



function countInversionsAux(arr, first, last)
{
    const size = last - first + 1;
    if (size <= 1) return 0;
    else if (size === 2)
    {
        if (arr[first] > arr[last])
        {
            [arr[first], arr[last]] = [arr[last], arr[first]];
            return 1;
        }
        else return 0;
    }

    const half = Math.floor( (first + last) / 2);
    const leftInv = countInversionsAux( arr, first, half );
    const rightInv = countInversionsAux( arr, half + 1, last );
    const inversions = mergeAndCount(arr, first, half, last) + leftInv + rightInv;

    return inversions;
}


function mergeAndCount(arr, first, half, last)
{
    const arr1 = [];
    const arr2 = [];

    for (let i = first; i <= half; i++)
    {
        arr1.push( arr[i] );
    }

    for (let i = half + 1; i <= last; i++)
    {
        arr2.push( arr[i] );
    }

    let mainIdx = first;
    let secondIdx = 0;
    let inversions = 0;

    for (let i = 0; i < arr1.length; i++)
    {
        while (secondIdx < arr2.length && arr1[i] > arr2[secondIdx])
        {
            arr[mainIdx] = arr2[secondIdx];
            mainIdx++;
            secondIdx++;
            inversions += arr1.length - i;
        }

        arr[mainIdx] = arr1[i];
        mainIdx++;
    }

    if (secondIdx < arr2.length)
    {
        for (let i = secondIdx; i < arr2.length; i++)
        {
            arr[mainIdx] = arr2[i];
            mainIdx++;
        }
    }

    return inversions;
}


const arr = [2, 3, 8, 6, 1];
const inversions = countInversions(arr);
console.log(`Number of inversions: ${inversions}`);