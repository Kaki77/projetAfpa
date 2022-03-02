import Navbar from "./Navbar"
import LittleCard from "./LittleCard"
import FriendCard from "./FriendCard"
import ProfilePage from "./ProfilePage"
import {Routes,Route} from 'react-router-dom'
import {useEffect} from 'react'
import apiClient from '../axios'

function Home(props) {

    useEffect(() => {
        let controller = new AbortController()
        apiClient.get('api/user/1',{signal:controller.signal})
        .then(response=>{
            console.log(response.data);
        })
        return () => {
            controller.abort()
        }
    }, [])
    

    return (
        <>
            <Navbar/>
            <Routes>
                    <Route path="/" element={<LittleCard/>}/>
                    <Route path="/friends" element={<FriendCard/>}/>
                    <Route path="/profile/:id" element={<ProfilePage/>}/>
            </Routes>
        </>
    )
}

export default Home