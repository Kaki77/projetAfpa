import Navbar from "./Navbar"
import ProfileFeed from "./ProfileFeed"
import {Routes,Route} from 'react-router-dom'
import NewsFeed from "./NewsFeed"
import FollowFeed from "./FollowFeed"

function Home(props) {
    return (
        <>
            <Navbar userID={props.userID} setUserID={props.setUserID}/>
            <Routes>
                    <Route path="/" element={<NewsFeed loading={props.loading}/>}/>
                    <Route path="/friends" element={<FollowFeed loading={props.loading}/>}/>
                    <Route path="/profile/:id" element={<ProfileFeed loading={props.loading}/>}/>
            </Routes>
        </>
    )
}

export default Home