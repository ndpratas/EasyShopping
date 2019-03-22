import React from 'react';
import './style.css';

const renderResults = (results) => {
  return results.map((result) => (
      <section className="product-cell" key={result.id}>
        <img src={result.thumbnail} style={{width: "200px", height: "200px"}}></img>
        <h1>{`${result.price}€`}</h1>
        <p>{result.name}</p>
        <button><i class="fas fa-shopping-cart"></i><span> </span>Add to cart</button>
      </section>
    )
  );
};

const resultsPage = ({results}) => (
  <div style={{padding: "20px 40px"}}>
    <h3 style={{marginLeft: "40px", paddingBottom: "20px"}}>{`${results.length} result(s) found`}</h3>
    <div style={{display: "flex", justifyContent: "space-around", flexWrap: "wrap"}}>
      {renderResults(results)}
    </div>
  </div>
);

export default resultsPage;
