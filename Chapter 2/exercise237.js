const { mergeSort } = require("./mergeSort");
const { binarySearch } = require("./binarySearch");

function isSumX(arr, x)
{
    const sortedArr = mergeSort(arr);
    console.log("Sorted arr: " + sortedArr);

    for (let i = 0; i < sortedArr.length; i++)
    {
        const toSearch = x - sortedArr[i];
        const found = binarySearch(sortedArr, toSearch);
        if ( found !== -1 ) return [i, found];
    }

    return -1;
}


const arr = [15, 14, 25, 6, 3, 2, 7, 4, 8, 9, 10, 1, 0, -4, -12, -6, -2];
console.log("Found elements whose sum is 21 at indexes: " + isSumX(arr, 21));
console.log("Found elements whose sum is -1 at indexes: " + isSumX(arr, -1));
