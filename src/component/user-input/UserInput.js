import React, {useContext, useState} from 'react';
import {AppContext} from '../../ScrablanagramsApp'

export default function UserInput() {
    const {state, dispatch} = useContext(AppContext)
    const [tileInput, setTileInput] = useState('')
    const [boardTiles, setBoardTiles] = useState('')
    const [isScore, setIsScore] = useState(true)
    const [canSubmit, setCanSubmit] = useState(true)
    const [matchTiles, setMatchTiles] = useState('')

    const submitInput = () => {
        console.log('user input for dispatch: ', tileInput)
        setCanSubmit(false)
        dispatch({type: 'TILE_INPUT', payload: {input: tileInput, isScore: isScore,
                boardTiles: boardTiles, matchTiles: matchTiles}})
    }

    const handleType = (value) => {
        const result = value.replace(/[^a-z]/gi, '').toUpperCase();
        setCanSubmit(true)
        setTileInput(result)
    }

    const handleBoardTiles = (value) => {
        const result = value.replace(/[^a-z]/gi, '').toUpperCase();
        setCanSubmit(true)
        setBoardTiles(result)
    }

    const handleMatchTiles = (value) => {
        const result = value.replace(/[^a-z]/gi, '').toUpperCase();
        setCanSubmit(true)
        setMatchTiles(result)
    }

    const handleGroupType = (value) => {
        setCanSubmit(true)
        setIsScore(!value)
    }

    return (
        <div className='input-box'>
            <h2>Your Tiles:</h2>
            <input type='search' maxLength={20} value={tileInput}
                   onChange={(e) => handleType(e.target.value)}/>
            <h2>Board Tiles:</h2>
            <input type='search' maxLength={10} value={boardTiles}
                   onChange={(e) => handleBoardTiles(e.target.value)}/>
            <h2>Match Tiles:</h2>
            <input type='search' maxLength={7} value={matchTiles}
                   onChange={(e) => handleMatchTiles(e.target.value)}/>
            <div className='sub-input-box'>
                <div className='sub-input'>
                    <label>By Length</label>
                </div>
                <div className='sub-input'>
                    <input type='checkbox' onChange={(e) => handleGroupType(e.target.checked)}/>
                </div>
            </div>
            <button disabled={!canSubmit} onClick={submitInput}>Submit</button>
        </div>
    );
}
