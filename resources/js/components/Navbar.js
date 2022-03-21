import LogoutIconSolid from "../icons/solid/LogoutIconSolid"
import FriendsSolid from "../icons/solid/FriendsIconSolid"
import UserCircleSolid from "../icons/solid/UserCircleIconSolid"
import HomeIconSolid from "../icons/solid/HomeIconSolid"
import CogIconSolid from "../icons/solid/CogIconSolid"
import {Link as LinkRouter} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import apiClient from "../axios"
import Button from "./Button"

function Navbar(props) {

  const navigate=useNavigate()
  function logout(){
    apiClient.post('api/logout')
    .then(response=>{
        props.setUserID('')
        console.log(response.data.data)
        navigate('/',{replace:true})
    })
  }

  return (
    <div id="navbar" className="flex flex-row h-[70px] bg-blue-500 fixed bottom-0 w-full md:w-4/6 z-50 text-black">
        <button className="relative h-full w-full">
          <LinkRouter to="/app">
            <HomeIconSolid/>
            <p>Home</p>
          </LinkRouter>
        </button>
        <button className="relative h-full w-full">
          <LinkRouter to="/app/friends">
            <FriendsSolid/>
            <p>Friends</p>
          </LinkRouter>
        </button>
        <button className="relative h-full w-full">
          <LinkRouter to={"/app/profile/"+props.userID}>
            <UserCircleSolid/>
            <p>Profile</p>
          </LinkRouter>
        </button>
        <button className="relative h-full w-full">
          <LinkRouter to="/app/profile/settings">
            <CogIconSolid/>
            <p>Settings</p>
          </LinkRouter>
        </button>
        <button className="relative h-full w-full">
          <LogoutIconSolid logout={logout}/>
          <p>Log out</p>
        </button>
    </div>
  )
}

export default Navbar