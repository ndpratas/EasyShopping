import React from 'react';
import bt1 from './bt1.png';
import btn from './btn.png';
import btn2 from './btn2.png';
import step1 from './step1.png';
import step2 from './step2.png';
import step3 from './step3.png';

const sumProducts = (products) => {
  return products.reduce((ac, product) => {
    return ac + product.price;
  }, 0);
}

const checkout = ({products}) => {
  return (
    <React.Fragment>
        <div style={{padding: "20px 40px"}}>
        {/* <h3 style={{marginLeft: "40px", paddingBottom: "20px"}}>{`${results.length} result(s) found`}</h3> */}
        <div style={{display: "flex", justifyContent: "space-around"}}>
          <section className="product-cell">
            <img src={step1} style={{width: "250px"}}></img>
          </section>

          <section className="product-cell">
            <img src={step2} style={{width: "250px"}}></img>
          </section>

          <section className="product-cell">
            <img src={step3} style={{width: "250px"}}></img>
          </section>
        </div>

        <div style={{marginLeft: "30px"}}>
          <h1 style={{margin: 0, textTransform: "uppercase"}}>2. payment</h1>
          <h4 style={{marginBottom: "20px"}}>Select your payment method</h4>
        </div>
        
        <div style={{display: "flex", justifyContent: "space-around"}}>
          <section className="product-cell">
            <img src={bt1} style={{width: "250px", height: "200px"}}></img>
          </section>

          <section className="product-cell">
            <img src={btn} style={{width: "250px", height: "200px"}}></img>
          </section>

          <section className="product-cell">
            <img src={btn2} style={{width: "250px", height: "200px"}}></img>
          </section>
        </div>
      </div>

      <div style={{alignItems: "center", width: "100%", padding: "20px", position: "fixed", bottom: 0, display: "flex", alignSelf: "flex-end", flexDirection: "row", justifyContent: "flex-end"}}>
        <div style={{textAlign: "right", display: "flex", flexDirection: "column"}}>
          <h4 style={{margin: 0}}>Total:</h4>
          <h1 style={{margin: 0}}>{`${sumProducts(products)}€`}</h1>
        </div>
        <button id="checkout">Review Order</button>
      </div>
    </React.Fragment>
  );
}

export default checkout;