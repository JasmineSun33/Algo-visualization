import React from 'react';
import './App.css';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'

const DEFAULT_SIZE = 100;
const SPEED = 5;
const HEIGHT_FACTOR = 2.5;
const WIDTH_FACTOR = 1000;


const MERGE_SORT = "MERGE_SORT";
const INSERTION_SORT = "INSERTION_SORT";
const QUICK_SORT = "QUICK_SORT";
const BUBBLE_SORT = "BUBBLE_SORT";

const SMALL_INPUT = 30;
const MEDIUM_INPUT = 80;
const LARGE_INPUT = 200;


class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
      arraySize: MEDIUM_INPUT,
			sortingMethod: MERGE_SORT,     // Merge, Bubble, Quick, Insertion
			isFinished: false,
			isPause: false,
    };
    this.changeInputSizeHandler = this.changeInputSizeHandler.bind(this);

  }
  
  changeInputSizeHandler(event){
    const newSize = event.target.value;
    this.setState({arraySize: newSize});
    console.log(this.state)
  }
  changeMethodHandler(){
    
  }
 



  render(){
  
    
    return (
      <div className="App">
        <header className="App-header">
          <Form>
            <Form.Row>
              <Col>
              <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                <Form.Label>Choose an algorithm</Form.Label>
                <Form.Control as="select" size="sm" custom onChange={this.changeMethodHandler.bind(this)} >
                  <option value={MERGE_SORT}>Merge Sort</option>
                  <option value={QUICK_SORT}>Quick Sort</option>
                  <option value={INSERTION_SORT}>Insertion Sort</option>
                  <option value={BUBBLE_SORT}>Bubble Sort</option>
                  <option>5</option>
                </Form.Control>
              </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                  <Form.Label>Input Size</Form.Label>
                  <Form.Control as="select" size="sm" custom onChange={ this.changeInputSizeHandler}>
                    <option value={SMALL_INPUT}>Small</option>
                    <option value={MEDIUM_INPUT}>Medium</option>
                    <option value={LARGE_INPUT}>Large</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicRangeCustom">
                    <Form.Label>Animation Speed</Form.Label>
                    <Form.Control type="range" custom />
                </Form.Group>
              </Col>
            </Form.Row>
          </Form>
          

          {/* <div>xxx comparson has done. xx% completed</div> */}

        </header>

        <Container>
          <SortingVisualizer 
            size={this.state.arraySize}
            method={"MERGE_SORT"}/>
          <div className="article">article about xxxx sorting algorithm</div>
        </Container>


      </div>
    );

  }

}

export default App;
