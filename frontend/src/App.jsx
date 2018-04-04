import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyCalendar from './MyCalendar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div className="App">
        <MyCalendar />
      </div>
    );
  }
}

export default App;
