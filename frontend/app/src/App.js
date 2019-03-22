import React, { Component } from 'react';
import './App.css';
import SpeechRecognition from './speech-to-text/Dictaphone';
import Navbar from './navigation/navbar';
import HomePage from './home-page';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <div style={{backgroundColor: "white", display: "flex", flexDirection: "column", height: "100%"}}>
        <Navbar />
        <HomePage />
        {/* <SpeechRecognition /> */}
      </div>
    );
  }
}

export default App;
