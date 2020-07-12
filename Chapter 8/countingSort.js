function countingSort(arr, final, k)
{
    const idxArr = [];

    // idxArr = [0..0] indexes from 0 to k, k+1 elements
    for (let i = 0; i <= k; i++)
    {
        idxArr.push(0);
    }
    
    for (let el of arr)
    {
        idxArr[el]++;
    }
    // idxArr[i] now contains the number of elements equal to i

    for (let i = 1; i <= k; i++)
    {
        idxArr[i] += idxArr[i-1];
    }
    // idxArr[i] contains the number of elements <= i

    for (let i = arr.length-1; i >= 0; i--)
    {
        const toAdd = arr[i];
        idxArr[toAdd]--;
        final[idxArr[toAdd]] = toAdd;
    }

}


const arr = [4, 6, 3, 8, 3, 9, 2, 5, 87, 3, 8, 2, 4, 56, 2, 456, 876, 43];
const sortedArr = [];
countingSort(arr, sortedArr, 876);
console.log("Unsorted array: " + arr);
console.log("Sorted array:   " + sortedArr);

module.exports = countingSort;