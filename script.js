class Node {

    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr)
    }

    buildTree(arr) {
        //input: array 
        //output: middle element with the array sorted and no duplicates 
        let sorted = mergeSort([...new Set(arr)]); // sorts the array and gets rid of duplicates 
        let mid = Math.floor(sorted.length / 2)// finds root element for binary search tree
        let leftArray = sorted.slice(0, mid);
        let rightArray = sorted.slice(mid + 1, sorted.length);
        let rootElement = new Node(sorted[mid]);
        this.recursiveBST(rootElement, leftArray, rightArray);


        return rootElement;
    }

    recursiveBST(node, left, right) {

        if (left.length > 0) {
            let leftMiddle = Math.floor((left.length / 2));
            let leftArray = left.slice(0, leftMiddle);
            let leftRight = left.slice(leftMiddle + 1, left.length);
            node.left = new Node(left[leftMiddle]);
            this.recursiveBST(node.left, leftArray, leftRight);
        }
        if (right.length > 0) {
            let rightMiddle = Math.floor(right.length / 2);
            let rightLeft = right.slice(0, rightMiddle);
            let rightArray = right.slice(rightMiddle + 1, right.length);
            node.right = new Node(right[rightMiddle]);
            this.recursiveBST(node.right, rightLeft, rightArray);
        }
    }

    insert(value) {
        this.insertRec(this.root, value)
    }

    insertRec(root, value) {
        //input: the current root node and value to be inserted 
        //output: new value NODE inserted/linked correctly
        if (root == null) {
            let root = new Node(value);
            this.root = root;
            return
        }

        if (value < root.data) {
            if (root.left == null) {
                let valueNode = new Node(value);
                root.left = valueNode;
            } else {
                this.insertRec(root.left, value);
            }

        } else if (value > root.data) {
            if (root.right == null) {
                let valueNode = new Node(value);
                root.right = valueNode;
            } else {
                this.insertRec(root.right, value);
            }
        }
    }

    delete(value) {
        this.deleteRec(this.root, value)
    }

    deleteRec(root, value, parent = null) {
        //input: root node and value on node to delete 
        //output: deleted node with correct changes to links 
        if (root == null) {
            return //nothing bc it is deleting 
        }

        if (root.data < value) {
            this.deleteRec(root.right, value, root);

        } else if (root.data > value) {
            this.deleteRec(root.left, value, root)

        } else {
            if (root.left == null && root.right == null) {
                parent.left = null;
                parent.right = null;
            } else if (root.left == null) {
                if (parent.left == root) {
                    parent.left = root.right;
                } else {
                    parent.right = root.right;
                }
            } else if (root.right == null) {
                if (parent.left == root) {
                    parent.left = root.left;
                } else {
                    parent.right = root.left;
                }
            } else if (root.left != null && root.right != null) {
                let current = root.right;
                let newParent = root;
                while (current.left != null) {
                    newParent = current;
                    current = current.left;
                }
                if (newParent == root) {
                    newParent.right = null;
                } else {
                    newParent.left = null;
                }

                root.data = current.data;

            }
        }

    }

    find(value) {
        //input:value of wanted node
        //output: the node with given value
        let current = this.root;
        while (current.data != value) {
            if (current.data < value) {
                current = current.right;
            } else if (current.data > value) {
                current = current.left;
            }
        }

        return current;

    }

    levelOrder(fun = null) {
        let queue = []
        let arr = [];
        if (this.root == null) {
            return arr; //return nothing in queue
        } else {
            queue.push(this.root);
        }

        while (queue.length != 0) {
            if (fun != null) {
                arr.push(fun(queue[0]));
            } else {
                arr.push(queue[0].data);
            }

            if (queue[0].left != null) {
                queue.push(queue[0].left);
            }

            if (queue[0].right != null) {
                queue.push(queue[0].right);
            }
            queue.shift();
        }
        return arr;
    }

    inorder(fun = null) {
        return this.inorderRec(this.root, fun);

    }
    inorderRec(root, fun = null, arr = [],) {
        //input: function;
        //output of arr w/values in inorder traverse

        if (root == null) {
            return arr; //return nothing in queue
        }

        if (root.left != null) {
            arr = this.inorderRec(root.left, fun, arr);
        }

        if (fun != null) {
            arr.push(fun(root.data))
        } else {
            arr.push(root.data);
        }

        if (root.right != null) {
            arr = this.inorderRec(root.right, fun, arr);
        }

        return arr;

    }

    preorder(fun = null) {
        return this.preorderRec(this.root, fun);
    }
    preorderRec(root, fun = null, arr = []) {
        //input: function;
        //output of arr w/values in preorder traverse

        if (root == null) {
            return arr; //return nothing in queue
        }

        if (fun != null) {
            let self = this;
            arr.push(fun(self,root));
           
        } else {
            arr.push(root.data);
        }

        if (root.left != null) {
            arr = this.preorderRec(root.left, fun, arr);
        }

        if (root.right != null) {
            arr = this.preorderRec(root.right, fun, arr);
        }

        return arr;

    }

    postorder(fun = null) {
        return this.postorderRec(this.root, fun);
    }

    postorderRec(root, fun = null, arr = []) {
        if (root == null) {
            return arr; //return nothing in queue
        }

        if (root.right != null) {
            arr = this.postorderRec(root.right, fun, arr);
        }

        if (root.left != null) {
            arr = this.postorderRec(root.left, fun, arr)
        }

        if (fun != null) {
            arr.push(fun(root.data));
        } else {
            arr.push(root.data);
        }

        return arr;
    }
    height(value) {
        let node = this.find(value);
        return this.heightRec(node);
    }
    heightRec(root, steps = 0) {
        if (root == null) {
            return
        }

        if (root.left == null && root.right == null) {
            return steps;
        } else {
            let rightLength = 0;
            let leftLength = 0;
            if (root.left != null) {
                leftLength = this.heightRec(root.left, steps + 1);
            }
            if (root.right != null) {
                rightLength = this.heightRec(root.right, steps + 1);
            }
            if (leftLength > rightLength) {
                return leftLength;
            } else {
                return rightLength;
            }
        }


    }

    depth(value) {
        let node = this.find(value);
        let current = this.root;
        let steps = 0;
        while (current.data != node.data) {
            if (current.data < node.data) {
                steps++;
                current = current.right;
            } else if (current.data > value) {
                current = current.left;
                steps++
            }
        }
        return steps;
    }

    isNodebalanced(self,node){
    //find the heights (starting at root.left and root.right); 
       
        let leftvalue = self.heightRec(node.left);
        let rightvalue= self.heightRec(node.right);
        let value = Math.abs(leftvalue-rightvalue);
        if(value>1){
            return false;
        }else{
            return true;
        }
    }

    isBalanced() {
        //INPUT: tree /used with tree 
        //OUTPUT: true/false (boolean value) of if it is balanced 

        //STEP 1: make arr of true and false

        let arr = this.preorder(this.isNodebalanced);

         //Step 2: loop through arr to find if there is a false;
         let statement = true;
         while(arr.length != 0){
            if(arr[0]==false){
                statement = false;
                arr.shift();
            }else{
                arr.shift();
            }
         }
         return statement;
    }

    rebalance(){
        //INPUT: unbalnced tree
        //OUTPUT: balanced tree
        let newTree = this.preorder();
        console.log(newTree);
        this.root = this.buildTree(newTree);

    }
    prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };
}


function mergeSort(arr) {
    //arr:array of numbers 
    //output: same array with munbers sorted
    if (arr.length < 2) {
        return arr
    }
    else {
        let middleIndex = Math.floor(arr.length / 2);
        let leftSide = arr.splice(0, middleIndex);
        let rightSide = arr.splice(-middleIndex - 1);
        leftSide = mergeSort(leftSide);
        rightSide = mergeSort(rightSide);
        let sorted = [];
        while (leftSide.length !== 0 || rightSide.length !== 0) {
            if ((leftSide[0] <= rightSide[0]) || (leftSide.length !== 0 && rightSide.length == 0)) {
                sorted.push(leftSide.shift());
            } else if ((leftSide[0] > rightSide[0]) || (leftSide.length == 0 && rightSide.length !== 0)) {
                sorted.push(rightSide.shift());
            } else {
                console.log("OOPS!")
            }
        }
        return sorted;
    }
}

let nextTree = new Tree([1,2,3,4,5,6,7,8]);


//nextTree.prettyPrint(nextTree.root);
//console.log(nextTree);

//nextTree.prettyPrint(nextTree.root);
nextTree.insert(104);
nextTree.insert(101);
nextTree.insert(102);
nextTree.insert(103);

nextTree.rebalance();
console.log(nextTree.isBalanced());
nextTree.prettyPrint(nextTree.root);