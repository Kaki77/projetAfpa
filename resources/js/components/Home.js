import Navbar from "./Navbar"
import ProfileFeed from "./ProfileFeed"
import {Routes,Route} from 'react-router-dom'
import NewsFeed from "./NewsFeed"
import FollowFeed from "./FollowFeed"
import {useEffect} from 'react'

function Home(props) {
    
    return (
        <>
            <Navbar userID={props.userID} setUserID={props.setUserID}/>
            <Routes>
                    <Route path="/" element={<NewsFeed loading={props.loading} sessionCheck={props.sessionCheck}/>}/>
                    <Route path="/friends" element={<FollowFeed loading={props.loading} sessionCheck={props.sessionCheck}/>}/>
                    <Route path="/profile/:id" element={<ProfileFeed loading={props.loading} sessionCheck={props.sessionCheck}/>}/>
            </Routes>
        </>
    )
}

export default Home