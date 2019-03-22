import React from 'react';
import './style.css';

const homePage = () => (
  <div id="home-page" style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1}}>
    <section id="main-area" style={{alignItems: "center", display: "flex", flex: 1, flexDirection: "column", justifyContent: "space-around"}}>
      <img id="user-thumbnail" src="https://static1.squarespace.com/static/56262570e4b0504d6aeebeb1/563753a7e4b09ebbd96faa3c/563755fbe4b02ed46f8b80dd/1446467070961/Folio-Ring-flash-old-man.jpg" />
      <img src="http://www.sclance.com/pngs/sound-wave-transparent-png/sound_wave_transparent_png_1278659.png" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"></link>
      <h2 style={{margin: 0, textAlign: "center"}}>Welcome back Robert. What do you need today?</h2>
    </section>
    
    <section id="options-area">
      <button className="search-button"><i class="fas fa-camera"></i><span> </span>Search by image</button>
      <button className="search-button"><i class="fas fa-font"></i><span> </span>Search by text</button>
    </section>
  </div>
);

export default homePage;
