import React from 'react';
import UserThumbnail from '../user/thumbnail';
import CartWidget from '../cart/widget';
import Logo from '../navigation/logo';
import './navview.style.css';

const navbar = ({children}) => (
  <React.Fragment>
    <div id="navview">
      <Logo />
      <CartWidget />
      {/* <UserThumbnail size="small" /> */}
    </div>
    <section style={{flex: 1}}>
      {children}
    </section>
  </React.Fragment>
);

export default navbar;