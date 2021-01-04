import './App.css';
import Tree from './containers/Tree/Tree';
import React, {Component} from 'react';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <h1> Category Tree </h1>
        <Tree />
      </div>
    );
  }
}

  export default App;
