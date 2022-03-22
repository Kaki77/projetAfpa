import { useState,createContext, useMemo } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import apiClient from '../axios'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Spinner from './Spinner'
import Flash from './Flash'
import ResetPasswordMail from './ResetPasswordMail'
import ResetPasswordForm from './ResetPasswordForm'
import Header from './Header'

export const Context = createContext({
    sessionCheck : {},
    loading : {},
    loadState : null,
    flash : null,
    setFlash : {},
    userID : null,
    setUserID : {},
})

function App(){

    const [loading, setLoading] = useState(false)
    const [flash, setFlash] = useState('')
    const [id, setId] = useState('')
    const location = useLocation()
    const navigate = useNavigate()

    function sessionCheck(callback=null,controller=null) {
        apiClient.post('/sessionCheck')
        .then(response=>{
            setId(response.data.data)
            if(location.pathname == '/' || location.pathname == '/register' || location.pathname == '/reset-password-mail' || location.pathname == '/reset-password-form') {
                navigate('/app',{replace:true});
            }
            else {
                if(callback && controller) {
                    callback(controller)
                }
            }
        })
        .catch(error=>{
            setLoading(false)
            if(location.pathname !== '/' && location.pathname !== '/register' && location.pathname !== '/reset-password-mail' && !location.pathname.match('/reset-password-form/*')) {
                navigate(`/?next=${location.pathname}`,{replace:true});
            }
        })
    }   

    const contextValue = {
        sessionCheck : sessionCheck,
        loading : setLoading,
        loadState : loading,
        flash : flash,
        setFlash , setFlash,
        userID : id,
        setUserID : setId
    }

    return(
        <Context.Provider value={contextValue}>
            {loading ? <Spinner/> : ''}
            {flash ? <Flash/> : ''}
            <Header/>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/reset-password-mail" element={<ResetPasswordMail/>}/>
                <Route path="/reset-password-form/:token" element={<ResetPasswordForm/>}/>
                <Route path="/app/*" element={<Home/>}/>
            </Routes>
        </Context.Provider>
    )   
}

export default App