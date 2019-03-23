import React from 'react';
import './list.style.css';
import { Link } from 'react-router-dom';

const renderCartList = (products) => {
  return products.map(product => (
    <tr key={product.key}>
      <td><img style={{width: "80px", height: "80px"}} src={product.thumbnail} /></td>
      <td style={{textTransform: "capitalize", width: "80%"}}><h1 style={{margin: 0}}>{product.name}</h1></td>
      <td style={{width: "10%", textAlign: "center"}}>
        <div style={{display: "flex", alignItems: "center"}}>
          <span style={{fontSize: "50px", color: "#0066FF", marginRight: "8px"}}>-</span>
          <h3 style={{margin: 0, padding: "5px 20px", borderRadius: "20px", border: "1px solid black"}}>1</h3>
          <span style={{fontSize: "40px", color: "#0066FF", marginLeft: "8px"}}>+</span>
        </div>
      </td>
      <td style={{width: "10%", textAlign: "center"}}><h2>{`${product.price}€`}</h2></td>
      <td style={{width: "10%", textAlign: "center"}}><i class="fas fa-trash-alt"></i></td>
    </tr>
  ))
};

const sumProducts = (products) => {
  return products.reduce((ac, product) => {
    return ac + product.price;
  }, 0);
}

const list = ({products, history})  => (
  <React.Fragment>
    <div style={{display: "flex", padding: "20px 40px", flexDirection: "column"}}>
      <h1 style={{textTransform: "uppercase", marginLeft: "40px", paddingBottom: "20px"}}>Shopping cart</h1>
      <table>
        {renderCartList(products)}
      </table>
    </div>
    <div style={{alignItems: "center", width: "100%", padding: "20px", position: "fixed", bottom: 0, display: "flex", alignSelf: "flex-end", flexDirection: "row", justifyContent: "flex-end"}}>
      <div style={{textAlign: "right", display: "flex", flexDirection: "column"}}>
        <h4 style={{margin: 0}}>Total:</h4>
        <h1 style={{margin: 0}}>{`${sumProducts(products)}€`}</h1>
      </div>
      <button onClick={() => {history.push("/checkout")}} id="checkout">Checkout</button>
    </div>
  </React.Fragment>
);

export default list;
