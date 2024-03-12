import React, { useState } from 'react'
import './App.css';

function Input(props) {
    const [input, setInput] = useState("")

    


    return (
        <div>
            <header>
                <h1>Jamming</h1>
            </header>
            <n/>
            <h3>Search a song/music:</h3>
            <input type="text" value={input} placeholder='Type your song here'></input>
            <button onSubmit="handle submit">Search</button>
        </div>
    )
}




export default Input