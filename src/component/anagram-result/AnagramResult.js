import React, {useContext} from 'react';
import {AppContext} from '../../ScrablanagramsApp'
import AnagramResultsSection from "./AnagramResultsSection";

const scoreMap = {
    'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2,
    'H': 4, 'I': 1, 'J': 8, 'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3,
    'Q': 10, 'R': 1, 'S': 1, 'T': 1, 'U': 1, 'V': 4, 'W': 4, 'X': 8, 'Y': 4,
    'Z': 10
}

let noDiceMsg = ''

export default function AnagramResult() {
    const {state, dispatch} = useContext(AppContext)
    const results = parseResult(state.tileInput, state.anagramResult, state.isSortByScore)
    const keys = Object.keys(results).sort((a, b) => b - a)
    if (keys.length > 0) {
        return (
            <div className='results-list'>
                <ul>
                    {keys.map((key, i) => (
                        <AnagramResultsSection numVal={key} words={results[key]} isScore={state.isSortByScore}/>
                    ))}
                </ul>
            </div>)
    } else {
        return (
            <div className='results-list'>
                <p>{noDiceMsg}</p>
            </div>)
    }
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
    } else {
        if (input.length > 0) {
            noDiceMsg = "No Results found :("
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


