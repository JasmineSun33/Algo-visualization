export function getMergeSortAnimations(arr){
    var animationArray = []; 
    var copiedArr = arr.slice();
    return mergeSort(arr, copiedArr,animationArray,0, arr.length);
}

function mergeSort(arr,copiedArr, animationArray, startIndex, endIndex){
    if (endIndex - startIndex <= 1) {
        return arr;
    }
    console.log("array length is: ", arr.length);
    // var newCopiedArr = arr.slice();
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    // sort left-half
    mergeSort(arr,copiedArr,animationArray,startIndex,middleIndex);
    
    // sort right-half
    mergeSort(arr,copiedArr,animationArray,middleIndex,endIndex);
    
    merge_helper(arr, copiedArr,animationArray,startIndex,middleIndex,endIndex);

    return animationArray;
    // return arr;

}

function merge_helper(arr,copiedArr,animationArray,startIndex,middleIndex,endIndex){
    let mergedArray = [];
    var i = startIndex ,j = middleIndex ;
    var newIndex = startIndex;
    // animationArray.push([startIndex, endIndex]);  // 第一次，signal在操作哪一个部分 一头一尾  
    while ( i < middleIndex && j < endIndex) {

        if (arr[i] < arr[j]) {
            animationArray.push([i,newIndex]);      //第二次， change bar length
            mergedArray.push(arr[i]); 

            i++;
        } else {
            animationArray.push([j,newIndex]);
            mergedArray.push(arr[j]); 
      
            j++
        }

        newIndex++;
    }
    // make arr[start, end] sorted entirely by adding remainders 
    var finalizedArray;
    if( i === middleIndex){
        finalizedArray = mergedArray.concat(arr.slice(j, endIndex));
        animationArray.push([j,newIndex]);

    }else{
        finalizedArray = mergedArray.concat(arr.slice(i, middleIndex));
        animationArray.push([i,newIndex]);
      
    }
    
    

    // update mergeArray into the original array
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    // splice(start, deleteCount, updateElement1....)
    // ... is ES6 syntax, expand the array into individual elements
    arr.splice(startIndex, finalizedArray.length, ...finalizedArray);



}