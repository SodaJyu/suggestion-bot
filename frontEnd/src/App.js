import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import padSequences from './helper/padSequences';

function App() {

  const url = {
    model: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_lstm_v1/model.json',
    metadata: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_lstm_v1/metadata.json'
  };

const OOV_INDEX = 2;

const [metadata, setMetadata] = useState();
const [model, setModel] = useState();
const [testText, setText] = useState("");
const [testScore, setScore] = useState("");
const [trimedText, setTrim] = useState("")
const [seqText, setSeq] = useState("")
const [padText, setPad] = useState("")
const [inputText, setInput] = useState("")
const [modelLoaded, setModelLoaded] = useState(false)
const [metadataLoaded, setMetadataLoaded] = useState(false)
const [query, setQuery] = useState();
const userInput = useRef();



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
  setSeq(sequence)
  const paddedSequence = padSequences([sequence], metadata.max_len);
  setPad(paddedSequence)

  const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);
  setInput(input)
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


function updateInput(e){
  e.preventDefault()
  setQuery(userInput.current.value)
}
useEffect(() => {
  sentimentScore()
}, [query]);


  return (
    <div className="App">
      <header className="App-header">
       Suggestion Bot
      </header>
      <main>
        <div className='user-input'>
          <form>
            <input type='text' name='statement' ref={userInput}></input>
            <button onClick={updateInput}>Submit</button>
          </form>
        
        </div>
       
      </main>
    </div>
  );
}

export default App;
