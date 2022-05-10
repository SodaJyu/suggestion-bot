import React, { useState, useEffect } from 'react';

export default function Suggestion({ suggestionData }){
    const suggestions = suggestionData.data.map(el => el.suggestion);
    const randomNumberGenerator = () => {
        return Math.floor(Math.random() * (suggestions.length - 0) + 0)
    }
    const suggestion = suggestions[randomNumberGenerator()];
    return (
        <div className='suggestion'>
            <p>{suggestion}</p>
        </div>
    );
}
