// Top down approach
function memoizedCutRod(pricesArray: number[], rodLength: number): number
{
    const maxRevenues = [];
    for (let i = 0; i <= rodLength; i++)
    {
        maxRevenues[i] = -Infinity;
    }
    return memoizedCutRodAux(pricesArray, rodLength, maxRevenues);
}

function memoizedCutRodAux(pricesArray: number[], rodLength: number, maxRevenues: number[]): number
{
    if (maxRevenues[rodLength] >= 0) return maxRevenues[rodLength];

    let revenue: number;

    if (rodLength === 0)
    {
        revenue = 0;
    }
    else
    {
        revenue = -Infinity;
        for (let i = 1; i <= rodLength; i++)
        {
            revenue = Math.max(revenue, memoizedCutRodAux(pricesArray, rodLength-i, maxRevenues));
        }
    }

    maxRevenues[rodLength] = revenue;
    return revenue;
}




// Extended bottom up approach
// Prints the so 

function bottomUpCutRod(pricesArray: number[], rodLength: number): [number[], number[]]
{
    const maxRevenues: number[] = [];
    const firstPieceSizes: number[] = [];
    maxRevenues[0] = 0;
    let revenue: number;
    for (let j = 1; j <= rodLength; j++)
    {
        revenue = -Infinity;
        for (let i = 1; i <= j; i++)
        {
            revenue = Math.max(revenue, pricesArray[i] + maxRevenues[j-i]);
            firstPieceSizes[j] = i;
        }
        maxRevenues[j] = revenue;
    }
    return [maxRevenues, firstPieceSizes];
}

function printCutRodSolution(pricesArray: number[], rodLength: number): void
{
    let [, firstPieceSizes] = bottomUpCutRod(pricesArray, rodLength);
    while (rodLength > 0)
    {
        console.log(firstPieceSizes[rodLength]);
        rodLength -= firstPieceSizes[rodLength];
    }
}