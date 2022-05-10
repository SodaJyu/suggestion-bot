import React, { useRef } from 'react';

export default function Add({ setNewSuggestion, addSuggestion }){
    const suggestionInput = useRef();
    const updateSuggestion = (e) => {
        e.preventDefault();
        setNewSuggestion({
           suggestion: suggestionInput.current.value
        });
        suggestionInput.current.value = '';
    };
    return (
        <div className={`
        z-30 \
        h-2/6 \
        w-2/6 \
        mx-auto \
        p-20 \
        content-center \
        border \
        rounded-xl \
        bg-tahiti \
        text-center \
        fixed 
        top-50 
        right-0 
        left-0   \
        ${addSuggestion === true ? 'visible' : 'invisible'}`}>
            <form>
                <label className='mt-5 mr-5 text-silver text-2xl'> What's your suggestion?</label>
                <input className='bg-white text-midnight h-10 border rounded-tl rounded-bl' type='text' placeholder='Suggestion here' ref={suggestionInput}></input>
                <button className='bg-bermuda mt-5 mb-5  h-10 w-20 border rounded-tr rounded-br hover:bg-bubble-gum' onClick={updateSuggestion}>Add!</button>
            </form>
        </div>
    )
}