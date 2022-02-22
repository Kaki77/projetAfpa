import Navbar from "./Navbar"
import LittleCard from "./LittleCard"
import FriendCard from "./FriendCard"
import ProfilePage from "./ProfilePage"

function Home(props) {

    return (
        <>
            <Navbar/>
            <LittleCard/>
            <LittleCard/>
            <FriendCard/>
            <ProfilePage/>
        </>
    )
}

export default Home