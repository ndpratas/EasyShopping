import React from 'react';
import './logo.style.css';
import { Link } from 'react-router-dom';

const logo = () => (
  <Link to="/">
    <div id="logo">
      <h1>loja</h1>
      <i class="fas fa-comment-dots"></i>
    </div>
  </Link>
);

export default logo;
