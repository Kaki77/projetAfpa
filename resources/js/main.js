import ReactDOM from 'react-dom'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Spinner from './components/Spinner'

function App(){

    const [loading, setLoading] = useState(false)

    return(
        <BrowserRouter>
            {loading ? <Spinner/> : ''}
            <Routes>
                <Route path="/" element={<Login loading={setLoading}/>}/>
                <Route path="/register" element={<Register loading={setLoading}/>}/>
            </Routes>
        </BrowserRouter>
    )   
}

if (document.getElementById('root')) {
    ReactDOM.render(<App/>, document.getElementById('root'));
}