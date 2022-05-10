import React, { useRef } from 'react';


export default function Input({ setQuery }){
    const userInput = useRef();
    function updateInput(e){
        e.preventDefault()
        setQuery(userInput.current.value)
        userInput.current.value = '';
      }
    return (
        <div className='bg-metal mt-5 '>
        <form>
          <input type='text' name='statement' ref={userInput}></input>
          <button className='bg-bermuda text-midnight p-0.8 w-fit mt-5 mb-5' onClick={updateInput}>Submit</button>
        </form>
      </div>
    )
}