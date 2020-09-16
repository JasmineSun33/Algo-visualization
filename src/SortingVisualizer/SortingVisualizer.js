import React, { Component } from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations, getInsertionSortAnimations, getQuickSortAnimations, getBubbleSortAnimations} from './algo';
import Button from 'react-bootstrap/Button';
import shortid from "shortid";

const SPEED = 5;
const HEIGHT_FACTOR = 2.5;
const WIDTH_FACTOR = 1000;
const TIMEOUT = 300

const MERGE_SORT = "MERGE_SORT";
const INSERTION_SORT = "INSERTION_SORT";
const QUICK_SORT = "QUICK_SORT";
const BUBBLE_SORT = "BUBBLE_SORT";

export default class SortingVisualizer extends Component {

	constructor(props){
		super(props);
		this.state = {
			array:[],
			referenceArray:[],
			isFinished: true,
			isPause: false,
		};

	}
	
	componentDidMount(){
		this.generateNewArray();
		
	}
	
	componentDidUpdate(prevProps){
		// 这一个class， <SortingVisualizer> component 整体的props有没有发生变化？

		if(prevProps.size != this.props.size){
			this.generateNewArray();

		}

	}
    
	generateNewArray(){

		var newArray = [];
		for(var i=0; i< this.props.size; i++){
			var randomNum = randomIntFromInterval(10,1000);
			newArray.push(randomNum);
		};
		this.setState({array: newArray});
		this.setState({referenceArray: newArray.slice()});
		document.getElementById('comparsion-count').textContent = 0

		// set the comparsion count to zero

	}

	finishSortingHandler(){
		this.setState({isFinished: true});
		// make buttons active
	}

	startSortingHandler(){

		var solutionAnimation;
		
		switch(this.props.sortingMethod){
			case "MERGE_SORT":
				solutionAnimation = getMergeSortAnimations(this.state.array.slice());
				break;
			case "INSERTION_SORT":
				solutionAnimation = getInsertionSortAnimations(this.state.array.slice());
				break;
			case "QUICK_SORT":
				solutionAnimation = getQuickSortAnimations(this.state.array.slice());
				break;
			case "BUBBLE_SORT":
				solutionAnimation = getBubbleSortAnimations(this.state.array.slice());
				break;
		}

		const arrayBars = document.getElementsByClassName('Array-bar');
		const comparsionCount = document.getElementById('comparsion-count');
		solutionAnimation.forEach((animation, index) => {
			setTimeout(() => {

					// console.log( index,"comparsion has been done")
					comparsionCount.textContent = index;
				
					const oldIndex = animation[0];
					const newHeight = animation[1] / HEIGHT_FACTOR;
					arrayBars[oldIndex].style.height = `${newHeight}px`;
					arrayBars[oldIndex].style.color = "green";
				
			}, SPEED * (index + 1)+ TIMEOUT);
		});

		setTimeout(() => {
			console.log("FINISHED!")

		}, SPEED * solutionAnimation.length + 500)
	}




  render(){
		const {array} = this.state;

		console.log()

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
							style={{height:`${value / HEIGHT_FACTOR}px`, width: `${WIDTH_FACTOR / this.props.size}px`}}>
						</div>
					))}
				</div>
				<div> <strong id='comparsion-count'> 0 </strong> comparsion has been done</div>
			</>
			);

  }

}


function randomIntFromInterval(min, max){ // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min);
}

