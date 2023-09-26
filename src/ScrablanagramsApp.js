import React, {createContext, useContext, useReducer} from "react";
import './ScrablanagramsApp.css';
import Header from "./component/Header/Header"
import UserInput from "./component/UserInput/UserInput"
import AnagramResult from "./component/AnagramResult/AnagramResult";
import Dictionary, {findAnagrams} from "./component/dictionary/Dictionary"

const initialState = {
    isLoading: true,
    tileInput: '',
    dictionary: {},
    isSortByScore: true,
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
            const result = findAnagrams(input)
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
