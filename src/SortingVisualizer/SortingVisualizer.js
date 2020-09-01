import React, { Component } from 'react';
import './SortingVisualizer.css';
// import {getMergeSortAnimations} from './solutionAlgo';
import {getMergeSortAnimations} from './algo';
import Button from 'react-bootstrap/Button';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';
import shortid from "shortid";

const ARRAY_SIZE = 100;
const SPEED = 100;
const HEIGHT_FACTOR = 2.5;
const WIDTH_FACTOR = 1000;



export default class SortingVisualizer extends Component {

	constructor(props){
		super(props);
		this.state = {
            size: ARRAY_SIZE,
						array:[],
						referenceArray:[],
						sortingMethod: 'MergeSort',     // Merge, Bubble, Quick, Insertion
				};

	}
	
	componentDidMount(){
		this.generateNewArray();
		
	}
    
	generateNewArray(){

		var newArray = [];
		for(var i=0; i< this.state.size; i++){
			var randomNum = randomIntFromInterval(10,1000);
			newArray.push(randomNum);
		};
		this.setState({array: newArray});
		this.setState({referenceArray: newArray.slice()});

	}

	startSortingHandler(array){
		console.log("unsorted array is ", this.state.array);
		// this.setState({array: sortedArray});

		var solutionAnimation = getMergeSortAnimations(this.state.array.slice());

		console.log("animation array is ", solutionAnimation);




		solutionAnimation.forEach((animation, index) => {
			setTimeout(() => {

				var newArray = this.state.array.slice();
				

				for(var i = 0; i < animation.sortedArray.length; i ++){
					const arrayBars = document.getElementsByClassName('Array-bar');
					const newHeight = animation.sortedArray[i] / HEIGHT_FACTOR;
					arrayBars[i+ animation.startIndex].style.height = `${newHeight}px`;
	
					console.log("I run: ", i)
					// newArray[i+ animation.startIndex] = animation.sortedArray[i];
					// this.setState({array: newArray});
			
				}




				// var temp = newArray[oldIndex];
				// newArray[oldIndex] = this.state.referenceArray[newIndex];    
				// newArray[newIndex] = temp;
				

			}, SPEED * (index + 1));
		});


	}

	mergeSort(arr){
		if (arr.length < 2) {
			return arr;
		}
		const middle = Math.floor(arr.length / 2);
		const left = this.mergeSort(arr.slice(0, middle));
		const right = this.mergeSort(arr.slice(middle));
	
		return this.merge_helper(left, right);

	}

	merge_helper(left, right) {
		let arr = [];
		var i = 0 ,j = 0;
		while ( i < left.length && j < right.length) {
			if (left[i] < right[j]) {
				arr.push(left[i]);      
				i++;
			} else {
				arr.push(right[j]);
				j++
			}
		}

		let returnList = arr.concat(left.slice(i).concat(right.slice(j)));
	

		return returnList;
	}
	


  render(){

		const {array} = this.state;

		return (
			<>
				<Button 
					variant="outline-info"
					onClick={() => this.generateNewArray()}>Generate new list 
				</Button>
				<Button 
					variant="outline-info"
					onClick={() => this.startSortingHandler(this.state.array)}>GO! 
				</Button>
				<div className='Display-window'>
					{array.map((value)=>(
						<div 
							className='Array-bar' 
							key={shortid.generate()}
							style={{height:`${value / HEIGHT_FACTOR}px`, width: `${WIDTH_FACTOR / this.state.size}px`}}>
						</div>
					))}
				</div>
			</>
			);

  }

}


function randomIntFromInterval(min, max){ // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min);
}

