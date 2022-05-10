import React, { useRef } from 'react';


export default function Input({ setQuery }){
    const userInput = useRef();
    function updateInput(e){
        e.preventDefault()
        setQuery(userInput.current.value)
      }
    return (
        <div className='user-input'>
        <form>
          <input type='text' name='statement' ref={userInput}></input>
          <button onClick={updateInput}>Submit</button>
        </form>
      </div>
    )
}