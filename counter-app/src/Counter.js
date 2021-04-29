import React, { Component } from 'react';

class Counter extends Component {
    state = {
      number: 0
    };
  
    handleIncrease = () => {
      this.setState({
        number: this.state.number + 1
      });
    };
    handleDecrease = () => {
      this.setState({
        number: this.state.number - 1
      });
    };
    render() {
      const { number } = this.state;
      return (
        <div>
          <h1>Count</h1>
          <h2>값 : {number}</h2>
          <button onClick={this.handleIncrease}>Plus</button>
          <button onClick={this.handleDecrease}>Minus</button>
        </div>
      );
    }
  }

export default Counter;