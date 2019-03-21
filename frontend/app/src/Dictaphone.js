import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'
import Speech from 'react-speech';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import $ from "jquery";

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  startListening: PropTypes.func
}

// SpeechRecognition options
const options = {
  autoStart: false
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

  postSpeechText = (text) => {
    let { latestText } = this.state;

    if (latestText !== text) {
      // TODO: add enpoint URL
      fetch('', postConfig)
        .then((response) => {
          latestText = text;
          // TODO: check how to obtain the number of products
          this.setState({ numOfProducts: response.length });
          return response;
        })
        .then((error) => {
          latestText = text;
          console.log(error);
        });
    }
  }

  playSpeech = () => {
    $(ReactDOM.findDOMNode(this).getElementsByClassName('rs-play')[0]).click();
  }

  render() {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition, startListening } = this.props
    const { numOfProducts } = this.state;

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    return (
      <div>
        <div>
          <button onClick={startListening}>Start</button>
          <button onClick={resetTranscript}>Reset</button>
        </div>
        <div>{transcript}</div>
        {this.postSpeechText(transcript)}
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