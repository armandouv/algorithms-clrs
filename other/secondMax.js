class MaxNumbers
{
    constructor(max, secondMax)
    {
        this.max = max;
        this.secondMax = secondMax;
    }
}


function secondMax(arr)
{
    const half = Math.floor(arr.length / 2);
    const x = getMaxNums( arr.slice(0, half) );
    const y = getMaxNums( arr.slice(half) );

    const secondMaxExistsX = !Number.isNaN(x.secondMax);
    const secondMaxExistsY = !Number.isNaN(y.secondMax);

    if (x.max > y.max)
    {
        if (!secondMaxExistsX || y.max > x.secondMax)
        {
            return y.max;
        }
        else
        {
            return x.secondMax;
        }
    }

    else if (x.max < y.max)
    {
        if (!secondMaxExistsY || x.max > y.secondMax)
        {
            return x.max;
        }
        else
        {
            return y.secondMax;
        }
    }
    else
    {
        if (!secondMaxExistsX)
        {
            return secondMaxExistsY ? y.secondMax : "No second maximum value";
        }
        else if (!secondMaxExistsY)
        {
            return secondMaxExistsX ? x.secondMax : "No second maximum value";
        }
 
        return x.secondMax > y.secondMax ? x.secondMax : y.secondMax;
    }
}

function getMaxNums(arr)
{
    if (arr.length == 1)
    {
        return new MaxNumbers(arr[0], NaN);
    }
    else if (arr.length == 2)
    {
        let max, secondMax;
        if (arr[0] > arr[1])
        {
            max = arr[0];
            secondMax = arr[1];
        }
        else if (arr[0] < arr[1])
        {
            max = arr[1];
            secondMax = arr[0];
        }
        else
        {
            max = arr[0];
            secondMax = NaN;
        }
        return new MaxNumbers(max, secondMax);
    }

    const half = Math.floor(arr.length / 2);
    const x = getMaxNums( arr.slice(0, half) );
    const y = getMaxNums( arr.slice(half) );
    let max;
    let secondMax;
    const secondMaxExistsX = !Number.isNaN(x.secondMax);
    const secondMaxExistsY = !Number.isNaN(y.secondMax);

    if (x.max > y.max)
    {
        max = x.max;
        secondMax = y.max > x.secondMax ? y.max : x.secondMax;
    }

    else if (x.max < y.max)
    {
        max = y.max;
        secondMax = x.max > y.secondMax ? x.max : y.secondMax;
    }

    else
    {
        max = x.max;
        
        
        if (secondMaxExistsY)
        {
            secondMax = y.secondMax > x.secondMax ? y.secondMax : x.secondMax;
        }
        else
        {
            secondMax = x.secondMax > y.secondMax ? x.secondMax : y.secondMax;
        }
    }

    return new MaxNumbers(max, secondMax);

}


secondMax([1, 2, 3, 4, 5, 6, 7, 8, 10, 23, 432, 4321, 21]);