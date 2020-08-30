var count = 0

export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const copiedArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, copiedArray, animations);
    return animations;
  }

  // recursively break into two halves
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    copiedArray,
    animations,
  ) {
    count ++;
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);

    mergeSortHelper(copiedArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(copiedArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, copiedArray, animations);
    console.log("copy array is ", copiedArray, "---", count);
    console.log("main array is ", mainArray, "---", count);
  }
  
  //combine two sorted array
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    copiedArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (copiedArray[i] <= copiedArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, copiedArray[i]]);
        mainArray[k++] = copiedArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, copiedArray[j]]);
        mainArray[k++] = copiedArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, copiedArray[i]]);
      mainArray[k++] = copiedArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, copiedArray[j]]);
      mainArray[k++] = copiedArray[j++];
    }
  }