import React, { Component } from 'react';
import './App.css';
import routes from './routes';
import firebase from 'firebase'


class App extends Component {
  componentDidMount = () => {
    firebase.initializeApp({
        apiKey: 'AIzaSyBy4p79yufzblBNc1zdbstFdPUG-GqjeW0',
        authDomain: 'foodie-e3564.firebaseapp.com'
    })
}

  render() {
    return (
      <div className="App">
      { routes }
      </div>
    );
  }
}

export default App;
