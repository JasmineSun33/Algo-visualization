import React from 'react';
import './App.css';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {};
	}
 



  render(){
    
    return (
      <div className="App">
        <header className="App-header">
            {/* <Button variant="outline-info">Generate new list </Button> */}
            {/* <Button variant="outline-info">GO! </Button> */}
            <DropdownButton id="dropdown-item-button" title="Choose an algo.">
              <Dropdown.Item as="button">Bubble Sort</Dropdown.Item>
              <Dropdown.Item as="button">Insertion Sort</Dropdown.Item>
              <Dropdown.Item as="button">Merge Sort</Dropdown.Item>
            </DropdownButton>
            <DropdownButton id="dropdown-item-button" title="Choose speed/size.">
              <Dropdown.Item as="button">fast</Dropdown.Item>
              <Dropdown.Item as="button">mid</Dropdown.Item>
              <Dropdown.Item as="button">low</Dropdown.Item>
            </DropdownButton>
            <div>xxx comparson has done. xx% completed</div>
        </header>

        <SortingVisualizer/>
        <div className="article">article about xxxx sorting algorithm</div>

      </div>
    );

  }

}

export default App;
