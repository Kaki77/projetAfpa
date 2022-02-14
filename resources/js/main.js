import ReactDOM from 'react-dom'
import React from 'react'
import Login from './components/Login'

function App(){
    return(
        <>
            <Login/>
        </>
    )   
}

if (document.getElementById('root')) {
    ReactDOM.render(<App/>, document.getElementById('root'));
}