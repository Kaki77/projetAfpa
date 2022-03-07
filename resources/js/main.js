import React from 'react';
import ReactDOM from 'react-dom'
import { useState,useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Spinner from './components/Spinner'
import Home from './components/Home'
import apiClient from './axios';

function App(){

    const [loading, setLoading] = useState(false)
    const [isLogin, setIsLogin] = useState(sessionStorage.getItem('loggedIn')=='true' || false)
    const [id, setId] = useState('')
    const navigate=useNavigate()

    function trackLogin(){
        setIsLogin(true)
        sessionStorage.setItem('loggedIn',true)
    }
    
    function trackLogout(){
        setIsLogin(false)
        sessionStorage.setItem('loggedIn',false)
    }

    useEffect(() => {
      apiClient.post('/sessionCheck')
        .then(response=>{
            if(response.data.data) {
                setId(response.data.data)
            }
            else { //a changer
                navigate('/')
            }
        })
      return () => {
        //
      }
    }, [])
    

    return(
            <BrowserRouter>
                {loading ? <Spinner/> : ''}
                <Routes>
                    <Route path="/" element={<Login loading={setLoading} login={trackLogin} />}/>
                    <Route path="/register" element={<Register loading={setLoading}/>}/>
                    <Route path="/app/*" element={<Home loading={setLoading}/>}/>
                </Routes>
            </BrowserRouter>
    )   
}

if (document.getElementById('root')) {
    ReactDOM.render(<React.StrictMode><App/></React.StrictMode>, document.getElementById('root'));
}