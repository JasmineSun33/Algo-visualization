export function getMergeSortAnimations(arr){
    var animationArray = []; 
    var copiedArr = arr.slice();
    return mergeSort(arr, copiedArr,animationArray,0, arr.length);
}

function mergeSort(arr,copiedArr, animationArray, startIndex, endIndex){
    if (endIndex - startIndex <= 1) {
        return arr;
    }

    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    // sort left-half
    mergeSort(arr,copiedArr,animationArray,startIndex,middleIndex);
    // sort right-half
    mergeSort(arr,copiedArr,animationArray,middleIndex,endIndex);
    merge_helper(arr, copiedArr,animationArray,startIndex,middleIndex,endIndex);

    return animationArray;
}

function merge_helper(arr,copiedArr,animationArray,startIndex,middleIndex,endIndex){
    let mergedArray = [];
    var i = startIndex ,j = middleIndex ;
    var newIndex = startIndex;

    // animationArray.push([startIndex, endIndex]);  // 第一次，signal在操作哪一个部分 一头一尾  
    while ( i < middleIndex && j < endIndex) {

        if (arr[i] < arr[j]) {
            // animationArray.push([i,newIndex]);      //第二次， change bar length
            mergedArray.push(arr[i]); 

            i++;
        } else {
            // animationArray.push([j,newIndex]);
            mergedArray.push(arr[j]); 
      
            j++
        }

        newIndex++;
    }
    // make arr[start, end] sorted entirely by adding remainders 
    var finalizedArray;
    if( i === middleIndex){
        finalizedArray = mergedArray.concat(arr.slice(j, endIndex));
        // animationArray.push([j,newIndex]);

    }else{
        finalizedArray = mergedArray.concat(arr.slice(i, middleIndex));
        // animationArray.push([i,newIndex]);
      
    }


    for(i=startIndex; i< endIndex; i++){
        animationArray.push([i,finalizedArray[i-startIndex]]);      //oldIndex, newValue
        

    }
    // animationArray.push(animationObj);

    // update mergeArray into the original array
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    // splice(start, deleteCount, updateElement1....)
    // ... is ES6 syntax, expand the array into individual elements
    arr.splice(startIndex, finalizedArray.length, ...finalizedArray);



}


export function getInsertionSortAnimations(array){

    var n = array.length;

    var animationArray = []; 
        // Invariant: array[:i] is sorted
        for(var i=1; i< n; i++){
            var currValue = array[i];
    
            var insertIndex = i-1;
            while( insertIndex >= 0 && array[insertIndex] >= currValue){
                array[insertIndex+1] = array[insertIndex];
                animationArray.push([insertIndex+1, array[insertIndex]]);        // oldIndex, newValue
                insertIndex --;
            }
            //insert at the correct index
            array[insertIndex+1] = currValue;
            animationArray.push([insertIndex+1, currValue]);
            // console.log(array.slice(0,i))
        }
        return animationArray;
}

export function getQuickSortAnimations(array){
    var animationArray = []; 

    return quickSort(array, 0, array.length -1, animationArray)


}
function quickSort(array, left,right, animationArray){

    if(array.length > 1){
        var middleIndex = partition(array, left, right,animationArray);
        if (middleIndex - left > 1){
            quickSort(array, left, middleIndex - 1, animationArray);
        }
        if(right - middleIndex > 1){
            quickSort(array, middleIndex, right, animationArray);
        }
    }
    return animationArray;
}

function partition(array, left, right,animationArray) {
    var pivot   = array[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (array[i] < pivot) {
            i++;
        }
        while (array[j] > pivot) {
            j--;
        }
        if (i <= j) {      // 如果两个人都卡住了
            // console.log([ i, array[j] ])
    
            animationArray.push([i, array[j]]);   //old Index, new value
            animationArray.push([j, array[i]]);   //old Index, new value
            swap(array, i, j); //sawpping two elements
            i++;
            j--;
        }
    }

    return i;
}

export function getBubbleSortAnimations(array){
    var animationArray = []; 
    let len = array.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (array[j] > array[j + 1]) {
                // swap j and j+1 
                animationArray.push([j, array[j+1]]);   
                animationArray.push([j+1, array[j]]);   
                swap(array,j,j+1);

            }
        }
    }
    return animationArray;
};


function swap(array, leftIndex, rightIndex){
    var temp = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = temp;
}

