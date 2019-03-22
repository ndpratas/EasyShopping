import React, { useState } from 'react';
import ImageUploader from '../image-uploader/image-uploader';
import './style.css';
import SpeechRecognition from '../speech-to-text/dictaphone';

const homePage = ({onResultsFound, history}) => {
  const homePageOnResultsFound = (results) => {
    if (results && results.length) {
      onResultsFound(results);
      history.push('/search/results');
    }
  };

  return (
    <div id="home-page">
      <section id="main-area">
        <img id="user-thumbnail" src="https://static1.squarespace.com/static/56262570e4b0504d6aeebeb1/563753a7e4b09ebbd96faa3c/563755fbe4b02ed46f8b80dd/1446467070961/Folio-Ring-flash-old-man.jpg" />        
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous"></link>
        <h2 style={{ margin: 0, textAlign: "center" }}>Welcome back Robert. What do you need today?</h2>
        <SpeechRecognition onResultsFound={homePageOnResultsFound} />
      </section>

      <section id="options-area">
        <ImageUploader onResultsFound={homePageOnResultsFound} />
        <button className="search-button"><i className="fas fa-font"></i><span> </span>Search by text</button>
      </section>
    </div>
  );
};

export default homePage;
