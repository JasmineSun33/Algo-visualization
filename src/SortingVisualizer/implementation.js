export function insertionSort(array){

		var n = array.length;
		// Invariant: array[:i] is sorted
		for(var i=1; i< n; i++){
			var currValue = array[i];
	
			var insertIndex = i-1;
			while( insertIndex >= 0 && array[insertIndex] >= currValue){
				array[insertIndex+1] = array[insertIndex];
				insertIndex --;
			}
			//insert at the correct index
			array[insertIndex+1] = currValue;
			console.log(array.slice(0,i))
		}
		return array;

}




var array = [5,3,7,6,2,9];
function swap(array, leftIndex, rightIndex){
    var temp = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = temp;
}
function partition(array, left, right) {
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
        if (i <= j) {
            swap(array, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(array, left, right) {
    var index;
    if (array.length > 1) {
        index = partition(array, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(array, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(array, index, right);
        }
    }
    return array;
}



function bubbleSort(array){
    let len = array.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (array[j] > array[j + 1]) {
                // swap j and j+1 
                let tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
            }
        }
    }
    return array;
};






