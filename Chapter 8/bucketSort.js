"use strict"
const {mergeSort} = require("../Chapter 2/mergeSort.js");

function bucketSort(arr)
{
    const bucketsArr = [];
    for (let el of arr)
    {
        bucketsArr.push([]);
    }

    for (let el of arr)
    {
        bucketsArr[Math.floor(arr.length * el)].push(el);
    }

    const sortedArr = [];
    for (let bucket of bucketsArr)
    {
        const sortedBucket = mergeSort(bucket);
        for (let el of sortedBucket)
        {
            sortedArr.push(el);
        }
    }
    return sortedArr;
}

const arr = [4, 6, 8, 3, 9, 2, 5, 87, 3, 8, 2, 4, 56, 2, 456, 876, 43].map(e => e/1000);
const sortedArr = bucketSort(arr);
console.log("Unsorted array: " + arr.map(e => e*1000));
console.log("Sorted array:   " + sortedArr.map(e => e*1000));