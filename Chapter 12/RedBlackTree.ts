enum Color { Red, Black }

class RedBlackNode
{
    key: number;
    data: any;
    parent: RedBlackNode;
    left: RedBlackNode;
    right: RedBlackNode;
    color: Color;

    constructor(
        key: number,
        data: any,
        parent?: RedBlackNode,
        left?: RedBlackNode,
        right?: RedBlackNode,
        color?: Color)
    {

    }
}

class RedBlackTree
{
    root: RedBlackNode;
    nil: RedBlackNode;

    constructor()
    {
        this.nil = new RedBlackNode(NaN, null, null, null, null, Color.Black);
        this.root = this.nil;
    }



    search(key: number, root: RedBlackNode = this.root): RedBlackNode
    {
        if (root === this.nil)
        {
            console.log("Not found");
            return this.nil;
        }

        if (key === root.key) return root;
        else if (key < root.key) return this.search(key, root.left);
        else return this.search(key, root.right);
    }



    minimum(root: RedBlackNode = this.root): RedBlackNode
    {
        while (root.left !== this.nil)
        {
            root = root.left;
        }
        return root;
    }



    maximum(root: RedBlackNode = this.root): RedBlackNode
    {
        while (root.right !== this.nil)
        {
            root = root.right;
        }
        return root;
    }



    predecessor(root: RedBlackNode = this.root): RedBlackNode
    {
        if (root.left !== this.nil) return this.maximum(root.left);
        let trav = root.parent;

        while (trav !== this.nil && trav.left === root)
        {
            root = trav;
            trav = trav.parent;
        }
        return trav;
    }



    successor(root: RedBlackNode = this.root): RedBlackNode
    {
        if (root.right !== this.nil) return this.minimum(root.right);
        let trav = root.parent;

        while (trav !== this.nil && trav.right === root)
        {
            root = trav;
            trav = trav.parent;
        }
        return trav;
    }



    insert(toInsert: RedBlackNode): void
    {
        if (this.root === this.nil)
        {
            this.root = toInsert;
            toInsert.color = Color.Black;
            return;
        }

        let parent = this.root;
        let child = toInsert.key < parent.key ? parent.left : parent.right;

        while (child !== this.nil)
        {
            parent = child;
            child = toInsert.key < child.key ? child.left : child.right;
        }
        toInsert.parent = parent;

        if (toInsert.key < parent.key)
        {
            parent.left = toInsert;
        }
        else
        {
            parent.right = toInsert;
        }

        toInsert.left = toInsert.right = this.nil;
        toInsert.color = Color.Red;
        this.insertFixup(toInsert);
    }



    delete(toDelete: RedBlackNode): void
    {
        let colorDeleted = toDelete.color;
        let unbalancedNode: RedBlackNode;

        if (toDelete.left === this.nil)
        {
            unbalancedNode = toDelete.right;
            this.transplant(toDelete, toDelete.right);
        }
        else if (toDelete.right === this.nil)
        {
            unbalancedNode = toDelete.left;
            this.transplant(toDelete, toDelete.left);
        }
        else
        {
            let replacement = this.minimum(toDelete.right);
            colorDeleted = replacement.color;
            unbalancedNode = replacement.right;

            if (replacement.parent === toDelete)
            {
                // In case that the unbalanced node is NIL
                unbalancedNode.parent = replacement;
            }
            else
            {
                this.transplant(replacement, unbalancedNode);
                replacement.right = toDelete.right;
                replacement.right.parent = replacement;
            }

            this.transplant(toDelete, replacement);
            replacement.left = toDelete.left;
            replacement.left.parent = replacement;
            replacement.color = toDelete.color;
        }


        if (colorDeleted === Color.Black)
        {
            this.deleteFixup(unbalancedNode);
        }
    }



    private leftRotate(x: RedBlackNode): void
    {
        let y = x.right;
        x.right = y.left;
        if (y.left !== this.nil)
        {
            y.left.parent = x;
        }

        y.parent = x.parent

        if (x.parent === this.nil)
        {
            this.root = y;
        }
        else if (x === x.parent.left)
        {
            x.parent.left = y;
        }
        else
        {
            x.parent.right = y;
        }

        y.left = x;
        x.parent = y;
    }



    private rightRotate(x: RedBlackNode): void
    {
        let y = x.left;
        x.left = y.right;
        if (y.right !== this.nil)
        {
            y.right.parent = x;
        }

        y.parent = x.parent

        if (x.parent === this.nil)
        {
            this.root = y;
        }
        else if (x === x.parent.left)
        {
            x.parent.left = y;
        }
        else
        {
            x.parent.right = y;
        }

        y.right = x;
        x.parent = y;
    }



    private insertFixup(inserted: RedBlackNode): void
    {
        let trav = inserted;
        while (trav.parent.color === Color.Red)
        {
            let grandparent = trav.parent.parent;
            let uncle: RedBlackNode;
            let parentIsLeftChild = false;

            if (grandparent.left === trav.parent)
            {
                uncle = grandparent.right;
                parentIsLeftChild = true;
            }
            else
            {
                uncle = grandparent.left;
            }

            // Case 1: Uncle is also red (trav and trav.parent are). "Bubble up" the violation.
            if (uncle.color === Color.Red)
            {
                uncle.color = trav.parent.color = Color.Black;
                grandparent.color = Color.Red;
                trav = grandparent;
            }
            else // Cases 2 and 3
            {
                // Parent is a left child. We expect trav to be a left child also, in order to
                // apply case 3 straight, namely, perform a right rotation at the grandparent.
                // Else, we shall apply case 2.

                let unexpectedSideChild = trav.parent.right;
                let case2Rotation = this.leftRotate;
                let case3Rotation = this.rightRotate;

                // Parent is a right child. We expect trav to be a right child also, in order to 
                // apply case 3 straight, namely, perform a left rotation at the grandparent.
                // Else, we shall apply case 2.
                if (!parentIsLeftChild)
                {
                    unexpectedSideChild = trav.parent.left;
                    case2Rotation = this.rightRotate;
                    case3Rotation = this.leftRotate;
                }

                // Case 2: Uncle is black. Transform into case 3.
                if (trav === unexpectedSideChild)
                {
                    trav = trav.parent;
                    case2Rotation(trav);
                }
                // Case 3: Uncle is black. Trav is a left child if its parent is.
                // The same argument applies if trav is a right child. Correct violotion.
                trav.parent.color = Color.Black;
                trav.parent.parent.color = Color.Red;
                case3Rotation(trav.parent.parent);
            }

        }

        // End of loop. Correct possible root color violation.
        this.root.color = Color.Black;
    }



    private transplant(original: RedBlackNode, replacement: RedBlackNode): void
    {
        replacement.parent = original.parent;
        if (original.parent === this.nil)
        {
            this.root = replacement;
        }
        else if (original === original.parent.left)
        {
            original.parent.left = replacement;
        }
        else
        {
            original.parent.right = replacement;
        }
    }



    private deleteFixup(unbalancedNode: RedBlackNode): void
    {
        // The subtree rooted at unbalancedNode has one less black node at this point

        while (unbalancedNode !== this.root && unbalancedNode.color !== Color.Red)
        {
            if (unbalancedNode === unbalancedNode.parent.left)
            {
                let sibling = unbalancedNode.parent.right;

                // Case 1: Sibling is red. Transform into case 2, 3 or 4. If
                // it turns into case 2, loop will terminate.
                if (sibling.color === Color.Red)
                {
                    sibling.color = Color.Black;
                    unbalancedNode.parent.color = Color.Red;
                    this.leftRotate(unbalancedNode.parent);
                    sibling = unbalancedNode.parent.right;
                }
                // In cases 2, 3 and 4 sibling's color is Black
                // Case 2: sibling's children are black. "Bubble up" the violation.
                if (sibling.left.color === Color.Black && sibling.right.color === Color.Black)
                {
                    sibling.color = Color.Red;
                    unbalancedNode = unbalancedNode.parent;
                }
                else // Cases 3 and 4, at least one sibling's children is white
                {
                    // Case 3: sibling's right child is black. Transform into case 4.
                    if (sibling.right.color === Color.Black)
                    {
                        sibling.left.color = Color.Black;
                        sibling.color = Color.Red;
                        this.rightRotate(sibling);
                        sibling = unbalancedNode
                    }

                    // Case 4: sibling's right child is white. Correct violation and finish loop execution.
                    sibling.color = unbalancedNode.parent.color;
                    unbalancedNode.parent.color = sibling.right.color = Color.Black;
                    this.leftRotate(unbalancedNode.parent);
                    break;
                }
            }
            else
            {
                // Same as then clause, with left and right inverted.
            }
        }

        unbalancedNode.color = Color.Black;
    }
}