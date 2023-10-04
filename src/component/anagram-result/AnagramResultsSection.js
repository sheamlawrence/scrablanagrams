import React from 'react';

export default function AnagramResultsSection({lookupKey, results, isSortByScore}) {
    const words = results[lookupKey]
    return (
        <div>
            {words && words.length > 0 ? (
                <div>
                    <div>
                        {isSortByScore ? 'Score:' : 'Length:'} {lookupKey}
                    </div>
                    <div>
                        <ul>
                            {words.map((word, i) => (
                                <li key={i + lookupKey}>{word}</li>
                            ))}
                        </ul>
                    </div>
                </div>

            ) : (<div/>)}

        </div>
    )
}