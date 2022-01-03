import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/mergeAlgorithm.js';
import {getBubbleSortAnimations} from '../sortingAlgorithms/bubbleAlgorithm.js';
import {getQuicksortAnimations} from '../sortingAlgorithms/quickAlgorithm.js';
import {getInsertionSortAnimations} from '../sortingAlgorithms/insertionAlgorithm.js';
import './sortingVisualiser.css';
import {Link} from "react-router-dom";


let ANIMATION_SPEED_MS = 5;

let NUMBER_OF_ARRAY_BARS = 200;

let speed = 3;

let maximum = 800;

const MainColour = 'violet';
const ChangeColour = 'orangered';

export default class SortingVisualizer extends React.Component {
 

  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  IncreaseLength() {
    if(NUMBER_OF_ARRAY_BARS < 300){
      NUMBER_OF_ARRAY_BARS = NUMBER_OF_ARRAY_BARS + 50;
      const array = [];
      document.getElementById("size").innerHTML = NUMBER_OF_ARRAY_BARS;
      for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
        array.push(randomIntFromInterval(5, maximum));
      }
      this.setState({array});
    }
  }

  DecreaseLength() {
    if(NUMBER_OF_ARRAY_BARS > 100){
      const array = [];
      NUMBER_OF_ARRAY_BARS = NUMBER_OF_ARRAY_BARS - 50;
      document.getElementById("size").innerHTML = NUMBER_OF_ARRAY_BARS;
      for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
        array.push(randomIntFromInterval(5, maximum));
      }
      this.setState({array});
      
    }
  }

  DecreaseSpeed() {
    if(ANIMATION_SPEED_MS < 20){
      ANIMATION_SPEED_MS = ANIMATION_SPEED_MS *2;
      speed = speed - 1;
      document.getElementById("speed").innerHTML = speed;
    }
  }

  IncreaseSpeed() {
    if(ANIMATION_SPEED_MS >= 2){
      ANIMATION_SPEED_MS = ANIMATION_SPEED_MS / 2;
      speed = speed +1;
      document.getElementById("speed").innerHTML = speed;
    }
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    document.getElementById("size").innerHTML = NUMBER_OF_ARRAY_BARS;
    document.getElementById("speed").innerHTML = speed;
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, maximum));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? ChangeColour : MainColour;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = getQuicksortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
      for (let i = 0; i < animations.length; i++) {
        const [state, pIndex, barTwoIndex, pivotIndex] = animations[i];
        const pIndexBar = arrayBars[pIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        const pivotBar = arrayBars[pivotIndex].style;
        
        if (state === "compare") {
          setTimeout(() => {
            pIndexBar.backgroundColor = ChangeColour;
            barTwoStyle.backgroundColor = ChangeColour;
            pivotBar.backgroundColor = ChangeColour;
          }, i * 3);
  
         
          setTimeout(() => {
            pIndexBar.backgroundColor = MainColour;
            barTwoStyle.backgroundColor = MainColour;
            pivotBar.backgroundColor = MainColour;
          }, (i + 1) * 3);
        } else {
         
          setTimeout(() => {
            let tmp = pIndexBar.height;
            pIndexBar.height = barTwoStyle.height;
            barTwoStyle.height = tmp;
          }, i * ANIMATION_SPEED_MS);
        }
      }

      setTimeout(() => {
        this.animateCompleted();
        this.enableStartorGenerate("generate");
        this.props.disableLinks();
      }, 3 * animations.length);
      this.disableStartandGenerate();
      this.props.disableLinks();
    };
  
  

  insertionSort(){
    const animations = getInsertionSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const [state, iOne, iTwo] = animations[i];
      const arrayBars = document.getElementsByClassName('array-bar');
      let BarOne = arrayBars[iOne].style;
      let BarTwo = arrayBars[iTwo].style;
      
      if(state === "compare"){
        setTimeout(() => {
          BarOne.backgroundColor = ChangeColour;
          BarTwo.backgroundColor = ChangeColour;
        },i * ANIMATION_SPEED_MS)
      
        setTimeout(() => {
          BarOne.backgroundColor = MainColour;
          BarTwo.backgroundColor = MainColour;
      },i * ANIMATION_SPEED_MS)

      }if(state === "swap"){
        setTimeout(() => {
          let temp = BarOne.height;
          BarOne.height = BarTwo.height;
          BarTwo.height = temp;

        },i * ANIMATION_SPEED_MS)
      }
      
    }
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const [state, iOne, iTwo] = animations[i];
      const arrayBars = document.getElementsByClassName('array-bar');
      let BarOne = arrayBars[iOne].style;
      let BarTwo = arrayBars[iTwo].style;
      if(state === "compare"){
        setTimeout(() => {
          BarOne.backgroundColor = ChangeColour;
        },i * ANIMATION_SPEED_MS)
      
        setTimeout(() => {
          BarOne.backgroundColor = MainColour;
      },i * ANIMATION_SPEED_MS)

      }else{
        setTimeout(() => {
          let temp = BarOne.height;
          BarOne.height = BarTwo.height;
          BarTwo.height = temp;

        },i * ANIMATION_SPEED_MS)
      }
      
    }
  }

  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
   <div className="routes">

<Link to ="/sorting">
  <button  className="routeButton" >Sorting Algorithms</button>
</Link>

<Link to ="/pathfinding">
  <button  className="routeButton" >Pathfinding Algorithms</button>
</Link>

</div>
       
        <div className="header">
          <div className="details">
           <h1 className='factLabel'>Array Size: </h1>
           <h1 classname='Fact' id="size"> </h1>
           <h1 className='factLabel'>Sort Speed: </h1>
           <h1 classname='speed' id="speed"> </h1>
           <button  className="ArrayButton" onClick={() => this.resetArray()}>Randomise Array</button>
           <button  className="ArrayButton" onClick={() => this.IncreaseLength()}>Increase Length</button>
           <button  className="ArrayButton" onClick={() => this.DecreaseLength()}>Decrease Length</button>
           <button  className="ArrayButton" onClick={() => this.IncreaseSpeed()}>Increase Speed</button>
           <button  className="ArrayButton" onClick={() => this.DecreaseSpeed()}>Decrease Speed</button>
           <button  className="button" onClick={() => this.mergeSort()}>Merge Sort</button>
           <button  className="button" onClick={() => this.quickSort()}>Quick Sort</button>
           <button  className="button" onClick={() => this.insertionSort()}>Insertion Sort</button>
           <button  className="button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
         </div>
        </div>
        <div className="body">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: MainColour,
              height: `${value}px`,
            }}></div>
        ))}
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
