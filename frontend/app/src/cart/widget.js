import React from 'react';
import './widget.style.css';

const widget = (numberOfItems) => (
  <section className="cart-widget">
    <i class="fas fa-shopping-cart"></i>
    <p>CART</p>
    <section className="circle">{0}</section>
  </section>
);

export default widget;
