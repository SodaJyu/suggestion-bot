import React, { useState, useEffect } from 'react';

export default function Suggestion({ suggestionData, visible, setVisible }){
    const suggestions = suggestionData.data.map(el => el.suggestion);
    const [suggestionState, setSuggestionState] = useState();
    const randomSuggestionGenerator = () => {
        return setSuggestionState(suggestions[Math.floor(Math.random() * (suggestions.length - 0) + 0)]); 
    };

    useEffect(() => {
       if (!suggestionState){
           randomSuggestionGenerator();
       }
    }, []);

    const like = () => {
        setVisible(false)
    };

    const dislike = () => {
        randomSuggestionGenerator();
    };

    return (
        <div 
        className={`overflow-auto \
        z-30 \
        h-5/6 \
        w-10/12 \
        mx-auto \
        top-20 \
        p-6 \
        border \
        rounded-xl \
        bg-white \
        text-left \
        fixed \
        ${visible === true ? 'visible' : 'invisible'}`}
            >
            <p className='text-tahiti'>{suggestionState}</p>
            <button className=' text-silver mr-5 h-10 w-10' onClick={like}>Like</button>
            <button className=' text-silver h-10 w-10' onClick={dislike}>Dislike</button>
        </div>
    );
}
