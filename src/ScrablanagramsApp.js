import React, {createContext, useReducer} from "react";
import './ScrablanagramsApp.css';
import Header from "./component/header/Header"
import UserInput from "./component/user-input/UserInput"
import AnagramResult from "./component/anagram-result/AnagramResult";
import Dictionary, {findAnagrams} from "./component/dictionary/Dictionary"

const initialState = {
    isLoading: true,
    tileInput: '',
    dictionary: {},
    isSortByScore: true,
    boardTiles: '',
    matchTiles: '',
    anagramResult: []
}

const AppContext = createContext()

function reducer(state, action) {
    console.log('payload: ', action.payload)
    switch (action.type) {
        case 'LOADING' :
            return {
                ...state,
                isLoading: action.payload
            }
        case 'TILE_INPUT' :
            const input = action.payload.input
            const boardTiles = action.payload.boardTiles
            const matchTiles = action.payload.matchTiles
            const result = findAnagrams(input, boardTiles, matchTiles)
            return {
                ...state,
                tileInput: input,
                anagramResult: result,
                isSortByScore: action.payload.isScore
            }
        default :
            return initialState
    }
}

export default function ScrablanagramsApp() {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <AppContext.Provider value={{state, dispatch}}>
            <Header/>
            {state.isLoading ? (
                <div className='center'>
                    <div className='tile-input-box'>
                        <Dictionary/>
                    </div>
                </div>
            ) : (
                <div className='center'>
                    <div className='tile-input-box'>
                        <UserInput/>
                        <AnagramResult/>
                    </div>
                </div>
            )}

        </AppContext.Provider>
    );
}

export {AppContext};
