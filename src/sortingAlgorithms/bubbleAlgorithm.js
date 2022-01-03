export function getBubbleSortAnimations(array) {
    let animations = [];
    const auxiliaryArray = array.slice();
    bubbleSort(auxiliaryArray, animations);
    return animations;
  }
  
  function bubbleSort(
    array,
    animations,
  ) {
    let sorted = false;
    let length = array.length - 1;
    while(!sorted){
        sorted = true;

        for(let i = 0; i < length; i++){
            animations.push(["compare",i, i + 1]);
            if(array[i + 1] < array[i]){
                sorted = false;
                animations.push(["swap", i, i+1]);
                let temp = array[i];
                array[i] = array[i+1];
                array[i+1] = temp;
            }

        }
        length--;
    }

    return array;
  }