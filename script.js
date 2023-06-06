class Node{

    constructor(data,left = null,right= null){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree{
    constructor() {
        this.root = root;//equals return value of buildTree 
    }

    insert(value){

    }

    delete(value){}
}




function mergeSort(arr){
    //arr:array of numbers 
    //output: same array with munbers sorted
    if (arr.length<2){
        return arr
    }
    else{
        let middleIndex = Math.floor(arr.length/2);
        let leftSide = arr.splice(0,middleIndex);
        let rightSide = arr.splice(-middleIndex-1);
        leftSide = mergeSort(leftSide);
        rightSide = mergeSort(rightSide);
        let sorted = [];
        while (leftSide.length !== 0 || rightSide.length !== 0){
            if ((leftSide[0] <= rightSide[0]) || (leftSide.length !==0 && rightSide.length == 0)){
               sorted.push(leftSide.shift());
            } else if ((leftSide[0] > rightSide[0]) || (leftSide.length ==0 && rightSide.length !== 0)) {
                sorted.push(rightSide.shift()); 
            } else {
                console.log("OOPS!")
            }
        }
        return sorted;
    }
}



function buildTree(arr){
    //input: array 
    //output: middle element with the array sorted and no duplicates 
    let sorted =  mergeSort([...new Set(arr)]); // sorts the array and gets rid of duplicates 
    let mid =  Math.floor(sorted.length/2)// finds root element for binary search tree
    let leftArray = sorted.slice(0,mid);
    let rightArray = sorted.slice(mid+1,sorted.length);
    let rootElement = new Node(sorted[mid]);
    recursiveBST(rootElement,leftArray,rightArray);

    
return rootElement;
}

function recursiveBST (node, left,right){

    if(left.length>0){
        let leftMiddle = Math.floor((left.length/2));
        let leftArray = left.slice(0,leftMiddle);
        let leftRight = left.slice(leftMiddle+1,left.length);
        node.left = new Node (left[leftMiddle]);
        recursiveBST(node.left,leftArray,leftRight);
    }
    if(right.length>0){
        let rightMiddle = Math.floor(right.length/2);
        let rightLeft = right.slice(0,rightMiddle);
        let rightArray = right.slice(rightMiddle+1,right.length);
        node.right = new Node (right[rightMiddle]);        
        recursiveBST(node.right,rightLeft,rightArray);
    }
}

let tree = [1,3,2,5,4,6];
console.log(buildTree(tree));
