import React from 'react';
import UserThumbnail from '../user/thumbnail';
import './style.css';

const homePage = () => (
  <div id="home-page" style={{height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1}}>
    <section id="main-area" style={{alignItems: "center", display: "flex", flex: 1, flexDirection: "column", justifyContent: "space-around"}}>
      <UserThumbnail size="normal" />
      <img src="http://www.sclance.com/pngs/sound-wave-transparent-png/sound_wave_transparent_png_1278659.png" />
      <h2 style={{margin: 0, textAlign: "center"}}>Welcome back Robert. What do you need today?</h2>
    </section>
    
    <section id="options-area">
      <button className="search-button"><i class="fas fa-camera"></i><span> </span>Search by image</button>
      <button className="search-button"><i class="fas fa-font"></i><span> </span>Search by text</button>
    </section>
  </div>
);

export default homePage;
