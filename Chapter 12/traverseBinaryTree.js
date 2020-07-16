function inorderTreeWalk(tree)
{
    if (tree)
    {
        inorderTreeWalk(tree.left);
        console.log(tree.key);
        inorderTreeWalk(tree.right);
    }
}

function preorderTreeWalk(tree)
{
    if (tree)
    {
        console.log(tree.key);
        inorderTreeWalk(tree.left);
        inorderTreeWalk(tree.right);
    }
}

function postorderTreeWalk(tree)
{
    if (tree)
    {
        inorderTreeWalk(tree.left);
        inorderTreeWalk(tree.right);
        console.log(tree.key);
    }
}


function inorderTreeWalkIterative(tree)
{
    const stack = [];
    let current = tree;

    while (true)
    {
        if (current)
        {
            stack.push(current);
            current = current.left;
        }
        else
        {
            if (stack.length > 0)
            {
                current = stack.pop();
                console.log(current.key);
                current = current.right;
            }
            else break;
        }
    }
}