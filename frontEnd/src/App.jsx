import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import padSequences from './helper/padSequences';
import axios from 'axios';
import Suggestion from './components/Suggestion';
import Input from './components/Input';

function App() {


const [metadata, setMetadata] = useState();
const [model, setModel] = useState();
const [testScore, setScore] = useState("");
const [trimmedText, setTrim] = useState("")
const [modelLoaded, setModelLoaded] = useState(false)
const [metadataLoaded, setMetadataLoaded] = useState(false)
const [query, setQuery] = useState();
const [suggestions, setSuggestions] = useState();
const userInput = useRef();
const url = {
  model: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_lstm_v1/model.json',
  metadata: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_lstm_v1/metadata.json'
};

const OOV_INDEX = 2;



async function loadModel(url) {
  try {
    const model = await tf.loadLayersModel(url.model);
    setModel(model);
    setModelLoaded(true);
  } catch {
    console.log("model not loaded");
  }
}

async function loadMetadata(url) {
  try {
    const metadataJson = await fetch(url.metadata);
    const metadata = await metadataJson.json();
    setMetadata(metadata);
    setMetadataLoaded(true);
  } catch (err) {
    console.log("metadata not loaded");
  }
}
  
  useEffect(() => {
    if (modelLoaded === false){
      loadModel(url);
    }
    if (metadataLoaded === false){
      loadMetadata(url);
    }
  }, []);

const getSentimentScore = async (text) => {
  const inputText = text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
  setTrim(inputText)
  const sequence = inputText.map(word => {
    let wordIndex = metadata.word_index[word] + metadata.index_from;
    if (wordIndex > metadata.vocabulary_size) {
      wordIndex = OOV_INDEX;
    }
    return wordIndex;
  });
  const paddedSequence = padSequences([sequence], metadata.max_len);
  const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);
  const predictOut = model.predict(input);
  const score = predictOut.dataSync()[0];
  console.log(score);
  predictOut.dispose();
  setScore(score)  
 
  return score;
}

const sentimentScore = () => {
  if (metadataLoaded === true && modelLoaded === true){
    getSentimentScore(query);
    }
}

// test user uploads using AI to decide whether they are positive or negative.

const fetchSuggestion = async () => {
  if (testScore >= 0.65){
    const suggestion = await axios
    .get('/positive')
    .catch((error) => {
      console.log(error.response)
    });
    setSuggestions(suggestion)
  } else {
    const suggestion = await axios
    .get('/negative')
    .catch((error) => {
      console.log(error.response)
    });
    setSuggestions(suggestion)
  } 
};

const postData = async (suggestion) => {
  if (getSentimentScore(suggestion) >= 0.65){
    await axios
    .post('/positive', suggestion)
    .catch((error) => {
      console.log(error.response);
    })
  } else {
    await axios
  .post('/negative', suggestion)
  .catch((error) => {
    console.log(error.response);
  })
  }
};


// function updateInput(e){
//   e.preventDefault()
//   console.log(userInput.value)
//   setQuery(userInput.value)
// }
useEffect(() => {
  sentimentScore();
  fetchSuggestion();
}, [query]);


  return (
    <div className="App">
      <header className="App-header">
       Suggestion Bot
      </header>
      <main>
      {/* {suggestions ? <Suggestion /> : '' } */}
      <Input setQuery={setQuery} />
      </main>
    </div>
  );
}

export default App;
