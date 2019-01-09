import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      showError: false,
    }
  }

  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">The counter is currently {this.state.counter}</h1>
        <h2 data-test = "error-message"> You can't decrement below 0</h2>
        
        <button
          data-test="increment-button"
          onClick={() => this.setState({counter: this.state.counter + 1})}
          >
          Increment counter</button>

        <button
          data-test="decrement-button"
          onClick={() => {
            return this.setState({counter: this.state.counter - 1})
          }}
          >
          Decrement counter</button>
      </div>
    );
  }
}

export default App;
