import React from 'react';
import './thumbnail.style.css';

const thumbnail = ({size, picture}) => (
  <img className={`user-thumbnail ${size}`} src="https://static1.squarespace.com/static/56262570e4b0504d6aeebeb1/563753a7e4b09ebbd96faa3c/563755fbe4b02ed46f8b80dd/1446467070961/Folio-Ring-flash-old-man.jpg" />
);

export default thumbnail;
