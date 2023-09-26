import React, {useContext, useState} from 'react';
import {AppContext} from '../../ScrablanagramsApp'

export default function UserInput() {
    const {state, dispatch} = useContext(AppContext)
    const [tileInput, setTileInput] = useState('')
    const [isScore, setIsScore] = useState(true)
    const [canSubmit, setCanSubmit] = useState(true)

    const submitInput = () => {
        console.log('user input for dispatch: ', tileInput)
        setCanSubmit(false)
        dispatch({type: 'TILE_INPUT', payload: {input: tileInput, isScore: isScore}})
    }

    const handleType = (value) => {
        const result = value.replace(/[^a-z]/gi, '').toUpperCase();
        setCanSubmit(true)
        setTileInput(result)
    }

    const handleGroupType = (value) => {
        setCanSubmit(true)
        setIsScore(!value)
    }

    return (
        <div className='input-box'>
            <h2>Board Tiles:</h2>
            <input type='search' maxLength={20} value={tileInput}
                   onChange={(e) => handleType(e.target.value)}/>
            <div className='sub-input-box'>
                    <div className='sub-input'>
                        <label>By Length</label>
                    </div>
                    <div className='sub-input'>
                        <input type='checkbox' onChange = {(e) => handleGroupType(e.target.checked)}/>
                    </div>
            </div>
            <button  disabled={!canSubmit} onClick={submitInput}>Submit</button>
        </div>
    );
}
