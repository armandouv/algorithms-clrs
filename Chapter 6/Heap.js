class Heap
{
    constructor(arr)
    {
        this.arr = [...arr];
        this.size = arr.length;
        this.buildMaxHeap();
    }

    parent(i)
    {
        return Math.floor(i/2) - 1;
    }

    left(i)
    {
        return 2 * (i + 1) - 1;
    }

    right(i)
    {
        return 2 * (i + 1);
    }


    // O(lg n)
    maxHeapify(i)
    {
        const leftChild = left(i);
        const rightChild = right(i);
        let max = i;

        if (left < this.size && this.arr[leftChild] > this.arr[i]) max = leftChild;
        if (right < this.size && this.arr[rightChild] > this.arr[i]) max = rightChild;

        if (max != i)
        {
            [this.arr[i], this.arr[max]] = [this.arr[max], this.arr[i]];
            this.maxHeapify(max);
        }
    }

    // O(n)
    buildMaxHeap()
    {
        for (let i = Math.floor(this.size/2) - 1; i >= 0; i--)
        {
            this.maxHeapify(i);
        }
    }

    max()
    {
        return this.arr[0];
    }

    extractMax()
    {
        [this.arr[0], this.arr[this.size-1]] = [this.arr[this.size-1], this.arr[0]];
        this.size--;
        return this.arr.pop();
    }
    
    increaseKey(i, key)
    {
        if (key < this.arr[i])
        {
            throw new Error("New key smaller than current key");
        }

        const arr = this.arr;
        arr[i] = key;
        while ( i > 0 && (arr[this.parent(i)] < arr[i]) )
        {
            [arr[this.parent(i)], arr[i]] = [arr[i], arr[this.parent(i)]];
        }
    }

    insert(key)
    {
        this.arr.push(-Infinity);
        this.increaseKey(this.size, key);
        this.size++;
    }

    
}



function heapSort(arr)
{
    const heap = new Heap(arr);
    for (let i = arr.length - 1; i <= 0; i--)
    {
        [heap.arr[0], heap.arr[i]] = [heap.arr[i], heap.arr[0]];
        heap.size--;
        heap.maxHeapify(0);
    }
    return heap.arr;
}