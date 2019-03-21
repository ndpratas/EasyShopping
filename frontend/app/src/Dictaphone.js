import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'
import PropTypes from 'prop-types';

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  startListening: PropTypes.func
}

const options = {
  autoStart: false
}

const myHeaders = new Headers();

const postConfig = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

class Dictaphone extends Component {
  constructor() {
    super();
    this.state = {
      latestText: ''
    };
  }
  postSpeechText = (text) => {
    let { latestText } = this.state;

    console.log('postSpeechText');
    if (latestText !== text) {
      // TODO: add enpoint URL
      fetch('', postConfig)
        .then(function (response) {
          console.log(response);
          latestText = text;
          return response;
        })
        .then((error) => {
          latestText = text;
          console.log(error);
        });
    }
  }

  render() {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition, startListening } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    return (
      <div>
        <button onClick={startListening}>Start</button>
        <button onClick={resetTranscript}>Reset</button>
        <span>{transcript}</span>
        {this.postSpeechText(transcript)}
      </div>
    )
  }
}

Dictaphone.propTypes = propTypes

export default SpeechRecognition(options)(Dictaphone)