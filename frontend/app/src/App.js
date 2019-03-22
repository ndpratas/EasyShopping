import React, { Component } from 'react';
import './App.css';
import SpeechRecognition from './speech-to-text/Dictaphone';
import NavView from './navigation/navview';
import HomePage from './home-page';
import ResultsPage from './results';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div style={{backgroundColor: "white", display: "flex", flexDirection: "column", height: "100%"}}>
          <NavView>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/search/results" render={() => <ResultsPage results={[0,1,3,4,5,6,7]} />} />
          </NavView>
          {/* <SpeechRecognition /> */}
          <SpeechRecognition />
        </div>
      </Router>
    );
  }
}

export default App;
