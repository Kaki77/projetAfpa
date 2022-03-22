import Navbar from "./Navbar"
import ProfileFeed from "./ProfileFeed"
import {Routes,Route} from 'react-router-dom'
import NewsFeed from "./NewsFeed"
import FollowFeed from "./FollowFeed"
import BigCard from "./BigCard"
import SettingsFeed from "./SettingsFeed"

function Home() {

    return (
        <>
            <div className="mx-3">
                <Routes>
                        <Route path="/" element={<NewsFeed/>}/>
                        <Route path="/friends" element={<FollowFeed/>}/>
                        <Route path="/profile/settings" element={<SettingsFeed/>}/>
                        <Route path="/profile/:id" element={<ProfileFeed/>}/>
                        <Route path="/post/:id" element={<BigCard/>}/>
                </Routes>
            </div>
            <div className="mt-[120px]">
                <Navbar/>
            </div>
        </>
    )
}

export default Home