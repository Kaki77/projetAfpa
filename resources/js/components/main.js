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

    useEffect(() => {
      apiClient.post('/sessionCheck')
        .then(response=>{
            if(response.data.data) {
                setId(response.data.data)
            }
            else {
                setLoading(false)
                if(location.pathname !== '/' && location.pathname !== '/register') {
                    navigate(`/?next=${location.pathname}`,{replace:true});
                }
            }
        })
      return () => {
        //
      }
    }, [])
    

    return(
        <>
            {loading ? <Spinner/> : ''}
            <Routes>
                <Route path="/" element={<Login loading={setLoading} login={setId} />}/>
                <Route path="/register" element={<Register loading={setLoading} id={id}/>}/>
                <Route path="/app/*" element={<Home loading={setLoading} userID={id} setUserID={setId}/>}/>
            </Routes>
        </>
    )   
}

export default App