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

        {/* if show error is true we show the error */}
        <div>
          {this.state.showError ? (
            <h2 data-test = "error-message"> You can't decrement below 0</h2>
          ) : (
            <h2></h2>
          )}
        </div>
        
        {/* increment button */}
        <button
          data-test="increment-button"
          onClick={() => {
            this.setState({counter: this.state.counter + 1, showError: false})
          }}
          >
          Increment counter</button>

        {/* decrement button */}
        <button
          data-test="decrement-button"
          onClick={() => {
            if(this.state.counter > 0){
              return this.setState({counter: this.state.counter - 1})
            }else{
              return this.setState({counter: 0, showError: true})
            }
          }}
          >
          Decrement counter</button>
      </div>
    );
  }
}

export default App;
