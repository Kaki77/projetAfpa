import Navbar from "./Navbar"
import ProfileFeed from "./ProfileFeed"
import {Routes,Route} from 'react-router-dom'
import NewsFeed from "./NewsFeed"
import FollowFeed from "./FollowFeed"
import BigCard from "./BigCard"
import SettingsFeed from "./SettingsFeed"

function Home(props) {
    
    return (
        <>
            <div className="mx-3">
                <Routes>
                        <Route path="/" element={<NewsFeed loading={props.loading} sessionCheck={props.sessionCheck} loadState={props.loadState} userID={props.userID} setFlash={props.setFlash}/>}/>
                        <Route path="/friends" element={<FollowFeed loading={props.loading} sessionCheck={props.sessionCheck} loadState={props.loadState} setFlash={props.setFlash}/>}/>
                        <Route path="/profile/settings" element={<SettingsFeed loading={props.loading} sessionCheck={props.sessionCheck} loadState={props.loadState} userID={props.userID} setFlash={props.setFlash}/>}/>
                        <Route path="/profile/:id" element={<ProfileFeed loading={props.loading} sessionCheck={props.sessionCheck} userID={props.userID} loadState={props.loadState} setFlash={props.setFlash}/>}/>
                        <Route path="/post/:id" element={<BigCard loading={props.loading} sessionCheck={props.sessionCheck} userID={props.userID} loadState={props.loadState} setFlash={props.setFlash}/>}/>
                </Routes>
            </div>
            <div className="mt-[120px]">
                <Navbar userID={props.userID} setUserID={props.setUserID}/>
            </div>
        </>
    )
}

export default Home