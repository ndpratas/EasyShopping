import React, { Component } from 'react';
import './App.css';
import SpeechRecognition from './speech-to-text/dictaphone';
import NavView from './navigation/navview';
import HomePage from './home-page';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <div style={{backgroundColor: "white", display: "flex", flexDirection: "column", height: "100%"}}>
        <NavView>
          <HomePage />
        </NavView>
        {/* <SpeechRecognition /> */}
      </div>
    );
  }
}

export default App;
