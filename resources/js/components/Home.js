import Navbar from "./Navbar"
import ProfileFeed from "./ProfileFeed"
import {Routes,Route} from 'react-router-dom'
import NewsFeed from "./NewsFeed"
import FollowFeed from "./FollowFeed"
import BigCard from "./BigCard"

function Home(props) {
    
    return (
        <>
            <div className="mx-3">
                <Routes>
                        <Route path="/" element={<NewsFeed loading={props.loading} sessionCheck={props.sessionCheck} loadState={props.loadState} userID={props.userID}/>}/>
                        <Route path="/friends" element={<FollowFeed loading={props.loading} sessionCheck={props.sessionCheck} loadState={props.loadState}/>}/>
                        <Route path="/profile/config"/>
                        <Route path="/profile/:id" element={<ProfileFeed loading={props.loading} sessionCheck={props.sessionCheck} userID={props.userID} loadState={props.loadState}/>}/>
                        <Route path="/post/:id" element={<BigCard loading={props.loading} sessionCheck={props.sessionCheck} userID={props.userID} loadState={props.loadState}/>}/>
                </Routes>
            </div>
            <div className="mt-20">
            <Navbar userID={props.userID} setUserID={props.setUserID}/>
            </div>
        </>
    )
}

export default Home