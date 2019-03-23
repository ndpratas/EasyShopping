import React from 'react';
import UserThumbnail from '../user/thumbnail';
import CartWidget from '../cart/widget';
import Logo from '../navigation/logo';
import './navview.style.css';

const navbar = ({numberOfItems, children}) => (
  <div>
    <div id="navview">
      <Logo />
      <CartWidget numberOfItems={numberOfItems} />
    </div>
    <section style={{flex: 1}}>
      {children}
    </section>
  </div>
);

export default navbar;