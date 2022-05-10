import React, {useState, useEffect} from 'react';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import padSequences from './helper/padSequences';
import axios from 'axios';
import Suggestion from './components/Suggestion';
import Input from './components/Input';
import Add from './components/Add';

function App() {


const [metadata, setMetadata] = useState();
const [model, setModel] = useState();
const [testScore, setScore] = useState("");
const [modelLoaded, setModelLoaded] = useState(false)
const [metadataLoaded, setMetadataLoaded] = useState(false)
const [query, setQuery] = useState();
const [suggestionData, setSuggestionData] = useState();
const [newSuggestion, setNewSuggestion] = useState();
const [suggestionVisible, setSuggestionVisible] = useState(false);
const [addSuggestion, setAddSuggestion] = useState(false)
const url = {
  model: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_lstm_v1/model.json',
  metadata: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_lstm_v1/metadata.json'
};

const mood = testScore >= 0.65 ? "positive" : "negative"

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


const fetchSuggestion = async () => {
  console.log(mood)
  if (mood === "positive"){
    const suggestion = await axios
    .get('/positive')
    .catch((error) => {
      console.log(error.response)
    });
    setSuggestionData(suggestion)
    setSuggestionVisible(true);
  } else {
    const suggestion = await axios
    .get('/negative')
    .catch((error) => {
      console.log(error.response)
    });
    setSuggestionData(suggestion)
    setSuggestionVisible(true)
  } 
};

const postData = async (data) => {
  if (getSentimentScore(newSuggestion) >= 0.65){
    await axios
    .post('/positive', data)
    .catch((error) => {
      console.log(error.response);
    })
  } else {
    await axios
  .post('/negative', data)
  .catch((error) => {
    console.log(error.response);
  })
  }
};

const userSuggestion = () => {
  setAddSuggestion(!addSuggestion);
};

useEffect(() => {
  if (newSuggestion){
    postData(newSuggestion);
  }
},[newSuggestion]);

useEffect(() => {
  sentimentScore();
}, [query]);

useEffect(() => {
  if (testScore && query){
    fetchSuggestion();
  }
}, [testScore]);


  return (
    <div className="App h-screen bg-metal">
      <header className="bg-bubble-gum h-50 pt-10 flex space-x-200 justify-center">
       <p className='text-4xl ml-40 mb-10 text-tahiti'>Suggestion Bot</p>
       <button className='bg-metal text-silver ml-40 mb-10 border rounded-s hover:bg-tahiti justify-end' onClick={userSuggestion}>New Suggestion</button>
      </header>
      <main className='bg-metal h-full'>
      { addSuggestion ? <Add setNewSuggestion={setNewSuggestion} addSuggestion={addSuggestion} /> : ''}
      { suggestionData ? <Suggestion setSuggestionVisible={setSuggestionVisible} suggestionVisible={suggestionVisible} suggestionData={suggestionData} /> : '' }
      <Input setQuery={setQuery} />
      </main>
    </div>
  );
}

export default App;
