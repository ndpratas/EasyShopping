import React from 'react';
import './widget.style.css';
import { Link } from 'react-router-dom';

const widget = ({numberOfItems = 0}) => (
  <Link to="/cart/list">
    <section className="cart-widget">
      <i class="fas fa-shopping-cart"></i>
      <p>CART</p>
      <section className="circle">{numberOfItems}</section>
    </section>
  </Link>
);

export default widget;
