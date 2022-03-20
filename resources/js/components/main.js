import { useState } from 'react'
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

    return(
        <>
            {loading ? <Spinner/> : ''}
            {flash ? <Flash setFlash={setFlash}>{flash}</Flash> : ''}
            <Header/>
            <Routes>
                <Route path="/" element={<Login loading={setLoading} login={setId} sessionCheck={sessionCheck} flash={flash} setFlash={setFlash}/>}/>
                <Route path="/register" element={<Register loading={setLoading} id={id} sessionCheck={sessionCheck} flash={flash} setFlash={setFlash}/>}/>
                <Route path="/reset-password-mail" element={<ResetPasswordMail loading={setLoading} id={id} sessionCheck={sessionCheck} flash={flash} setFlash={setFlash}/>}/>
                <Route path="/reset-password-form/:token" element={<ResetPasswordForm loading={setLoading} id={id} sessionCheck={sessionCheck} flash={flash} setFlash={setFlash}/>}/>
                <Route path="/app/*" element={<Home loading={setLoading} loadState={loading} userID={id} setUserID={setId} sessionCheck={sessionCheck} flash={flash} setFlash={setFlash}/>}/>
            </Routes>
        </>
    )   
}

export default App