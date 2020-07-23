class BinaryNode
{
    key: number;
    data: unknown;
    parent: NodeOrNull;
    left: NodeOrNull;
    right: NodeOrNull;
}

type NodeOrNull = BinaryNode | null;

class BinaryTree
{
    root: NodeOrNull;

    constructor(root: NodeOrNull)
    {
        this.root = root;
    }

    search(key: number, root: NodeOrNull = this.root): NodeOrNull
    {
        if (!root || root.key === key) return root;
        else if (root.key < key) return this.search(key, root.left);
        else return this.search(key, root.right);
    }

    minimum(root: BinaryNode = this.root)
    {
        while(root.left)
        {
            root = root.left;
        }
        return root;
    }

    maximum(root: BinaryNode = this.root)
    {
        while(root.right)
        {
            root = root.right;
        }
        return root;
    }

    successor(root: BinaryNode = this.root)
    {
        if (root.right) return this.minimum(root.right);
        let trav = root.parent;

        while (trav && trav.right === root)
        {
            root = trav;
            trav = trav.parent;
        }
        return trav;
    }

    predecessor(root: BinaryNode = this.root)
    {
        if (root.left) return this.maximum(root.left);
        let trav = root.parent;

        while (trav && trav.left === root)
        {
            root = trav;
            trav = trav.parent;
        }
        return trav;
    }

    insert(node: BinaryNode)
    {
        if (!this.root)
        {
            this.root = node;
            return;
        }

        let parent = this.root;
        let child = node.key < parent.key ? parent.left : parent.right;

        while (child)
        {
            parent = child;
            child = node.key < child.key ? child.left : child.right;
        }

        node.parent = parent;

        if (node.key < parent.key)
        {
            parent.left = node;
        }
        else
        {
            parent.right = node;
        }
    }

    delete(node: BinaryNode)
    {
        if (!node.left)
        {
            this.transplant(node, node.right);
        }
        else if (!node.right)
        {
            this.transplant(node, node.left);
        }
        else
        {
            let successor = this.minimum(node.right);
            if (successor.parent !== node)
            {
                this.transplant(successor, successor.right);
                successor.right = node.right;
                successor.right.parent = successor;
            }
            this.transplant(node, successor);
            successor.left = node.left;
            successor.left.parent = successor;
        }
    }

    private transplant(original: BinaryNode, replacement: NodeOrNull)
    {
        if (!original.parent)
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

        if (replacement)
        {
            replacement.parent = original.parent;
        }

    }
}