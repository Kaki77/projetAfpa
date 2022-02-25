import Navbar from "./Navbar"
import LittleCard from "./LittleCard"
import FriendCard from "./FriendCard"
import ProfilePage from "./ProfilePage"
import {Routes,Route} from 'react-router-dom'

function Home(props) {

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