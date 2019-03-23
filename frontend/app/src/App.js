import React, { Component, useState } from 'react';
import './App.css';
import NavView from './navigation/navview';
import HomePage from './home-page';
import ResultsPage from './results';
import CartList from './cart/list';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  const [productsFound, setProductsFound] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (newProduct) => setCart([...cart, newProduct]);

  return (
    <Router>
      <div style={{backgroundColor: "white", display: "flex", flexDirection: "column", height: "100%"}}>
        <NavView numberOfItems={cart && cart.length} >
            <Route exact path="/" component={(props) => <HomePage {...props} onResultsFound={setProductsFound} />} />
            <Route exact path="/search/results" render={() => <ResultsPage addToCart={addToCart} results={productsFound} />} />
            <Route exact path="/cart/list" render={() => <CartList products={cart} />} />
        </NavView>
      </div>
    </Router>
  );
};

export default App;
