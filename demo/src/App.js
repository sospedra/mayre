import React, { Component } from 'react';
import Mayre from 'mayre';
import logo from './logo.svg';
import './App.css';

const MAX_COUNTER = 5;

const Conditional = (props) => (
  <h2>I'll disappear when {props.name} gets to {MAX_COUNTER}</h2>
)

class App extends Component {
  constructor(props) {
    super(props);
    this.updateCounter = this.updateCounter.bind(this);
    this.state = { counter: 0 };
  }

  updateCounter(diff) {
    return () => {
      this.setState({ counter: this.state.counter + diff });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Mayre demo</h2>
        </div>
        <div className="App-intro">
          <button onClick={this.updateCounter(-1)}>Decrement</button>
          <button onClick={this.updateCounter(1)}>Increment</button>
          <h1>{this.state.counter}</h1>

          <Mayre
            of={Conditional}
            when={this.state.counter < MAX_COUNTER}
            with={{ name: 'counter' }}
          />

          <Mayre
            of={<h4>And I'll disappear when gets to the double</h4>}
            when={this.state.counter < MAX_COUNTER * 2}
          />
        </div>
      </div>
    );
  }
}

export default App;
