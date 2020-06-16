/*             CORRECTNESS PROOF  

Loop invariant: At the start of every iteration, if the elements in
A[0...i-1] (inclusive) don't contain the desired element,
the algorithm hasn't halted yet.

Initialization: No elements have been analyzed yet. In this
case, we consider A[0...-1] an empty array. Given that, it
obviously doesn't contain the desired element.

Maintenance: Assuming the element wasn't present in A[0...i-1],
in every iteration we compare the current element A[i] with the 
searched one. If there is a match, the algorithm halts and returns
i, the index where the element was found. Else, the loop continues
executing. Since we didn't find the element in A[i], A[0...i] won't 
contain the element, preserving the invariant.

Termination: Assuming the element isn't present in the whole array,
then the algorithm returns -1 as an invalid index, which means the
desired element wasn't found. If the element was found, then the
algorithm halted before the loop execution.


*/


function linearSearch(arr, value)
{
    for (let i = 0; i < arr.length; i++)
    {
        if (arr[i] == value) return i;
    }

    return -1;
}

const arr = [4,6,3,8,3,9,2,5,87,3,8,2,4,56,2,456,876,43];
const toSearch = [87, 43542, 56, 0, 456, 600, 6, 500, 5];
console.log("Array: " + arr);

toSearch.forEach((val) => {
    const found = linearSearch(arr, val);
    const message = (found !== -1) ? `${val} found at position ${found}` : `${val} not found`;
    console.log(message);
});