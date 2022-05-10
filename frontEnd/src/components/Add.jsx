import React, { useRef } from 'react';

export default function Add({ setNewSuggestion }){
    const suggestionInput = useRef();
    const updateSuggestion = (e) => {
        e.preventDefault();
        setNewSuggestion({
           suggestion: suggestionInput.current.value
        });
        suggestionInput.current.value = '';
    };
    return (
        <div className='bg-metal mt-5'>
            <form>
                <label className='mt-5 mr-5 text-silver'> What's your suggestion?</label>
                <input className='bg-white text-midnight h-10' type='text' placeholder='Suggestion here' ref={suggestionInput}></input>
                <button className='bg-bermuda mt-5 mb-5  h-10 w-20' onClick={updateSuggestion}>Add!</button>
            </form>
        </div>
    )
}