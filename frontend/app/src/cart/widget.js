import React from 'react';
import './widget.style.css';

const widget = ({numberOfItems = 0}) => (
  <section className="cart-widget">
    <i class="fas fa-shopping-cart"></i>
    <p>CART</p>
    <section className="circle">{numberOfItems}</section>
  </section>
);

export default widget;
