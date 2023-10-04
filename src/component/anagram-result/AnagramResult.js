import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../../ScrablanagramsApp'
import AnagramResultsSection from "./AnagramResultsSection";
import {findAnagrams} from "../dictionary/Dictionary";
import Processing from "./Processing";

const scoreMap = {
    'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2,
    'H': 4, 'I': 1, 'J': 8, 'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3,
    'Q': 10, 'R': 1, 'S': 1, 'T': 1, 'U': 1, 'V': 4, 'W': 4, 'X': 8, 'Y': 4,
    'Z': 10
}

let count = 0;
let results = {};
let keys = [];

const handleInput = (tileInput, boardTiles, matchTiles, isSortByScore, leftMatch, rightMatch) => {
    const result = findAnagrams(tileInput, boardTiles, matchTiles, leftMatch, rightMatch)
    count = result.length
    results = parseResult(tileInput, result, isSortByScore)
    keys = Object.keys(results).sort((a, b) => b - a)
}

const isDone = (dispatch) => {
    dispatch({type: 'DONE_PROCESSING'})
}

export default function AnagramResult() {
    const {state, dispatch} = useContext(AppContext)
    const isSortByScore = state.isSortByScore
    const tileInput = state.tileInput
    const boardTiles = state.boardTiles
    const matchTiles = state.matchTiles
    const leftMatch = state.leftMatch
    const rightMatch = state.rightMatch

    useEffect(() => {
        handleInput(tileInput, boardTiles, matchTiles, isSortByScore, leftMatch, rightMatch)
        isDone(dispatch)
    })

    return (
        <div>
            {keys.length > 0 ? (
                <div>
                    <div className='result-msg'>
                        {getSummaryMessage(count, matchTiles, leftMatch, rightMatch)}
                    </div>
                    <div className='results-list'>
                        {state.isProcessing ? (
                            <Processing/>
                        ) : (
                            <ul>
                                {keys.map((key, i) => (
                                    <AnagramResultsSection lookupKey={key} results={results} isSortByScore={isSortByScore}/>
                                ))}
                            </ul>
                        )}

                    </div>
                </div>
            ) : (
                <div className='results-list'>
                    {state.isProcessing ? (
                        <Processing/>
                    ) : (
                        <p>No results :(</p>
                    )}
                </div>)
            }
        </div>
    )
}

function getSummaryMessage(count, matchTiles, leftMatch, rightMatch) {
    let msg = count + ' results!\n'
    if (matchTiles && matchTiles.length > 0 && count > 0) {
        msg += 'Match "' + matchTiles + '" '
            + (leftMatch && rightMatch ? 'at both ends' :
                (leftMatch ? 'at left' : (rightMatch ? 'at right' : '')))
    }
    return msg
}

function parseResult(input, result, isSortByScore) {
    let output = {}
    if (result && result.length > 0 && input.length > 0) {
        for (let i = 0; i < result.length; i++) {
            const word = result[i]
            const numVal = isSortByScore ? scoreWord(word) : word.length
            if (!output[numVal]) {
                output[numVal] = []
            }
            output[numVal].push(word)
        }
    }

    return output
}

function scoreWord(word) {
    let score = 0
    if (word && word.length > 0 && word !== 'Enter some tiles!') {
        word.split('').forEach((char) => {
            score += scoreMap[char]
        })
    }
    return score
}


