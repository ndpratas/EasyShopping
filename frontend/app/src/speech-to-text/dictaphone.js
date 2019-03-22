import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'
import Speech from 'react-speech';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import $ from "jquery";

import mockPostSpeechText from '../mockPostSpeechText';

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  startListening: PropTypes.func
}

// SpeechRecognition options
const options = {
  autoStart: false,
  continuous: false,
}

const myHeaders = new Headers();

const postConfig = {
  method: 'POST',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

class Dictaphone extends Component {
  constructor() {
    super();
    this.state = {
      latestText: '',
      numOfProducts: 0
    };
  }

  componentDidMount = () => {
    // const {startListening} = this.props;
    // window.addEventListener('load', startListening);
  }

  postSpeechText = (text) => {
    let { latestText } = this.state;
    const { finalTranscript, listening } = this.props;

    if (!listening && finalTranscript !== '' && latestText !== text) {
      console.log([listening, finalTranscript, latestText, text]);
      // TODO: add enpoint URL and uncomment
      // fetch('', postConfig)
      mockPostSpeechText()
        .then((response) => {
          console.log(response);
          latestText = text;
          // TODO: check how to obtain the number of products
          this.setState({ numOfProducts: response.length, latestText: text });
          this.playSpeech();
          return response;
        })
        .then((error) => {
          this.setState({ latestText: text });
          console.log(error);
        });
    }
  }

  playSpeech = () => {
    $(ReactDOM.findDOMNode(this).getElementsByClassName('rs-play')[0]).click();
  }

  render() {
    const { finalTranscript, resetTranscript, browserSupportsSpeechRecognition, startListening } = this.props
    const { numOfProducts, latestText } = this.state;

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    console.log(['state --> ', latestText, numOfProducts]);

    return (
      <div>
        <div>
          <button onClick={startListening}>Start</button>
          <button onClick={resetTranscript}>Reset</button>
        </div>
        <div>{finalTranscript}</div>
        {this.postSpeechText(finalTranscript)}
        <div>
          <Speech
            voice="Samantha"
            autoStart={true}
            textAsButton={true}
            displayText="Hello"
            text={`We have found ${numOfProducts} products`} />
        </div>
      </div>
    )
  }
}

Dictaphone.propTypes = propTypes

export default SpeechRecognition(options)(Dictaphone)