import React, { useState, useEffect } from 'react';

export default function Suggestion({ suggestionData, suggestionVisible, setSuggestionVisible }){
    const suggestions = suggestionData.data.map(el => el.suggestion);
    const [suggestionState, setSuggestionState] = useState();
    const randomSuggestionGenerator = () => {
        let suggestion = setSuggestionState(suggestions[Math.floor(Math.random() * (suggestions.length - 0) + 0)]);
        return  suggestion;
    };

    useEffect(() => {
       if (!suggestionState){
           randomSuggestionGenerator();
       }
    }, []);

    const like = () => {
        setSuggestionVisible(false)
    };

    const dislike = () => {
        randomSuggestionGenerator();
    };

    return (
        <div 
        className={`
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
        ${suggestionVisible === true ? 'visible' : 'invisible'}`}
            >
            <p className='text-midnight text-center text-2xl mb-5' >{suggestionState}</p>
            <button className=' bg-purple text-silver mr-5 h-10 w-20 hover:bg-bubble-gum border rounded-m' onClick={like}>Like</button>
            <button className=' bg-purple text-silver h-10 w-20 hover:bg-bubble-gum border rounded-m' onClick={dislike}>Dislike</button>
        </div>
    );
}
