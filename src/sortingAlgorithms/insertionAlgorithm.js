export function getInsertionSortAnimations(array) {
    let animations = [];
    const auxiliaryArray = array.slice();
    insertionSort(auxiliaryArray, animations);
    return animations;
  }
  
  function insertionSort(
    array,
    animations,
  ) {

    for(let i = 1 ;  i < array.length ;i++){

        for(let j = i - 1; j > -1; j--){

            animations.push(["compare",j, j + 1]);

            if(array[j + 1] < array[j]){

            animations.push(["swap",j, j + 1]);
               const temp = array[j+1];
               array[j+1] = array[j];
               array[j] = temp;
            }
        }
        
      }
      return array;
  
}