import React, { Component, useState } from 'react';
import './App.css';
import NavView from './navigation/navview';
import HomePage from './home-page';
import ResultsPage from './results';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  const [productsFound, setProductsFound] = useState([]);

  return (
    <Router>
      <div style={{backgroundColor: "white", display: "flex", flexDirection: "column", height: "100%"}}>
        <NavView>
            <Route exact path="/" component={(props) => <HomePage {...props} onResultsFound={setProductsFound} />} />
            <Route exact path="/search/results" render={() => <ResultsPage results={productsFound} />} />
        </NavView>
      </div>
    </Router>
  );
};

export default App;
