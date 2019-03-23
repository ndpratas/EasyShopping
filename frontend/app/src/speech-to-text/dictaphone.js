import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'
import Speech from 'react-speech';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import $ from "jquery";
import audioWave from './AudioVisualizer.gif';
import mic from './mic.png';

const propTypes = {
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  startListening: PropTypes.func,
  stopListnening: PropTypes.func,
}

// SpeechRecognition options
const options = {
  autoStart: false,
  continuous: false,
}

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
    const { finalTranscript, listening, onResultsFound } = this.props;
    console.log(['onResultsFound', onResultsFound])

    if (!listening && finalTranscript !== '' && latestText !== text) {
      fetch('http://localhost:8001/search?tag=' + text.replace(' ', ','))
        .then(res => res.json())
        .then((results) => {
          onResultsFound(results);
          this.setState({ numOfProducts: results.length, latestText: text });
          this.playSpeech();
          return results;
        })
        .catch((error) => {
          console.log(error);
          this.setState({ latestText: text });
          onResultsFound([]);
        });
    }
  }

  componentWillUnmount() {
    const { stopListening, resetTranscript } = this.props;
    resetTranscript();
    stopListening();
  }

  playSpeech = () => {
    $(ReactDOM.findDOMNode(this).getElementsByClassName('rs-play')[0]).click();
  }

  render() {
    const { finalTranscript, transcript, browserSupportsSpeechRecognition, startListening, listening } = this.props
    const { numOfProducts, latestText } = this.state;

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    console.log(['state --> ', latestText, numOfProducts]);

    return (
      <div>
        {/* <div>
          <button onClick={startListening}>Start</button>
          <button onClick={resetTranscript}>Reset</button>
        </div> */}
        <div>
          <img alt="mic" src={mic} style={{ display: listening ? 'none' : ' block'}} onClick={startListening}/>
          <img alt="AudioVisualizer" src={audioWave} style={{ width: '200px', height: '90px', display: listening ? 'block' : ' none' }} />
          {/* <div style={{ display: (listening && transcript !== '') ? 'block' : 'none'}}>Searching...</div> */}
        </div>
        {/* <div>{finalTranscript}</div> */}
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