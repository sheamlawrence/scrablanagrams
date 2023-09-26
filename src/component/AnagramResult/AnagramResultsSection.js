import React from 'react';

export default function AnagramResultsSection({numVal, words, isScore}) {

    return (
        <div>
            <div>
                {isScore ? 'Score:' : 'Length:'} {numVal}
            </div>
            <div>
                <ul>
                    {words.map((word, i) => (
                        <li key={i}>{word}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}