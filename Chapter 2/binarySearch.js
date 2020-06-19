function binarySearch(arr, element)
{
    if  (arr.length === 0)  return -1;
    else   return BSHelper(arr, element, 0, arr.length - 1);
}

function BSHelper(arr, element, low, high)
{
    if (low === high)
    {
        return arr[low] === element ? low : -1;
    }
    
    const half = Math.floor( (low + high) / 2);

    if (arr[half] === element)
    {
        return half;
    }

    else if (arr[half] > element)
    {
        if (half === low) return -1;

        return BSHelper( arr, element, low, half - 1 );
    }

    else
    {
        return BSHelper( arr, element, half + 1, high);
    }

}


exports.binarySearch = binarySearch;