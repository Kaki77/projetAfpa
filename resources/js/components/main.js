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
import Error404 from './404'

export const Context = createContext({
    sessionCheck : {},
    loading : {},
    loadState : null,
    flash : null,
    setFlash : {},
    userID : null,
    setUserID : {},
})

const noAuthList = ['/','/register','/reset-password-mail','/reset-password-form/*']

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
            if(noAuthList.find(route=>route.match(location.pathname))) {
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
            if(!noAuthList.find(route=>route.match(location.pathname))) {
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
                <Route path="*" element={<Error404/>}/>
            </Routes>
        </Context.Provider>
    )   
}

export default App