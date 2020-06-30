function findMaxSubarr(arr)
{
    return findMaxSubarrAux(arr, 0, arr.length);
}

function findMaxSubarrAux(arr, low, high)
{
    if (high === low) return [low, high, arr[high]];
    else
    {
        const mid = Math.floor((low + high) / 2);
        let left, right, cross;
        const [leftLow, leftHigh, leftSum] = left = findMaxSubarrAux(arr, low, mid);
        const [rightLow, rightHigh, rightSum] = right = findMaxSubarrAux(arr, mid+1, high);
        const [crossLow, crossHigh, crossSum] = cross = findMaxCrossingSubarr(arr, low, mid, high);

        if (leftSum >= rightSum && leftSum >= crossSum)
        {
            return left;
        }
        else if (rightSum >= leftSum && rightSum >= crossSum)
        {
            return right;
        }
        else
        {
            return cross;
        }
    }
}


function findMaxCrossingSubarr(arr, low, mid, high)
{
    let auxSum = 0;
    let leftSum = -Infinity;
    let leftIdx;

    for (let i = mid; i >= low; i--)
    {
        auxSum += arr[i];
        if (auxSum > leftSum)
        {
            leftSum = auxSum;
            leftIdx = i;
        }
    }


    auxSum = 0;
    let rightSum = -Infinity;
    let rightIdx;

    for (let i = mid + 1; i <= high; i++)
    {
        auxSum += arr[i];
        if (auxSum > rightSum)
        {
            rightSum = auxSum;
            rightIdx = i;
        }
    }

    return [leftIdx, rightIdx, leftSum + rightSum];
}


const arr = [13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7];
const [first, last, sum] = findMaxSubarr(arr);
console.log(`Max subarray: ${arr.slice(first, last+1)}`);
console.log(`Sum: ${sum}    Indexes: ${first} to ${last}`);

const negArr = [-1, -5, -8, -4, -67, -23, -98, -3, -5, -2, -5];
const [f, l, s] = findMaxSubarr(negArr);
console.log(`Max subarray: ${negArr.slice(f, l+1)}`);
console.log(`Sum: ${s}    Indexes: ${f} to ${l}`);