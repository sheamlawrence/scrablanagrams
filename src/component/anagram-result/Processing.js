import React, {useContext, useState, useEffect} from 'react';
import {AppContext} from "../../ScrablanagramsApp";

export default function Processing() {
    const {state, dispatch} = useContext(AppContext)
    return (
        <div className='loading'>
            Thinking...
        </div>
    )
}