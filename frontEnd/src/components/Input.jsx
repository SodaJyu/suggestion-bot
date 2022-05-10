import React, { useRef } from 'react';


export default function Input({ setQuery }){
    const userInput = useRef();
    function updateInput(e){
        e.preventDefault()
        setQuery(userInput.current.value)
        userInput.current.value = '';
      }
    return (
        <div className='bg-metal mt-40 '>
        <form>
          <h5 className='text-silver text-2xl'>What's up?</h5>
          <input type='text' name='statement' className='border rounded-tl rounded-bl h-10 text-center' ref={userInput} placeholder='Insert Troubles'></input>
          <button className='bg-bermuda text-midnight h-10 p-0.8 w-20 mt-5 mb-5 border rounded-tr rounded-br hover:bg-bubble-gum' onClick={updateInput}>Submit</button>
        </form>
      </div>
    )
}