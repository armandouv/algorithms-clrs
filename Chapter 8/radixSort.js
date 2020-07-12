function modifiedCountingSort(arr, currentIndex)
{
    const idxArr = [];
    const final = [];

    for (let i = 0; i <= 9; i++)
    {
        idxArr.push(0);
    }
    
    for (let number of arr)
    {
        idxArr[number[currentIndex]]++;
    }
    // idxArr[i] now contains the number of elements equal to i

    for (let i = 1; i <= 9; i++)
    {
        idxArr[i] += idxArr[i-1];
    }
    // idxArr[i] contains the number of elements <= i

    for (let i = arr.length-1; i >= 0; i--)
    {
        const toAdd = (arr[i])[currentIndex];
        idxArr[toAdd]--;
        final[idxArr[toAdd]] = arr[i];
    }

    return final;

}

function radixSort(arr, digits)
{
    let copy = arr.map((el) => {
        let str = el.toString();
        if (str.length < digits)
        {
            str = str.padStart(digits, '0');
        }
        return str;
    });

    for (let i = digits-1; i >= 0; i--)
    {
        copy = modifiedCountingSort(copy, i);
    }

    return copy.map(str => Number(str));
}


const arr = [4, 6, 3, 8, 3, 9, 2, 5, 87, 3, 8, 2, 4, 56, 2, 456, 876, 43];
const sortedArr = radixSort(arr, 3);
console.log("Unsorted array: " + arr);
console.log("Sorted array:   " + sortedArr);