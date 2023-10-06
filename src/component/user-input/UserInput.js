import React, {useContext, useState} from 'react';
import {AppContext} from '../../ScrablanagramsApp'

export default function UserInput() {
    const {state, dispatch} = useContext(AppContext)
    const [tileInput, setTileInput] = useState('')
    const [boardTiles, setBoardTiles] = useState('')
    const [isScore, setIsScore] = useState(true)
    const [canSubmit, setCanSubmit] = useState(true)
    const [matchTiles, setMatchTiles] = useState('')
    const [leftMatch, setLeftMatch] = useState(false)
    const [rightMatch, setRightMatch] = useState(false)

    const submitInput = () => {
        console.log('user input for dispatch: ', tileInput)
        dispatch({type: 'TILE_INPUT', payload: {input: tileInput, isScore: isScore,
                boardTiles: boardTiles, matchTiles: matchTiles, leftMatch: leftMatch, rightMatch: rightMatch}})
        setCanSubmit(false)
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

    const handleMatch = (value, isLeft) => {
        setCanSubmit(true)
        isLeft ? setLeftMatch(value) : setRightMatch(value)
    }

    return (
        <div className='input-box'>
            <h2>Your Tiles:</h2>
            <input type='search' maxLength={18} value={tileInput}
                   onChange={(e) => handleType(e.target.value)}/>
            <h2>Board Tiles:</h2>
            <input type='search' maxLength={7} value={boardTiles}
                   onChange={(e) => handleBoardTiles(e.target.value)}/>
            <h2>Match Tiles:</h2>
            <div className='flex-panel'>
                <div className='flex-panel-item'>
                    <input className='largerCheckbox' type='checkbox' onChange={(e) => handleMatch(e.target.checked, true)}/>
                </div>
                <div className='flex-panel-item-large'>
                    <input type='search' maxLength={10} value={matchTiles}
                           onChange={(e) => handleMatchTiles(e.target.value)}/>
                </div>
                <div className='flex-panel-item'>
                    <input className='largerCheckbox' type='checkbox' onChange={(e) => handleMatch(e.target.checked, false)}/>
                </div>
            </div>

            <div className='sub-input-box'>
                <div className='sub-input'>
                    <label>Sort By Length</label>
                </div>
                <div className='sub-input'>
                    <input className='largerCheckbox' type='checkbox' onChange={(e) => handleGroupType(e.target.checked)}/>
                </div>
            </div>
            <button disabled={!canSubmit} onClick={submitInput}>Submit</button>
        </div>
    );
}
