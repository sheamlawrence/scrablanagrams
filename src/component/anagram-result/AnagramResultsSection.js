import React from 'react';
let keys = []
export default function AnagramResultsSection({numVal, words, isScore}) {
    const getKey = (word) => {
        let key = word
        while (keys.includes(key)) {
            key = word + '-' + Math.floor(Math.random() * 100)
        }
        keys.push(key)
        return key
    }
    return (
        <div>
            <div>
                {isScore ? 'Score:' : 'Length:'} {numVal}
            </div>
            <div>
                <ul>
                    {words.map((word, i) => (
                        <li key={getKey(word)}>{word}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}