import LogoutIconSolid from "../icons/solid/LogoutIconSolid"
import FriendsSolid from "../icons/solid/FriendsIconSolid"
import UserCircleSolid from "../icons/solid/UserCircleIconSolid"
import HomeIconSolid from "../icons/solid/HomeIconSolid"
import {Link as LinkRouter} from 'react-router-dom'

function Navbar() {
  return (
    <div className="flex flex-row h-1/10 bg-teal-500 sticky top-0 mb-5">
        <button className="relative h-full w-full bg-red-500"><LinkRouter to="/app"><HomeIconSolid/></LinkRouter></button>
        <button className="relative h-full w-full bg-blue-500"><LinkRouter to="/app/friends"><FriendsSolid/></LinkRouter></button>
        <button className="relative h-full w-full bg-green-500"><LinkRouter to="/app/profile/1"><UserCircleSolid/></LinkRouter></button>
        <button className="relative h-full w-full bg-yellow-500"><LinkRouter to="#"><LogoutIconSolid/></LinkRouter></button>
    </div>
  )
}

export default Navbar