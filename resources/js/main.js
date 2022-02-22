import ReactDOM from 'react-dom'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Spinner from './components/Spinner'
import Home from './components/Home'
import FriendCard from './components/FriendCard'
import ProfilePage from './components/ProfilePage'

function App(){

    const [loading, setLoading] = useState(false)
    const [isLogin, setIsLogin] = useState(sessionStorage.getItem('loggedIn')=='true' || false)

    function trackLogin(){
        setIsLogin(true)
        sessionStorage.setItem('loggedIn',true)
    }
    
    function trackLogout(){
        setIsLogin(false)
        sessionStorage.setItem('loggedIn',false)
    }

    return(
        <BrowserRouter>
            {loading ? <Spinner/> : ''}
            <Routes>
                <Route path="/" element={<Login loading={setLoading} login={trackLogin} />}/>
                <Route path="/register" element={<Register loading={setLoading}/>}/>
                <Route path="/app" element={<Home loading={setLoading}/>}>
                <Route path="/app/friends" element={<FriendCard/>}/>
                <Route path="/app/profile/:id" element={<ProfilePage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )   
}

if (document.getElementById('root')) {
    ReactDOM.render(<App/>, document.getElementById('root'));
}