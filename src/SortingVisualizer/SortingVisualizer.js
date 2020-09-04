import React, { Component } from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations, getInsertionSortAnimations, getQuickSortAnimations, getBubbleSortAnimations} from './algo';
import Button from 'react-bootstrap/Button';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';
import shortid from "shortid";

const ARRAY_SIZE = 50;
const SPEED = 5;
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
			isFinished: false,
			isPause: false,
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

	startSortingHandler(){

		// var solutionAnimation = getMergeSortAnimations(this.state.array.slice());
		// var solutionAnimation = getQuickSortAnimations(this.state.array.slice());
		// var solutionAnimation = getInsertionSortAnimations(this.state.array.slice());
		var solutionAnimation = getBubbleSortAnimations(this.state.array.slice());

		const arrayBars = document.getElementsByClassName('Array-bar');
		// console.log(arrayBars);
		solutionAnimation.forEach((animation, index) => {
			setTimeout(() => {
				
					const oldIndex = animation[0];
					const newHeight = animation[1] / HEIGHT_FACTOR;
					arrayBars[oldIndex].style.height = `${newHeight}px`;
					arrayBars[oldIndex].style.color = "green";
				
			}, SPEED * (index + 1));
		});
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
					onClick={() => this.startSortingHandler()}>GO! 
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

