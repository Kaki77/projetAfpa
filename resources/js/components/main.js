import { useState,useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Spinner from './Spinner'
import Home from './Home'
import apiClient from '../axios';

function App(){

    const [loading, setLoading] = useState(false)
    const [id, setId] = useState('')
    const location = useLocation()
    const navigate = useNavigate()

    function sessionCheck() {
        apiClient.post('/sessionCheck')
        .then(response=>{
            if(response.data.data) {
                console.log('authenticated');
                setId(response.data.data)
                if(location.pathname == '/' || location.pathname == '/register') {
                    navigate('/app',{replace:true});
                }
            }
            else {
                console.log('not authenticated');
                setLoading(false)
                if(location.pathname !== '/' && location.pathname !== '/register') {
                    navigate(`/?next=${location.pathname}`,{replace:true});
                }
                return false
            }
        })
        return true
        
    }

    return(
        <>
            {loading ? <Spinner/> : ''}
            <Routes>
                <Route path="/" element={<Login loading={setLoading} login={setId} sessionCheck={sessionCheck}/>}/>
                <Route path="/register" element={<Register loading={setLoading} id={id} sessionCheck={sessionCheck}/>}/>
                <Route path="/app/*" element={<Home loading={setLoading} userID={id} setUserID={setId} sessionCheck={sessionCheck}/>}/>
            </Routes>
        </>
    )   
}

export default App