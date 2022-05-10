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
        <div className='add-suggestion'>
            <form>
                <label className='suggestion-label'> What's your suggestion?</label>
                <input type='text' placeholder='Suggestion here' ref={suggestionInput}></input>
                <button onClick={updateSuggestion}>Add!</button>
            </form>
        </div>
    )
}