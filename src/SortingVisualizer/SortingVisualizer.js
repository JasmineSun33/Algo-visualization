import React, { Component } from 'react';
import './SortingVisualizer.css';
import Button from 'react-bootstrap/Button';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';
import shortid from "shortid";


export default class SortingVisualizer extends Component {

	constructor(props){
		super(props);
		this.state = {
            size: 8,
						array:[8,8,8],
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

	}

	startSortingHandler(array){
		console.log("ok i start");
		console.log("unsorted array is ", this.state.array);
		var sortedArray = this.mergeSort(array.slice());
		this.setState({array: sortedArray});
		
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
		console.log("return list is: ", returnList );

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
							style={{height:`${value / 2.5}px`, width: `${1000 / this.state.size}px`}}>
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

