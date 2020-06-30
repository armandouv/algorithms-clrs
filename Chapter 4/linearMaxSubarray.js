function maxSubarray(arr)
{
    let toDelSum = 0;

    let m = 0;
    let prospectSum = arr[0];

    let a = 0;
    let b = 0;
    let maxSum = arr[0];

    for (let i = 1; i < arr.length; i++)
    {
        prospectSum += arr[i];
        toDelSum += arr[i-1];

        if (toDelSum <= 0)
        {
            toDelSum = 0;
            m = i;
            prospectSum = arr[i];
        }


        if (prospectSum > maxSum)
        {
            a = m;
            b = i;
            maxSum = prospectSum;
        }
    }

    return [a, b, maxSum];
}

const arr = [13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7];
const [first, last, sum] = maxSubarray(arr);
console.log(`Max subarray: ${arr.slice(first, last+1)}`);
console.log(`Sum: ${sum}    Indexes: ${first} to ${last}`);

const negArr = [-1, -5, -8, -4, -67, -23, -98, -3, -5, -2, -5];
const [f, l, s] = maxSubarray(negArr);
console.log(`Max subarray: ${negArr.slice(f, l+1)}`);
console.log(`Sum: ${s}    Indexes: ${f} to ${l}`);