class ArrayNode
{
    constructor(num, index)
    {
        this.index = index;
        this.val = num;
        this.wonTo = [];
    }
}

function tournament(arr)
{
    if (arr.length === 1) return arr[0];
    else
    {
        let i = 0;
        const winners = [];
        if (arr.length % 2 !== 0)
        {
            winners.push(arr[0]);
            i = 1;
        }
        for (i; i < arr.length - 1; i += 2)
        {
            let winner = arr[i];
            let looser = arr[i+1];
            if (looser.val < winner.val)
            {
                [winner, looser] = [looser, winner];
            }
            
            winner.wonTo.push(looser.index);
            winners.push(winner);
        }
        return tournament(winners);
    }
}

function secondMin(arr)
{
    const copy = arr.map((num, index) => new ArrayNode(num, index));

    const winner = tournament(copy);
    return tournament(winner.wonTo.map(idx => copy[idx])).val;
}

const arr = [4, 6, 3, 8, 3, 9, 2, 5, 87, 3, 8, 2, 4, 56, 2, -32, -30, 0, 456, 876, 43];
const result = secondMin(arr);
console.log("Array: " + arr);
console.log("Second min:   " + result);